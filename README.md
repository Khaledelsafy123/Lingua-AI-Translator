# Lingua AI — Language Translator

A full-stack language translation web app built with **Python, Flask, HTML, CSS, and JavaScript**. It connects to the MyMemory Translation API to translate text between supported languages.

## Features
- Translate text between 40 languages
- Python Flask backend with input validation and error handling
- Responsive interface for desktop and mobile
- Copy translation to clipboard
- Text-to-speech using the browser's speech synthesis
- Swap source and target languages
- Character counter with a 5,000-character limit
- `Ctrl + Enter` / `Cmd + Enter` keyboard shortcut
- No API key required for basic MyMemory usage

## Run locally

**1. Install Python 3.10+** if it is not already installed.

**2. Open a terminal in the project folder** and create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, use Command Prompt:

```bat
venv\Scripts\activate.bat
```

**3. Install dependencies:**

```bash
pip install -r requirements.txt
```

**4. Start the app:**

```bash
python app.py
```

**5. Open:** http://127.0.0.1:5000

## How it works

1. The browser sends the text and selected language codes to the Flask `/translate` endpoint.
2. Python validates the input and calls the MyMemory Translation API with `requests`.
3. The Flask endpoint returns the translated text as JSON.
4. JavaScript displays the result and enables copy and text-to-speech actions.

## API and privacy

This project uses the third-party [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php). An internet connection is required. Translation quality, availability, and rate limits depend on that service. Text entered for translation is sent to the translation provider, so do not submit sensitive or confidential text.

## Deploying

This is a Flask application, so **GitHub Pages alone cannot run the Python backend**. You can host the code on GitHub and deploy the app to a Python-capable host such as Render or Railway. Set the start command to:

```bash
gunicorn app:app
```

For that start command, add `gunicorn` to `requirements.txt` before deploying.

## Project structure

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
