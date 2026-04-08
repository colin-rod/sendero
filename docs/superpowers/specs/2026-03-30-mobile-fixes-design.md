---
title: Mobile Fixes — Video Autoplay, Card Tap, Hero Text & Drop-Shadow
date: 2026-03-30
status: approved
---

## Overview

Four targeted mobile/UX fixes for the homepage.

---

## 1. Video Autoplay on Mobile

**Problem:** 19MB video + iOS Safari autoplay quirks cause the hero video to not play on mobile. The component has correct attributes (`muted`, `playsInline`) but iOS ignores `autoPlay` without a programmatic `play()` call.

**Fix:**
- Add `useRef` to the `<video>` element and call `videoRef.current.play()` in a `useEffect` on mount — the most reliable iOS autoplay trigger.
- Hide the `<video>` element on mobile with `hidden md:block` — 19MB is too heavy for mobile data. Mobile users see the poster image instead.

**Files:** `components/HeroVideo.tsx`

---

## 2. Tour Card Hover → Tap on Mobile/Tablet

**Problem:** The overlay on `TourCard` uses `group-hover:opacity-100`, which never fires on touch devices.

**Fix:**
- Add `isActive: boolean` state to `TourCard`.
- `onClick` toggles `isActive` (tap to reveal, tap again to dismiss).
- Overlay renders `opacity-100` when `isActive` is true OR when the group is hovered (desktop).
- Tailwind class: `opacity-0 group-hover:opacity-100` + conditionally apply `opacity-100` via state.

**Files:** `components/features/tourGrid/TourGrid.tsx`

---

## 3. Hero Intro Text Smaller on Mobile

**Problem:** The heading and subheading in the dark hero intro section use `text-h2` (32px) at all breakpoints — too large for mobile.

**Fix:**
- Change both `<h2>` and `<p>` in the Hero Intro section to `text-xl md:text-h2` (20px mobile → 32px md+).

**Files:** `app/[locale]/page.tsx`

---

## 4. Remove Drop-Shadow on Hero Text

**Problem:** `drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]` and `drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]` create an undesired blur-like effect on text throughout the page.

**Fix:**
- Remove all `drop-shadow-[...]` utility classes from the hero h1 and waitlist section h2/p tags in `page.tsx`.

**Files:** `app/[locale]/page.tsx`

---

## Scope

No new components, no new routes, no translation changes. All fixes are contained to three files.
