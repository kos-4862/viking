#!/usr/bin/env python3
"""Build SC Viking Penalty Shootout Victory video — Short + Regular."""

import subprocess
import sys
import os
import tempfile
import shutil
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))

from video_pipeline import LOGO_PATH, ACCENT_COLOR, BG_COLOR, get_duration, run_ffmpeg, find_music

MEDIA = Path(__file__).resolve().parent.parent.parent / "media-archive" / "Video" / "Penaly + Cup"
OUTPUT = Path(__file__).resolve().parent.parent.parent / "output"

BIG_VIDEO = MEDIA / "20240406_153154.mp4"
CELEBRATION = MEDIA / "VID_20240408_120007_814 (1).mp4"
TROPHY_PHOTO = MEDIA / "main-03.webp"

# Shorts format
SW, SH = 1080, 1920
# Regular format
RW, RH = 1920, 1080

FPS = 30
ENCODE_SHORT = ["-c:v", "libx264", "-preset", "medium", "-crf", "26",
                "-maxrate", "5M", "-bufsize", "8M", "-pix_fmt", "yuv420p", "-r", str(FPS)]
ENCODE_REG = ["-c:v", "libx264", "-preset", "medium", "-crf", "26",
              "-maxrate", "5M", "-bufsize", "10M", "-pix_fmt", "yuv420p", "-r", str(FPS)]


def make_title_card(output, text, subtext="", w=SW, h=SH, duration=2):
    """Dark title card with text."""
    fs = 56 if w >= 1080 else 48
    sfs = 24 if w >= 1080 else 20
    fc = (
        f"color=c=0x{BG_COLOR[2:]}:s={w}x{h}:d={duration},"
        f"format=yuv420p,"
        f"fade=in:st=0:d=0.3,fade=out:st={duration-0.3}:d=0.3,"
        f"drawbox=x=(w/2-80):y=(h/2)-10:w=160:h=3:color=0x{ACCENT_COLOR[2:]}:t=fill,"
        f"drawtext=text='{text}':fontsize={fs}:fontcolor=white:"
        f"x=(w-text_w)/2:y=(h/2)+15:font='DejaVu Sans'"
    )
    if subtext:
        fc += (
            f",drawtext=text='{subtext}':fontsize={sfs}:fontcolor=white@0.5:"
            f"x=(w-text_w)/2:y=(h/2)+75:font='DejaVu Sans'"
        )

    run_ffmpeg([
        "-f", "lavfi", "-i", f"color=c=black:s={w}x{h}:d={duration}",
        "-filter_complex", fc,
        "-t", str(duration),
        *(ENCODE_SHORT if w == SW else ENCODE_REG),
        str(output),
    ], f"Title: {text}")


def make_intro(output, w=SW, h=SH, duration=3):
    """Cinematic intro with logo."""
    run_ffmpeg([
        "-f", "lavfi", "-i", f"color=c=0x{BG_COLOR[2:]}:s={w}x{h}:d={duration}",
        "-i", str(LOGO_PATH),
        "-filter_complex",
        f"[1:v]scale=180:-1[logo];"
        f"[0:v][logo]overlay=(W-w)/2:(H-h)/2-140:enable='gte(t,0.3)',"
        f"fade=in:st=0:d=0.8,fade=out:st={duration-0.5}:d=0.5,"
        f"drawbox=x=(w/2-100):y=(h/2)+10:w=200:h=3:"
        f"color=0x{ACCENT_COLOR[2:]}:t=fill:enable='gte(t,0.4)',"
        f"drawtext=text='PENALTY SHOOTOUT':fontsize=52:fontcolor=white:"
        f"x=(w-text_w)/2:y=(h/2)+35:font='DejaVu Sans':enable='gte(t,0.5)',"
        f"drawtext=text='SC VIKING':fontsize=28:fontcolor=0x{ACCENT_COLOR[2:]}:"
        f"x=(w-text_w)/2:y=(h/2)+100:font='DejaVu Sans':enable='gte(t,0.8)'",
        "-t", str(duration),
        *(ENCODE_SHORT if w == SW else ENCODE_REG),
        str(output),
    ], "Generating penalty intro")


def make_outro(output, w=SW, h=SH, duration=3):
    """Outro."""
    run_ffmpeg([
        "-f", "lavfi", "-i", f"color=c=0x{BG_COLOR[2:]}:s={w}x{h}:d={duration}",
        "-i", str(LOGO_PATH),
        "-filter_complex",
        f"[1:v]scale=100:-1[logo];"
        f"[0:v][logo]overlay=(W-w)/2:(H-h)/2-80,"
        f"fade=in:st=0:d=0.3,fade=out:st={duration-0.3}:d=0.3,"
        f"drawtext=text='CHAMPIONS':fontsize=44:fontcolor=0x{ACCENT_COLOR[2:]}:"
        f"x=(w-text_w)/2:y=(h/2)+40:font='DejaVu Sans',"
        f"drawtext=text='scviking2021.com':fontsize=20:fontcolor=white@0.5:"
        f"x=(w-text_w)/2:y=(h/2)+95:font='DejaVu Sans'",
        "-t", str(duration),
        *(ENCODE_SHORT if w == SW else ENCODE_REG),
        str(output),
    ], "Generating outro")


def cut_clip(src, output, start, duration, w, h, slow=False):
    """Cut and scale a clip. Optional slow motion (1.5x slower)."""
    out_duration = duration * 1.5 if slow else duration
    fade_out = max(0, out_duration - 0.4)
    speed_filter = ",setpts=1.5*PTS" if slow else ""

    run_ffmpeg([
        "-ss", str(start), "-i", str(src),
        "-t", str(duration),
        "-vf", f"fps={FPS},"
               f"scale={w}:{h}:force_original_aspect_ratio=decrease,"
               f"pad={w}:{h}:-1:-1:color=0x{BG_COLOR[2:]}"
               f"{speed_filter},"
               f"fade=in:st=0:d=0.3,fade=out:st={fade_out}:d=0.4",
        "-an",
        *(ENCODE_SHORT if w == SW else ENCODE_REG),
        "-vsync", "cfr",
        str(output),
    ], f"Cut {'slow-mo ' if slow else ''}{start}s +{duration}s → {out_duration:.0f}s")


def photo_to_video(photo, output, w, h, duration=4):
    """Convert photo to video with zoom-in effect."""
    run_ffmpeg([
        "-loop", "1", "-t", str(duration), "-i", str(photo),
        "-i", str(LOGO_PATH),
        "-filter_complex",
        f"[0:v]scale={w*2}:{h*2}:force_original_aspect_ratio=decrease,"
        f"zoompan=z='1.0+0.1*on/({duration}*30)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
        f"d={duration*30}:s={w}x{h}:fps=30,"
        f"fade=in:st=0:d=0.5,fade=out:st={duration-0.5}:d=0.5[main];"
        f"[1:v]scale=60:-1,format=rgba,colorchannelmixer=aa=0.4[wm];"
        f"[main][wm]overlay=W-w-15:15,"
        f"drawtext=text='GOLD MEDAL':fontsize=36:fontcolor=0x{ACCENT_COLOR[2:]}:"
        f"x=(w-text_w)/2:y=h-80:font='DejaVu Sans':enable='gte(t,1)',"
        f"drawbox=x=0:y=0:w={w}:h=3:color=0x{ACCENT_COLOR[2:]}:t=fill,"
        f"drawbox=x=0:y={h-3}:w={w}:h=3:color=0x{ACCENT_COLOR[2:]}:t=fill",
        *(ENCODE_SHORT if w == SW else ENCODE_REG),
        str(output),
    ], "Photo → video with zoom")


def concat_with_music(parts, output, music_style="epic"):
    """Concat parts and add music."""
    tmpdir = Path(tempfile.mkdtemp(prefix="pen_"))

    # Concat list
    concat_file = tmpdir / "list.txt"
    with open(concat_file, "w") as f:
        for p in parts:
            f.write(f"file '{p}'\n")

    # Use filter_complex concat instead of demuxer — handles VFR correctly
    concat_out = tmpdir / "concat.mp4"
    inputs = []
    fc_inputs = []
    for i, p in enumerate(parts):
        inputs.extend(["-i", str(p)])
        fc_inputs.append(f"[{i}:v]fps={FPS},setpts=PTS-STARTPTS[v{i}]")

    fc = ";".join(fc_inputs)
    fc += ";" + "".join(f"[v{i}]" for i in range(len(parts)))
    fc += f"concat=n={len(parts)}:v=1:a=0[out]"

    run_ffmpeg([
        *inputs,
        "-filter_complex", fc,
        "-map", "[out]",
        "-c:v", "libx264", "-preset", "medium", "-crf", "26",
        "-pix_fmt", "yuv420p", "-r", str(FPS),
        str(concat_out),
    ], "Concatenating")

    # Add music
    music = find_music(music_style)
    if music:
        import random
        vid_dur = get_duration(str(concat_out))
        music_dur = get_duration(str(music))
        music_ss = random.randint(3, max(4, int(music_dur - vid_dur - 3))) if music_dur > vid_dur + 10 else 0
        fade_out = max(0, vid_dur - 2)

        run_ffmpeg([
            "-i", str(concat_out),
            "-ss", str(music_ss), "-stream_loop", "-1", "-i", str(music),
            "-filter_complex",
            f"[1:a]volume=0.55,afade=in:st=0:d=1.5,"
            f"afade=out:st={fade_out}:d=2[aout]",
            "-map", "0:v", "-map", "[aout]",
            "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
            "-t", str(vid_dur), "-shortest",
            str(output),
        ], "Adding epic music")
    else:
        shutil.copy2(str(concat_out), str(output))

    shutil.rmtree(tmpdir)


def build_short():
    """Build penalty shootout Short (max 56s)."""
    tmpdir = Path(tempfile.mkdtemp(prefix="pen_short_"))
    out = OUTPUT / "shorts" / "penalty-gold-medal.mp4"

    print(f"\n{'='*60}")
    print(f"Building PENALTY SHOOTOUT Short")
    print(f"{'='*60}\n")

    parts = []

    # 1. Short intro (1.5s)
    intro = tmpdir / "intro.mp4"
    make_intro(intro, SW, SH, 1.5)
    parts.append(intro)

    # 2. Our penalty — full: approach + kick + goal (~195-208s, 13s)
    kick1 = tmpdir / "kick1.mp4"
    cut_clip(BIG_VIDEO, kick1, 193, 15, SW, SH)
    parts.append(kick1)

    # 3. Their penalty — keeper saves! slow-mo (~215-228s, 10s → 15s)
    kick2 = tmpdir / "kick2.mp4"
    cut_clip(BIG_VIDEO, kick2, 215, 12, SW, SH, slow=True)
    parts.append(kick2)

    # 4. Everyone runs on field — pure emotion (small video, 10s)
    celeb = tmpdir / "celeb.mp4"
    cut_clip(CELEBRATION, celeb, 0, 10, SW, SH)
    parts.append(celeb)

    # 5. Trophy photo with zoom (3s)
    trophy = tmpdir / "trophy.mp4"
    photo_to_video(TROPHY_PHOTO, trophy, SW, SH, 3)
    parts.append(trophy)

    # 6. Outro (2s)
    outro = tmpdir / "outro.mp4"
    make_outro(outro, SW, SH, 2)
    parts.append(outro)

    # Concat using filter_complex
    inputs = []
    fc_parts = []
    for i, p in enumerate(parts):
        inputs.extend(["-i", str(p)])
        fc_parts.append(f"[{i}:v]fps={FPS},setpts=PTS-STARTPTS[v{i}]")

    fc = ";".join(fc_parts) + ";"
    fc += "".join(f"[v{i}]" for i in range(len(parts)))
    fc += f"concat=n={len(parts)}:v=1:a=0[out]"

    concat_out = tmpdir / "concat.mp4"
    run_ffmpeg([
        *inputs, "-filter_complex", fc,
        "-map", "[out]",
        "-c:v", "libx264", "-preset", "medium", "-crf", "26",
        "-pix_fmt", "yuv420p", "-r", str(FPS),
        str(concat_out),
    ], "Concatenating")

    # Add music
    import random
    music = find_music("celebration")
    if music:
        concat_dur = get_duration(str(concat_out))
        music_dur = get_duration(str(music))
        ms = random.randint(3, max(4, int(music_dur - concat_dur - 3))) if music_dur > concat_dur + 10 else 0
        fade_out = max(0, concat_dur - 2)
        run_ffmpeg([
            "-i", str(concat_out),
            "-ss", str(ms), "-stream_loop", "-1", "-i", str(music),
            "-filter_complex",
            f"[1:a]volume=0.55,afade=in:st=0:d=1.5,afade=out:st={fade_out}:d=2[aout]",
            "-map", "0:v", "-map", "[aout]",
            "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
            "-t", str(concat_dur), "-shortest",
            str(out),
        ], "Adding music")
    else:
        shutil.copy2(str(concat_out), str(out))

    shutil.rmtree(tmpdir)

    dur = get_duration(str(out))
    size = os.path.getsize(str(out)) / (1024 * 1024)
    warn = " ⚠️ >60s!" if dur > 60 else ""
    print(f"\n{'='*60}")
    print(f"SHORT Done! {out}")
    print(f"  Duration: {dur:.1f}s | Size: {size:.1f}MB{warn}")
    print(f"{'='*60}\n")


def build_regular():
    """Build regular penalty video (longer, 16:9)."""
    tmpdir = Path(tempfile.mkdtemp(prefix="pen_reg_"))
    out = OUTPUT / "sc-viking-penalty-shootout-gold.mp4"

    print(f"\n{'='*60}")
    print(f"Building PENALTY SHOOTOUT Regular Video (16:9)")
    print(f"{'='*60}\n")

    parts = []

    # 1. Intro (3s)
    intro = tmpdir / "intro.mp4"
    make_intro(intro, RW, RH, 3)
    parts.append(intro)

    # 2. Full penalty sequence (~180-242s = 62s of penalties)
    pens = tmpdir / "penalties.mp4"
    cut_clip(BIG_VIDEO, pens, 180, 58, RW, RH)
    parts.append(pens)

    # 3. "VICTORY!" title (2s)
    t1 = tmpdir / "victory.mp4"
    make_title_card(t1, "VICTORY!", "SC Viking wins the penalty shootout", RW, RH, 2)
    parts.append(t1)

    # 4. Celebration (full 18s)
    celeb = tmpdir / "celeb.mp4"
    cut_clip(CELEBRATION, celeb, 0, 18, RW, RH)
    parts.append(celeb)

    # 5. Trophy photo (5s)
    trophy = tmpdir / "trophy.mp4"
    photo_to_video(TROPHY_PHOTO, trophy, RW, RH, 5)
    parts.append(trophy)

    # 6. Outro (6s — end screen space)
    outro = tmpdir / "outro.mp4"
    make_outro(outro, RW, RH, 6)
    parts.append(outro)

    # Concat + music
    concat_with_music(parts, str(out), "celebration")

    shutil.rmtree(tmpdir)

    dur = get_duration(str(out))
    size = os.path.getsize(str(out)) / (1024 * 1024)
    print(f"\n{'='*60}")
    print(f"REGULAR Done! {out}")
    print(f"  Duration: {dur:.1f}s | Size: {size:.1f}MB")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    build_short()
    build_regular()