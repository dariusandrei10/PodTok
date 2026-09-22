# PodTok

Teach your feed. 

I built PodTok because I love podcasts, but I don't always have 3 hours to find the ideas that actually resonate with me. You share a few honest details about your personality, paste a YouTube/podcast ID, and an AI agent scans the whole episode to curate the moments most relevant to *you*.

### The Stack
* **Frontend**: React (Vite) + Axios. 
* **Styling**: 100% Vanilla CSS. I wanted a specific minimalist, dark-themed aesthetic with smooth state transitions and custom loading screens, so I built the UI from scratch instead of relying on heavy component libraries.
* **Backend & AI**: Python + FastAPI. It handles the API routes and video processing, while **Gemini 2.5 Flash** powers the actual AI agent doing the heavy lifting—extracting, analyzing, and ranking the insights.

### Design Philosophy
No noise. Just you, your source, and the results. The interface is designed to feel like a calm, high-end studio tool, hiding the complex AI processing behind a simple multi-step form.

### Running it locally

**1. Start the backend**
Ensure you have your Python environment set up. *(Note: You will need to add your Gemini API key to your environment variables/`.env` file).*
```bash
# navigate to your backend folder
pip install -r requirements.txt
uvicorn main:app --reload
```
**2. Start the frontend**
```
cd client
npm install
npm run dev
```
Then open http://localhost:5173 in your browser.

### Preview

![PodTok Interface](./preview.png)
