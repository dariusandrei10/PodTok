"""
Trimite transcriptul + profilul utilizatorului la Gemini si primeste
inapoi segmentele cele mai relevante, cu timestamp-uri si titluri hook.

Instalare:
    pip install requests --break-system-packages

Config (ia cheia gratuit de pe aistudio.google.com):
    export GEMINI_API_KEY="cheia_ta"          (Mac/Linux)
    setx GEMINI_API_KEY "cheia_ta"            (Windows, apoi redeschide terminalul)

Rulare:
    python analyze_podcast.py transcript_VIDEOID.txt profile.txt

profile.txt e un fisier text simplu cu descrierea ta, ex:
    "Sunt Darius, student la informatica in Romania, imi place SD, AI, sisteme
    de operare si productivitate. Nivel: avansat tehnic, interesat de detalii."
"""

import sys
import os
import json
import requests
from dotenv import load_dotenv
MODEL = "gemini-3.5-flash"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"

PROMPT_TEMPLATE = """Esti un editor de continut care selecteaza cele mai relevante
fragmente dintr-un podcast, pentru un anumit ascultator.

PROFILUL ASCULTATORULUI:
{profile}

TRANSCRIPTUL PODCASTULUI (cu timestamp-uri [mm:ss]):
{transcript}

Sarcina ta: identifica exact 3 segmente de maxim 60 de secunde fiecare,
care se potrivesc cel mai bine cu interesele din profil. Segmentele trebuie
sa aiba sens de sine statator (nu taiate la mijlocul unei idei).

Raspunde STRICT in acest format JSON, fara alt text:
{{
  "segments": [
    {{
      "start": "mm:ss",
      "end": "mm:ss",
      "hook_title": "titlu scurt, atractiv, sub 8 cuvinte",
      "why_relevant": "1 propozitie: de ce se potriveste cu profilul"
    }}
  ]
}}"""


def main():
    if len(sys.argv) < 3:
        print("Utilizare: python analyze_podcast.py <transcript.txt> <profile.txt>")
        sys.exit(1)
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Lipseste GEMINI_API_KEY din variabilele de mediu.")
        sys.exit(1)

    transcript = open(sys.argv[1], encoding="utf-8").read()
    profile = open(sys.argv[2], encoding="utf-8").read()

    prompt = PROMPT_TEMPLATE.format(profile=profile, transcript=transcript)

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseMimeType": "application/json"},
    }

    resp = requests.post(f"{API_URL}?key={api_key}", json=payload, timeout=120)
    resp.raise_for_status()
    data = resp.json()

    text_out = data["candidates"][0]["content"]["parts"][0]["text"]
    result = json.loads(text_out)

    for seg in result["segments"]:
        print(f"\n[{seg['start']} - {seg['end']}] {seg['hook_title']}")
        print(f"  -> {seg['why_relevant']}")

    with open("segments.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print("\nSalvat in segments.json")


if __name__ == "__main__":
    main()
