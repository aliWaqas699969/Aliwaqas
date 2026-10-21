# Ali Waqas — Portfolio

A bold, motion-led single-page portfolio for Ali Waqas, a software engineer and front-end developer based in Islamabad. Built with React, Vite, Motion, and Lucide, it uses local variable fonts, editorial layouts, a custom cursor, scroll-linked motion, interactive experience cards, and a screenshot-led showcase of six live projects.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints in your terminal.

## Build for production

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Content

Most of the content lives in `src/App.jsx`:

- `WORK_ITEMS` — experience and project cards, including copy, achievements, and tags
- `PROJECTS` — the six live portfolio projects, screenshots, tags, and demo links
- `SKILLS` — the skill pills in the About section
- `EDUCATION` — education entries in the About section
- `CHAT_SUGGESTIONS`, `CV_ANSWERS`, and `CV_ANSWER_RULES` — the CV chatbot prompts and answers
- `NAV_ITEMS` — section navigation
- Contact email, phone, website, and availability copy
- `useLocalTime()` — uses the `Asia/Karachi` timezone

The visual system lives in `src/App.css`:

- `:root` — `#6E1A37` burgundy, `#AE2448` crimson, `#72BAA9` mint, and `#D5E7B5` pistachio
- Typography, spacing, and responsive breakpoints
- Project artwork compositions for YbTech, the Question Generator, and PK2100
- Screenshot-led project cards for the six live portfolio builds, using images in `public/projects/`

The About portrait is the cropped photo at `public/ali-waqas-portrait.jpg`, framed and cropped with CSS to fit the portrait card.

The CV chatbot is local and rule-based: it matches questions against `CV_ANSWER_RULES` and returns the matching CV content. It does not call an external AI service or require an API key.

Update the page title, description, and social metadata in `index.html`.

## Included

- Preloader and staggered hero entrance
- Parallax hero artwork and headline
- Eyes that follow the pointer
- Custom cursor with project hover state
- Magnetic buttons and animated scroll reveals
- Infinite skills marquee
- CV chatbot with suggested questions, typing feedback, and a `Cmd/Ctrl + K` shortcut
- Accessible project modal with Escape-to-close, focus trapping, screenshots, and live-demo links
- Animated mobile menu
- Responsive layouts for desktop, tablet, and mobile
- `prefers-reduced-motion` support throughout

## Stack

- React 19
- Vite
- Motion
- Lucide React
- Bricolage Grotesque + Instrument Serif (self-hosted in `public/fonts`)
