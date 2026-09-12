"""
Extrage transcriptul unui video YouTube (cu timestamp-uri) si il salveaza
intr-un fisier text, gata de trimis catre Gemini.

Instalare:
    pip install youtube-transcript-api --break-system-packages

Rulare:
    python fetch_transcript.py <video_id> [cod_limba]

Exemplu:
    python fetch_transcript.py dQw4w9WgXcQ ro

Video ID-ul este partea din URL de dupa "v=".
Pentru https://www.youtube.com/watch?v=dQw4w9WgXcQ -> video_id = dQw4w9WgXcQ
"""

import sys
from youtube_transcript_api import YouTubeTranscriptApi


def format_timestamp(seconds: float) -> str:
    m, s = divmod(int(seconds), 60)
    h, m = divmod(m, 60)
    if h:
        return f"{h:02d}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"


def main():
    if len(sys.argv) < 2:
        print("Utilizare: python fetch_transcript.py <video_id> [cod_limba]")
        sys.exit(1)

    video_id = sys.argv[1]
    # Incearca romana, apoi engleza, daca nu specifici alt cod
    languages = [sys.argv[2]] if len(sys.argv) > 2 else ["ro", "en"]

    api = YouTubeTranscriptApi()
    transcript = api.fetch(video_id, languages=languages)

    lines = [f"[{format_timestamp(s.start)}] {s.text}" for s in transcript.snippets]
    output_path = f"transcript_{video_id}.txt"

    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    total_minutes = transcript.snippets[-1].start / 60
    print(f"Salvat {len(transcript.snippets)} segmente (~{total_minutes:.0f} min) in {output_path}")


if __name__ == "__main__":
    main()
