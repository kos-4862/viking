# Telegram And WhatsApp Setup

## Recommended setup

- Use `Telegram` for form submissions from the site.
- Use `WhatsApp` as a direct chat button for parents.

Reason:

- Telegram is much easier for internal lead notifications.
- WhatsApp Cloud API is heavier to set up and is not needed for the first live version.
- A simple WhatsApp chat link is enough for fast parent contact.

## Telegram bot setup

### 1. Create a bot

1. Open Telegram.
2. Search for `@BotFather`.
3. Send `/newbot`.
4. Choose a bot name.
5. Choose a bot username ending with `bot`.
6. Save the `BOT_TOKEN` that BotFather returns.

### 2. Prepare the destination chat

Choose one destination:

- personal chat with the coach
- private group for incoming applications

Then:

1. Add the bot to that chat or group.
2. Send at least one message in that chat.

### 3. Get the chat ID

Open this URL in your browser:

```text
https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
```

Replace `YOUR_BOT_TOKEN` with the real token from BotFather.

In the JSON response find:

```json
"chat": {
  "id": 123456789
}
```

Important:

- personal chats usually have a positive `chat.id`
- groups usually have a negative `chat.id`

### 4. Send these values for integration

After setup, send me:

- `BOT_TOKEN`
- `CHAT_ID`

Then I will connect the site form to Telegram.

## WhatsApp setup

### Simple option

For the current version of the site, the best option is a direct WhatsApp chat button.

Format:

```text
https://wa.me/380XXXXXXXXX
```

Rules:

- use the number in international format
- no `+`
- no spaces
- no dashes

Example:

```text
https://wa.me/380991112233
```

### What I need from you

Send me:

- the WhatsApp number in international format

Then I will add:

- a WhatsApp button in the header
- a WhatsApp button in the contact section
- optional mobile sticky WhatsApp CTA

## Not recommended right now

`WhatsApp Cloud API` is possible, but it is heavier:

- Meta developer account
- WhatsApp Business Account
- business phone setup
- tokens and app configuration

For the current project stage, this is unnecessary overhead.

## Official references

- Telegram bot features: `https://core.telegram.org/bots/features`
- Telegram Bot API: `https://core.telegram.org/bots/api`
- Telegram chat IDs: `https://core.telegram.org/api/bots/ids`
- WhatsApp Cloud API collection: `https://www.postman.com/meta/whatsapp-business-platform/collection/wlk6lh4/whatsapp-cloud-api`
