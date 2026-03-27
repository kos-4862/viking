"use client";

import { useEffect } from "react";

function getHeaderOffset() {
  const header = document.querySelector(".site-header");
  return header ? header.offsetHeight + 16 : 96;
}

function scrollToHash(hash, behavior = "smooth") {
  if (!hash || hash === "#") {
    window.scrollTo({ top: 0, left: 0, behavior });
    return;
  }

  const target = document.querySelector(hash);
  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior });
}

export function ScrollManager() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const navigationEntry = performance.getEntriesByType("navigation")[0];
    const isReload = navigationEntry?.type === "reload";

    if (isReload) {
      if (window.location.hash) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } else if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash, "auto"));
    }

    function handleDocumentClick(event) {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href) {
        return;
      }

      event.preventDefault();

      if (href === "#top") {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return;
      }

      scrollToHash(href, "smooth");
      window.history.pushState(null, "", href);
    }

    function handleHashChange() {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }

      scrollToHash(window.location.hash, "auto");
    }

    document.addEventListener("click", handleDocumentClick);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}
