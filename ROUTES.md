# RMD Gajanand website

Run from this directory with `npm run dev`, then open http://127.0.0.1:5173.

## Pages

- `/` — Home, solution previews and an animated boundary-wall illustration.
- `/services` — Solutions overview.
- `/services/boundary-walls`, `/services/washrooms`, `/services/rooms` — Individual service details.
- `/projects` — Filterable gallery of the four supplied construction references.
- `/projects/textured-boundary`, `/projects/residential-boundary`, `/projects/garden-boundary`, `/projects/site-perimeter` — Reference details.
- `/success-stories` — Customer story page, awaiting real published stories.
- `/about` — Company introduction and approach.
- `/team` — Founder, CEO and head of management.
- `/careers` and `/careers/apply` — Areas of work and application draft.
- `/book-demo` — Enquiry draft.
- `/login` and `/signup` — Account interface previews.
- `/orders` — Member order introduction.
- `/orders/sample` — Clearly labelled sample installation and payment tracker.
- `/terms` and `/privacy` — Initial policy pages.

Navigation and footer are shared through `app/layout.tsx` and `components/site-shell.tsx`.
Service, project and team content lives in `lib/site-content.ts`.
Images are served from `public/images`, independently of build output.

## Current functionality

Navigation, mobile menu, active links, gallery filters, form validation, local draft save/restore/clear, password visibility, animations and 404 pages work locally.
Animations respect the reduced-motion setting.

Email/password signup and login use MongoDB Atlas (`remdDB`), bcrypt password hashes and a seven-day HTTP-only session cookie. New accounts are `customer` accounts; promote trusted users to `admin` directly in the `users` collection. The protected `/api/projects` endpoints enforce project ownership for customers and allow admins to read and manage every project. Project records store location, dimensions, progress, patti/pillar quantities and photo/video URLs in the `projects` collection.

The Cloudflare Worker connects with the official MongoDB driver. Configure `MONGODB_URI` as a secret in the hosted Site environment before deployment; never expose it to the browser.

Google OAuth, Cloudinary upload handling and an admin management interface are not connected.
Forms do not send enquiries or applications. They save drafts only in this browser and explain that on the page.
Sample order data is illustrative.
