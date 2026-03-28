#!/usr/bin/env python3
"""
Auto-Shorts — extract best moments from long videos.

Analyzes motion in video to find high-action segments (goals, attacks, celebrations),
then cuts them into branded Shorts ready for YouTube.

Usage:
  python auto_shorts.py media-archive/Video/sc-viking-outdoor-match-full-game.MOV
  python auto_shorts.py match.mp4 --count 5 --duration 30 --type match
  python auto_shorts.py match.mp4 --upload
"""

import argparse
import json
import subprocess
import sys
import tempfile
import shutil
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))


def get_duration(path):
    result = subprocess.run(
        ["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
         "-of", "csv=p=0", str(path)],
        capture_output=True, text=True,
    )
    return float(result.stdout.strip()) if result.stdout.strip() else 0


def analyze_motion(video_path, sample_interval=0.5):
    """Analyze motion using frame brightness variance (stdev).

    High stdev = high contrast = more action on screen.
    Uses ffmpeg showinfo filter at 1fps to keep analysis fast.
    Returns list of (timestamp, motion_score) tuples.
    """
    import re

    print(f"  Analyzing motion in {Path(video_path).name}...")
    duration = get_duration(video_path)

    # Extract frame stats at 1fps — stdev of luminance indicates action level
    print(f"  Sampling frames ({duration:.0f}s video)...")
    result = subprocess.run([
        "ffmpeg", "-i", str(video_path),
        "-vf", "fps=1,showinfo",
        "-f", "null", "-",
    ], capture_output=True, text=True, timeout=600)

    # Parse pts_time and stdev from showinfo output
    frames = []
    for line in result.stderr.split("\n"):
        time_match = re.search(r"pts_time:(\d+\.?\d*)", line)
        stdev_match = re.search(r"stdev:\[(\d+\.?\d+)", line)
        if time_match and stdev_match:
            t = float(time_match.group(1))
            stdev = float(stdev_match.group(1))
            frames.append((t, stdev))

    if len(frames) < 10:
        print(f"  Only {len(frames)} frames parsed, using evenly spaced")
        skip = int(duration * 0.1)
        return [(t, 0.5) for t in range(skip, int(duration) - skip, 30)]

    print(f"  Analyzed {len(frames)} frames")

    # Sliding window: score each 30s window by average stdev
    window_size = 30
    motion_windows = []

    for start in range(0, int(duration) - window_size, 5):
        end = start + window_size
        window_frames = [stdev for t, stdev in frames if start <= t < end]
        if window_frames:
            avg_stdev = sum(window_frames) / len(window_frames)
            motion_windows.append((start, avg_stdev))

    # Normalize scores to 0-1
    if motion_windows:
        max_score = max(s for _, s in motion_windows)
        min_score = min(s for _, s in motion_windows)
        score_range = max_score - min_score if max_score > min_score else 1
        motion_windows = [(t, (s - min_score) / score_range) for t, s in motion_windows]

    return motion_windows


def find_best_moments(motion_data, count=5, clip_duration=30, min_gap=20):
    """Select top N non-overlapping high-motion segments."""
    # Sort by activity score (descending)
    sorted_segments = sorted(motion_data, key=lambda x: x[1], reverse=True)

    selected = []
    for timestamp, score in sorted_segments:
        if len(selected) >= count:
            break

        # Check no overlap with already selected
        overlap = False
        for sel_time, _ in selected:
            if abs(timestamp - sel_time) < clip_duration + min_gap:
                overlap = True
                break

        if not overlap:
            selected.append((timestamp, score))

    # Sort by timestamp for chronological order
    selected.sort(key=lambda x: x[0])
    return selected


def cut_clip(video_path, start, duration, output):
    """Cut a clip from video at given timestamp."""
    subprocess.run([
        "ffmpeg", "-y",
        "-ss", str(max(0, start - 1)),  # seek 1s before for keyframe
        "-i", str(video_path),
        "-ss", "1",  # skip the 1s we added
        "-t", str(duration),
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-c:a", "aac", "-b:a", "128k",
        "-pix_fmt", "yuv420p",
        str(output),
    ], capture_output=True, timeout=120)


def format_time(seconds):
    """Format seconds as MM:SS."""
    m, s = divmod(int(seconds), 60)
    return f"{m:02d}:{s:02d}"


def main():
    parser = argparse.ArgumentParser(description="Auto-extract Shorts from long videos")
    parser.add_argument("video", help="Input video file")
    parser.add_argument("--count", type=int, default=5, help="Number of clips to extract")
    parser.add_argument("--duration", type=int, default=30, help="Clip duration in seconds")
    parser.add_argument("--type", default="highlight",
                        choices=["match", "goal", "highlight", "training"],
                        help="Content type for branding")
    parser.add_argument("--output-dir", "-o", default=None, help="Output directory")
    parser.add_argument("--no-brand", action="store_true", help="Skip intro/outro/watermark")
    parser.add_argument("--upload", action="store_true", help="Upload to YouTube")
    parser.add_argument("--preview", action="store_true", help="Just show timestamps, don't cut")

    args = parser.parse_args()
    video_path = Path(args.video)

    if not video_path.exists():
        print(f"File not found: {video_path}")
        return

    total_duration = get_duration(video_path)
    print(f"\n{'='*60}")
    print(f"Auto-Shorts: {video_path.name}")
    print(f"  Duration: {format_time(total_duration)} | Extracting {args.count} clips of {args.duration}s")
    print(f"{'='*60}\n")

    # Analyze
    motion_data = analyze_motion(str(video_path))
    moments = find_best_moments(motion_data, args.count, args.duration)

    if not moments:
        print("No good moments found!")
        return

    print(f"\n  Found {len(moments)} best moments:")
    for i, (ts, score) in enumerate(moments):
        print(f"    #{i+1}: {format_time(ts)} - {format_time(ts + args.duration)} (activity: {score:.2f})")

    if args.preview:
        return

    # Cut clips
    output_dir = Path(args.output_dir) if args.output_dir else Path(f"shorts-{video_path.stem}")
    output_dir.mkdir(exist_ok=True)

    clips = []
    for i, (ts, score) in enumerate(moments):
        clip_name = f"short-{i+1:02d}-{format_time(ts).replace(':', 'm')}s.mp4"
        clip_path = output_dir / clip_name

        print(f"\n  Cutting clip #{i+1}: {format_time(ts)}...")
        cut_clip(video_path, ts, args.duration, clip_path)

        if clip_path.exists():
            clips.append(clip_path)

    # Brand each clip (intro/outro/watermark/music)
    if not args.no_brand and clips:
        from video_pipeline import build_reel, music_for_type

        print(f"\n  Branding {len(clips)} clips...")
        music_style = music_for_type(args.type)
        branded = []

        for i, clip in enumerate(clips):
            branded_path = output_dir / f"branded-{clip.name}"
            build_reel(
                [str(clip)], str(branded_path),
                title="SC VIKING",
                subtitle=f"Highlight #{i+1}",
                music_style=music_style,
            )
            if branded_path.exists():
                branded.append(branded_path)

        clips = branded

    # Upload
    if args.upload and clips:
        from yt_manager import upload_video
        for clip in clips:
            print(f"\n  Uploading {clip.name}...")
            upload_video(
                str(clip),
                f"SC Viking — Highlight #{clips.index(clip)+1}",
                privacy="unlisted",
            )

    print(f"\n{'='*60}")
    print(f"Done! {len(clips)} shorts saved to: {output_dir}/")
    for clip in clips:
        size = clip.stat().st_size / (1024 * 1024)
        dur = get_duration(str(clip))
        print(f"  {clip.name} ({dur:.0f}s, {size:.1f}MB)")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()