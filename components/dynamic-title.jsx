"use client";

import { useEffect } from "react";
import { useLocale } from "@/components/locale-provider";
import { getSiteCopy } from "@/lib/site-copy";

export function DynamicTitle() {
  const { locale } = useLocale();
  const copy = getSiteCopy(locale);

  useEffect(() => {
    document.title = copy.pageTitle;
  }, [copy.pageTitle]);

  return null;
}