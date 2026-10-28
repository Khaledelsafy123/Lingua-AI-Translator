# 🌐 Lingua AI — Language Translator

A full-stack language translation web application built with **Python, Flask, HTML, CSS, and JavaScript**. Lingua AI allows users to translate text between 40 supported languages through the MyMemory Translation API, with a clean, responsive, and user-friendly interface.

## ✨ Features

- 🌍 **40 Supported Languages** — Translate text between multiple languages.
- ⚡ **Instant Translation** — Get translations through the MyMemory Translation API.
- 🔄 **Swap Languages** — Switch the source and target languages with one click.
- 📋 **Copy Translation** — Copy translated text to the clipboard.
- 🔊 **Text-to-Speech** — Listen to translations using the browser's speech synthesis.
- 📱 **Responsive Design** — Works across desktop and mobile devices.
- 🔢 **Character Counter** — Track input length with a 5,000-character limit.
- ⌨️ **Keyboard Shortcut** — Press `Ctrl + Enter` or `Cmd + Enter` to translate.
- 🛡️ **Input Validation** — Flask backend validation and error handling.
- 🔑 **No API Key Required** — Basic MyMemory API usage does not require an API key.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Flask | Web framework and API endpoints |
| HTML5 | Page structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Interactive features and API communication |
| MyMemory API | Text translation |
| Requests | HTTP requests to the translation service |

## 📸 How It Works

1. Enter the text you want to translate.
2. Select the source and target languages.
3. Click the translate button or use the keyboard shortcut.
4. The Flask backend validates the input and sends a request to the MyMemory Translation API.
5. The translated text is returned and displayed in the interface.
6. Copy or listen to the translated result.

## 🚀 Getting Started

Follow these steps to run Lingua AI locally.

### Prerequisites

- Python 3.10 or later
- pip
- An active internet connection

### 1. Clone the Repository

```bash
git clone https://github.com/Khaledelsafy123/lingua-ai-translator.git
cd lingua-ai-translator
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

### 3. Activate the Virtual Environment

**Windows — Command Prompt:**

```bat
venv\Scripts\activate.bat
```

**Windows — PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the Application

```bash
python app.py
```

### 6. Open in Your Browser

Visit:

```text
http://127.0.0.1:5000
```

## 📁 Project Structure

```text
lingua-ai-translator/
├── app.py
├── requirements.txt
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## 🔌 Translation API

Lingua AI uses the [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php) to process translation requests.

- An internet connection is required.
- Basic API usage does not require an API key.
- Translation quality and service availability depend on the provider.
- Rate limits and usage restrictions may apply.

### 🔒 Privacy Notice

Text submitted for translation is sent to the third-party MyMemory service. Avoid entering passwords, personal information, or confidential content.

## ☁️ Deployment

Lingua AI requires a Python-compatible hosting platform because GitHub Pages does not execute Flask backends.

You can deploy the application using a service such as [Render](https://render.com/) or [Railway](https://railway.com/).

For production deployment, add `gunicorn` to `requirements.txt` and configure the start command:

```bash
gunicorn app:app
```

Make sure the hosting platform is configured to install the dependencies from `requirements.txt` and expose the Flask application through the appropriate web service port.

## 👨‍💻 Author

**Khaled Elsafy**

- GitHub: [@Khaledelsafy123](https://github.com/Khaledelsafy123)

---

<p align="center">
  <strong>🌐 Lingua AI — Breaking Language Barriers</strong>
</p>
