# Team Cygnus website

## Run locally

Install a current Node.js LTS release, then run:

```bash
npm install
npm run dev
```

Create an optimized production build with `npm run build`.

## Assets

All supplied media belongs under `public/assets` and is deliberately optional while the site is being designed:

- Logo: `public/assets/branding/cygnus-logo.png`
- Rocket deployment video: `public/assets/rocket/rocket-deployment.mp4`
- Rocket artwork/layers: `public/assets/rocket/`
- CanSat deployment video: `public/assets/cansat/cansat-deployment.mp4`
- CanSat artwork/layers: `public/assets/cansat/`

Until real media is installed, the application renders coherent technical illustration fallbacks. Update the video source in `src/main.tsx` once the files are supplied; the `Deployment` component is the only location needed for deployment media. The logo can replace the `Mark` component in the same file.

## Content updates

- Update project names, descriptions, and project URLs in the `projects` array at the top of `src/main.tsx`.
- Update mission, team, contact, social, and location copy in `TeamGallery` and `Footer` in `src/main.tsx`.
- The app is intentionally a clean single-page component structure for this first implementation; sections are named functions and can be split into `src/components/` without changing behavior as the real assets and content arrive.
