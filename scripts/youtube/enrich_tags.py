#!/usr/bin/env python3
"""Enrich YouTube video tags using SEO keyword ontology.

Fetches current snippets, merges context-appropriate tags from the ontology,
respects the 500-char / ~30 tag YouTube limit, updates via API.

Usage:
    python enrich_tags.py          # dry-run — show what would change
    python enrich_tags.py --apply  # actually update via YouTube API
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from auth import get_credentials
from googleapiclient.discovery import build

CHANNEL_ID = "UCD5ho8RpSJ8vccMVvprGpwQ"
MAX_TAG_CHARS = 475  # YouTube real limit is stricter than documented 500

# ── Base tags for ALL videos ────────────────────────────────────────────────

BRAND_TAGS = [
    "SC Viking",
    "SC Viking Bucharest",
    "SC Viking București",
    "SC Viking fotbal club",
    "scvb2021",
]

LOCATION_TAGS = [
    "Bucharest",
    "București",
    "Romania",
]

# Core multilingual tags — every video gets these
CORE_TAGS = {
    "en": ["kids football", "youth football", "children football club Bucharest"],
    "ro": ["fotbal copii", "club fotbal copii București"],
    "ua": ["дитячий футбол", "футбол для дітей Бухарест", "українці в Бухаресті"],
    "ru": ["детский футбол Бухарест"],
}

# Diaspora tags (C6) — all videos
DIASPORA_TAGS = [
    "ukrainians Bucharest",
    "ucraineni în București",
    "українці Румунія",
]

# Trust tags (C3) — all videos
TRUST_TAGS = [
    "UEFA C",
    "football club",
    "fotbal copii program",
]

# ── Context-specific tags by video content type ─────────────────────────────

CONTEXT_TAGS = {
    "training": {
        "en": ["football training", "football drills", "football skills", "training session"],
        "ro": ["antrenament fotbal copii", "antrenament fotbal"],
        "ua": ["тренування", "футбольні навички"],
        "ru": ["тренировка футбол дети"],
    },
    "match": {
        "en": ["football match", "kids match", "match highlights"],
        "ro": ["meci fotbal copii"],
        "ua": ["матч", "гра"],
        "ru": ["матч детский футбол"],
    },
    "indoor": {
        "en": ["indoor football", "futsal", "dome"],
        "ro": ["fotbal indoor copii", "fotbal în sală"],
        "ua": ["футбол в залі", "манеж"],
        "ru": ["футбол в зале"],
    },
    "outdoor": {
        "en": ["outdoor football", "outdoor pitch"],
        "ro": ["fotbal pe teren"],
        "ua": ["футбол на полі"],
    },
    "tournament": {
        "en": ["football tournament", "youth tournament", "cup", "championship"],
        "ro": ["turneu fotbal copii", "campionat", "competiții fotbal copii"],
        "ua": ["турнір", "чемпіонат", "змагання"],
        "ru": ["турнир детский футбол"],
        "brand": ["AMFB", "Stelele Viitorului"],
    },
    "team_spirit": {
        "en": ["team spirit", "team building", "teamwork"],
        "ro": ["lucru în echipă", "spirit de echipă"],
        "ua": ["командний дух", "команда"],
        "ru": ["командный дух"],
    },
    "coaching": {
        "en": ["football coaching", "UEFA licensed coach", "professional coaching"],
        "ro": ["antrenor fotbal copii"],
        "ua": ["тренер з ліцензією UEFA", "тренер"],
        "ru": ["тренер с лицензией UEFA"],
    },
    "shorts": {
        "en": ["#shorts"],
    },
    "goal": {
        "en": ["goal", "goal moment", "scoring"],
        "ua": ["гол"],
        "ro": ["gol"],
    },
    "drone": {
        "en": ["drone view", "aerial", "drone football"],
    },
    "penalty": {
        "en": ["penalty shootout", "penalty kick", "goalkeeper save", "gold medal"],
        "ua": ["пенальті", "воротар"],
        "ro": ["lovituri de departajare"],
    },
    "ceremony": {
        "en": ["moment of silence", "respect", "solidarity"],
        "ua": ["хвилина мовчання", "солідарність"],
    },
}

# ── Map each video to its content contexts ──────────────────────────────────

VIDEO_CONTEXTS = {
    # Original 6
    "b7dCTjfvfmE": ["match", "outdoor"],
    "7fR598yhHEE": ["team_spirit", "match"],
    "H866o3xaaD8": ["tournament"],
    "EqWP39F4X9g": ["training"],
    "HGJVPO-lGwg": ["match", "indoor"],
    "z_sypUed8jQ": ["coaching", "training"],
    # Batch uploaded
    "Ns5ek9PI9JY": ["match", "outdoor", "drone"],
    "aba3jME0VTU": ["match", "outdoor", "tournament"],
    "JO6YakcAQzU": ["tournament", "goal"],
    "lWHSUdoaFnM": ["tournament", "match"],
    "R_Z0DxhNDxE": ["training", "outdoor"],
    "k-e4fuMrmuo": ["match", "indoor"],
    "dM2jFjd1JYw": ["match", "indoor"],
    "sv-WdtXpUM4": ["match", "indoor"],
    "ZF8oyTL2RcA": ["coaching", "match", "indoor"],
    "kT7xbgo0rSU": ["training", "indoor"],
    # Shorts
    "DRtdYMLNOR0": ["training", "shorts"],
    "ALYh1k5FMCQ": ["training", "shorts"],
    "YdEDcy-CscY": ["match", "outdoor", "shorts"],
    "YEBbgHFNCsA": ["tournament", "indoor", "shorts"],
    # Special videos
    "iOwEwk-vqZ0": ["tournament", "penalty", "match"],
    "hyB0p6DugBU": ["ceremony", "team_spirit", "shorts"],
}


def build_tags_for_video(video_id, existing_tags):
    """Build enriched tag list for a video."""
    contexts = VIDEO_CONTEXTS.get(video_id, [])

    # Start with brand + location
    tags = list(BRAND_TAGS) + list(LOCATION_TAGS)

    # Add core multilingual
    for lang_tags in CORE_TAGS.values():
        tags.extend(lang_tags)

    # Diaspora + trust
    tags.extend(DIASPORA_TAGS)
    tags.extend(TRUST_TAGS)

    # Context-specific tags
    for ctx in contexts:
        ctx_tags = CONTEXT_TAGS.get(ctx, {})
        for lang_tags in ctx_tags.values():
            tags.extend(lang_tags)

    # Keep unique existing tags that we haven't covered
    existing_lower = {t.lower(): t for t in existing_tags}
    new_lower = {t.lower() for t in tags}
    for low, orig in existing_lower.items():
        if low not in new_lower:
            tags.append(orig)

    # Deduplicate preserving order
    seen = set()
    unique = []
    for t in tags:
        key = t.lower()
        if key not in seen:
            seen.add(key)
            unique.append(t)

    # Trim to YouTube character limit
    result = []
    total_chars = 0
    for t in unique:
        # YouTube counts tag chars + commas
        addition = len(t) + (2 if result else 0)  # comma + space between tags
        if total_chars + addition > MAX_TAG_CHARS:
            break
        result.append(t)
        total_chars += addition

    return result


def main():
    dry_run = "--apply" not in sys.argv
    if dry_run:
        print("🔍 DRY RUN — показую зміни без оновлення. Додай --apply для застосування.\n")
    else:
        print("⚡ APPLYING — оновлюю теги на YouTube.\n")

    yt = build("youtube", "v3", credentials=get_credentials())

    # Fetch all channel videos
    resp = yt.search().list(
        channelId=CHANNEL_ID,
        part="snippet",
        type="video",
        maxResults=50,
        order="date",
    ).execute()

    video_ids = [item["id"]["videoId"] for item in resp.get("items", [])]

    # Get full details
    details = yt.videos().list(
        id=",".join(video_ids),
        part="snippet",
    ).execute()

    updated = 0
    for v in details.get("items", []):
        vid = v["id"]
        snippet = v["snippet"]
        title = snippet["title"]
        old_tags = snippet.get("tags", [])

        new_tags = build_tags_for_video(vid, old_tags)

        # Check if anything changed
        if set(t.lower() for t in old_tags) == set(t.lower() for t in new_tags):
            print(f"  SKIP {vid} — теги вже актуальні ({len(old_tags)} тегів)")
            continue

        added = set(t.lower() for t in new_tags) - set(t.lower() for t in old_tags)
        removed = set(t.lower() for t in old_tags) - set(t.lower() for t in new_tags)
        tag_chars = sum(len(t) for t in new_tags) + max(0, (len(new_tags) - 1) * 2)

        print(f"\n{'='*70}")
        print(f"  {vid} | {title[:55]}")
        print(f"  Було: {len(old_tags)} тегів → Стане: {len(new_tags)} тегів ({tag_chars} chars)")
        if added:
            print(f"  + Додано ({len(added)}): {', '.join(sorted(added)[:10])}{'...' if len(added) > 10 else ''}")
        if removed:
            print(f"  - Прибрано ({len(removed)}): {', '.join(sorted(removed))}")

        if not dry_run:
            snippet["tags"] = new_tags
            snippet["categoryId"] = snippet.get("categoryId", "17")
            snippet.pop("localized", None)
            snippet.pop("thumbnails", None)
            snippet.pop("publishedAt", None)
            snippet.pop("channelId", None)
            snippet.pop("channelTitle", None)
            snippet.pop("liveBroadcastContent", None)

            try:
                yt.videos().update(
                    part="snippet",
                    body={"id": vid, "snippet": snippet},
                ).execute()
                print(f"  ✓ Оновлено!")
                updated += 1
            except Exception as e:
                print(f"  ✗ Помилка: {e}")
        else:
            updated += 1

    print(f"\n{'='*70}")
    if dry_run:
        print(f"Буде оновлено: {updated}/{len(video_ids)} відео")
        print("Запусти з --apply щоб застосувати.")
    else:
        print(f"Оновлено: {updated}/{len(video_ids)} відео")


if __name__ == "__main__":
    main()