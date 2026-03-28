"use client";

import { createContext, useContext, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { supportedLocales } from "@/lib/site-copy";

const LocaleContext = createContext({
  locale: "ua",
  setLocale: () => {}
});

function isSupportedLocale(code) {
  return supportedLocales.some((item) => item.code === code);
}

export function LocaleProvider({ children, initialLocale = "ua" }) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = (params.locale && isSupportedLocale(params.locale)) ? params.locale : initialLocale;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(nextLocale) {
    if (!isSupportedLocale(nextLocale)) return;
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/"));
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}