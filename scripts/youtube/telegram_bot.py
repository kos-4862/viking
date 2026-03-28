#!/usr/bin/env python3
"""
SC Viking Telegram Bot — coach sends video, bot processes and uploads to YouTube.

Flow:
  1. Coach sends video to bot
  2. Bot asks: what type? (match/goal/training/tournament)
  3. Bot downloads video, runs pipeline (intro/outro/watermark/music)
  4. Bot uploads to YouTube
  5. Bot sends YouTube link back

Usage:
  python telegram_bot.py

Environment:
  TELEGRAM_BOT_TOKEN — from .dev.vars or env
  TELEGRAM_CHAT_ID — coach's chat ID (only this chat is allowed)
"""

import asyncio
import logging
import os
import sys
import tempfile
from pathlib import Path

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application, CommandHandler, MessageHandler, CallbackQueryHandler,
    ContextTypes, filters,
)

# Setup paths
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent
sys.path.insert(0, str(SCRIPT_DIR))

# Load .dev.vars if exists
dev_vars = PROJECT_ROOT / ".dev.vars"
if dev_vars.exists():
    for line in dev_vars.read_text().splitlines():
        if "=" in line and not line.startswith("#"):
            key, val = line.split("=", 1)
            os.environ.setdefault(key.strip(), val.strip())

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
ALLOWED_CHAT_ID = int(os.environ.get("TELEGRAM_CHAT_ID", "0"))
OUTPUT_DIR = PROJECT_ROOT / "output" / "bot"

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

# Video type buttons
VIDEO_TYPES = [
    ("⚽ Матч", "match"),
    ("🎯 Гол", "goal"),
    ("⚡ Тренування", "training"),
    ("🏆 Турнір", "tournament"),
    ("👥 Команда", "team"),
    ("🎬 Без обробки", "raw"),
]

# Pending videos: chat_id -> {file_id, file_name}
pending_videos = {}


def is_allowed(update: Update) -> bool:
    """Only allow the coach's chat."""
    return update.effective_chat.id == ALLOWED_CHAT_ID


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_allowed(update):
        await update.message.reply_text("⛔ Доступ тільки для тренера SC Viking.")
        return

    await update.message.reply_text(
        "👋 SC Viking Video Bot\n\n"
        "Відправ мені відео — я додам intro, outro, watermark, музику і залью на YouTube.\n\n"
        "Команди:\n"
        "/status — статус каналу\n"
        "/help — допомога"
    )


async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_allowed(update):
        return

    await update.message.reply_text(
        "📹 Як користуватись:\n\n"
        "1. Відправ відео (або кілька)\n"
        "2. Вибери тип (матч, гол, тренування...)\n"
        "3. Бот обробить і залиє на YouTube\n"
        "4. Отримаєш посилання\n\n"
        "💡 Тип визначає музику:\n"
        "⚽ Матч → epic\n"
        "🎯 Гол → epic\n"
        "⚡ Тренування → energy\n"
        "🏆 Турнір → energy\n"
        "👥 Команда → motivational\n"
        "🎬 Без обробки → upload як є"
    )


async def status(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_allowed(update):
        return

    try:
        from auth import get_credentials
        from googleapiclient.discovery import build

        yt = build("youtube", "v3", credentials=get_credentials())
        resp = yt.channels().list(part="statistics", mine=True).execute()
        stats = resp["items"][0]["statistics"]

        await update.message.reply_text(
            f"📊 SC Viking YouTube:\n"
            f"  Підписники: {stats.get('subscriberCount', '?')}\n"
            f"  Відео: {stats.get('videoCount', '?')}\n"
            f"  Перегляди: {stats.get('viewCount', '?')}"
        )
    except Exception as e:
        await update.message.reply_text(f"❌ Помилка: {e}")


async def handle_video(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle incoming video from coach."""
    if not is_allowed(update):
        return

    video = update.message.video or update.message.document
    if not video:
        return

    # Store pending video info
    file_name = getattr(video, "file_name", None) or f"video_{video.file_id[:8]}.mp4"
    pending_videos[update.effective_chat.id] = {
        "file_id": video.file_id,
        "file_name": file_name,
        "file_size": video.file_size or 0,
    }

    size_mb = (video.file_size or 0) / (1024 * 1024)

    # Show type selection keyboard
    keyboard = []
    row = []
    for label, callback in VIDEO_TYPES:
        row.append(InlineKeyboardButton(label, callback_data=f"type:{callback}"))
        if len(row) == 2:
            keyboard.append(row)
            row = []
    if row:
        keyboard.append(row)

    await update.message.reply_text(
        f"📹 Отримав: {file_name} ({size_mb:.1f}MB)\n\nЩо це за відео?",
        reply_markup=InlineKeyboardMarkup(keyboard),
    )


async def handle_type_selection(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Process video after type is selected."""
    query = update.callback_query
    await query.answer()

    chat_id = query.message.chat_id
    if chat_id not in pending_videos:
        await query.edit_message_text("❌ Відео не знайдено. Відправ ще раз.")
        return

    video_info = pending_videos.pop(chat_id)
    video_type = query.data.replace("type:", "")

    type_labels = dict(VIDEO_TYPES)
    type_label = next((l for l, v in VIDEO_TYPES if v == video_type), video_type)

    await query.edit_message_text(
        f"⏳ Обробляю: {video_info['file_name']}\n"
        f"Тип: {type_label}\n\n"
        f"Це може зайняти 1-3 хвилини..."
    )

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    try:
        # Download video from Telegram
        bot = context.bot
        file = await bot.get_file(video_info["file_id"])
        download_path = OUTPUT_DIR / video_info["file_name"]
        await file.download_to_drive(str(download_path))

        logger.info(f"Downloaded: {download_path} ({download_path.stat().st_size / 1024 / 1024:.1f}MB)")

        if video_type == "raw":
            # Upload without processing
            output_path = download_path
        else:
            # Run video pipeline
            from video_pipeline import build_reel, music_for_type

            output_path = OUTPUT_DIR / f"branded-{download_path.stem}.mp4"
            music = music_for_type(video_type)
            title_map = {
                "match": "MATCH DAY", "goal": "GOAL!",
                "training": "TRAINING", "tournament": "TOURNAMENT",
                "team": "SC VIKING",
            }
            title = title_map.get(video_type, "SC VIKING")

            build_reel(
                [str(download_path)], str(output_path),
                title=title,
                music_style=music,
            )

        # Upload to YouTube
        await query.edit_message_text(
            f"⬆️ Заливаю на YouTube...\n"
            f"Файл: {output_path.name}"
        )

        from yt_manager import upload_video
        yt_title = f"SC Viking — {type_label.split(' ', 1)[-1] if ' ' in type_label else type_label}"
        video_id = upload_video(
            str(output_path), yt_title,
            privacy="public",
        )

        url = f"https://youtube.com/watch?v={video_id}"
        await query.edit_message_text(
            f"✅ Готово!\n\n"
            f"📹 {yt_title}\n"
            f"🔗 {url}\n\n"
            f"Відправ ще відео!"
        )

        # Cleanup downloaded file
        download_path.unlink(missing_ok=True)
        if output_path != download_path:
            output_path.unlink(missing_ok=True)

    except Exception as e:
        logger.error(f"Error processing video: {e}", exc_info=True)
        error_msg = str(e)
        if "uploadLimitExceeded" in error_msg:
            await query.edit_message_text(
                f"⚠️ YouTube ліміт завантажень!\n"
                f"Відео збережено локально: {download_path}\n"
                f"Спробуй пізніше."
            )
        elif "exceeded the number" in error_msg:
            await query.edit_message_text(
                f"⚠️ YouTube ліміт!\n"
                f"Відео збережено: output/bot/{video_info['file_name']}\n"
                f"Спробуй завтра."
            )
        else:
            await query.edit_message_text(f"❌ Помилка: {error_msg[:200]}")


def main():
    if not BOT_TOKEN:
        print("ERROR: TELEGRAM_BOT_TOKEN not set!")
        print("Set it in .dev.vars or as environment variable")
        sys.exit(1)

    print(f"🤖 SC Viking Video Bot starting...")
    print(f"   Allowed chat: {ALLOWED_CHAT_ID}")
    print(f"   Output dir: {OUTPUT_DIR}")

    app = Application.builder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_cmd))
    app.add_handler(CommandHandler("status", status))
    app.add_handler(MessageHandler(filters.VIDEO | filters.Document.VIDEO, handle_video))
    app.add_handler(CallbackQueryHandler(handle_type_selection, pattern="^type:"))

    print("🟢 Bot is running! Press Ctrl+C to stop.")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()