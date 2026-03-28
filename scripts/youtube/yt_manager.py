"""YouTube channel manager — upload, update metadata, list videos."""

import argparse
import json
import os
import sys
from pathlib import Path

from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

from auth import get_credentials

CHANNEL_ID = "UCD5ho8RpSJ8vccMVvprGpwQ"


def get_youtube():
    """Build authenticated YouTube API client."""
    return build("youtube", "v3", credentials=get_credentials())


# ── List videos ──────────────────────────────────────────────────────────────

def list_videos(max_results=50):
    """List all videos on the channel."""
    yt = get_youtube()
    resp = yt.search().list(
        channelId=CHANNEL_ID,
        part="snippet",
        type="video",
        maxResults=max_results,
        order="date",
    ).execute()

    videos = []
    for item in resp.get("items", []):
        vid = {
            "id": item["id"]["videoId"],
            "title": item["snippet"]["title"],
            "published": item["snippet"]["publishedAt"],
            "description": item["snippet"]["description"][:100],
        }
        videos.append(vid)
        print(f"  {vid['id']} | {vid['title']} | {vid['published'][:10]}")

    return videos


# ── Update video metadata ───────────────────────────────────────────────────

def update_video(video_id, title=None, description=None, tags=None, category_id="17"):
    """Update video title, description, tags. Category 17 = Sports."""
    yt = get_youtube()

    # Get current snippet
    current = yt.videos().list(part="snippet", id=video_id).execute()
    if not current["items"]:
        print(f"Video {video_id} not found!")
        return

    snippet = current["items"][0]["snippet"]

    if title:
        snippet["title"] = title
    if description:
        snippet["description"] = description
    if tags:
        snippet["tags"] = tags
    snippet["categoryId"] = category_id

    yt.videos().update(
        part="snippet",
        body={"id": video_id, "snippet": snippet},
    ).execute()

    print(f"Updated: {video_id} -> {snippet['title']}")


# ── Upload video ─────────────────────────────────────────────────────────────

def upload_video(
    file_path,
    title,
    description="",
    tags=None,
    category_id="17",
    privacy="unlisted",
):
    """Upload a video to the channel."""
    yt = get_youtube()

    body = {
        "snippet": {
            "title": title,
            "description": description,
            "tags": tags or [],
            "categoryId": category_id,
        },
        "status": {
            "privacyStatus": privacy,  # public, unlisted, private
            "selfDeclaredMadeForKids": False,
        },
    }

    media = MediaFileUpload(
        file_path,
        mimetype="video/*",
        resumable=True,
        chunksize=10 * 1024 * 1024,  # 10MB chunks
    )

    request = yt.videos().insert(part="snippet,status", body=body, media_body=media)

    print(f"Uploading: {file_path}")
    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"  Progress: {int(status.progress() * 100)}%")

    video_id = response["id"]
    print(f"Upload complete! https://youtube.com/watch?v={video_id}")
    return video_id


# ── Update channel metadata ─────────────────────────────────────────────────

def update_channel(description=None, keywords=None):
    """Update channel description and keywords."""
    yt = get_youtube()

    current = yt.channels().list(part="brandingSettings", mine=True).execute()
    settings = current["items"][0]["brandingSettings"]

    if description:
        settings["channel"]["description"] = description
    if keywords:
        settings["channel"]["keywords"] = keywords

    yt.channels().update(
        part="brandingSettings",
        body={"id": current["items"][0]["id"], "brandingSettings": settings},
    ).execute()

    print("Channel updated!")


# ── CLI ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="SC Viking YouTube Manager")
    sub = parser.add_subparsers(dest="command")

    # list
    sub.add_parser("list", help="List channel videos")

    # update-video
    uv = sub.add_parser("update-video", help="Update video metadata")
    uv.add_argument("video_id")
    uv.add_argument("--title")
    uv.add_argument("--description")
    uv.add_argument("--tags", nargs="+")

    # upload
    up = sub.add_parser("upload", help="Upload a video")
    up.add_argument("file")
    up.add_argument("--title", required=True)
    up.add_argument("--description", default="")
    up.add_argument("--tags", nargs="+")
    up.add_argument("--privacy", default="unlisted", choices=["public", "unlisted", "private"])

    # update-channel
    uc = sub.add_parser("update-channel", help="Update channel metadata")
    uc.add_argument("--description")
    uc.add_argument("--keywords")

    args = parser.parse_args()

    if args.command == "list":
        list_videos()
    elif args.command == "update-video":
        update_video(args.video_id, args.title, args.description, args.tags)
    elif args.command == "upload":
        upload_video(args.file, args.title, args.description, args.tags, privacy=args.privacy)
    elif args.command == "update-channel":
        update_channel(args.description, args.keywords)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()