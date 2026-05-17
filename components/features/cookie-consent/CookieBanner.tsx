"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import posthog from "posthog-js";

const STORAGE_KEY = "cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    } else if (consent === "declined") {
      posthog.opt_out_capturing();
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    posthog.opt_in_capturing();
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    posthog.opt_out_capturing();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 text-white px-4 py-4 shadow-lg backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(27, 27, 27, 0.8)', borderTop: '0.5px solid rgba(255,255,255,0.25)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-sm leading-relaxed flex-1 text-[#e5e5e5]">
          {t("text")}{" "}
          <Link
            href={`/${locale}/datenschutz`}
            className="underline underline-offset-2 hover:text-primary-500 transition-colors"
          >
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-white/30 rounded hover:border-white/60 transition-colors"
          >
            {t("decline")}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-white hover:bg-white/90 text-[#1b1b1b] font-semibold rounded transition-colors"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
