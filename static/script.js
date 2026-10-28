const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");
const sourceText = document.getElementById("sourceText");
const translatedText = document.getElementById("translatedText");
const translateButton = document.getElementById("translateButton");
const charCount = document.getElementById("charCount");
const resultStatus = document.getElementById("resultStatus");
const copyButton = document.getElementById("copyButton");
const speakButton = document.getElementById("speakButton");
const toast = document.getElementById("toast");
let lastTranslation = "";
let toastTimer;

const speechLanguages = {
  en: "en-US", ar: "ar-SA", es: "es-ES", fr: "fr-FR", de: "de-DE",
  it: "it-IT", pt: "pt-PT", ru: "ru-RU", zh: "zh-CN", ja: "ja-JP",
  ko: "ko-KR", hi: "hi-IN", tr: "tr-TR", nl: "nl-NL", pl: "pl-PL",
  sv: "sv-SE", uk: "uk-UA", el: "el-GR", he: "he-IL", id: "id-ID",
  vi: "vi-VN", th: "th-TH", bn: "bn-IN", fa: "fa-IR", ur: "ur-PK"
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function setStatus(message, state = "ready") {
  const colors = { ready: "#c6c6d4", loading: "#8b7cf0", success: "#45c6a5", error: "#e87979" };
  resultStatus.replaceChildren();
  const dot = document.createElement("span");
  dot.className = "status-dot";
  dot.style.background = colors[state] || colors.ready;
  resultStatus.append(dot, document.createTextNode(message));
}
function setTranslation(text) {
  lastTranslation = text;
  translatedText.textContent = text || "Your translation will appear here.";
  translatedText.classList.toggle("placeholder", !text);
  translatedText.dir = ["ar", "he", "fa", "ur"].includes(targetLanguage.value) ? "rtl" : "auto";
  copyButton.disabled = !text;
  speakButton.disabled = !text || !("speechSynthesis" in window);
}
sourceText.addEventListener("input", () => {
  charCount.textContent = `${sourceText.value.length.toLocaleString()} / 5,000`;
});
document.getElementById("clearButton").addEventListener("click", () => {
  sourceText.value = "";
  charCount.textContent = "0 / 5,000";
  setTranslation("");
  setStatus("Ready to translate");
  sourceText.focus();
});
document.getElementById("swapButton").addEventListener("click", () => {
  const oldSource = sourceLanguage.value;
  sourceLanguage.value = targetLanguage.value;
  targetLanguage.value = oldSource;
  const oldText = sourceText.value;
  sourceText.value = lastTranslation || "";
  charCount.textContent = `${sourceText.value.length.toLocaleString()} / 5,000`;
  setTranslation(oldText);
  setStatus("Languages swapped");
});

async function translateText() {
  const text = sourceText.value.trim();
  if (!text) {
    showToast("Enter some text to translate first.");
    sourceText.focus();
    return;
  }
  if (sourceLanguage.value === targetLanguage.value) {
    setTranslation(text);
    setStatus("Source and target languages are the same", "success");
    return;
  }

  translateButton.disabled = true;
  translateButton.querySelector(".button-label").textContent = "Translating...";
  setStatus("Connecting to translation service...", "loading");
  setTranslation("");
  try {
    const response = await fetch("/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        source: sourceLanguage.value,
        target: targetLanguage.value
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Translation failed. Please try again.");
    setTranslation(data.translation);
    setStatus("Translation complete", "success");
  } catch (error) {
    setTranslation("");
    setStatus("Translation failed", "error");
    showToast(error.message || "Something went wrong. Please try again.");
  } finally {
    translateButton.disabled = false;
    translateButton.querySelector(".button-label").textContent = "Translate text";
  }
}
translateButton.addEventListener("click", translateText);
sourceText.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") translateText();
});
copyButton.addEventListener("click", async () => {
  if (!lastTranslation) return;
  try {
    await navigator.clipboard.writeText(lastTranslation);
    showToast("Translation copied to clipboard.");
  } catch {
    const temporary = document.createElement("textarea");
    temporary.value = lastTranslation;
    document.body.appendChild(temporary);
    temporary.select();
    document.execCommand("copy");
    temporary.remove();
    showToast("Translation copied to clipboard.");
  }
});
speakButton.addEventListener("click", () => {
  if (!lastTranslation || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(lastTranslation);
  utterance.lang = speechLanguages[targetLanguage.value] || targetLanguage.value;
  window.speechSynthesis.speak(utterance);
});
[targetLanguage, sourceLanguage].forEach((select) => {
  select.addEventListener("change", () => {
    if (lastTranslation) setStatus("Language changed — translate again to update");
  });
});
