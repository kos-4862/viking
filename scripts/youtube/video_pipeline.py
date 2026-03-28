#!/usr/bin/env python3
"""
SC Viking Video Pipeline — automated video production for YouTube.

Usage:
  # Full reel from video(s):
  python video_pipeline.py reel video1.mp4 video2.MOV --music epic --title "Match Day"

  # Slideshow from photos:
  python video_pipeline.py slideshow photo1.jpg photo2.jpg --music chill --title "Training"

  # Add intro/outro/watermark to existing video:
  python video_pipeline.py brand video.mp4

  # Generate intro only:
  python video_pipeline.py intro --title "Match Day" --subtitle "AMFB Championship"

  # Upload to YouTube:
  python video_pipeline.py reel video.mp4 --upload --privacy public
"""

import argparse
import os
import subprocess
import sys
import tempfile
import shutil
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
ASSETS_DIR = SCRIPT_DIR / "assets"
MUSIC_DIR = SCRIPT_DIR / "music"
LOGO_PATH = ASSETS_DIR / "logo.png"
PROJECT_ROOT = SCRIPT_DIR.parent.parent

# Video settings
WIDTH = 1080
HEIGHT = 1920  # 9:16 for Shorts/Reels
FPS = 30
INTRO_DURATION = 3
OUTRO_DURATION = 4

# Colors (SC Viking brand)
BG_COLOR = "0x1a1a2e"
ACCENT_COLOR = "0xda1123"
TEXT_COLOR = "white"


def run_ffmpeg(args, desc=""):
    """Run ffmpeg command with error handling."""
    cmd = ["ffmpeg", "-y"] + args
    print(f"  {desc}..." if desc else f"  Running ffmpeg...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ERROR: {result.stderr[-500:]}")
        return False
    return True


def get_duration(path):
    """Get video duration in seconds."""
    result = subprocess.run(
        ["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
         "-of", "csv=p=0", str(path)],
        capture_output=True, text=True,
    )
    return float(result.stdout.strip()) if result.stdout.strip() else 0


def get_dimensions(path):
    """Get video width x height."""
    result = subprocess.run(
        ["ffprobe", "-v", "quiet", "-select_streams", "v",
         "-show_entries", "stream=width,height", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True,
    )
    parts = result.stdout.strip().split(",")
    return int(parts[0]), int(parts[1]) if len(parts) == 2 else (0, 0)


# ── Intro Generation ─────────────────────────────────────────────────────────

def generate_intro(output, title="SC VIKING", subtitle="", duration=INTRO_DURATION):
    """Generate branded intro: dark bg, logo fade-in, title."""
    # Build filter for text overlays
    text_filter = (
        f"color=c=#{BG_COLOR[2:]}:s={WIDTH}x{HEIGHT}:d={duration},"
        f"format=yuv420p[bg];"
        # Logo (centered, fade in)
        f"[1:v]scale=300:300[logo];"
        f"[bg][logo]overlay=(W-w)/2:(H-h)/2-200:enable='gte(t,0.3)',"
        # Fade in the whole thing
        f"fade=in:st=0:d=0.8,"
        f"fade=out:st={duration-0.5}:d=0.5,"
        # Title text
        f"drawtext=text='{title}':"
        f"fontsize=72:fontcolor=white:"
        f"x=(w-text_w)/2:y=(h/2)+80:"
        f"font='DejaVu Sans':enable='gte(t,0.5)',"
    )

    if subtitle:
        text_filter += (
            f"drawtext=text='{subtitle}':"
            f"fontsize=36:fontcolor=white@0.7:"
            f"x=(w-text_w)/2:y=(h/2)+170:"
            f"font='DejaVu Sans':enable='gte(t,0.8)',"
        )

    # Red accent line
    text_filter += (
        f"drawbox=x=(w/2-100):y=(h/2)+60:w=200:h=4:"
        f"color=#{ACCENT_COLOR[2:]}:t=fill:enable='gte(t,0.5)'"
    )

    return run_ffmpeg([
        "-f", "lavfi", "-i", f"color=c=black:s={WIDTH}x{HEIGHT}:d={duration}",
        "-i", str(LOGO_PATH),
        "-filter_complex", text_filter,
        "-t", str(duration),
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-pix_fmt", "yuv420p",
        str(output),
    ], "Generating intro")


# ── Outro Generation ─────────────────────────────────────────────────────────

def generate_outro(output, duration=OUTRO_DURATION):
    """Generate branded outro: logo, subscribe text, website."""
    text_filter = (
        f"color=c=#{BG_COLOR[2:]}:s={WIDTH}x{HEIGHT}:d={duration},"
        f"format=yuv420p[bg];"
        f"[1:v]scale=200:200[logo];"
        f"[bg][logo]overlay=(W-w)/2:(H-h)/2-250:enable='gte(t,0.3)',"
        f"fade=in:st=0:d=0.5,"
        f"fade=out:st={duration-0.5}:d=0.5,"
        # Subscribe
        f"drawtext=text='SUBSCRIBE':"
        f"fontsize=64:fontcolor=#{ACCENT_COLOR[2:]}:"
        f"x=(w-text_w)/2:y=(h/2):"
        f"font='DejaVu Sans':enable='gte(t,0.5)',"
        # Website
        f"drawtext=text='scviking2021.com':"
        f"fontsize=36:fontcolor=white@0.8:"
        f"x=(w-text_w)/2:y=(h/2)+100:"
        f"font='DejaVu Sans':enable='gte(t,0.8)',"
        # Email
        f"drawtext=text='scvikingur@gmail.com':"
        f"fontsize=28:fontcolor=white@0.5:"
        f"x=(w-text_w)/2:y=(h/2)+160:"
        f"font='DejaVu Sans':enable='gte(t,1.0)'"
    )

    return run_ffmpeg([
        "-f", "lavfi", "-i", f"color=c=black:s={WIDTH}x{HEIGHT}:d={duration}",
        "-i", str(LOGO_PATH),
        "-filter_complex", text_filter,
        "-t", str(duration),
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-pix_fmt", "yuv420p",
        str(output),
    ], "Generating outro")


# ── Slideshow from Photos ────────────────────────────────────────────────────

def generate_slideshow(photos, output, duration_per_photo=3):
    """Create slideshow from photos with Ken Burns effect."""
    if not photos:
        print("No photos provided!")
        return False

    total_dur = len(photos) * duration_per_photo
    inputs = []
    filter_parts = []

    for i, photo in enumerate(photos):
        inputs.extend(["-loop", "1", "-t", str(duration_per_photo), "-i", str(photo)])
        # Scale + crop to 1080x1920, slight zoom animation
        zoom_start = 1.0
        zoom_end = 1.08
        filter_parts.append(
            f"[{i}:v]scale={WIDTH*2}:{HEIGHT*2},"
            f"zoompan=z='if(eq(on,1),{zoom_start},{zoom_start}+(({zoom_end}-{zoom_start})*on/({duration_per_photo}*{FPS})))':"
            f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
            f"d={duration_per_photo * FPS}:s={WIDTH}x{HEIGHT}:fps={FPS},"
            f"fade=in:st=0:d=0.5,fade=out:st={duration_per_photo-0.5}:d=0.5,"
            f"setpts=PTS-STARTPTS[v{i}]"
        )

    # Concatenate
    concat_inputs = "".join(f"[v{i}]" for i in range(len(photos)))
    filter_parts.append(f"{concat_inputs}concat=n={len(photos)}:v=1:a=0[out]")

    return run_ffmpeg(
        inputs + [
            "-filter_complex", ";".join(filter_parts),
            "-map", "[out]",
            "-c:v", "libx264", "-preset", "fast", "-crf", "23",
            "-pix_fmt", "yuv420p",
            str(output),
        ],
        f"Creating slideshow from {len(photos)} photos"
    )


# ── Normalize Video to 9:16 ─────────────────────────────────────────────────

def normalize_video(input_path, output, target_w=WIDTH, target_h=HEIGHT):
    """Scale/pad any video to target dimensions (default 9:16 for Shorts)."""
    return run_ffmpeg([
        "-i", str(input_path),
        "-vf", (
            f"scale={target_w}:{target_h}:"
            f"force_original_aspect_ratio=decrease,"
            f"pad={target_w}:{target_h}:-1:-1:color=#{BG_COLOR[2:]},"
            f"setsar=1"
        ),
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-c:a", "aac", "-b:a", "128k",
        "-pix_fmt", "yuv420p",
        "-r", str(FPS),
        str(output),
    ], f"Normalizing {Path(input_path).name}")


# ── Add Watermark ────────────────────────────────────────────────────────────

def add_watermark(input_path, output, position="top-right", opacity=0.3):
    """Add SC Viking logo watermark."""
    pos_map = {
        "top-right": "W-w-30:30",
        "top-left": "30:30",
        "bottom-right": "W-w-30:H-h-30",
        "bottom-left": "30:H-h-30",
    }
    pos = pos_map.get(position, pos_map["top-right"])

    return run_ffmpeg([
        "-i", str(input_path),
        "-i", str(LOGO_PATH),
        "-filter_complex",
        f"[1:v]scale=80:80,format=rgba,colorchannelmixer=aa={opacity}[wm];"
        f"[0:v][wm]overlay={pos}",
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-c:a", "copy",
        "-pix_fmt", "yuv420p",
        str(output),
    ], "Adding watermark")


# ── Add Background Music ────────────────────────────────────────────────────

def add_music(input_path, output, music_path, volume=0.15):
    """Mix background music under video audio."""
    vid_duration = get_duration(input_path)

    return run_ffmpeg([
        "-i", str(input_path),
        "-stream_loop", "-1", "-i", str(music_path),
        "-filter_complex",
        f"[1:a]volume={volume},afade=in:st=0:d=2,"
        f"afade=out:st={vid_duration-2}:d=2[music];"
        f"[0:a]volume=1.0[orig];"
        f"[orig][music]amix=inputs=2:duration=first[aout]",
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
        "-t", str(vid_duration),
        str(output),
    ], "Adding background music")


def add_music_no_original(input_path, output, music_path, volume=0.5):
    """Add music to video that has no audio track."""
    vid_duration = get_duration(input_path)

    return run_ffmpeg([
        "-i", str(input_path),
        "-stream_loop", "-1", "-i", str(music_path),
        "-filter_complex",
        f"[1:a]volume={volume},afade=in:st=0:d=1,"
        f"afade=out:st={vid_duration-1.5}:d=1.5[aout]",
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
        "-t", str(vid_duration),
        "-shortest",
        str(output),
    ], "Adding music (no original audio)")


# ── Concatenate Videos ───────────────────────────────────────────────────────

def concat_videos(parts, output):
    """Concatenate video files using concat demuxer."""
    list_file = output.parent / "concat_list.txt"
    with open(list_file, "w") as f:
        for part in parts:
            f.write(f"file '{part}'\n")

    result = run_ffmpeg([
        "-f", "concat", "-safe", "0", "-i", str(list_file),
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-c:a", "aac", "-b:a", "192k",
        "-pix_fmt", "yuv420p",
        str(output),
    ], "Concatenating clips")

    list_file.unlink(missing_ok=True)
    return result


# ── Find Music ───────────────────────────────────────────────────────────────

def find_music(style="epic"):
    """Find a music file by style name."""
    for ext in ("mp3", "m4a", "wav", "ogg"):
        path = MUSIC_DIR / f"{style}.{ext}"
        if path.exists():
            return path

    # Fall back to any file in music dir
    files = list(MUSIC_DIR.glob("*.*"))
    if files:
        print(f"  Music '{style}' not found, using {files[0].name}")
        return files[0]

    return None


# ── Full Pipeline ────────────────────────────────────────────────────────────

def build_reel(
    input_files,
    output_path,
    title="SC VIKING",
    subtitle="",
    music_style=None,
    add_intro=True,
    add_outro=True,
    watermark=True,
    orientation="vertical",  # vertical (9:16) or horizontal (16:9)
):
    """Full pipeline: normalize → concat → intro/outro → watermark → music."""
    tmpdir = Path(tempfile.mkdtemp(prefix="viking_"))
    target_w = WIDTH if orientation == "vertical" else 1920
    target_h = HEIGHT if orientation == "vertical" else 1080

    print(f"\n{'='*60}")
    print(f"SC Viking Video Pipeline")
    print(f"  Output: {output_path}")
    print(f"  Format: {target_w}x{target_h} ({orientation})")
    print(f"  Clips: {len(input_files)}")
    print(f"{'='*60}\n")

    parts = []

    # 1. Generate intro
    if add_intro:
        intro_path = tmpdir / "intro.mp4"
        generate_intro(intro_path, title, subtitle)
        if orientation == "horizontal":
            intro_h = tmpdir / "intro_h.mp4"
            normalize_video(intro_path, intro_h, target_w, target_h)
            intro_path = intro_h
        parts.append(intro_path)

    # 2. Normalize each input clip
    for i, clip in enumerate(input_files):
        clip_path = Path(clip)
        if not clip_path.exists():
            print(f"  SKIP: {clip} not found")
            continue

        norm_path = tmpdir / f"clip_{i:03d}.mp4"
        normalize_video(clip_path, norm_path, target_w, target_h)
        parts.append(norm_path)

    # 3. Generate outro
    if add_outro:
        outro_path = tmpdir / "outro.mp4"
        generate_outro(outro_path)
        if orientation == "horizontal":
            outro_h = tmpdir / "outro_h.mp4"
            normalize_video(outro_path, outro_h, target_w, target_h)
            outro_path = outro_h
        parts.append(outro_path)

    if len(parts) < 2:
        print("Not enough clips to build reel!")
        return None

    # 4. Concatenate all parts
    concat_path = tmpdir / "concat.mp4"
    concat_videos(parts, concat_path)

    # 5. Add watermark
    if watermark:
        wm_path = tmpdir / "watermarked.mp4"
        add_watermark(concat_path, wm_path)
        current = wm_path
    else:
        current = concat_path

    # 6. Add music
    music_file = find_music(music_style) if music_style else None
    if music_file:
        final_path = Path(output_path)
        # Check if video has audio
        probe = subprocess.run(
            ["ffprobe", "-v", "quiet", "-select_streams", "a",
             "-show_entries", "stream=codec_type", "-of", "csv=p=0", str(current)],
            capture_output=True, text=True,
        )
        has_audio = bool(probe.stdout.strip())

        if has_audio:
            add_music(current, final_path, music_file)
        else:
            add_music_no_original(current, final_path, music_file)
    else:
        shutil.copy2(str(current), str(output_path))
        if music_style:
            print(f"\n  ⚠ No music file found for '{music_style}'")
            print(f"  Put music files in: {MUSIC_DIR}/")
            print(f"  Name them by style: epic.mp3, chill.mp3, energy.mp3, etc.")

    # Cleanup
    shutil.rmtree(tmpdir)

    duration = get_duration(output_path)
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"\n{'='*60}")
    print(f"Done! {output_path}")
    print(f"  Duration: {duration:.1f}s | Size: {size_mb:.1f}MB")
    print(f"{'='*60}\n")

    return output_path


def build_slideshow_reel(
    photos, output_path, title="SC VIKING", subtitle="",
    music_style="chill", duration_per_photo=3,
):
    """Build a reel from photos: slideshow + intro/outro + music."""
    tmpdir = Path(tempfile.mkdtemp(prefix="viking_"))

    print(f"\nBuilding slideshow from {len(photos)} photos...")

    # Generate slideshow
    slideshow_path = tmpdir / "slideshow.mp4"
    generate_slideshow(photos, slideshow_path, duration_per_photo)

    # Wrap with intro/outro/watermark/music
    result = build_reel(
        [slideshow_path], output_path,
        title=title, subtitle=subtitle,
        music_style=music_style,
    )

    shutil.rmtree(tmpdir, ignore_errors=True)
    return result


# ── CLI ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="SC Viking Video Pipeline",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Full reel from videos:
  %(prog)s reel match1.mp4 match2.mp4 --title "Match Day" --music epic

  # Slideshow from photos:
  %(prog)s slideshow photo1.jpg photo2.jpg --title "Training" --music chill

  # Just brand an existing video (intro + outro + watermark):
  %(prog)s brand video.mp4 --title "SC Viking"

  # Generate intro clip:
  %(prog)s intro --title "AMFB Cup" --subtitle "Round of 16"

Music files go in: scripts/youtube/music/
  Name by style: epic.mp3, chill.mp3, energy.mp3, motivational.mp3
        """,
    )
    sub = parser.add_subparsers(dest="command")

    # reel
    reel = sub.add_parser("reel", help="Build full reel from video clips")
    reel.add_argument("files", nargs="+", help="Input video files")
    reel.add_argument("--title", default="SC VIKING")
    reel.add_argument("--subtitle", default="")
    reel.add_argument("--music", default=None, help="Music style (epic, chill, energy)")
    reel.add_argument("--output", "-o", default=None)
    reel.add_argument("--no-intro", action="store_true")
    reel.add_argument("--no-outro", action="store_true")
    reel.add_argument("--no-watermark", action="store_true")
    reel.add_argument("--horizontal", action="store_true", help="16:9 instead of 9:16")
    reel.add_argument("--upload", action="store_true", help="Upload to YouTube after")
    reel.add_argument("--privacy", default="unlisted", choices=["public", "unlisted", "private"])

    # slideshow
    ss = sub.add_parser("slideshow", help="Build reel from photos")
    ss.add_argument("files", nargs="+", help="Photo files")
    ss.add_argument("--title", default="SC VIKING")
    ss.add_argument("--subtitle", default="")
    ss.add_argument("--music", default="chill")
    ss.add_argument("--duration", type=int, default=3, help="Seconds per photo")
    ss.add_argument("--output", "-o", default=None)

    # brand
    br = sub.add_parser("brand", help="Add intro/outro/watermark to existing video")
    br.add_argument("file", help="Input video")
    br.add_argument("--title", default="SC VIKING")
    br.add_argument("--subtitle", default="")
    br.add_argument("--output", "-o", default=None)

    # intro
    intro = sub.add_parser("intro", help="Generate intro clip only")
    intro.add_argument("--title", default="SC VIKING")
    intro.add_argument("--subtitle", default="")
    intro.add_argument("--output", "-o", default="intro.mp4")

    args = parser.parse_args()

    if args.command == "reel":
        output = args.output or f"sc-viking-reel-{Path(args.files[0]).stem}.mp4"
        result = build_reel(
            args.files, output,
            title=args.title, subtitle=args.subtitle,
            music_style=args.music,
            add_intro=not args.no_intro,
            add_outro=not args.no_outro,
            watermark=not args.no_watermark,
            orientation="horizontal" if args.horizontal else "vertical",
        )
        if result and args.upload:
            from yt_manager import upload_video
            upload_video(result, args.title, privacy=args.privacy)

    elif args.command == "slideshow":
        output = args.output or "sc-viking-slideshow.mp4"
        build_slideshow_reel(
            args.files, output,
            title=args.title, subtitle=args.subtitle,
            music_style=args.music, duration_per_photo=args.duration,
        )

    elif args.command == "brand":
        output = args.output or f"branded-{Path(args.file).name}"
        build_reel(
            [args.file], output,
            title=args.title, subtitle=args.subtitle,
        )

    elif args.command == "intro":
        generate_intro(Path(args.output), args.title, args.subtitle)
        print(f"Intro saved: {args.output}")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()