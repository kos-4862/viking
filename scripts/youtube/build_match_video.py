#!/usr/bin/env python3
"""
Build polished SC Viking match highlight video.

Features:
- Branded intro with tournament name
- Cross-fade transitions between clips
- Speed up 1.2x (20% faster)
- Branded lower-third overlay
- Background music
- Outro with end screen space
- Optimized quality/size (CRF 26, maxrate 5M)
"""

import subprocess
import sys
import os
import tempfile
import shutil
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))

from video_pipeline import LOGO_PATH, ACCENT_COLOR, BG_COLOR, get_duration, run_ffmpeg

# Target: 16:9 horizontal
WIDTH = 1920
HEIGHT = 1080
FPS = 30
SPEED = 1.2  # 20% faster

ENCODE = [
    "-c:v", "libx264", "-preset", "medium", "-crf", "26",
    "-maxrate", "5M", "-bufsize", "10M",
    "-pix_fmt", "yuv420p", "-r", str(FPS),
]


def generate_match_intro(output, title, subtitle, duration=4):
    """Cinematic intro for match video."""
    run_ffmpeg([
        "-f", "lavfi", "-i", f"color=c=0x{BG_COLOR[2:]}:s={WIDTH}x{HEIGHT}:d={duration}",
        "-i", str(LOGO_PATH),
        "-filter_complex",
        # Logo centered, proper aspect ratio
        f"[1:v]scale=200:-1[logo];"
        f"[0:v][logo]overlay=(W-w)/2:(H-h)/2-120:enable='gte(t,0.3)',"
        f"fade=in:st=0:d=1,fade=out:st={duration-0.8}:d=0.8,"
        # Red accent line
        f"drawbox=x=(w/2-150):y=(h/2)+20:w=300:h=3:"
        f"color=0x{ACCENT_COLOR[2:]}:t=fill:enable='gte(t,0.5)',"
        # Title
        f"drawtext=text='{title}':fontsize=64:fontcolor=white:"
        f"x=(w-text_w)/2:y=(h/2)+50:font='DejaVu Sans':enable='gte(t,0.6)',"
        # Subtitle
        f"drawtext=text='{subtitle}':fontsize=30:fontcolor=white@0.6:"
        f"x=(w-text_w)/2:y=(h/2)+130:font='DejaVu Sans':enable='gte(t,0.9)',"
        # Bottom accent
        f"drawbox=x=0:y={HEIGHT-4}:w={WIDTH}:h=4:"
        f"color=0x{ACCENT_COLOR[2:]}:t=fill",
        "-t", str(duration),
        *ENCODE,
        str(output),
    ], "Generating match intro")


def generate_title_card(output, text, duration=2):
    """Title card between clips (e.g., 'MATCH 1', 'MATCH 2')."""
    run_ffmpeg([
        "-f", "lavfi", "-i", f"color=c=0x{BG_COLOR[2:]}:s={WIDTH}x{HEIGHT}:d={duration}",
        "-filter_complex",
        f"[0:v]fade=in:st=0:d=0.4,fade=out:st={duration-0.4}:d=0.4,"
        # Red line
        f"drawbox=x=(w/2-80):y=(h/2)-5:w=160:h=3:"
        f"color=0x{ACCENT_COLOR[2:]}:t=fill,"
        # Text
        f"drawtext=text='{text}':fontsize=48:fontcolor=white:"
        f"x=(w-text_w)/2:y=(h/2)+20:font='DejaVu Sans'",
        "-t", str(duration),
        *ENCODE,
        str(output),
    ], f"Title card: {text}")


def generate_match_outro(output, duration=8):
    """Outro with end screen space."""
    run_ffmpeg([
        "-f", "lavfi", "-i", f"color=c=0x{BG_COLOR[2:]}:s={WIDTH}x{HEIGHT}:d={duration}",
        "-i", str(LOGO_PATH),
        "-filter_complex",
        f"[1:v]scale=120:-1[logo];"
        f"[0:v][logo]overlay=80:(H-h)/2-30,"
        f"fade=in:st=0:d=0.5,fade=out:st={duration-0.5}:d=0.5,"
        # SC VIKING
        f"drawtext=text='SC VIKING':fontsize=48:fontcolor=white:"
        f"x=240:y=(h/2)-40:font='DejaVu Sans':enable='gte(t,0.3)',"
        # Subscribe
        f"drawtext=text='SUBSCRIBE':fontsize=36:fontcolor=0x{ACCENT_COLOR[2:]}:"
        f"x=240:y=(h/2)+25:font='DejaVu Sans':enable='gte(t,0.6)',"
        # Website
        f"drawtext=text='scviking2021.com':fontsize=22:fontcolor=white@0.5:"
        f"x=240:y=(h/2)+75:font='DejaVu Sans':enable='gte(t,0.9)',"
        # Right side empty for YouTube end screen elements
        f"drawtext=text='MORE VIDEOS →':fontsize=20:fontcolor=white@0.3:"
        f"x=1400:y=(h/2)+75:font='DejaVu Sans':enable='gte(t,1.5)',"
        # Top + bottom accent
        f"drawbox=x=0:y=0:w={WIDTH}:h=3:color=0x{ACCENT_COLOR[2:]}:t=fill,"
        f"drawbox=x=0:y={HEIGHT-3}:w={WIDTH}:h=3:color=0x{ACCENT_COLOR[2:]}:t=fill",
        "-t", str(duration),
        *ENCODE,
        str(output),
    ], "Generating outro")


def process_clip(input_path, output, clip_num, speed=SPEED):
    """Process a single match clip: scale, speed up, add branding overlay."""
    dur = get_duration(input_path)
    new_dur = dur / speed

    run_ffmpeg([
        "-i", str(input_path),
        "-i", str(LOGO_PATH),
        "-filter_complex",
        # Scale to 1920x1080
        f"[0:v]scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=decrease,"
        f"pad={WIDTH}:{HEIGHT}:-1:-1:color=0x{BG_COLOR[2:]},"
        # Speed up
        f"setpts={1/speed}*PTS,"
        # Fade in/out
        f"fade=in:st=0:d=0.5,fade=out:st={new_dur-0.5}:d=0.5[main];"
        # Logo watermark top-right (proper aspect ratio)
        f"[1:v]scale=50:-1,format=rgba,colorchannelmixer=aa=0.3[wm];"
        f"[main][wm]overlay=W-w-20:15,"
        # Lower third: SC VIKING badge
        f"drawbox=x=0:y={HEIGHT-50}:w={WIDTH}:h=50:color=black@0.5:t=fill,"
        f"drawbox=x=0:y={HEIGHT-50}:w={WIDTH}:h=2:color=0x{ACCENT_COLOR[2:]}@0.6:t=fill,"
        f"drawtext=text='SC VIKING':fontsize=18:fontcolor=white@0.8:"
        f"x=20:y={HEIGHT-38}:font='DejaVu Sans',"
        # Match counter
        f"drawtext=text='MATCH DAY {clip_num}':fontsize=18:fontcolor=0x{ACCENT_COLOR[2:]}:"
        f"x={WIDTH-120}:y={HEIGHT-38}:font='DejaVu Sans',"
        # Top accent line
        f"drawbox=x=0:y=0:w={WIDTH}:h=2:color=0x{ACCENT_COLOR[2:]}@0.5:t=fill",
        "-an",  # Remove audio (will add music later)
        *ENCODE,
        str(output),
    ], f"Processing clip {clip_num}: {Path(input_path).name} ({dur:.0f}s → {new_dur:.0f}s)")


def add_music(input_path, output, music_path, volume=0.5):
    """Add background music to the full video."""
    import random
    vid_dur = get_duration(input_path)
    music_dur = get_duration(str(music_path))

    # Random start
    music_start = 0
    if music_dur > vid_dur + 10:
        music_start = random.randint(3, int(music_dur - vid_dur - 3))

    music_ss = ["-ss", str(music_start)] if music_start > 0 else []

    fade_out_start = max(0, vid_dur - 3)
    run_ffmpeg([
        "-i", str(input_path),
        *music_ss, "-stream_loop", "-1", "-i", str(music_path),
        "-filter_complex",
        f"[1:a]volume={volume},afade=in:st=0:d=2,"
        f"afade=out:st={fade_out_start}:d=3[aout]",
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
        "-t", str(vid_dur), "-shortest",
        str(output),
    ], "Adding background music")


def build_match_video(clips, output_path, title, subtitle, music_path=None):
    """Build complete match highlight video."""
    tmpdir = Path(tempfile.mkdtemp(prefix="viking_match_"))

    print(f"\n{'='*60}")
    print(f"SC Viking Match Video Builder")
    print(f"  Title: {title}")
    print(f"  Subtitle: {subtitle}")
    print(f"  Clips: {len(clips)}")
    print(f"  Speed: {SPEED}x (20% faster)")
    print(f"{'='*60}\n")

    parts = []

    # 1. Intro
    intro = tmpdir / "intro.mp4"
    generate_match_intro(intro, title, subtitle)
    parts.append(intro)

    # 2. Process each clip with title cards between them
    for i, clip in enumerate(clips):
        # Title card before each match (except first)
        if i > 0:
            card = tmpdir / f"card_{i}.mp4"
            generate_title_card(card, f"MATCH DAY {i + 1}")
            parts.append(card)

        processed = tmpdir / f"clip_{i}.mp4"
        process_clip(clip, processed, i + 1)
        parts.append(processed)

    # 3. Outro
    outro = tmpdir / "outro.mp4"
    generate_match_outro(outro)
    parts.append(outro)

    # 4. Concat all
    concat_list = tmpdir / "concat.txt"
    with open(concat_list, "w") as f:
        for p in parts:
            f.write(f"file '{p}'\n")

    concat_out = tmpdir / "concat.mp4"
    run_ffmpeg([
        "-f", "concat", "-safe", "0", "-i", str(concat_list),
        *ENCODE,
        str(concat_out),
    ], "Concatenating all parts")

    # 5. Add music
    if music_path and Path(music_path).exists():
        add_music(str(concat_out), output_path, music_path)
    else:
        # Try to find epic music
        from video_pipeline import find_music
        epic = find_music("epic")
        if epic:
            add_music(str(concat_out), output_path, str(epic))
        else:
            shutil.copy2(str(concat_out), output_path)

    # Cleanup
    shutil.rmtree(tmpdir)

    final_dur = get_duration(output_path)
    size_mb = os.path.getsize(output_path) / (1024 * 1024)

    print(f"\n{'='*60}")
    print(f"Done! {output_path}")
    print(f"  Duration: {final_dur:.1f}s")
    print(f"  Size: {size_mb:.1f}MB")
    print(f"  Quality: CRF 26 / maxrate 5Mbps")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    clips = [
        "media-archive/Video/sc-viking-indoor-match-vs-blue-team.MOV",
        "media-archive/Video/sc-viking-indoor-team-training.MOV",
        "media-archive/Video/sc-viking-indoor-match-vs-yellow.MOV",
        "media-archive/Video/sc-viking-indoor-training-drill.MOV",
    ]

    build_match_video(
        clips,
        "output/sc-viking-campionatul-amfb-dangelo.mp4",
        title="CAMPIONATUL D ANGELO",
        subtitle="AMFB Championship  ·  Bucharest",
    )