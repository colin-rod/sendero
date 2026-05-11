"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#1b1b1b] text-white px-4 py-4 shadow-lg"
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
            className="px-4 py-2 text-sm bg-primary-500 text-[#1b1b1b] font-semibold rounded hover:bg-primary-600 transition-colors"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
