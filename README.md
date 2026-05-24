# CloudNine MindCheck

A modern, offline-first emotional wellness web application that analyzes short written texts for emotional signals tied to low-mood patterns. Built as a non-clinical AI research prototype using the GoEmotions taxonomy.

---

## Overview

CloudNine MindCheck helps users identify and reflect on emotional patterns in their own writing. Users paste or type a journal entry, message, or thought — and the app returns a breakdown of detected emotional signals such as sadness, remorse, fear, anger, and more, alongside supportive reflection prompts.

> **Disclaimer:** This tool is strictly non-clinical and not a substitute for professional mental health support. It is designed for emotional vocabulary building and self-reflection only.

---

## Features

- **Emotion Analysis** — Detects 8 GoEmotions-aligned emotional categories from free-form text
- **Confidence Score** — Returns a dynamic confidence level (55–94%) per analysis
- **Signal Level** — Classifies overall distress signal as Low, Moderate, or High
- **Reflection Prompts** — Generates a tailored journaling question based on the dominant emotion
- **Emotion Guide** — Visual reference cards explaining each emotional category with examples
- **Gentle Steps** — Supportive, non-clinical exercises for each emotion
- **Reflections Wall** — Saves past journal entries locally with an animated bubble visualization
- **Offline-First** — All analysis runs on the server with no external AI API dependency
- **Bento Dashboard UI** — Clean, animated interface built with Tailwind CSS and Framer Motion

---

## Emotion Categories

| Emotion | Signal Type |
|---|---|
| Sadness | Low Mood / Emotional Heaviness |
| Remorse | Guilt / Regret / Self-Blame |
| Disapproval | Negative Self-Evaluation |
| Fear | Worry / Anxiety |
| Anger | Frustration / Tension |
| Disgust | Aversion / Strong Dislike |
| Joy | Positive Emotion Contrast |
| Surprise | Sudden Emotional Shift |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion (motion/react) |
| Build Tool | Vite 6 |
| Backend | Node.js + Express |
| Runtime | tsx (TypeScript execution) |
| Analysis Model | Custom keyword-lexicon model (GoEmotions-aligned) |
| Storage | localStorage (reflections) |

---

## Project Structure

```
cloudnine-mindcheck/
├── src/
│   ├── components/
│   │   ├── AnalyzeView.tsx         # Main text analysis page
│   │   ├── HomeView.tsx            # Landing dashboard
│   │   ├── GuideView.tsx           # Emotion reference cards
│   │   ├── ActionsView.tsx         # Gentle Steps support page
│   │   ├── ReflectionsWallView.tsx # Saved reflections bubble wall
│   │   ├── AboutView.tsx           # About + safety resources
│   │   ├── Navbar.tsx              # Top navigation
│   │   └── EmotionIcon.tsx         # Emotion SVG icons
│   ├── utils/
│   │   └── emotionMeta.ts          # Emotion metadata + gentle steps content
│   ├── types.ts                    # Shared TypeScript types
│   ├── App.tsx                     # Root component + tab routing
│   └── main.tsx                    # React entry point
├── public/
│   ├── mindcheck.png               # Navbar logo
│   └── mindlogo.png                # Browser favicon
├── server.ts                       # Express server + emotion analysis engine
├── index.html                      # HTML entry point
├── package.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/aajvr/MindCheck.git
cd MindCheck
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000` with hot module reloading.

### Production Build

```bash
npm run build
npm start
```

---

## Analysis Model

The emotion analysis engine in `server.ts` is a **custom keyword-lexicon model** designed as a swappable template. It works entirely offline with no API keys required.

**How it works:**
1. Normalizes the input text to lowercase
2. Matches against curated keyword dictionaries for each of the 8 emotion categories
3. Combines keyword match weights with word-count-based base weights
4. Normalizes scores to sum to 100%
5. Determines dominant emotion, confidence level, and distress signal level

**To swap in your own model**, replace the `analyzeTextWithCustomModel` function in `server.ts` with a call to your own Python API, HuggingFace endpoint, or any NLP backend of your choice.

---

## Deployment

This app is ready to deploy on [Railway](https://railway.app):

1. Push the repo to GitHub
2. Create a new Railway project → Deploy from GitHub repo
3. Select the `master` branch
4. Railway auto-detects `npm run build` and `npm start`
5. Go to the service Settings → Networking → Generate Domain

No environment variables are required for basic deployment.

---

## Safety and Crisis Resources (Philippines)

If you or someone you know is experiencing a mental health crisis:

| Organization | Contact |
|---|---|
| **NCMH Crisis Hotline** | 1553 (toll-free) |
| **Hopeline Philippines** | 0917-558-4673 |
| **In Touch Crisis Line** | 0917-572-8821 |

---

## Research Context

This prototype maps emotional signals based on the [GoEmotions](https://research.google/blog/goemotions-a-dataset-for-fine-grained-emotion-classification/) taxonomy. Clinical literature suggests that self-referential writing with high levels of sadness combined with self-blame or self-disapproval correlates with sub-clinical low mood states.

This tool is intended for **research and educational purposes only**.

---

## License

This project is private. All rights reserved.
