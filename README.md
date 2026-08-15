# Manish Waghmare - Portfolio

A clean, modern, and fully responsive personal portfolio website for **Manish Waghmare**, a Java Backend Developer. Built with semantic HTML5, CSS3 (with custom variables for theming), and vanilla JavaScript. 

## 🌐 Live Preview
*Live preview URL will be added here once deployed (e.g., https://manishwork-byte.github.io/portfolio)*

## ✨ Features
- **Modern UI/UX:** Clean, light-themed aesthetic with a focus on typography and whitespace.
- **Glassmorphism Navbar:** Sticky navigation bar that blurs the background on scroll.
- **Smooth Animations:** 
  - Dynamic typing effect in the hero section.
  - Interactive cursor glow effect following mouse movement.
  - Scroll-triggered fade-up reveal animations (`IntersectionObserver`).
  - Animating skill progress bars when scrolling into view.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop screens with a slide-down mobile drawer menu.
- **Form Integration:** Contact form with live inline validation and ready-to-use Formspree integration.
- **Accessibility:** WCAG AA compliant with `aria-labels`, semantic markup, and keyboard focus states.

## 📂 Project Structure

```text
portfolio/
├── index.html              # Main HTML entry point (semantic structure)
├── style.css               # Global styles, variables, media queries, and animations
├── script.js               # Vanilla JS logic (typing, scroll observers, form validation)
├── README.md               # Project documentation
├── images/                 # Directory for images
│   ├── profile.png         # Main profile photo (displays fallback initials if missing)
│   ├── project1.jpg        # Project thumbnail screenshots
│   ├── project2.jpg        
│   └── ...
└── assets/
    └── docs/
        └── manish_waghmare_resume.pdf  # Downloadable PDF resume
```

## 🚀 Setup & Local Development

This project uses no complex frameworks or build steps. You can run it locally in seconds.

### Method 1: Using npx serve (Recommended)
If you have Node.js installed, you can use `serve` to run a local web server:
```bash
npx serve .
```
Then open `http://localhost:3000` in your browser.

### Method 2: Open directly
Because it is a pure HTML/CSS/JS site, you can also simply open `index.html` directly in your browser.

## 🛠️ Customization Guide

1. **Profile Photo:** Add your photo as `images/profile.png`. (If no image is found, the site automatically shows a stylish fallback with your initials).
2. **Project Images:** Add screenshots as `images/project1.jpg` through `images/project6.jpg`. (Missing images will gracefully show gradient color blocks).
3. **Contact Form:** Go to [Formspree](https://formspree.io/), create a new form, and replace the `YOUR_FORM_ID` string in `index.html` with your actual form ID endpoint.
4. **Resume:** Add your resume document to `assets/docs/manish_waghmare_resume.pdf`.

## 💻 Tech Stack
- **HTML5:** Semantic architecture
- **CSS3:** Flexbox, CSS Grid, Custom Properties (Variables), Keyframe Animations
- **JavaScript (Vanilla):** DOM manipulation, `IntersectionObserver`, `requestAnimationFrame`

---
*Built from scratch with clean, maintainable code.*