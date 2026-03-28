"""Batch upload SC Viking videos with proper titles, descriptions and tags."""

import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from auth import get_credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from googleapiclient.errors import HttpError

MEDIA_DIR = Path(__file__).resolve().parent.parent.parent / "media-archive" / "Video"
SITE_URL = "https://scviking2021.com/"

BASE_TAGS = [
    "SC Viking", "youth football", "kids football", "Bucharest",
    "fotbal copii", "București", "children football", "Romania",
    "дитячий футбол", "football academy",
]

# Videos to upload: filename -> {title, description_line, extra_tags, type}
# type: "short" (<60s vertical) or "video" (regular)
VIDEOS_TO_UPLOAD = {
    "sc-viking-outdoor-match-drone-view.mp4": {
        "title": "SC Viking — Outdoor Match Drone View",
        "desc": "Aerial drone footage of SC Viking youth football match on the outdoor pitch.",
        "tags": ["drone", "aerial", "outdoor match", "highlights"],
    },
    "sc-viking-outdoor-match-vs-purple.mp4": {
        "title": "SC Viking vs Purple Team — Outdoor Match",
        "desc": "SC Viking playing against the purple team on a full-size outdoor pitch.",
        "tags": ["outdoor match", "vs purple", "full match"],
    },
    "sc-viking-tournament-goal-moment.mp4": {
        "title": "SC Viking — Tournament Goal Moment",
        "desc": "Exciting goal moment at the youth football tournament!",
        "tags": ["goal", "tournament", "highlights", "AMFB"],
    },
    "sc-viking-tournament-match-clip.mp4": {
        "title": "SC Viking — Tournament Match Action",
        "desc": "Match clip from a youth football tournament in Bucharest.",
        "tags": ["tournament", "match", "AMFB", "highlights"],
    },
    "sc-viking-footballs-on-pitch-fair-play.MOV": {
        "title": "SC Viking — Fair Play on the Pitch",
        "desc": "Footballs ready on the pitch — Fair Play spirit at SC Viking training.",
        "tags": ["fair play", "training", "pitch", "atmosphere"],
    },
    "sc-viking-indoor-match-vs-blue-team.MOV": {
        "title": "SC Viking vs Blue Team — Indoor Match",
        "desc": "Indoor match action — SC Viking taking on the blue team in the dome.",
        "tags": ["indoor", "match", "dome", "vs blue"],
    },
    "sc-viking-indoor-match-action.MOV": {
        "title": "SC Viking — Indoor Match Action",
        "desc": "Fast-paced indoor football action in the training dome.",
        "tags": ["indoor", "match", "dome", "action"],
    },
    "sc-viking-indoor-match-attack.MOV": {
        "title": "SC Viking — Indoor Attack Play",
        "desc": "Attacking play during indoor match at the training dome.",
        "tags": ["indoor", "match", "dome", "attack"],
    },
    "sc-viking-indoor-match-with-coach.MOV": {
        "title": "SC Viking — Match Under Coach's Eye",
        "desc": "Indoor match with coach directing from the sideline.",
        "tags": ["indoor", "match", "coach", "coaching"],
    },
    "sc-viking-indoor-training-drill.MOV": {
        "title": "SC Viking — Indoor Training Drill",
        "desc": "Quick training drill in the indoor dome — building skills!",
        "tags": ["indoor", "training", "drill", "skills"],
    },
    "sc-viking-futsal-tournament.MOV": {
        "title": "SC Viking — Futsal Tournament",
        "desc": "SC Viking competing in a futsal tournament — indoor hall action!",
        "tags": ["futsal", "tournament", "indoor", "competition"],
    },
    "sc-viking-indoor-team-training.MOV": {
        "title": "SC Viking — Team Training Session",
        "desc": "Full team training session in the indoor dome with coach.",
        "tags": ["training", "indoor", "team", "session"],
    },
    "sc-viking-indoor-match-vs-yellow.MOV": {
        "title": "SC Viking vs Yellow Team — Indoor Match",
        "desc": "SC Viking facing the yellow team in an indoor match.",
        "tags": ["indoor", "match", "vs yellow", "dome"],
    },
    "sc-viking-team-photo-indoor.MOV": {
        "title": "SC Viking — Team Photo Day",
        "desc": "The whole SC Viking squad posing for a team photo after training!",
        "tags": ["team photo", "squad", "team spirit"],
    },
    "sc-viking-team-huddle-after-match.MOV": {
        "title": "SC Viking — Team Huddle After Match",
        "desc": "Young Vikings celebrating together after the match — team spirit!",
        "tags": ["team huddle", "celebration", "team spirit", "after match"],
    },
    "sc-viking-outdoor-training-with-cones.MP4": {
        "title": "SC Viking — Outdoor Training with Cones",
        "desc": "Agility and coordination drills with cones at outdoor training.",
        "tags": ["training", "outdoor", "cones", "agility", "drill"],
    },
    "sc-viking-kids-watching-from-stands.MOV": {
        "title": "SC Viking — Watching from the Stands",
        "desc": "SC Viking players watching from the stands at the tournament.",
        "tags": ["tournament", "stands", "team spirit"],
    },
    "sc-viking-outdoor-match-highlight-1.MOV": {
        "title": "SC Viking — Outdoor Match Highlight",
        "desc": "Match highlight from SC Viking outdoor game on the big pitch.",
        "tags": ["outdoor", "match", "highlight", "big pitch"],
    },
    "sc-viking-outdoor-match-highlight-2.MOV": {
        "title": "SC Viking — Outdoor Game Action",
        "desc": "Action clip from SC Viking outdoor match.",
        "tags": ["outdoor", "match", "action", "highlights"],
    },
    "sc-viking-ceremony-ukrainian-flag.mp4": {
        "title": "SC Viking — Ceremony with Ukrainian Flag",
        "desc": "SC Viking kids lined up with the Ukrainian flag at a special ceremony.",
        "tags": ["ceremony", "Ukrainian flag", "Ukraine", "team", "pride"],
    },
}

# Skip this one — 19 min, needs channel verification for >15 min
SKIP = {"sc-viking-outdoor-match-full-game.MOV"}


def make_description(desc_line):
    return f"""{desc_line}

SC Viking — children's football club in Bucharest, Romania.
Training for kids aged 4-14 | UEFA C licensed coach

🌐 {SITE_URL}
📩 scvikingur@gmail.com

#SCViking #YouthFootball #KidsFootball #Bucharest #FootballAcademy"""


def upload_one(yt, filepath, meta):
    body = {
        "snippet": {
            "title": meta["title"],
            "description": make_description(meta["desc"]),
            "tags": BASE_TAGS + meta["tags"],
            "categoryId": "17",  # Sports
        },
        "status": {
            "privacyStatus": "public",
            "selfDeclaredMadeForKids": False,
        },
    }

    media = MediaFileUpload(
        str(filepath),
        mimetype="video/*",
        resumable=True,
        chunksize=10 * 1024 * 1024,
    )

    request = yt.videos().insert(part="snippet,status", body=body, media_body=media)

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            pct = int(status.progress() * 100)
            print(f"    {pct}%", end=" ", flush=True)

    return response["id"]


def main():
    yt = build("youtube", "v3", credentials=get_credentials())

    uploaded = []
    failed = []

    for filename, meta in VIDEOS_TO_UPLOAD.items():
        if filename in SKIP:
            print(f"SKIP (>15 min): {filename}")
            continue

        filepath = MEDIA_DIR / filename
        if not filepath.exists():
            print(f"NOT FOUND: {filepath}")
            failed.append((filename, "file not found"))
            continue

        print(f"\nUploading: {meta['title']}")
        print(f"  File: {filename} ({filepath.stat().st_size // (1024*1024)}MB)")

        try:
            video_id = upload_one(yt, filepath, meta)
            print(f"\n  OK! https://youtube.com/watch?v={video_id}")
            uploaded.append((filename, video_id, meta["title"]))
            # Small delay to avoid rate limits
            time.sleep(2)
        except HttpError as e:
            print(f"\n  FAILED: {e}")
            failed.append((filename, str(e)))
            if "uploadLimitExceeded" in str(e) or "quotaExceeded" in str(e):
                print("\n!!! Upload limit reached — stopping !!!")
                break

    print(f"\n{'='*60}")
    print(f"Uploaded: {len(uploaded)}")
    for name, vid, title in uploaded:
        print(f"  {vid} | {title}")

    if failed:
        print(f"\nFailed: {len(failed)}")
        for name, err in failed:
            print(f"  {name}: {err[:80]}")


if __name__ == "__main__":
    main()