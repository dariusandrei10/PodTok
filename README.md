# 🎙️ PodTok — Hyper-Personalized AI Podcast Curator

![React](https://img.shields.io/badge/Frontend-React%20%2F%20Vite-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%2F%20Python-009688?style=for-the-badge&logo=fastapi)
![Google Gemini](https://img.shields.io/badge/AI%20Engine-Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google)
![Axios](https://img.shields.io/badge/HTTP%20Client-Axios-5A29E4?style=for-the-badge&logo=axios)

**PodTok** is an advanced full-stack AI application that dynamically analyzes long-form YouTube podcasts to extract, curate, and recommend exact 60-second timestamp intervals along with personalized relevance explanations. 

Unlike generic clipping tools that target mass-market viral hooks, **PodTok utilizes Google's latest Gemini 2.5 Flash model to analyze a listener's unique personality traits and interests**, predicting and delivering the exact 3 timestamp recommendations (`[mm:ss - mm:ss]`) tailored specifically to the individual's soul and learning style.

---

## 🎥 Live Video Walkthrough & Practical Demo

Click the player below to watch the full practical walkthrough and live demonstration of PodTok:

[![Watch the PodTok Video Demo](<img width="2557" height="1455" alt="image" src="https://github.com/user-attachments/assets/aba55d52-5e41-462e-ac76-66228fe554c2" />](https://youtu.be/RRlDFlIpSHY))

---

## 💡 The Core Innovation: Why PodTok is Different

Most podcast clippers look for generic high-energy moments. PodTok redefines short-form consumption through **Deep Personalization**:
* 🧠 **Listener Personality Profiling:** Users input their hobbies, career challenges, or daily thoughts directly into our React interface.
* 🔍 **Multi-Language Transcript Extraction:** Automatically fetches and processes complete timestamps via `youtube_transcript_api` (supporting both Romanian and English).
* ⚡ **Precise Timestamp Curation:** Uses strict Prompt Engineering and custom response parsing to force Gemini 2.5 Flash to return exact `[mm:ss]` start/end time intervals and custom "Why Relevant" explanations rendered cleanly on interactive React cards.

---

## 🧩 Architecture & Data Flow
[React UserForm] ──(Axios POST {profile, video_id})──> [FastAPI Server (port 8000)] │ ▼ [YouTube Transcript API] │ ▼ [Google Gemini 2.5 Flash] │ ▼ [React SegmentList] <──(Strict JSON Segments)─────┘

---

## 🛠️ Technology Stack

### Frontend (`/PodTok`)
* **Framework:** React 19 + Vite (Modern, lightning-fast bundle)
* **Networking:** Axios (Clean async/await HTTP POST requests)    
* **Design:** Controlled Components & State Management (`useState`)

### Backend (`/server`)
* **Framework:** Python 3.13 + FastAPI + Uvicorn (High-performance ASGI server)
* **AI Integration:** Official `google-genai` SDK 2026 (`client.interactions.create`)
* **Data Extraction:** `youtube_transcript_api`
* **Security & CORS:** Configured `CORSMiddleware` with environment variable protection (`.dotenv`)

---

## 🚀 Getting Started (Local Setup Guide)
If you want to run **PodTok** locally on your machine, follow these steps:
        
### 1. Clone the Repository
```bash
git clone https://github.com/dariusandrei10/PodTok.git
cd PodTok
```
### 2. Backend Setup (FastAPI & AI)
Open a terminal inside the root directory:
```
cd server
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn google-genai youtube-transcript-api python-dotenv requests

Create a .env file inside the /server folder and add your Google API key:

env
GOOGLE_API_KEY=your_secret_gemini_api_key_here

Start the backend server:
bash
uvicorn main:app --reload
```
3. Frontend Setup (React / Vite)
Open a second terminal window:
```
cd PodTok
npm install
npm run dev
```
