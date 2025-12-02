# 🎧 Ion Earbuds — Interactive 3D Product Website
An advanced interactive product experience built for the Earbuds Model Page assignment.

## 📌 Overview
Ion Earbuds is a fully interactive product showcase website combining 3D modeling, dynamic data loading, and smooth animation. The site uses a real component, responds to user interaction through hotspots, and displays API-driven product information pulled live from an external server.

It also includes a scroll-driven canvas animation, dynamically populated material lists, and responsive layouts for mobile, tablet, and desktop.

## 🧩 Features
### ✅ Interactive 3D Model Viewer

Explore a GLTF model in real-time.

Orbit, zoom, and inspect details.

Includes three GSAP-animated hotspots, each populated using API data.

Hotspots fade in/out smoothly on hover.

### ✅ API-Driven Content

The page retrieves data from two real APIs:

Materials API — fills the Materials section dynamically.

Infobox API — populates hotspot titles + descriptions.

This data is inserted using:

A template element ()

JavaScript cloning

DOM updating based on JSON response

### ✅ Loading & Error States

A custom loader appears anytime data is being fetched.

Errors trigger a user-facing message if an API fails.

All logic handled through clean utility functions like showLoader(), showError(), etc.

### ✅ Scroll-Driven Canvas Animation

Image sequence animates via scroll.

Managed using GSAP ScrollTrigger.

Canvas pins during scroll for a smooth reveal effect.

### ✅ Responsive Layout

Mobile: 3D model hides, static image appears.

Tablet/Desktop: 3D model shows, static image hides.

Layout supports all devices.

## 🎨 Styling
Original styling handled through SASS structure.

Final build uses main.css for stability.

Consistent typography across all sections.

Blue + Black modern visual theme.

## 🛠️ Tools & Technologies
HTML5 / CSS3 / SASS

JavaScript (ES6)

Fetch API (AJAX)

4.0

GSAP + ScrollTrigger

GitHub / Version Control

VS Code / Live Server

## 📦 Installation & Usage
Clone or download the repo.

Open the project folder.

If editing SASS, compile to /css/main.css.

Run using Live Server for best results.

Ensure your browser allows module scripts for model-viewer.

## 👤 Author
Noah Kennedy Interactive Media Design
