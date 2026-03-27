"use client";
import { useEffect, useState } from "react";

let cachedConfig = null;
let fetchPromise = null;

function fetchConfig() {
  if (fetchPromise) return fetchPromise;
  fetchPromise = fetch("/api/public-config", { cache: "no-store" })
    .then((r) => r.ok ? r.json() : null)
    .then((data) => { cachedConfig = data; return data; })
    .catch(() => null);
  return fetchPromise;
}

export function useRuntimeConfig() {
  const [config, setConfig] = useState(cachedConfig);

  useEffect(() => {
    if (cachedConfig) {
      setConfig(cachedConfig);
      return;
    }
    let mounted = true;
    fetchConfig().then((data) => mounted && setConfig(data));
    return () => { mounted = false; };
  }, []);

  return config;
}