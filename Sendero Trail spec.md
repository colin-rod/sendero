# **🌿 SENDEROBIKE TRAIL PAGE — FINAL SCROLL STORY LAYOUT**

---

# **0\. Entry State (before scrolling)**

Only happens when user selects a route from the master multi-route illustration.

* The screen **fades from dark → soft cream background**

* Route title gently appears

* Mini-map illustration rises into view with a parallax effect

* A subtle glow highlights the path of the selected route

This creates a transition from “big world → specific trail.”

---

# **1\. HERO SECTION — Calm, inviting, emotional**

### **Layout**

* Full-width hero image (placeholder ready)

* Fades in with a slow upward slide

* Title overlay: soft serif font

* Subtitle below: “A guided journey through bamboo forests and mountain streams.”

### **Quick Stat Row**

Centered, gently animated counters:

| Icon (hand-drawn) | “23 km” | “3 hours” | “Easy–Moderate” | “+230 m / \-230 m” |

Each icon softly pulses on page load.

---

# **2\. TRAIL STORY BLOCK — Emotional framing**

### **Copy block on a soft background:**

“Follow the footsteps of the elusive *tigre*, through tall grasses, bamboo groves, and the scent of mountain forests. A calm, immersive ride designed to reconnect you with nature.”

Short, poetic, intimate.

### **Optional:**

Small floating leaf/bamboo illustration drifting slowly in the background.

---

# **3\. SIGNATURE MINI-MAP ILLUSTRATION — The centerpiece**

### **Behavior & Layout**

* Centered, large, breathing space around it

* Background stays cream, the map itself uses your neon-but-softened color palette

* The path glows lightly

* Icons appear along the route:

  * Farm

  * River

  * Bamboo

  * Experience symbols

  * Animals (optional)

### **Interactions**

* Hovering an icon shows:  
   **“Ecological Farm & Lunch — km 10.2”**

* Clicking scrolls the page to the Experience Card section.

* Waypoints highlighted on hover.

### **Animation**

* Very slow “temperature shift” glow: the active route color pulses every \~8s

* Minimal parallax: background elements move slower on scroll

**No segment-by-segment animation**, consistent with your requirements.

---

# **4\. EXPERIENCES SECTION — Cards synced to the map**

### **Header:**

**Experiences Along the Way**

### **Layout:**

Stacked vertical cards or 2-column grid:

📸 **Experience Photo (placeholder)**  
 **title**  
 1–2 sentence description  
 Small icon (matching illustration)  
 👉 “Happens at km X” label

### **Interaction:**

Hovering over a card → highlights the matching icon on the mini-map above  
 Clicking → scrolls back up to the map and pulses the icon  
 (Beautiful circular storytelling)

---

# **5\. WAYPOINT TIMELINE — Minimal & clean**

### **Visual:**

A vertical line with soft dots and icons:

A ● Start Point  
 ● Tiger Stream (river icon)  
 ● Bamboo Ridge  
 ● Ecological Farm  
 ● End Point

Each waypoint:

* Name

* Mini illustration

* Short helpful line (“A peaceful stream crossing”)

Waypoints do **not** pop visually — experiences do.

---

# **6\. ELEVATION SECTION — Softer, hand-drawn look**

### **Elevation chart style:**

* No sharp grid lines

* Organic, slightly imperfect curve

* Colored in the trail’s signature color

* Small icons marking experience locations on the elevation slope

Under the chart:

**Highest point / Lowest point**  
 Short comment:  
 “Gentle rolling terrain with one gradual climb.”

### **Optional:**

* Toggle: “Metric / Imperial”

---

# **7\. GALLERY — Nature, people, textures**

Scrolling reveals a series of atmospheric photos:

* Wide jungle shots

* Close-up textures (coffee leaves, bamboo, river stones)

* Riders in nature

* Lunch / farm experiences

Gallery uses **soft fade-in on scroll** — no motion-heavy animations.

---

# **8\. TESTIMONIAL BAND**

A calm, minimal strip:

“One of the most peaceful rides of my life. I felt guided, safe, and deeply connected to the forest.”  
 — Anna, Germany

3–4 rotating testimonials.

---

# **9\. BOOKING CTA — Clear, grounded**

Centered section:

**Book This Guided Trail**  
 (Button)

Subtext:  
 “Small groups · Experienced local guides · All equipment included”

---

# **10\. FOOTER — Link back to all trails**

Small illustrated icon \+ link:

← Explore All Sendero Trails  
 (Brings user back to master multi-route map)

---

# **🌱 PUTTING IT ALL TOGETHER — FLOW SUMMARY**

When a user visits a trail page, the experience is:

1. **Hero → emotional impact**

2. **Story → grounding and vibe**

3. **Illustrated map → clear, iconic visualization**

4. **Experience cards** → clarify the added value

5. **Waypoints** → orient the journey

6. **Elevation** → reassure on difficulty

7. **Gallery** → inspire visually

8. **Testimonials** → build trust

9. **CTA** → convert gently

Everything flows downward in a natural rhythm, exactly like a tranquil journey.

## **1\. Trail Page Wireframe Sketch**

Think of one page per route, all sharing this structure.

### **1.1. Overall Structure (semantic HTML)**

`<main class="trail-page">`  
  `<!-- 1. Hero -->`  
  `<section class="trail-hero" id="hero"></section>`

  `<!-- 2. Story -->`  
  `<section class="trail-story" id="story"></section>`

  `<!-- 3. Mini Map Illustration -->`  
  `<section class="trail-map" id="map"></section>`

  `<!-- 4. Experiences -->`  
  `<section class="trail-experiences" id="experiences"></section>`

  `<!-- 5. Waypoints -->`  
  `<section class="trail-waypoints" id="waypoints"></section>`

  `<!-- 6. Elevation -->`  
  `<section class="trail-elevation" id="elevation"></section>`

  `<!-- 7. Gallery -->`  
  `<section class="trail-gallery" id="gallery"></section>`

  `<!-- 8. Testimonials -->`  
  `<section class="trail-testimonials" id="testimonials"></section>`

  `<!-- 9. Booking CTA -->`  
  `<section class="trail-cta" id="cta"></section>`  
`</main>`

You can then plug this into React, Next, etc., but the structure stays the same.

---

### **1.2. Section Wireframes (Desktop)**

I’ll use simple box sketches with key elements.

#### **1\) Hero (`.trail-hero`)**

`+-----------------------------------------------------------+`  
`| [Hero Image (full width, 16:9)]                          |`  
`|  maybe with light overlay                                |`  
`+-----------------------------------------------------------+`  
`| El Sendero del Tigre               [Easy–Moderate badge] |`  
`| "A guided ride through bamboo and mountain forests."     |`  
`|                                                           |`  
`| [ Distance ] [ Time ] [ Difficulty ] [ Elevation +/- ]   |`  
`+-----------------------------------------------------------+`

* Hero image placeholder: `div` with background image or `<img>`.

* Title & subtitle centered on desktop, stacked on mobile.

#### **2\) Story (`.trail-story`)**

`+-------------------------+-------------------------------+`  
`| [Small decorative       | "Follow the footsteps of the  |`  
`|  illustration: leaf /   | tigre through tall grasses..."|`  
`|  bamboo]                |                               |`  
`|                         | [Short paragraph 2]           |`  
`+-------------------------+-------------------------------+`

* Two-column on desktop, single-column on mobile.

#### **3\) Mini Map Illustration (`.trail-map`)**

`+-----------------------------------------------------------+`  
`| [ SVG Illustration Container ]                            |`  
`|   - route line                                            |`  
`|   - icons for experiences                                |`  
`|   - start/end markers                                     |`  
`+-----------------------------------------------------------+`  
`| Caption: "Overview of the Sendero del Tigre route"        |`  
`+-----------------------------------------------------------+`

* Center the SVG, max-width \~900px on desktop.

#### **4\) Experiences (`.trail-experiences`)**

`+---------------- Trailing title: Experiences Along the Way ----------------+`

`[ Card 1 ]       [ Card 2 ]`  
`+------------+   +------------+`  
`|  Photo     |   |  Photo     |`  
`+------------+   +------------+`  
`| Title      |   | Title      |`  
`| Desc...    |   | Desc...    |`  
`| km marker  |   | km marker  |`  
`+------------+   +------------+`

`[ Card 3 ]       [ Card 4 ] ...`

* 2-column grid on desktop, single column on mobile.

* Each card has a `data-experience-id` that matches an icon on the SVG.

#### **5\) Waypoints (`.trail-waypoints`)**

`+------------------------ Waypoints ------------------------+`

`Start Point`  
  `|`  
  `o── "Town square in Pereira"`  
  `|`  
  `o── "El Tigre Stream"`  
  `|`  
  `o── "Ecological Farm"`  
  `|`  
  `o── "End Point"`

* Visually: vertical line with dots; each dot has name \+ 1 sentence.

#### **6\) Elevation (`.trail-elevation`)**

`+------------------------ Elevation ------------------------+`

`[ soft elevation curve SVG / canvas ]`

`Highest point: 1,240 m      Lowest point: 1,150 m`  
`"Mostly gentle with one gradual climb at mid-ride."`

* Experience icons appear as small markers on the curve.

#### **7\) Gallery (`.trail-gallery`)**

`+---------------------- Gallery ----------------------------+`

`[ Large photo 1 (full width) ]`  
`[ Two-up grid: photo 2 | photo 3 ]`  
`[ Large photo 4 ]`  
`...`

* Make it masonry-ish but simple; 1 or 2 columns.

#### **8\) Testimonials (`.trail-testimonials`)**

`+---------------- What Riders Say --------------------------+`

`"One of the most peaceful rides of my life..."`  
`— Name, Country`

`[ dot indicators or arrows optionally ]`

#### **9\) CTA (`.trail-cta`)**

`+-----------------------------------------------------------+`  
`| Ready for the Sendero del Tigre?                          |`  
`| [ Book this guided trail ]                                |`  
`| Small text: "Small groups · Local guides · Equipment..."  |`  
`+-----------------------------------------------------------+`

---

### **1.3. Mobile Adaptation**

* All sections become **single-column**.

* Hero stats row becomes stacked pills:

`[23 km] [3 h]`  
`[Easy–Moderate] [+230 / -230 m]`

* Mini-map SVG scales to full-width with padding.

* Experiences: one card per row.

* Waypoints: same vertical timeline, full-width.

---

## **2\. Motion & Interaction Rules (CSS-ish)**

These are *patterns*, not strict code, but Claude can easily turn them into real CSS / JS.

### **2.1. Scroll Fade-In**

Use IntersectionObserver with a reusable class.

`// Pseudo-code`  
`const observer = new IntersectionObserver(entries => {`  
  `entries.forEach(entry => {`  
    `if (entry.isIntersecting) {`  
      `entry.target.classList.add('in-view');`  
    `}`  
  `});`  
`}, { threshold: 0.2 });`

`document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));`

**CSS:**

`.reveal-on-scroll {`  
  `opacity: 0;`  
  `transform: translateY(24px);`  
  `transition: opacity 700ms ease-out, transform 700ms ease-out;`  
`}`

`.reveal-on-scroll.in-view {`  
  `opacity: 1;`  
  `transform: translateY(0);`  
`}`

Apply `.reveal-on-scroll` to major sections: story, map, experiences, elevation, gallery, testimonials.

---

### **2.2. Soft Glow Pulse for Active Route**

Used for path strokes in SVG and maybe for icons.

`@keyframes glowPulse {`  
  `0%   { stroke-width: 2; filter: drop-shadow(0 0 0px rgba(0,0,0,0)); }`  
  `50%  { stroke-width: 3; filter: drop-shadow(0 0 6px rgba(0,0,0,0.35)); }`  
  `100% { stroke-width: 2; filter: drop-shadow(0 0 0px rgba(0,0,0,0)); }`  
`}`

`.route-line--active {`  
  `animation: glowPulse 8s ease-in-out infinite;`  
`}`

You can instead animate opacity or color if drop-shadow feels heavy.

---

### **2.3. Icon Hover Pulse (map \+ experience cards)**

`@keyframes iconPulse {`  
  `0%   { transform: scale(1);   opacity: 1; }`  
  `50%  { transform: scale(1.12); opacity: 1; }`  
  `100% { transform: scale(1);   opacity: 1; }`  
`}`

`.map-icon--highlighted {`  
  `animation: iconPulse 800ms ease-out;`  
`}`

When user hovers an Experience card, add `.map-icon--highlighted` to the matching SVG element (and remove after animation end or with timeout).

---

### **2.4. Card Hover Lift**

`.trail-experience-card {`  
  `transition: transform 200ms ease-out, box-shadow 200ms ease-out;`  
`}`

`.trail-experience-card:hover {`  
  `transform: translateY(-4px);`  
  `box-shadow: 0 10px 25px rgba(0,0,0,0.08);`  
`}`

Keeps things calm but responsive.

---

### **2.5. Parallax for Map Section (optional)**

Simplest approach: a slow transform on scroll based on scroll position of the `trail-map` section—Claude can implement with a tiny JS handler:

`window.addEventListener('scroll', () => {`  
  `const mapSection = document.querySelector('.trail-map');`  
  `const svg = document.querySelector('.trail-map svg');`  
  `if (!mapSection || !svg) return;`

  `const rect = mapSection.getBoundingClientRect();`  
  `const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);`

  `const translateY = (1 - progress) * 20; // 0–20px`  
  ``svg.style.transform = `translateY(${translateY}px)`;``  
`});`

Keep it subtle.

### **2.6. Transition Between All-Routes View and Single Trail Page**

When clicking a route on the master illustration:

1. Add a class to the `<body>` like `.transitioning`.

2. Fade out the all-routes illustration.

3. Either:

   * navigate to `/trails/[slug]` OR

   * update the view in a SPA.

CSS:

`.body-transitioning .all-routes-illustration {`  
  `opacity: 0;`  
  `transform: scale(0.98);`  
  `transition: opacity 300ms ease-out, transform 300ms ease-out;`  
`}`

In the new page, ensure hero \+ map use `.reveal-on-scroll` so they fade in.

---

## **3\. All-Routes Illustration Design**

Goal: **One SVG showing all three Senderos**, each clickable, with consistent visual language.

### **3.1. Structure**

Use a single SVG with groups per route.

Each route group has:

* **Route path** (`.route-line`) with unique color.

* **Experience icons** (`.route-icon`) with `data-experience-id`.

* Start/end markers (circles or stylized icons).

### **3.2. Styling**

`.all-routes-illustration {`  
  `width: 100%;`  
  `max-width: 1100px;`  
  `display: block;`  
  `margin: 0 auto;`  
`}`

`.route-line {`  
  `fill: none;`  
  `stroke-linecap: round;`  
  `stroke-linejoin: round;`  
  `stroke-width: 3;`  
  `opacity: 0.65;`  
  `transition: opacity 200ms ease-out, stroke-width 200ms ease-out;`  
`}`

`/* Signature colors per route */`  
`.route-line--tigre { stroke: #88ff7a; }  /* bamboo / jungle */`  
`.route-line--rio   { stroke: #4fd1ff; }  /* river */`  
`.route-line--cafe  { stroke: #ff9b5f; }  /* coffee / warm */`

`.route-group:hover .route-line {`  
  `opacity: 1;`  
  `stroke-width: 4;`  
`}`

`.route-icon {`  
  `cursor: pointer;`  
  `transition: transform 150ms ease-out;`  
`}`

`.route-icon:hover {`  
  `transform: scale(1.1);`  
`}`

You can soften these colors to better match your calm palette.

### **3.3. Interactions**

**Hover:**

* When user hovers over a route group:

  * That route’s line increases opacity and thickness.

  * Other routes dim slightly: add `.is-dimmed` to siblings.

`.route-group.is-dimmed .route-line {`  
  `opacity: 0.25;`  
`}`

**Click:**

* On click of `.route-group`, trigger navigation:

`document.querySelectorAll('.route-group').forEach(group => {`  
  `group.addEventListener('click', () => {`  
    `const id = group.dataset.routeId; // e.g. 'sendero-del-tigre'`  
    `// Smooth fade / scale animation, then navigate`  
    `document.body.classList.add('transitioning');`  
    `setTimeout(() => {`  
      ``window.location.href = `/trails/${id}`; // or router.push in SPA``  
    `}, 250);`  
  `});`  
`});`

You can also show a small tooltip on hover with route name \+ short description before click.

---

### **3.4. Zoom Concept (Nice-to-have, not required)**

If you want the **zoom** effect *within* the SVG before page navigation:

* Wrap the whole map in `<g id="map-root">`.

* On click of a route:

`const mapRoot = document.getElementById('map-root');`  
`group.addEventListener('click', () => {`  
  `const bbox = group.getBBox();`  
  `const cx = bbox.x + bbox.width / 2;`  
  `const cy = bbox.y + bbox.height / 2;`  
  `const scale = 1.5; // or calculated from bbox`

  ``mapRoot.style.transformOrigin = `${cx}px ${cy}px`;``  
  ``mapRoot.style.transform = `scale(${scale})`;``  
  `mapRoot.style.transition = 'transform 300ms ease-out';`

  `setTimeout(() => {`  
    ``window.location.href = `/trails/${id}`;``  
  `}, 320);`  
`});`

That will visually zoom into the route for \~300ms before navigating away.

---

### **3.5. Connecting Experiences on Trail Page to SVG Icons**

On the **trail detail page**, your route-specific mini-map SVG follows the same structure:

* Each experience icon has `data-experience-id="coffee-workshop"` etc.

* Each experience card has the same `data-experience-id`.

Pseudo-code to sync hover:

`const cards = document.querySelectorAll('.trail-experience-card');`  
`cards.forEach(card => {`  
  `const id = card.dataset.experienceId;`  
  ``const icon = document.querySelector(`.trail-map svg .route-icon[data-experience-id="${id}"]`);``  
  `if (!icon) return;`

  `card.addEventListener('mouseenter', () => {`  
    `icon.classList.add('map-icon--highlighted');`  
  `});`

  `card.addEventListener('mouseleave', () => {`  
    `icon.classList.remove('map-icon--highlighted');`  
  `});`

  `icon.addEventListener('mouseenter', () => {`  
    `card.classList.add('is-hovered');`  
  `});`  
  `icon.addEventListener('mouseleave', () => {`  
    `card.classList.remove('is-hovered');`  
  `});`  
`});`

---

