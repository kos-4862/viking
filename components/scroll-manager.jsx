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

  target.scrollIntoView({ behavior, block: "start" });
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
      setTimeout(() => scrollToHash(window.location.hash, "auto"), 50);
    }

    function handleDocumentClick(event) {
      const anchor = event.target.closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Handle pure hash links (#about)
      if (href.startsWith("#")) {
        event.preventDefault();
        if (href === "#top") {
          window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          return;
        }
        scrollToHash(href, "smooth");
        window.history.pushState(null, "", href);
        return;
      }

      // Handle same-page path+hash links (/ua/#about)
      const hashIdx = href.indexOf("#");
      if (hashIdx === -1) return;
      const path = href.slice(0, hashIdx);
      const hash = href.slice(hashIdx);
      if (path === window.location.pathname || path === window.location.pathname + "/") {
        event.preventDefault();
        scrollToHash(hash, "smooth");
        window.history.pushState(null, "", href);
      }
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

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll(".reveal");

    if (reducedMotion) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
