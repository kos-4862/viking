#!/usr/bin/env python3
"""
SC Viking Shorts Pipeline — create YouTube Shorts from any video.

Handles:
- Vertical video → keep as is, add branding overlay
- Horizontal video → blur background fill + centered video + branding
- Auto intro (1.5s) + outro (3s) optimized for Shorts
- Background music by type
- Max 58 seconds (YouTube Shorts limit is 60s)

Usage:
  python shorts_pipeline.py video.mp4 --type match --title "GOAL!"
  python shorts_pipeline.py video.mp4 --type training
  python shorts_pipeline.py video.mp4 --no-intro --no-outro
  python shorts_pipeline.py video.mp4 --upload
"""

import argparse
import os
import subprocess
import sys
import tempfile
import shutil
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))

from video_pipeline import (
    LOGO_PATH, ACCENT_COLOR, BG_COLOR,
    get_duration, get_dimensions, detect_orientation,
    find_music, music_for_type, run_ffmpeg,
)

WIDTH = 1080
HEIGHT = 1920
MAX_DURATION = 58  # YouTube Shorts limit is 60s, leave 2s margin
INTRO_DURATION = 1.5
OUTRO_DURATION = 2.5

# Tags optimized for Ukrainian community in Bucharest
SHORTS_TAGS = {
    "base": [
        "SC Viking", "youth football", "kids football", "Bucharest",
        "fotbal copii", "București", "дитячий футбол",
        "football academy", "Romania", "#shorts",
    ],
    "ukrainian_bucharest": [
        "українці Бухарест", "українці Румунія", "ukrainians Bucharest",
        "українська діаспора", "діаспора Румунія", "ucraineni București",
        "футбол для дітей Бухарест", "дитячий спорт Бухарест",
        "секція футболу Бухарест", "спорт для дітей Румунія",
    ],
    "match": [
        "football match", "kids match", "матч", "гол",
        "children football match", "meci fotbal copii",
    ],
    "goal": [
        "goal", "amazing goal", "kids goal", "гол", "best goals",
        "youth football goals", "goluri copii",
    ],
    "training": [
        "football training", "тренування", "drills",
        "antrenament fotbal", "football skills", "навички",
    ],
    "tournament": [
        "tournament", "турнір", "cup", "AMFB",
        "Stelele Viitorului", "turneu fotbal copii",
    ],
    "team": [
        "team spirit", "команда", "командний дух",
        "echipă fotbal copii", "team building",
    ],
}


def get_tags_for_type(video_type):
    """Get combined tags for video type."""
    tags = SHORTS_TAGS["base"].copy()
    tags.extend(SHORTS_TAGS["ukrainian_bucharest"])
    tags.extend(SHORTS_TAGS.get(video_type, []))
    return tags


def make_shorts_description(title, video_type):
    """Generate SEO description for Shorts."""
    type_desc = {
        "match": "Youth football match highlights from SC Viking Bucharest!",
        "goal": "Amazing goal by SC Viking young player!",
        "training": "Football training session at SC Viking Academy, Bucharest.",
        "tournament": "SC Viking competing at the tournament!",
        "team": "SC Viking team — together we are stronger!",
    }
    desc = type_desc.get(video_type, "SC Viking — children's football club in Bucharest.")

    return f"""{desc}

SC Viking — дитячий футбольний клуб у Бухаресті 🇷🇴⚽
Тренування для дітей 4-14 років | UEFA C ліцензований тренер

🌐 https://scviking2021.com/
📩 scvikingur@gmail.com

#SCViking #YouthFootball #KidsFootball #Bucharest #shorts
#футбол #дитячийфутбол #українціБухарест #fotbalcopii"""


def generate_shorts_intro(output, title="SC VIKING", duration=INTRO_DURATION):
    """Short intro for Shorts — just logo flash + title."""
    return run_ffmpeg([
        "-f", "lavfi", "-i", f"color=c=0x{BG_COLOR[2:]}:s={WIDTH}x{HEIGHT}:d={duration}",
        "-i", str(LOGO_PATH),
        "-filter_complex",
        f"[1:v]scale=200:200[logo];"
        f"[0:v][logo]overlay=(W-w)/2:(H-h)/2-150:enable='gte(t,0.1)',"
        f"fade=in:st=0:d=0.3,fade=out:st={duration-0.3}:d=0.3,"
        f"drawtext=text='{title}':fontsize=56:fontcolor=white:"
        f"x=(w-text_w)/2:y=(h/2)+80:font='DejaVu Sans':enable='gte(t,0.2)',"
        f"drawbox=x=(w/2-60):y=(h/2)+65:w=120:h=3:"
        f"color=0x{ACCENT_COLOR[2:]}:t=fill:enable='gte(t,0.2)'",
        "-t", str(duration),
        "-c:v", "libx264", "-preset", "fast", "-crf", "28",
        "-pix_fmt", "yuv420p",
        str(output),
    ], "Generating shorts intro")


def generate_shorts_outro(output, duration=OUTRO_DURATION):
    """Short outro — logo + subscribe + site."""
    return run_ffmpeg([
        "-f", "lavfi", "-i", f"color=c=0x{BG_COLOR[2:]}:s={WIDTH}x{HEIGHT}:d={duration}",
        "-i", str(LOGO_PATH),
        "-filter_complex",
        f"[1:v]scale=120:120[logo];"
        f"[0:v][logo]overlay=(W-w)/2:(H-h)/2-120,"
        f"fade=in:st=0:d=0.3,fade=out:st={duration-0.3}:d=0.3,"
        f"drawtext=text='SUBSCRIBE':fontsize=40:fontcolor=0x{ACCENT_COLOR[2:]}:"
        f"x=(w-text_w)/2:y=(h/2)+30:font='DejaVu Sans',"
        f"drawtext=text='scviking2021.com':fontsize=22:fontcolor=white@0.5:"
        f"x=(w-text_w)/2:y=(h/2)+85:font='DejaVu Sans'",
        "-t", str(duration),
        "-c:v", "libx264", "-preset", "fast", "-crf", "28",
        "-pix_fmt", "yuv420p",
        str(output),
    ], "Generating shorts outro")


def convert_to_vertical(input_path, output, title=""):
    """Convert any video to vertical 9:16 with full SC Viking branding.

    Branding elements:
    - Red accent lines top + bottom (club color)
    - Logo + SC VIKING top-left
    - Title bar at bottom with gradient
    - Website URL
    - For horizontal: blur background fill
    """
    w, h = get_dimensions(input_path)
    is_vertical = h > w if w > 0 and h > 0 else False

    # Common branding overlay (applied to both orientations)
    brand_overlay = (
        # Red accent line at very top
        f"drawbox=x=0:y=0:w=1080:h=4:color=0x{ACCENT_COLOR[2:]}:t=fill,"
        # Red accent line at very bottom
        f"drawbox=x=0:y=1916:w=1080:h=4:color=0x{ACCENT_COLOR[2:]}:t=fill,"
        # Red thin side lines
        f"drawbox=x=0:y=0:w=3:h=1920:color=0x{ACCENT_COLOR[2:]}@0.4:t=fill,"
        f"drawbox=x=1077:y=0:w=3:h=1920:color=0x{ACCENT_COLOR[2:]}@0.4:t=fill,"
    )

    # Title bar at bottom
    title_bar = (
        # Dark gradient bar at bottom
        f"drawbox=x=0:y=1750:w=1080:h=170:color=black@0.6:t=fill,"
        # Red accent line above title bar
        f"drawbox=x=0:y=1750:w=1080:h=3:color=0x{ACCENT_COLOR[2:]}@0.8:t=fill,"
    )

    if title:
        title_bar += (
            f"drawtext=text='{title}':fontsize=36:fontcolor=white:"
            f"x=(w-text_w)/2:y=1790:font='DejaVu Sans':borderw=2:bordercolor=black@0.3,"
        )

    title_bar += (
        f"drawtext=text='scviking2021.com':fontsize=18:fontcolor=white@0.5:"
        f"x=(w-text_w)/2:y=1845:font='DejaVu Sans',"
        # SC VIKING badge top-left with background
        f"drawbox=x=10:y=25:w=195:h=50:color=black@0.5:t=fill,"
        f"drawbox=x=10:y=25:w=195:h=3:color=0x{ACCENT_COLOR[2:]}:t=fill"
    )

    # Video encoding params — optimized for Shorts (small file size)
    encode_params = [
        "-c:v", "libx264", "-preset", "fast", "-crf", "28",
        "-maxrate", "4M", "-bufsize", "8M",
        "-c:a", "aac", "-b:a", "96k",
        "-pix_fmt", "yuv420p", "-r", "30",
    ]

    if is_vertical:
        return run_ffmpeg([
            "-i", str(input_path),
            "-i", str(LOGO_PATH),
            "-filter_complex",
            f"[0:v]scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=decrease,"
            f"pad={WIDTH}:{HEIGHT}:-1:-1:color=0x{BG_COLOR[2:]}[scaled];"
            f"[1:v]scale=48:-1[logo];"
            f"[scaled][logo]overlay=18:32,"
            f"{brand_overlay}"
            f"{title_bar},"
            f"drawtext=text='SC VIKING':fontsize=22:fontcolor=white@0.9:"
            f"x=68:y=38:font='DejaVu Sans'",
        ] + encode_params + [str(output)],
        "Processing vertical video")
    else:
        return run_ffmpeg([
            "-i", str(input_path),
            "-i", str(LOGO_PATH),
            "-filter_complex",
            # Blur background
            f"[0:v]scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=increase,"
            f"crop={WIDTH}:{HEIGHT},gblur=sigma=25,eq=brightness=-0.15[blurbg];"
            # Main video centered
            f"[0:v]scale={WIDTH}:-1:force_original_aspect_ratio=decrease[main];"
            f"[blurbg][main]overlay=(W-w)/2:(H-h)/2[composed];"
            # Logo
            f"[1:v]scale=48:-1[logo];"
            f"[composed][logo]overlay=18:32,"
            f"{brand_overlay}"
            f"{title_bar},"
            f"drawtext=text='SC VIKING':fontsize=22:fontcolor=white@0.9:"
            f"x=68:y=38:font='DejaVu Sans'",
        ] + encode_params + [str(output)],
        "Converting horizontal → vertical with blur")


def build_short(
    input_path, output_path, title="SC VIKING", video_type="match",
    add_intro=True, add_outro=True, music=True,
):
    """Full Shorts pipeline."""
    tmpdir = Path(tempfile.mkdtemp(prefix="viking_short_"))
    input_dur = get_duration(input_path)

    # Calculate max content duration
    intro_dur = INTRO_DURATION if add_intro else 0
    outro_dur = OUTRO_DURATION if add_outro else 0
    max_content = MAX_DURATION - intro_dur - outro_dur

    # Trim if needed
    content_dur = min(input_dur, max_content)

    print(f"\n{'='*50}")
    print(f"SC Viking Shorts Pipeline")
    print(f"  Input: {Path(input_path).name} ({input_dur:.1f}s)")
    print(f"  Type: {video_type}")
    print(f"  Max content: {max_content:.1f}s")
    print(f"{'='*50}\n")

    # 1. Convert to vertical with branding
    converted = tmpdir / "converted.mp4"
    type_titles = {
        "match": "MATCH HIGHLIGHTS", "goal": "GOAL!",
        "training": "TRAINING SESSION", "tournament": "TOURNAMENT",
        "team": "TEAM SPIRIT",
    }
    display_title = type_titles.get(video_type, title)
    convert_to_vertical(input_path, converted, title=display_title)

    # Trim to max duration
    if content_dur < input_dur:
        trimmed = tmpdir / "trimmed.mp4"
        run_ffmpeg([
            "-i", str(converted), "-t", str(content_dur),
            "-c", "copy", str(trimmed),
        ], f"Trimming to {content_dur:.0f}s")
        converted = trimmed

    # 2. Build parts list
    parts = []

    if add_intro:
        intro = tmpdir / "intro.mp4"
        generate_shorts_intro(intro, display_title)
        parts.append(intro)

    parts.append(converted)

    if add_outro:
        outro = tmpdir / "outro.mp4"
        generate_shorts_outro(outro)
        parts.append(outro)

    # 3. Concat
    if len(parts) > 1:
        concat_list = tmpdir / "concat.txt"
        with open(concat_list, "w") as f:
            for p in parts:
                f.write(f"file '{p}'\n")

        concat_out = tmpdir / "concat.mp4"
        run_ffmpeg([
            "-f", "concat", "-safe", "0", "-i", str(concat_list),
            "-c:v", "libx264", "-preset", "fast", "-crf", "28",
            "-c:a", "aac", "-b:a", "128k",
            "-pix_fmt", "yuv420p",
            str(concat_out),
        ], "Concatenating")
        current = concat_out
    else:
        current = converted

    # 4. Add music
    music_style = music_for_type(video_type) if music else None
    music_file = find_music(music_style) if music_style else None

    if music_file:
        final_dur = get_duration(str(current))
        music_out = Path(output_path)

        # Check for audio stream
        probe = subprocess.run(
            ["ffprobe", "-v", "quiet", "-select_streams", "a",
             "-show_entries", "stream=codec_type", "-of", "csv=p=0", str(current)],
            capture_output=True, text=True,
        )
        has_audio = bool(probe.stdout.strip())

        if has_audio:
            run_ffmpeg([
                "-i", str(current),
                "-stream_loop", "-1", "-i", str(music_file),
                "-filter_complex",
                f"[1:a]volume=0.15,afade=in:st=0:d=1,"
                f"afade=out:st={final_dur-1.5}:d=1.5[music];"
                f"[0:a]volume=1.0[orig];"
                f"[orig][music]amix=inputs=2:duration=first[aout]",
                "-map", "0:v", "-map", "[aout]",
                "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                "-t", str(final_dur),
                str(music_out),
            ], "Adding background music")
        else:
            run_ffmpeg([
                "-i", str(current),
                "-stream_loop", "-1", "-i", str(music_file),
                "-filter_complex",
                f"[1:a]volume=0.4,afade=in:st=0:d=0.5,"
                f"afade=out:st={final_dur-1}:d=1[aout]",
                "-map", "0:v", "-map", "[aout]",
                "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                "-t", str(final_dur), "-shortest",
                str(music_out),
            ], "Adding music (no original audio)")
    else:
        shutil.copy2(str(current), str(output_path))

    # Cleanup
    shutil.rmtree(tmpdir)

    final_dur = get_duration(output_path)
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"\n{'='*50}")
    print(f"Done! {output_path}")
    print(f"  Duration: {final_dur:.1f}s | Size: {size_mb:.1f}MB")
    if final_dur > 60:
        print(f"  ⚠️  WARNING: {final_dur:.0f}s > 60s limit!")
    print(f"{'='*50}\n")

    return output_path


def main():
    parser = argparse.ArgumentParser(description="SC Viking Shorts Pipeline")
    parser.add_argument("video", help="Input video file")
    parser.add_argument("--type", "-t", default="match",
                        choices=["match", "goal", "training", "tournament", "team"],
                        help="Video type (determines music + tags)")
    parser.add_argument("--title", default=None, help="Custom title")
    parser.add_argument("--output", "-o", default=None)
    parser.add_argument("--no-intro", action="store_true")
    parser.add_argument("--no-outro", action="store_true")
    parser.add_argument("--no-music", action="store_true")
    parser.add_argument("--upload", action="store_true", help="Upload to YouTube")
    parser.add_argument("--privacy", default="public", choices=["public", "unlisted", "private"])

    args = parser.parse_args()
    video = Path(args.video)

    if not video.exists():
        print(f"File not found: {video}")
        return

    output = args.output or f"short-{video.stem}.mp4"
    title = args.title or "SC VIKING"

    build_short(
        str(video), output,
        title=title, video_type=args.type,
        add_intro=not args.no_intro,
        add_outro=not args.no_outro,
        music=not args.no_music,
    )

    if args.upload:
        from yt_manager import upload_video

        yt_title = f"SC Viking — {title} #shorts"
        tags = get_tags_for_type(args.type)
        description = make_shorts_description(title, args.type)

        video_id = upload_video(
            output, yt_title, description, tags,
            privacy=args.privacy,
        )
        print(f"Uploaded: https://youtube.com/shorts/{video_id}")


if __name__ == "__main__":
    main()