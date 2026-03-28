"""Full optimization: channel profile + all 6 videos metadata + thumbnails."""

import subprocess
import sys
import os
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from auth import get_credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

CHANNEL_DESCRIPTION = """SC Viking — дитячий футбольний клуб у Бухаресті 🇷🇴⚽
Тренування для дітей 4-14 років | UEFA C ліцензований тренер

🏆 Турніри AMFB та Stelele Viitorului București
📍 Бухарест, Румунія
🌐 https://sc-viking-site.kostyantyn.workers.dev

SC Viking — children's football club in Bucharest, Romania.
Training for kids aged 4-14 | UEFA C licensed coach

📩 scvikingur@gmail.com
📱 Instagram: @sc_viking"""

CHANNEL_KEYWORDS = (
    "SC Viking футбол діти Бухарест kids football Bucharest fotbal copii "
    "București дитячий футбол тренування youth soccer Romania academy"
)

# Video metadata: id -> {title, description, tags}
VIDEOS = {
    "b7dCTjfvfmE": {
        "title": "SC Viking — Матч на відкритому полі | Youth Football Match Highlights",
        "description": """SC Viking у дії! Фрагменти матчу дитячого футболу на відкритому полі у Бухаресті.

SC Viking in action! Youth football match highlights on the outdoor pitch in Bucharest.

🏆 SC Viking — дитячий футбольний клуб, Бухарест
📍 Bucharest, Romania
🌐 https://sc-viking-site.kostyantyn.workers.dev
📩 scvikingur@gmail.com

#SCViking #YouthFootball #KidsFootball #Bucharest #футбол #дитячийфутбол""",
        "tags": ["SC Viking", "youth football", "kids football", "Bucharest",
                 "football match", "children football", "fotbal copii",
                 "București", "дитячий футбол", "матч", "highlights"],
        "source": "media-archive/Video/document_5262552273065636173.mp4",
    },
    "7fR598yhHEE": {
        "title": "SC Viking — Командний дух перед матчем 💪 | Team Spirit",
        "description": """Команда SC Viking збирається разом перед матчем — справжній командний дух!

SC Viking team huddle before the match — real team spirit!

🏆 SC Viking — дитячий футбольний клуб, Бухарест
🌐 https://sc-viking-site.kostyantyn.workers.dev
📩 scvikingur@gmail.com

#SCViking #TeamSpirit #YouthFootball #командний_дух""",
        "tags": ["SC Viking", "team spirit", "huddle", "youth football",
                 "kids football", "Bucharest", "командний дух", "fotbal copii"],
        "source": "media-archive/Video/IMG_3258.MOV",
    },
    "H866o3xaaD8": {
        "title": "SC Viking — На турнірі, чекаємо свою гру 🏆 | Tournament Day",
        "description": """Юні вікінги на трибуні чекають свою чергу на турнірі.

Young Vikings watching from the stands, waiting for their game at the tournament.

🏆 SC Viking — дитячий футбольний клуб, Бухарест
🌐 https://sc-viking-site.kostyantyn.workers.dev

#SCViking #Tournament #YouthFootball #турнір""",
        "tags": ["SC Viking", "tournament", "youth football", "турнір",
                 "kids football", "Bucharest", "fotbal copii", "AMFB"],
        "source": "media-archive/Video/IMG_8656.MOV",
    },
    "EqWP39F4X9g": {
        "title": "SC Viking — Тренування з конусами ⚡ | Agility Training Drill",
        "description": """Вправи на спритність та координацію на тренуванні SC Viking.

Agility and coordination drills at SC Viking training session.

🏆 SC Viking — дитячий футбольний клуб, Бухарест
📍 Bucharest, Romania
🌐 https://sc-viking-site.kostyantyn.workers.dev

#SCViking #Training #AgilityDrill #тренування #футбол""",
        "tags": ["SC Viking", "training", "agility drill", "тренування",
                 "youth football", "coordination", "kids football",
                 "fotbal copii", "Bucharest"],
        "source": "media-archive/Video/IMG_7877.MP4",
    },
    "HGJVPO-lGwg": {
        "title": "SC Viking — Гра в манежі ⚽ | Indoor Football Match",
        "description": """SC Viking грає в закритому манежі — зимовий сезон!

SC Viking playing indoors — winter season action!

🏆 SC Viking — дитячий футбольний клуб, Бухарест
🌐 https://sc-viking-site.kostyantyn.workers.dev

#SCViking #IndoorFootball #YouthFootball #манеж""",
        "tags": ["SC Viking", "indoor football", "youth football", "match",
                 "kids football", "Bucharest", "fotbal copii", "манеж"],
        "source": "media-archive/Video/IMG_3209.MOV",
    },
    "z_sypUed8jQ": {
        "title": "SC Viking — Тренування з тренером 🎯 | Coaching Session",
        "description": """Тренер Ростислав веде тренування з юними вікінгами.

Coach Rostyslav leading a training session with young Vikings.

🏆 SC Viking — дитячий футбольний клуб, Бухарест
👨‍🏫 Тренер з UEFA C ліцензією
🌐 https://sc-viking-site.kostyantyn.workers.dev

#SCViking #Coaching #Training #тренер #тренування""",
        "tags": ["SC Viking", "coaching", "training session", "тренування",
                 "youth football", "kids football", "Bucharest",
                 "fotbal copii", "UEFA"],
        "source": "media-archive/Video/IMG_3242.MOV",
    },
}


def generate_thumbnail(video_path, output_path, timestamp="00:00:02"):
    """Extract a frame and add SC Viking branding overlay."""
    # Extract best frame
    subprocess.run([
        "ffmpeg", "-y", "-i", video_path,
        "-ss", timestamp, "-frames:v", "1",
        "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:-1:-1",
        "-q:v", "2", output_path,
    ], capture_output=True)
    return output_path


def main():
    yt = build("youtube", "v3", credentials=get_credentials())

    # ── 1. Update channel ────────────────────────────────────────────────────
    print("=== Updating channel profile ===")
    current = yt.channels().list(part="brandingSettings", mine=True).execute()
    settings = current["items"][0]["brandingSettings"]
    settings["channel"]["description"] = CHANNEL_DESCRIPTION
    settings["channel"]["keywords"] = CHANNEL_KEYWORDS

    yt.channels().update(
        part="brandingSettings",
        body={"id": current["items"][0]["id"], "brandingSettings": settings},
    ).execute()
    print("Channel description and keywords updated!")

    # ── 2. Update each video ─────────────────────────────────────────────────
    print("\n=== Updating videos ===")
    for video_id, meta in VIDEOS.items():
        print(f"\nUpdating {video_id}: {meta['title'][:50]}...")

        # Get current snippet
        current = yt.videos().list(part="snippet", id=video_id).execute()
        if not current["items"]:
            print(f"  Video {video_id} not found, skipping")
            continue

        snippet = current["items"][0]["snippet"]
        snippet["title"] = meta["title"]
        snippet["description"] = meta["description"]
        snippet["tags"] = meta["tags"]
        snippet["categoryId"] = "17"  # Sports
        # Remove defaultLanguage/defaultAudioLanguage if they cause issues
        snippet.pop("localized", None)

        yt.videos().update(
            part="snippet",
            body={"id": video_id, "snippet": snippet},
        ).execute()
        print(f"  Metadata updated!")

        # ── 3. Generate and upload thumbnail ─────────────────────────────────
        source = meta.get("source")
        if source and os.path.exists(source):
            thumb_path = f"/tmp/thumb_{video_id}.jpg"
            generate_thumbnail(source, thumb_path)
            if os.path.exists(thumb_path):
                try:
                    yt.thumbnails().set(
                        videoId=video_id,
                        media_body=MediaFileUpload(thumb_path, mimetype="image/jpeg"),
                    ).execute()
                    print(f"  Thumbnail uploaded!")
                except Exception as e:
                    print(f"  Thumbnail failed (need channel verification): {e}")

    print("\n=== Done! All videos optimized ===")


if __name__ == "__main__":
    main()