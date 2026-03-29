#!/usr/bin/env python3
"""Batch generate 20 different Shorts from media archive."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from shorts_pipeline import build_short

MEDIA = Path(__file__).resolve().parent.parent.parent / "media-archive" / "Video"
OUTPUT = Path(__file__).resolve().parent.parent.parent / "output" / "shorts"

# 20 different combinations: (source, type, title, output_name)
SHORTS = [
    # Single clips — different types
    ("sc-viking-indoor-match-vs-blue-team.MOV", "match", "VS BLUE TEAM", "01-vs-blue"),
    ("sc-viking-indoor-match-attack.MOV", "match", "ATTACK!", "02-attack"),
    ("sc-viking-indoor-match-vs-yellow.MOV", "match", "VS YELLOW", "03-vs-yellow"),
    ("sc-viking-indoor-match-action.MOV", "match", "INDOOR ACTION", "04-indoor-action"),
    ("sc-viking-indoor-team-training.MOV", "training", "TEAM TRAINING", "05-team-training"),
    ("sc-viking-indoor-training-drill.MOV", "training", "DRILL TIME", "06-drill"),
    ("sc-viking-tournament-goal-moment.mp4", "goal", "GOAL!", "07-goal-moment"),
    ("sc-viking-tournament-match-clip.mp4", "tournament", "TOURNAMENT", "08-tournament"),
    ("sc-viking-outdoor-match-drone-view.mp4", "match", "DRONE VIEW", "09-drone"),
    ("sc-viking-futsal-tournament.MOV", "tournament", "FUTSAL CUP", "10-futsal"),
    ("sc-viking-team-photo-indoor.MOV", "team", "THE SQUAD", "11-squad"),
    ("sc-viking-team-huddle-after-match.MOV", "team", "TEAM SPIRIT", "12-huddle"),
    ("sc-viking-ceremony-ukrainian-flag.mp4", "team", "UKRAINE", "13-ceremony"),
    ("sc-viking-outdoor-match-highlight-1.MOV", "match", "OUTDOOR MATCH", "14-outdoor-1"),
    ("sc-viking-outdoor-match-highlight-2.MOV", "match", "GAME ON", "15-outdoor-2"),
    ("sc-viking-outdoor-training-with-cones.MP4", "training", "AGILITY DRILL", "16-agility"),
    ("sc-viking-kids-watching-from-stands.MOV", "team", "TEAM SUPPORT", "17-stands"),
    ("sc-viking-indoor-match-with-coach.MOV", "training", "TIKI-TAKA", "18-tikitaka"),
    ("IMG_7877.MP4", "training", "FAST FEET", "19-fast-feet"),
    ("sc-viking-footballs-on-pitch-fair-play.MOV", "training", "GAME READY", "20-game-ready"),
]


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)

    total = len(SHORTS)
    done = 0
    failed = 0

    for source, vtype, title, name in SHORTS:
        src = MEDIA / source
        out = OUTPUT / f"{name}.mp4"

        if not src.exists():
            print(f"\n  SKIP: {source} not found")
            failed += 1
            continue

        print(f"\n{'='*50}")
        print(f"  [{done+1}/{total}] {name} — {title}")
        print(f"{'='*50}")

        try:
            build_short(
                str(src), str(out),
                title=title, video_type=vtype,
                add_intro=True, add_outro=True, music=True,
            )
            done += 1
        except Exception as e:
            print(f"  ERROR: {e}")
            failed += 1

    print(f"\n{'='*50}")
    print(f"BATCH DONE: {done}/{total} shorts generated")
    if failed:
        print(f"  Failed: {failed}")
    print(f"  Output: {OUTPUT}/")

    # Summary
    import os
    total_size = 0
    for f in sorted(OUTPUT.glob("*.mp4")):
        size = f.stat().st_size / (1024 * 1024)
        total_size += size
    print(f"  Total size: {total_size:.0f}MB")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()