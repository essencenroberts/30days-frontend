# 30/Day: Content Challenge Planner (Frontend)

**Plan it. Post it. Track it.**

**30Days** helps content creators plan and finish posting challenges, like "30 Reels in 30 Days." You create a challenge, plan a post for each day, move each post through its stages (idea → writing → filming → editing → scheduled → posted), and watch your progress and streak grow.

This repo is the **frontend**: the part of the app you see and click. It talks to a separate **backend** API that stores the data.

- **Live app:** [(https://thirtyday.onrender.com)]
- **Live API:** https://thirtyday-api.onrender.com
- **Backend repo:** [(https://github.com/essencenroberts/30days-backend)]

> **Heads up:** The app is hosted on Render's free plan. If nobody has used it in a while, the first load can take up to a minute while the server wakes up. After that, it's fast.

---

## What you can do

**Accounts**
- Create an account and log in
- Stay logged in after refreshing the page
- Log out

**Challenges**
- Create a challenge with a name, description, start date, length (30 to 90 days), and posts per day
- See a live preview while creating it, like "90 posts total · ends Nov 6"
- Edit or delete a challenge

**Posts**
- Add a post to any day, with a title, platform, content type, optional time, caption or script, and a live link
- Edit a post or move it to another day
- Change a post's status as you work on it
- Delete a post

**Tracking progress**
- See every challenge on the Dashboard, with the active ones first
- See summary stats: active challenges, posts published, and your top streak
- See each challenge's progress bar, current streak, and best streak
- View a challenge's plan three ways:
  - **Grid:** one tile per day. Today is outlined in orange, and finished days turn green
  - **List:** every day in order, with full post details
  - **Board:** posts grouped into columns by status

---

## Built with

| Tool | What it does in this app |
|---|---|
| **React** | Builds the pages out of reusable pieces called components |
| **TypeScript** | Adds labels (types) to the code, so mistakes get caught before the app runs |
| **Vite** | Runs the app while developing and builds it for the internet |
| **React Router** | Switches between pages without reloading the whole site |
| **Axios** | Sends requests to the backend API |
| **Tailwind CSS** | Styles the app with small, ready-made classes |
| **Context API** | Shares login info with every page |

---

## How it works

### Pages

| Page | Address | Who can see it |
|---|---|---|
| Log in | `/login` | Logged-out users |
| Sign up | `/register` | Logged-out users |
| Dashboard | `/dashboard` | Logged-in users |
| New challenge | `/challenges/new` | Logged-in users |
| Challenge plan | `/challenges/:challengeId` | The challenge's owner |
| Edit challenge | `/challenges/:challengeId/edit` | The challenge's owner |
| New post | `/challenges/:challengeId/posts/new` | The challenge's owner |
| Edit post | `/challenges/:challengeId/posts/:postId` | The challenge's owner |

Visiting any other address shows a "Page not found" page.

### Logging in

1. When you log in or sign up, the backend sends back a **token** (a JWT). Think of it like a wristband at an event.
2. The app saves the token in your browser's `localStorage`, so you stay logged in after a refresh.
3. Every request to the backend automatically includes the token, so the backend knows who you are.
4. When you log out, the token is deleted.

### Protected pages

Two "hall monitor" components guard the pages:

- **`ProtectedRoute`** sends logged-out users to the login page. After they log in, it takes them back to the page they were trying to reach.
- **`PublicOnlyRoute`** sends logged-in users away from the login and sign-up pages, straight to the Dashboard.

### Keeping track of data (state)

- **Global state (Context API):** The logged-in user lives in `AuthContext`, so any page can read it with the `useAuth()` hook.
- **Local state (`useState`):** Things only one page cares about, like form inputs or which plan view is picked, stay inside that page.

### Custom hooks

Hooks are reusable pieces of logic. This app has its own:

| Hook | What it does |
|---|---|
| `useAuth` | Gets the logged-in user and the login, register, and logout functions |
| `useFetch` | The shared logic for loading data: tracks loading, errors, and "Try again" |
| `useChallenges` | Loads all of your challenges with their stats |
| `useChallenge` | Loads one challenge with its stats |
| `usePosts` | Loads all posts for one challenge |
| `usePost` | Loads one post |

### Loading, errors, and empty pages

Every page that loads data handles three situations:

- **Loading:** a spinner while waiting
- **Error:** a red message with a **Try again** button
- **Empty:** a friendly message that tells you what to do next, like "Create your first challenge"

### Accessibility

- Every form box has a label, and error messages are connected to their boxes for screen readers
- Status is always shown in **words**, not just color
- Buttons and links are big enough to tap on a phone
- The whole app works with a keyboard

---

## Folder structure

```
src/
├── api/
│   └── client.ts           # Axios setup: adds the token to every request
├── components/
│   ├── ui/                 # Small reusable pieces (Buttons, Input, Loader, etc.)
│   ├── AppLayout.tsx       # Frame for logged-in pages (AppHeader + page)
│   ├── PublicLayout.tsx    # Frame for logged-out pages (HomeHeader + page + Footer)
│   ├── ProtectedRoute.tsx  # Keeps logged-out users out
│   ├── PublicOnlyRoute.tsx # Keeps logged-in users off login and sign-up
│   ├── ChallengeForm.tsx   # Form for creating and editing challenges
│   ├── PostForm.tsx        # Form for creating and editing posts
│   ├── PlanGrid.tsx        # Grid view
│   ├── PlanList.tsx        # List view
│   └── PlanBoard.tsx       # Board view
├── context/                # AuthContext and AuthProvider (login info)
├── hooks/                  # Custom hooks
├── pages/                  # One file per page
├── utils/                  # Helper functions for dates and posts
├── types.ts                # TypeScript labels for users, challenges, and posts
├── App.tsx                 # The map of every page
└── main.tsx                # Starts the app
```

---

## Run it on your computer

### What you need first

- [Node.js](https://nodejs.org/) (version 18 or newer)
- The **backend** running on your computer or online. See the [backend repo](https://github.com/essencenroberts/30days-backend) for setup.

### Steps

**1. Copy the project to your computer**

```bash
git clone [ADD YOUR FRONTEND REPO LINK HERE]
cd [your-frontend-folder-name]
```

**2. Install the packages**

```bash
npm install
```

**3. Create a `.env` file** in the main folder (next to `package.json`) with this line:

```
VITE_API_URL=http://localhost:3010/api
```

This tells the app where the backend lives. To use the live backend instead, use:

```
VITE_API_URL=https://thirtyday-api.onrender.com/api
```

> Your `.env` file is listed in `.gitignore`, so it never gets uploaded to GitHub.

**4. Start the app**

```bash
npm run dev
```

Then open the link it shows, usually http://localhost:5173.

### Other commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the app for development. Changes show up instantly |
| `npm run build` | Checks the TypeScript, then builds the final version into a `dist` folder |
| `npm run preview` | Opens the built version so you can test it before deploying |

---

## Deployment

The frontend is hosted on **Render** as a **Static Site**.

| Setting | Value |
|---|---|
| Build command | `npm install && npm run build` |
| Publish directory | `dist` |
| Environment variable | `VITE_API_URL` = `https://thirtyday-api.onrender.com/api` |
| Rewrite rule | Source `/*` → Destination `/index.html` (Action: Rewrite) |

**Why the rewrite rule?** This is a single-page app, so there's really only one HTML file (`index.html`). React Router decides which page to show. Without the rule, refreshing a page like `/dashboard` makes Render look for a file called `dashboard`, which doesn't exist, so you'd get a "Not Found" error.

---

## What's next

Ideas for future versions:

- Drag and drop posts between columns on the Board
- Upload images and videos to posts
- Invite collaborators to a challenge
- Filter posts by platform or status
- A public landing page

---

## About the developer

Built by **Essence** as the capstone project for the Per Scholas AI-Native Full Stack Development program.

LINKEDIN: [https://linkedin.com/in/essenceroberts]
PORTFOLIO: [https://essence-portfolio.netlify.app/]