# Homework Helper — Product Requirements Document

---

## Problem Statement
Students learning algebra do not understand inverse operations —
specifically, that solving for x requires moving a number to the
other side of the equals sign with the opposite sign
(e.g., x + 3 = 9 → x = 9 − 3 → x = 6). Without guided hints,
they guess randomly and never build real understanding.

---

## Primary User
A Grade 6–8 student whose algebra content (solving for x with
inverse operations) aligns with middle school curriculum. Works
on math homework at home, often alone or with a parent nearby
but not always available to explain concepts.

---

## User Pain Points
1. **Guesses randomly** when stuck — gets lucky or wrong with no
   understanding of why.
2. **Embarrassment** — too ashamed to ask a parent or teacher for
   help repeatedly.
3. **Frustration and low motivation** — wants to be doing something
   else; homework feels like a wall they can't get past.

---

## Stakeholders
| Stakeholder | Need |
|-------------|------|
| Student | Get unstuck without feeling stupid; understand the *why*; have fun while learning |
| Parent | Trust the tool isn't just giving answers; see their child make real progress |

---

## Research Findings
- Students who guess without feedback do not self-correct —
  they reinforce wrong mental models.
- Embarrassment is a barrier to asking humans for help; a
  private tool removes that barrier.
- Motivation drops sharply when homework feels endless —
  fast, clear hints and rewards keep students engaged.
- Inverse operations ("flip and move") is the #1 conceptual
  gap in early algebra.
- Game mechanics (coins, collectibles, competition) dramatically
  increase time-on-task for this age group (Blooket/Kahoot model).

---

## Interview Questions & Expected Insights
1. **"Show me how you'd solve x + 3 = 9."**
   → Reveals whether the student tries to guess, works
   backwards, or has no strategy at all.

2. **"What do you do when you're totally stuck?"**
   → Confirms guessing vs. giving up vs. asking for help —
   informs what the hint trigger should be.

3. **"How do you feel when you get a math problem wrong?"**
   → Measures embarrassment level; informs hint tone
   (encouraging, not corrective).

4. **"Would you rather the hint tell you the answer or give
   you a clue?"**
   → Validates the no-final-answer design decision.

5. **"What makes you feel good about finishing a math problem?"**
   → Identifies motivational hooks (success messages, step-by-step
   breakdowns, coins, collectibles).

---

## Game Features

### Core Gameplay
- Algebra questions (inverse operations, solving for x)
- Players answer questions in real time during a session
- Correct answer → earn coins + encouraging message
- Wrong answer → show the correct answer + motivational quote
  (e.g., "Not quite — keep going!", "Every mistake is practice!")
- Hints available — show the step, never the final answer

### Multiplayer
- Host creates a game and gets a **room code**
- Other players join by entering the room code (like Kahoot)
- All players answer the same questions simultaneously
- Live leaderboard visible during the game
- Winner announced at the end of the session

### Coins & Market
- Coins earned per correct answer during games
- **Market** where players spend coins on character packs
- Each pack has a theme with characters of different rarities:

| Pack | Theme | Example Rarities |
|------|-------|-----------------|
| Desert | Sand, sun, dunes | Common → Rare → Legendary |
| Sky | Clouds, weather, space | Common → Rare → Legendary |
| Christmas | Holiday, winter | Common → Rare → Legendary |
| Ocean | Sea creatures | Common → Rare → Legendary |
| Forest | Woodland animals | Common → Rare → Legendary |
| *(more packs added in future versions)* | | |

- Rarer characters are visually cooler / more detailed
- Players can display their collected characters on their profile

### Stats Screen
- Total wins
- Total losses
- Win rate (%)
- Total coins earned (all time)
- Total coins spent
- Characters collected / total available

### Authentication
- **Google Sign-In** (via Firebase Authentication)
- All data (coins, stats, collection) saved to user's Google account
- No username/password — one-click Google login only

---

## Technical Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) |
| Auth | Firebase Authentication (Google provider) |
| Database | Firebase Firestore (user profiles, coins, collections, stats) |
| Realtime Multiplayer | Firebase Realtime Database (game sessions, room codes, live answers) |
| Hosting | Firebase Hosting |

### Firebase Setup Required (new project — not yet created)
1. Create a Firebase project at console.firebase.google.com
2. Enable Google Authentication
3. Enable Firestore Database
4. Enable Realtime Database
5. Enable Firebase Hosting
6. Copy config keys into the app

---

## What To Avoid
- Do NOT reveal the final answer as a hint — show the step, not the solution
- Do NOT support subjects other than algebra for V1
- Do NOT use shaming or negative language in wrong-answer feedback
- Do NOT require a username/password — Google login only
- Do NOT allow players to buy specific characters — packs only (random pull)
