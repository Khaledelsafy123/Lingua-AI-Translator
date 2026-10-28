from flask import Flask, render_template, request, jsonify
import html
import re
import requests

app = Flask(__name__)

# MyMemory is a hosted machine-translation service. Your app sends text to it
# and returns the translated result; no API key is required for basic use.
TRANSLATION_API_URL = "https://api.mymemory.translated.net/get"
SUPPORTED_LANGUAGES = {
    "en": "English", "ar": "Arabic", "es": "Spanish", "fr": "French",
    "de": "German", "it": "Italian", "pt": "Portuguese", "ru": "Russian",
    "zh": "Chinese (Simplified)", "ja": "Japanese", "ko": "Korean",
    "hi": "Hindi", "tr": "Turkish", "nl": "Dutch", "pl": "Polish",
    "sv": "Swedish", "uk": "Ukrainian", "el": "Greek", "he": "Hebrew",
    "id": "Indonesian", "vi": "Vietnamese", "th": "Thai", "bn": "Bengali",
    "fa": "Persian", "ur": "Urdu", "ro": "Romanian", "cs": "Czech",
    "da": "Danish", "fi": "Finnish", "no": "Norwegian", "hu": "Hungarian",
    "sw": "Swahili", "ms": "Malay", "ca": "Catalan", "bg": "Bulgarian",
    "hr": "Croatian", "sk": "Slovak", "sr": "Serbian", "ta": "Tamil",
    "te": "Telugu"
}


@app.get("/")
def home():
    return render_template("index.html", languages=SUPPORTED_LANGUAGES)


@app.post("/translate")
def translate():
    payload = request.get_json(silent=True) or {}
    text = str(payload.get("text", "")).strip()
    source = str(payload.get("source", "en")).strip()
    target = str(payload.get("target", "ar")).strip()

    if not text:
        return jsonify({"error": "Please enter some text to translate."}), 400
    if len(text) > 5000:
        return jsonify({"error": "Text must be 5,000 characters or fewer."}), 400
    if source not in SUPPORTED_LANGUAGES or target not in SUPPORTED_LANGUAGES:
        return jsonify({"error": "Please choose supported source and target languages."}), 400
    if source == target:
        return jsonify({"translation": text})

    try:
        response = requests.get(
            TRANSLATION_API_URL,
            params={"q": text, "langpair": f"{source}|{target}"},
            timeout=15,
        )
        response.raise_for_status()
        data = response.json()
        if data.get("responseStatus") != 200:
            details = data.get("responseDetails") or "The translation service could not process this text."
            return jsonify({"error": details}), 502

        translation = data.get("responseData", {}).get("translatedText")
        if not translation:
            return jsonify({"error": "The service returned an empty translation. Please try again."}), 502

        # MyMemory may return HTML entities/tags or echo the original text
        # before the translated phrase. Normalize that response for display.
        translation = html.unescape(str(translation))
        translation = re.sub(r"<[^>]+>", "", translation).strip()
        if source != target:
            source_prefix = text.strip()
            if translation[:len(source_prefix)].casefold() == source_prefix.casefold():
                remainder = translation[len(source_prefix):]
                if remainder and remainder[0].isspace():
                    remainder = remainder.strip()
                    if remainder:
                        translation = remainder

        return jsonify({"translation": translation})
    except requests.Timeout:
        return jsonify({"error": "The translation service took too long to respond. Please try again."}), 504
    except requests.RequestException:
        return jsonify({"error": "Could not connect to the translation service. Check your internet connection."}), 502
    except (ValueError, TypeError):
        return jsonify({"error": "Received an unexpected response from the translation service."}), 502


if __name__ == "__main__":
    app.run(debug=True)
