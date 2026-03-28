#!/usr/bin/env python3
"""Generate branded thumbnails for all SC Viking YouTube videos."""

import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
LOGO = SCRIPT_DIR / "assets" / "logo.png"
OUTPUT_DIR = SCRIPT_DIR.parent.parent / "output" / "thumbnails"

# All videos with their source files for frame extraction
VIDEOS = {
    # Already uploaded — source in media-archive
    "b7dCTjfvfmE": {"title": "OUTDOOR MATCH", "source": "media-archive/Video/document_5262552273065636173.mp4", "ss": "30"},
    "7fR598yhHEE": {"title": "TEAM SPIRIT", "source": "media-archive/Video/IMG_3258.MOV", "ss": "3"},
    "H866o3xaaD8": {"title": "TOURNAMENT", "source": "media-archive/Video/IMG_8656.MOV", "ss": "2"},
    "EqWP39F4X9g": {"title": "TRAINING", "source": "media-archive/Video/IMG_7877.MP4", "ss": "5"},
    "HGJVPO-lGwg": {"title": "INDOOR MATCH", "source": "media-archive/Video/IMG_3209.MOV", "ss": "1"},
    "z_sypUed8jQ": {"title": "COACHING", "source": "media-archive/Video/IMG_3242.MOV", "ss": "1"},
    # Batch uploaded
    "Ns5ek9PI9JY": {"title": "DRONE VIEW", "source": "media-archive/Video/sc-viking-outdoor-match-drone-view.mp4", "ss": "10"},
    "aba3jME0VTU": {"title": "STELELE VIITORULUI", "source": "media-archive/Video/sc-viking-outdoor-match-vs-purple.mp4", "ss": "20"},
    "JO6YakcAQzU": {"title": "GOAL!", "source": "media-archive/Video/sc-viking-tournament-goal-moment.mp4", "ss": "1"},
    "lWHSUdoaFnM": {"title": "TOURNAMENT", "source": "media-archive/Video/sc-viking-tournament-match-clip.mp4", "ss": "5"},
    "R_Z0DxhNDxE": {"title": "TRAINING", "source": "media-archive/Video/sc-viking-footballs-on-pitch-fair-play.MOV", "ss": "5"},
    "k-e4fuMrmuo": {"title": "VS BLUE TEAM", "source": "media-archive/Video/sc-viking-indoor-match-vs-blue-team.MOV", "ss": "15"},
    "dM2jFjd1JYw": {"title": "INDOOR ACTION", "source": "media-archive/Video/sc-viking-indoor-match-action.MOV", "ss": "2"},
    "sv-WdtXpUM4": {"title": "ATTACK PLAY", "source": "media-archive/Video/sc-viking-indoor-match-attack.MOV", "ss": "5"},
    "ZF8oyTL2RcA": {"title": "COACH'S EYE", "source": "media-archive/Video/sc-viking-indoor-match-with-coach.MOV", "ss": "10"},
    "kT7xbgo0rSU": {"title": "TRAINING DRILL", "source": "media-archive/Video/sc-viking-indoor-training-drill.MOV", "ss": "1"},
}


def generate_thumbnail(video_id, title, source_path, seek_time="5"):
    """Generate a 1280x720 branded thumbnail."""
    output = OUTPUT_DIR / f"{video_id}.jpg"
    source = Path(source_path)

    if not source.exists():
        print(f"  SKIP {video_id}: source not found ({source})")
        return None

    # Complex filter: extract frame → darken bottom → add gradient → logo → title
    vf = (
        # Scale to 1280x720
        f"scale=1280:720:force_original_aspect_ratio=increase,"
        f"crop=1280:720,"
        # Darken bottom half for text readability
        f"drawbox=x=0:y=ih/2:w=iw:h=ih/2:color=black@0.5:t=fill,"
        # Gradient overlay at bottom
        f"drawbox=x=0:y=ih-120:w=iw:h=120:color=0xda1123@0.7:t=fill,"
        # Title text
        f"drawtext=text='{title}':"
        f"fontsize=72:fontcolor=white:"
        f"x=(w-text_w)/2:y=h-100:"
        f"font='DejaVu Sans':"
        f"borderw=3:bordercolor=black@0.6,"
        # SC VIKING label top-left
        f"drawtext=text='SC VIKING':"
        f"fontsize=28:fontcolor=white@0.9:"
        f"x=20:y=20:"
        f"font='DejaVu Sans':"
        f"borderw=2:bordercolor=black@0.5"
    )

    subprocess.run([
        "ffmpeg", "-y",
        "-ss", seek_time,
        "-i", str(source),
        "-i", str(LOGO),
        "-filter_complex",
        f"[0:v]{vf}[bg];"
        # Logo overlay top-right
        f"[1:v]scale=80:80[logo];"
        f"[bg][logo]overlay=W-w-20:15",
        "-frames:v", "1",
        "-q:v", "2",
        str(output),
    ], capture_output=True)

    if output.exists():
        print(f"  OK: {video_id} — {title} ({output.stat().st_size // 1024}KB)")
        return output
    else:
        print(f"  FAILED: {video_id}")
        return None


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Generating thumbnails for {len(VIDEOS)} videos...")
    print(f"Output: {OUTPUT_DIR}/\n")

    generated = []
    for video_id, info in VIDEOS.items():
        result = generate_thumbnail(
            video_id, info["title"], info["source"], info.get("ss", "5")
        )
        if result:
            generated.append((video_id, result))

    print(f"\nGenerated {len(generated)}/{len(VIDEOS)} thumbnails")
    print(f"Saved in: {OUTPUT_DIR}/")

    # Try to upload thumbnails to YouTube
    if "--upload" in sys.argv:
        from auth import get_credentials
        from googleapiclient.discovery import build
        from googleapiclient.http import MediaFileUpload

        yt = build("youtube", "v3", credentials=get_credentials())

        for video_id, thumb_path in generated:
            try:
                yt.thumbnails().set(
                    videoId=video_id,
                    media_body=MediaFileUpload(str(thumb_path), mimetype="image/jpeg"),
                ).execute()
                print(f"  Uploaded thumbnail: {video_id}")
            except Exception as e:
                if "permissions" in str(e).lower():
                    print(f"\n  Channel not verified! Verify at https://www.youtube.com/verify")
                    print(f"  Thumbnails saved locally in {OUTPUT_DIR}/")
                    break
                print(f"  Failed {video_id}: {e}")


if __name__ == "__main__":
    main()