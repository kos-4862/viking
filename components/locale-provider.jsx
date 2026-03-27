"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supportedLocales } from "@/lib/site-copy";

const DEFAULT_LOCALE = "uk";
const STORAGE_KEY = "sc-viking-locale";

const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {}
});

function isSupportedLocale(locale) {
  return supportedLocales.some((item) => item.code === locale);
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (storedLocale && isSupportedLocale(storedLocale)) {
      setLocaleState(storedLocale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  function setLocale(nextLocale) {
    if (isSupportedLocale(nextLocale)) {
      setLocaleState(nextLocale);
    }
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
