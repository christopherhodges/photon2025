## Photon Website

Next.js marketing site for Photon, hosted on Vercel at [photonhealth.com](https://photonhealth.com).

### Prerequisites
- Node 22.x (matches `engines` in `package.json`)
- npm (ships with Node)

### Environment variables
1) Copy the template: `cp .env.example .env`
2) In Vercel, open Project Settings → Environment Variables and copy the values over.
3) Place them in your local `.env`. Restart the dev server after changes.

### Install and run
```bash
npm install
npm run dev
```
The app runs at http://localhost:3000.

### Useful scripts
- `npm run build` – production build
- `npm run start` – run the built app
- `npm run lint` – lint the codebase
