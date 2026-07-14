import os
import json
import requests
from dotenv import load_dotenv
from google import genai             
from fastapi import FastAPI
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="PodTok")
load_dotenv()
client = genai.Client()  

#add cors urls:
origins= [
  "http://localhost:3000",
  "http://localhost:5173"
]

#add middleware
app.add_middleware(
  CORSMiddleware,
  allow_origins =origins,
  allow_credentials=True,
  allow_methods = ["*"],
  allow_headers =["*"]
)


PROMPT_TEMPLATE = """You are a content editor who selects the most relevant
segments from a podcast for a specific listener.

LISTENER PROFILE:
{profile}

PODCAST TRANSCRIPT (with [mm:ss] timestamps):
{transcript}

Your task: identify exactly 3 segments of at most 60 seconds each,
that best match the interests in the profile. Segments must make sense
on their own (not cut off in the middle of an idea).

Respond STRICTLY in this JSON format, with no other text:
{{
  "segments": [
    {{
      "start": "mm:ss",
      "end": "mm:ss",
      "hook_title": "short, catchy title, under 8 words",
      "why_relevant": "1 sentence: why this matches the profile"
    }}
  ]
}}"""

class AnalyzeRequest(BaseModel):
  profile : str
  video_id : str



@app.get("/")
def root():
  return {"message": "PodTok is alive !"}

def format_timestamp(seconds: float) -> str:
    m, s = divmod(int(seconds), 60)
    h, m = divmod(m, 60)
    if h:
        return f"{h:02d}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"

@app.post("/analyze")
def send_profile(request : AnalyzeRequest):
  ytt_api = YouTubeTranscriptApi()
  transcript_data= ytt_api.fetch(request.video_id, languages=["ro", "en"]) #this linie basically creates an object
  #extract the text in one long string
  transcript_text=" "
  for s  in transcript_data.snippets: #this line helps us to access the array of our object (transcript_data) that contains our lines of translation 
   transcript_text += f"[{format_timestamp(s.start)}] {s.text}\n"

  prompt=PROMPT_TEMPLATE.format(profile=request.profile, transcript = transcript_text)
  print("1.received the translation from youtube")
  interaction = client.interactions.create(
      model="gemini-2.5-flash",
      input=prompt
  )
  print("2. received the answear from AI!")
  #this needs to be studied why it works just with this
  raw_text = interaction.output_text 
  raw_text = raw_text.replace("```json", "")
  raw_text = raw_text.replace("```", "")
  raw_text = raw_text.strip()
  return json.loads(raw_text)#returns the answear to react(our frontend)
  
  
  print("Profile received:" ,request.profile)
  print("Video received:", request.video_id)