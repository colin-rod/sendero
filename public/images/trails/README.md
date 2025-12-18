# Trail Images

This directory contains images for trail pages.

## Current Status: Using Placeholder Service

All images currently use `placehold.co` for placeholders. Replace with real images when available.

## Required Images for Sendero del Tigre

### Hero Image
- **File:** `sendero-del-tigre/hero.webp`
- **Dimensions:** 1920x1080 (16:9 landscape)
- **Format:** WebP
- **Description:** Main hero image showing the trail landscape

### Experience Images
- **File:** `sendero-del-tigre/experience-stream.webp`
  - Dimensions: 800x600 (4:3)
  - Description: El Tigre Stream crossing

- **File:** `sendero-del-tigre/experience-bamboo.webp`
  - Dimensions: 800x600 (4:3)
  - Description: Bamboo forest section

- **File:** `sendero-del-tigre/experience-farm.webp`
  - Dimensions: 800x600 (4:3)
  - Description: Ecological farm lunch setting

- **File:** `sendero-del-tigre/experience-vista.webp`
  - Dimensions: 800x600 (4:3)
  - Description: Mountain vista viewpoint

### Gallery Images
- **Files:** `sendero-del-tigre/gallery/1.webp` through `6.webp`
- **Formats:**
  - 1.webp, 3.webp, 5.webp: 1200x800 (3:2 landscape)
  - 2.webp, 4.webp: 800x1000 (4:5 portrait)
  - 6.webp: 1000x1000 (1:1 square)
- **Description:** Various atmospheric trail photos

## Image Optimization Tips

- Use WebP format for best performance
- Include width/height in image tags to prevent layout shift
- Optimize file sizes (aim for <200KB per image)
- Provide alt text for accessibility
- Consider lazy loading for gallery images

## Placeholder URLs Currently Used

The app uses `https://placehold.co/{width}x{height}/e2b71f/1b1b1b?text=Trail+Name` for all placeholders.

Replace with real images by updating the paths in `/lib/data/trails.ts`.
