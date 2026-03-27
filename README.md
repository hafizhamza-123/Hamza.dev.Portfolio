# Hamza.dev Portfolio

A production-ready personal portfolio built with Next.js App Router and TypeScript, customized as **Hamza.dev**.

This project presents Muhammad Hamza Baig's profile, services, education and experience, featured projects, skills, and a working contact form with server-side email delivery.

## Snapshot

<img width="2560" height="1649" alt="snapshot" src="https://github.com/user-attachments/assets/a4e72fa9-1020-43e5-953a-88cb03814549" />

<img width="2542" height="1156" alt="snapshot1" src="https://github.com/user-attachments/assets/30a304f5-116a-4f45-bafc-33195e05934b" />

<img width="2544" height="1476" alt="snapshot2" src="https://github.com/user-attachments/assets/698176ab-430e-42cd-9687-b79fa77e1d21" />

## Highlights

- Single-page portfolio flow with section-based navigation (`About`, `Resume`, `Services`, `Projects`, `Contact`)
- Animated, responsive UI with counters, marquees, sliders, and scroll-triggered effects
- Theme switching (dark/light) with localStorage persistence
- Contact form API with:
  - server-side validation
  - anti-spam honeypot field
  - in-memory rate limiting (5 requests / 10 minutes per IP)
  - optional Cloudflare Turnstile verification
  - SMTP email delivery using Nodemailer
- Ready for local development and Vercel deployment

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript, React 18
- **Styling/UI:** Bootstrap 5, custom CSS, Remix Icon, Google Fonts (`Urbanist`, `Playfair Display`, `DM Mono`)
- **Animations & Interaction:** `wowjs`, `swiper`, `react-fast-marquee`, `react-countup`, `isotope-layout`
- **Backend (contact):** Next.js Route Handlers + `nodemailer`
- **Code Quality:** ESLint (`next/core-web-vitals`)

## Project Structure

```text
.
|-- app/
|   |-- api/
|   |   `-- contact/route.ts          # Contact form backend (validation, rate-limit, SMTP)
|   |-- favicon.ico
|   |-- global.css
|   |-- layout.tsx                    # Global metadata, font setup, global CSS imports
|   `-- page.tsx                      # Home page section composition
|-- components/
|   |-- elements/                     # Reusable client utilities/effects
|   |-- layout/                       # Header, footer, menu, wrapper layout
|   `-- sections/                     # About, stats, services, resume, projects, skills, contact
|-- public/
|   `-- assets/                       # Images, fonts, CSS, resume PDF
|-- types/
|   `-- nodemailer.d.ts
|-- .env.local                        # Local SMTP/Contact env vars (not committed)
|-- next.config.mjs
|-- package.json
`-- tsconfig.json
```

## Main Sections (Home)

The homepage is composed in `app/page.tsx` using:

- `Home2` (hero/about)
- `Static2` (stats counters)
- `Service2` (services)
- `Education2` (education + experience)
- `Projects2` (featured project slider)
- `Skills2` (skills + tool stack)
- `Contact2` (contact form + contact details)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create or update `.env.local` in project root:

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=

# Optional (Cloudflare Turnstile)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

### 3) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - build for production
- `npm run start` - run production build
- `npm run lint` - run ESLint checks

## Contact Form Behavior

Endpoint: `POST /api/contact`

Server protections implemented in `app/api/contact/route.ts`:

- Input trimming and required-field validation
- Email format check
- Max length checks per field
- Origin check
- Honeypot field (`website`) spam trap
- IP-based rate limiting
- Optional Turnstile verification (enabled when `TURNSTILE_SECRET_KEY` is set)

Status responses: `success`, `error`, `limited`, `invalid`.

## Customization Guide

- Update site metadata/title: `app/layout.tsx`
- Reorder or replace homepage sections: `app/page.tsx`
- Update nav links and social profiles: `components/layout/header/Header2.tsx`
- Update projects and links: `components/sections/Projects2.tsx`
- Update skills/services/education content: files in `components/sections/`
- Update contact details and form UI: `components/sections/Contact2.tsx`
- Replace resume PDF: `public/assets/imgs/resume/resume.pdf`
- Adjust global visual styles: `public/assets/css/main.css`

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Keep default Next.js build settings.
4. Add all required environment variables in Vercel Project Settings.
5. Deploy.

## Notes

- `.next/` and `node_modules/` are local build/dependency artifacts and should not be documented as source structure.
- Contact form rate limiting is in-memory; for distributed production environments, use a shared store (e.g., Redis) for consistent limits across instances.
