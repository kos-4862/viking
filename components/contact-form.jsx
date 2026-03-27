"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { getSiteCopy } from "@/lib/site-copy";

const initialState = {
  name: "",
  phone: "",
  age: ""
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const { locale } = useLocale();
  const copy = getSiteCopy(locale);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...form, locale })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      setMessage(data.message);
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || copy.form.genericError);
    }
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-card__header">
        <p className="eyebrow">{copy.form.eyebrow}</p>
        <h3>{copy.form.title}</h3>
      </div>

      <div className="field-grid">
        <label className="field">
          <span>{copy.form.fields.nameLabel}</span>
          <input name="name" value={form.name} onChange={updateField} placeholder={copy.form.fields.namePlaceholder} required />
        </label>
        <label className="field">
          <span>{copy.form.fields.phoneLabel}</span>
          <input name="phone" value={form.phone} onChange={updateField} placeholder={copy.form.fields.phonePlaceholder} required />
        </label>
      </div>

      <label className="field">
        <span>{copy.form.fields.ageLabel}</span>
        <input name="age" value={form.age} onChange={updateField} placeholder={copy.form.fields.agePlaceholder} required />
      </label>

      <button className="button button-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? copy.form.submitLoading : copy.form.submitIdle}
      </button>

      {message ? <p className={`form-message is-${status}`}>{message}</p> : null}
    </form>
  );
}
