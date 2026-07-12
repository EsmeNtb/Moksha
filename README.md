# Moksha

**Find your starting point. Free your potential.**

Moksha is a sports discovery and community platform designed to help people find nearby places to play, meet others, join activities, create events and tournaments, and stay connected to the sports they love.

> “Everyone deserves the chance to enjoy the sport they love. Change begins when you know where to start.”

---

## Inspiration

Moksha was inspired by a simple problem: many people want to play sports, meet others, or become more active, but they do not always know where to begin.

Information about local sports spaces is often scattered across social media, outdated on search engines, or hidden inside small communities. Some public courts, parks, gyms, and recreational areas are difficult to discover even when they are close to home.

Moksha turns sports discovery into an exploration experience. Inspired partly by Pokémon, users can discover new places to play, join communities, and unlock new ways to stay active.

The project is built around the idea that sports should be accessible to everyone, regardless of background or social class.

---

## What Moksha Does

Moksha helps users:

- Discover nearby sports venues and recreational spaces
- Browse local activities and community events
- Join or leave events
- Create sports events and tournaments
- View upcoming activities from their profile
- Track hosted events and participant counts
- Explore workout routines and training progress
- Keep sports interests, goals, and profile preferences in one place
- Continue practicing a sport while visiting another city or country

---

## Main Features

### Sports Discovery
Users can explore sports venues by location, activity, and available events.

### Community Events
Users can create and join local sports events. Event information is stored in MongoDB, including venue, date, time, capacity, participants, level, and host information.

### Tournaments
Event creators can classify an activity as a community event or tournament.

### Profiles
Profiles display sports interests, goals, confidence level, upcoming activities, hosted events, and tournament participation.

### Training
The training section includes workout routines and progress tracking. Some training content currently uses demo data as part of the prototype.

### Responsive Interface

The application is designed to work across desktop and mobile layouts with a consistent visual identity.

---

## Built With

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- MongoDB Atlas
- Next.js API Routes
- Lucide React
- Sonner
- Browser localStorage

---

## Project Structure

```text
app/
├── api/
│   ├── events/
│   ├── health/
│   ├── setup/
│   └── venues/
├── auth/
├── dashboard/
├── discover/
├── onboarding/
├── profile/
├── sports/
└── training/

components/
data/
lib/
public/
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd moksha
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create the environment file

Create a file named `.env.local` in the project root:
Note: This Mongo will be deleate it (I'm broke)
```env
MONGODB_URI=mongodb+srv://a01799073_db_user:TQGGsEQKBQzgiwtk@mokshacluster.unxobol.mongodb.net/?appName=MokshaCluster
MONGODB_DB=moksha
```

### 4. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

Create a production build:
```bash
npm run build
```
Start the production server:
```bash
npm run start
```
Do not run `npm run dev` between `npm run build` and `npm run start`, because development mode may replace the `.next` output.

---

## Data Storage
MongoDB Atlas
Local


## Current Prototype Limitations

Moksha is a hackathon prototype, so some features are intentionally simplified:

- Some training routines use demo data
- Image selection uses predefined local assets instead of real uploads
- Authentication is simulated
- Location search is not yet connected to a live maps service
- Community venue verification is not yet implemented
- Messaging and notifications are not included yet

---

## Future Improvements
(੭ ;´ ⌂ `;)੭♡
Future versions of Moksha could include:

- Interactive maps and geolocation
- Real image uploads
- Community venue verification
- Event notifications
- Direct messaging
- Tournament brackets
- Reviews and venue updates
- Advanced fitness analytics
- Personalized sports recommendations
- Partnerships with schools, gyms, sports clubs, and public institutions
- Better visuals
- 100% Connection to a backend

---

## Vision

The long-term goal is for Moksha to become a global sports community where anyone can find a place to move, meet others, and begin their own transformation.

**Find your starting point. Free your potential.**

---
```bash

                 ."-,.__
                 `.     `.  ,
              .--'  .._,'"-' `.
             .    .'         `'
             `.   /          ,'
               `  '--.   ,-"'
                `"`   |  \
                   -. \, |
                    `--Y.'      ___.
                         \     L._, \
               _.,        `.   <  <\                _
             ,' '           `, `.   | \            ( `
          ../, `.            `  |    .\`.           \ \_
         ,' ,..  .           _.,'    ||\l            )  '".
        , ,'   \           ,'.-.`-._,'  |           .  _._`.
      ,' /      \ \        `' ' `--/   | \          / /   ..\
    .'  /        \ .         |\__ - _ ,'` `        / /     `.`.
    |  '          ..         `-...-"  |  `-'      / /        . `.
    | /           |L__           |    |          / /          `. `.
   , /            .   .          |    |         / /             ` `
  / /          ,. ,`._ `-_       |    |  _   ,-' /               ` \
 / .           \"`_/. `-_ \_,.  ,'    +-' `-'  _,        ..,-.    \`.
.  '         .-f    ,'   `    '.       \__.---'     _   .'   '     \ \
' /          `.'    l     .' /          \..      ,_|/   `.  ,'`     L`
|'      _.-""` `.    \ _,'  `            \ `.___`.'"`-.  , |   |    | \
||    ,'      `. `.   '       _,...._        `  |    `/ '  |   '     .|
||  ,'          `. ;.,.---' ,'       `.   `.. `-'  .-' /_ .'    ;_   ||
|| '              V      / /           `   | `   ,'   ,' '.    !  `. ||
||/            _,-------7 '              . |  `-'    l         /    `||
. |          ,' .-   ,' ||               | .-.        `.      .'     ||
 `'        ,'    `".'    |               |    `.        '. -.'       `'
          /      ,'      |               |,'    \-.._,.'/'
          .     /        .               .       \    .''
        .`.    |         `.             /         :_,'.'
          \ `...\   _     ,'-.        .'         /_.-'
           `-.__ `,  `'   .  _.>----''.  _  __  /
                .'        /"'          |  "'   '_
               /_|.-'\ ,".             '.'`__'-( \
                 / ,"'"\,'               `/  `-.|" mh

```
