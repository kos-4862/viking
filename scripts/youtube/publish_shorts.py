#!/usr/bin/env python3
"""Publish accepted shorts to YouTube with proper metadata."""

import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from shorts_pipeline import get_tags_for_type, make_shorts_description

ACCEPTED_DIR = Path(__file__).resolve().parent.parent.parent / "output" / "shorts" / "Accepted"
THUMB_DIR = Path(__file__).resolve().parent.parent.parent / "output" / "shorts" / "thumbnails"

# Each short: (filename, youtube_title, type, description_hook)
SHORTS_METADATA = [
    (
        "02-attack.mp4",
        "SC Viking — Indoor Attack ⚡ #shorts",
        "match",
        "Fast indoor attack at the dome — SC Viking pressing forward!",
    ),
    (
        "04-indoor-action.mp4",
        "SC Viking — Indoor Match 🏟 #shorts",
        "match",
        "Quick indoor match action — SC Viking on the ball!",
    ),
    (
        "06-drill.mp4",
        "SC Viking — Indoor Match Day 🏟 #shorts",
        "match",
        "Indoor match at the dome — coach watching from the sideline!",
    ),
    (
        "09-drone.mp4",
        "SC Viking — Aerial View 🚁 #shorts",
        "match",
        "Drone footage of SC Viking outdoor match — beautiful game from above!",
    ),
    (
        "10-futsal.mp4",
        "SC Viking — Futsal Tournament 🏆 #shorts",
        "tournament",
        "SC Viking competing in the indoor futsal tournament!",
    ),
    (
        "13-ceremony.mp4",
        "SC Viking & Dinamo Bucharest — Moment of Silence 🇺🇦🕯 #shorts",
        "team",
        "SC Viking and Dinamo Bucharest players observe a moment of silence for the children killed in the Russian missile strike on Kryvyi Rih, Ukraine. On April 4, 2025, a Russian Iskander missile hit a residential area near a children's playground, killing 19 people including 9 children. We remember. We stand with Ukraine.",
    ),
    (
        "14-outdoor-1.mp4",
        "SC Viking — Outdoor Match ⚽ #shorts",
        "match",
        "SC Viking match on the big outdoor pitch — full-size football!",
    ),
    (
        "16-agility.mp4",
        "SC Viking — Agility Drill 🔥 #shorts",
        "training",
        "Agility and speed drill at SC Viking outdoor training!",
    ),
    (
        "19-fast-feet.mp4",
        "SC Viking — Speed Training ⚡ #shorts",
        "training",
        "Fast feet between the cones — building speed and coordination!",
    ),
    (
        "20-game-ready.mp4",
        "SC Viking — Ball Control 🎯 #shorts",
        "training",
        "Ball control and first touch training at SC Viking Academy!",
    ),
]


def generate_thumbnail(video_path, output_path, title):
    """Generate branded thumbnail for a short."""
    import subprocess

    # Find best frame (middle of content, skip intro)
    from video_pipeline import get_duration
    dur = get_duration(str(video_path))
    seek = max(2, dur // 3)  # 1/3 into video, skip intro

    subprocess.run([
        "ffmpeg", "-y", "-ss", str(seek),
        "-i", str(video_path),
        "-vf",
        f"scale=1080:1920:force_original_aspect_ratio=decrease,"
        f"pad=1080:1920:-1:-1:color=0x1a1a2e,"
        f"drawbox=x=0:y=1700:w=1080:h=220:color=0xda1123@0.7:t=fill,"
        f"drawtext=text='{title}':fontsize=56:fontcolor=white:"
        f"x=(w-text_w)/2:y=1760:font='DejaVu Sans':"
        f"borderw=3:bordercolor=black@0.5,"
        f"drawtext=text='SC VIKING':fontsize=24:fontcolor=white@0.9:"
        f"x=30:y=30:font='DejaVu Sans':"
        f"borderw=2:bordercolor=black@0.5",
        "-frames:v", "1", "-q:v", "2",
        str(output_path),
    ], capture_output=True)


def main():
    THUMB_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Preparing {len(SHORTS_METADATA)} shorts for publication\n")

    # Generate thumbnails and descriptions
    for filename, title, vtype, hook in SHORTS_METADATA:
        video = ACCEPTED_DIR / filename
        if not video.exists():
            print(f"  SKIP: {filename} not found")
            continue

        name = filename.replace(".mp4", "")
        thumb = THUMB_DIR / f"{name}.jpg"

        # Clean title for thumbnail (remove emoji and #shorts)
        clean_title = title.replace("SC Viking — ", "").split("#")[0].strip()
        for emoji in "⚡🏟🎯🚁🏆🇺🇦⚽🔥":
            clean_title = clean_title.replace(emoji, "").strip()

        generate_thumbnail(video, thumb, clean_title)

        tags = get_tags_for_type(vtype)
        desc = make_shorts_description(clean_title, vtype)

        size_mb = video.stat().st_size / (1024 * 1024)
        print(f"  ✓ {name}")
        print(f"    Title: {title}")
        print(f"    Tags: {len(tags)} tags")
        print(f"    Thumb: {thumb.name}")
        print(f"    Size: {size_mb:.1f}MB")
        print()

    print(f"Thumbnails saved to: {THUMB_DIR}/")

    # Upload if --upload flag
    if "--upload" in sys.argv:
        from auth import get_credentials
        from googleapiclient.discovery import build
        from googleapiclient.http import MediaFileUpload

        yt = build("youtube", "v3", credentials=get_credentials())
        uploaded = 0

        for filename, title, vtype, hook in SHORTS_METADATA:
            video = ACCEPTED_DIR / filename
            if not video.exists():
                continue

            name = filename.replace(".mp4", "")
            tags = get_tags_for_type(vtype)
            clean_title = title.replace("SC Viking — ", "").split("#")[0].strip()
            for emoji in "⚡🏟🎯🚁🏆🇺🇦⚽🔥":
                clean_title = clean_title.replace(emoji, "").strip()
            desc = make_shorts_description(clean_title, vtype)

            print(f"\n  Uploading: {title}...")
            try:
                body = {
                    "snippet": {
                        "title": title,
                        "description": f"{hook}\n\n{desc}",
                        "tags": tags,
                        "categoryId": "17",
                    },
                    "status": {
                        "privacyStatus": "public",
                        "selfDeclaredMadeForKids": False,
                        "embeddable": True,
                    },
                }

                media = MediaFileUpload(
                    str(video), mimetype="video/*",
                    resumable=True, chunksize=10 * 1024 * 1024,
                )

                request = yt.videos().insert(part="snippet,status", body=body, media_body=media)
                response = None
                while response is None:
                    status, response = request.next_chunk()
                    if status:
                        print(f"    {int(status.progress() * 100)}%", end=" ", flush=True)

                video_id = response["id"]
                print(f"\n    OK! https://youtube.com/shorts/{video_id}")
                uploaded += 1

                # Try to set thumbnail
                thumb = THUMB_DIR / f"{name}.jpg"
                if thumb.exists():
                    try:
                        yt.thumbnails().set(
                            videoId=video_id,
                            media_body=MediaFileUpload(str(thumb), mimetype="image/jpeg"),
                        ).execute()
                        print(f"    Thumbnail set!")
                    except Exception:
                        print(f"    Thumbnail skipped (rate limit)")

                time.sleep(3)

            except Exception as e:
                err = str(e)
                if "uploadLimitExceeded" in err or "exceeded" in err:
                    print(f"\n  ⚠️ Upload limit! Uploaded {uploaded} shorts.")
                    break
                print(f"    FAILED: {err[:100]}")

        print(f"\nDone! Uploaded {uploaded} shorts.")
    else:
        print("\nTo upload: python publish_shorts.py --upload")


if __name__ == "__main__":
    main()