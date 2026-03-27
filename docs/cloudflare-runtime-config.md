# Cloudflare Runtime Config

This project is prepared so you can add real contact data later without changing the layout code again.

## Runtime pieces already prepared

- `GET /api/public-config`
- `POST /api/contact`
- header runtime phone/WhatsApp button support
- contact section runtime contact buttons
- Telegram-ready backend flow in the contact route

## Variables to add later

### Public contact variables

These are safe for public use:

- `NEXT_PUBLIC_CLUB_PHONE`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

Examples:

```text
NEXT_PUBLIC_CLUB_PHONE=+380991112233
NEXT_PUBLIC_WHATSAPP_NUMBER=380991112233
```

### Telegram variables

These should be added as secrets:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## Local development

Create a local `.dev.vars` file if needed.

Example:

```text
NEXT_PUBLIC_CLUB_PHONE=+380991112233
NEXT_PUBLIC_WHATSAPP_NUMBER=380991112233
TELEGRAM_BOT_TOKEN=123456:ABCDEF
TELEGRAM_CHAT_ID=-1001234567890
```

## Cloudflare commands

### Add Telegram secrets

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

### Add public vars in the Cloudflare dashboard

Worker:

- `sc-viking-site`

Then open:

- `Settings`
- `Variables and Secrets`

Add:

- `NEXT_PUBLIC_CLUB_PHONE`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

## Deploy after adding values

After changing variables, redeploy:

```bash
npm run deploy
```

## Files involved

- `lib/runtime-config.js`
- `app/api/public-config/route.js`
- `app/api/contact/route.js`
- `components/site-header.jsx`
- `components/contact-actions.jsx`
