import { NextResponse } from "next/server";
import { getTelegramRuntimeConfig } from "@/lib/runtime-config";
import { getSiteCopy } from "@/lib/site-copy";



const NOTIFY_EMAIL = "scvikingur@gmail.com";

async function sendEmail({ name, phone, age }) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "SC Viking <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      subject: `Нова заявка від ${name}`,
      text: [
        "SC Viking — нова заявка з сайту",
        "",
        `Ім'я: ${name}`,
        `Телефон: ${phone}`,
        `Вік дитини: ${age}`
      ].join("\n")
    })
  });

  return res.ok;
}

async function sendTelegram({ name, phone, age }) {
  const { botToken, chatId } = getTelegramRuntimeConfig();
  if (!botToken || !chatId) return false;

  const text = [
    "SC Viking — нова заявка з сайту",
    `Ім'я: ${name}`,
    `Телефон: ${phone}`,
    `Вік дитини: ${age}`
  ].join("\n");

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });

  return res.ok;
}

function sanitize(str) {
  return str.replace(/[<>]/g, (ch) => (ch === "<" ? "&lt;" : "&gt;"));
}

const MAX_LEN = { name: 100, phone: 30, age: 10 };

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = payload?.name?.trim();
  const phone = payload?.phone?.trim();
  const age = payload?.age?.trim();
  const locale = payload?.locale?.trim() || "uk";
  const copy = getSiteCopy(locale);

  if (!name || !phone || !age) {
    return NextResponse.json(
      { error: copy.form.validationError },
      { status: 400 }
    );
  }

  if (name.length > MAX_LEN.name || phone.length > MAX_LEN.phone || age.length > MAX_LEN.age) {
    return NextResponse.json(
      { error: copy.form.validationError },
      { status: 400 }
    );
  }

  const lead = { name: sanitize(name), phone: sanitize(phone), age: sanitize(age) };

  const [emailOk, telegramOk] = await Promise.all([
    sendEmail(lead).catch(() => false),
    sendTelegram(lead).catch(() => false)
  ]);

  if (!emailOk && !telegramOk) {
    return NextResponse.json({
      ok: true,
      message: copy.form.successPrototype.replace("{name}", name)
    });
  }

  return NextResponse.json({
    ok: true,
    message: copy.form.successWithTelegram.replace("{name}", name)
  });
}
