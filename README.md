# GitHub Profile Analyzer

![Typing SVG](https://readme-typing-svg.demolab.com?font=Space+Grotesk&size=28&duration=3000&pause=800&color=4F46E5&center=true&vCenter=true&width=900&lines=GitHub+Profile+Analyzer;Modern+Analytics+for+GitHub+Profiles;Charts%2C+Bookmarks%2C+Insights)

A modern, responsive GitHub Profile Analyzer built with React, Chart.js, and Framer Motion. Explore profile details, visualize repo insights, filter by language, and save favorites.

## Features
- Search GitHub usernames with instant profile analytics
- Profile card with avatar, bio, location, stats, and join date
- Repo list with lazy loading and language filters
- Interactive charts (language distribution + stars)
- Dark/light mode toggle
- Search history (last 5)
- Bookmarked profiles (localStorage)
- Responsive layout for mobile and desktop

## Tech Stack
- React + Vite
- Chart.js + react-chartjs-2
- Framer Motion
- Plain CSS

## Local Setup
1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Open the app

Vite will print the local URL in your terminal (usually http://localhost:5173).

## Deployment
- Netlify or Vercel recommended.
- Build command: `npm run build`
- Output directory: `dist`

## Screenshots
Add screenshots here after running the app locally:
- `screenshots/home.png`
- `screenshots/profile.png`

## Live Demo

- Demo: https://teal-sable-27e577.netlify.app/


## Notes
- GitHub API has rate limits for unauthenticated requests. If you hit rate limits, try again later or add a personal access token in the `githubApi.js` service.
