import sys
import os
import json
import requests
from dotenv import load_dotenv
import google.generativeai as genai
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
  if len(sys.argv)<3 :
    print("You didn't introduced all the data necessary(python analyze_podcast.py <transcript.txt> <profile.txt>)")
    sys.exit(1)
  load_dotenv()
  api_key=os.getenv("GEMINI_API_KEY")
  if not api_key:
    print("Error: missing the API key from the AI Agent")
    sys.exit(1)
  with open(sys.argv[1], "r") as f:
    transcript=f.read()
  with open(sys.argv[2], "r") as f:
      profile=f.read()
  prompt=PROMPT_TEMPLATE.format(profile=profile, transcript = transcript)
  #configure the key and choose the model
  genai.configure(api_key=api_key)
  model=genai.GenerativeModel("gemini-3.5-flash")
  answer=model.generate_content(prompt)
  print(answer.text)
  with open("segments.json", "w", encoding="utf-8") as f:
    f.write(answer.text)  
  
if __name__=="__main__":
  main()    
    

