# Ha Quang Huy — Full-stack Developer Portfolio

A static, responsive portfolio for a Greenwich Vietnam graduate, with professional experience at XEPO and NETVIET, selected project case studies, research contributions and a downloadable CV.

## Run locally

From this repository directory:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000/`. The site also works beneath a project URL such as `/profile/`; all local links are relative.

## Publish with Git

The site needs no build step or npm installation. Keep the existing static hosting configuration. For GitHub Pages configured to serve this branch, publish the repository root containing `index.html`, `style.css`, `script.js`, `theme-init.js`, `assets/` and `projects/`.

Review your changes and then commit/push using your usual Git workflow. Do not change the Pages source to the parent workspace folder: this repository is the inner `profile` directory.

## Files

- `index.html`: main portfolio, experience, projects, skills, education and contact.
- `img/avatar_huy.jpg`: owner's portrait used in the hero; framing is handled in CSS without modifying the original photo.
- `projects/bluexhome.html`, `projects/love-pdf.html`: team project case studies.
- `style.css`: shared blue/navy responsive design, light/dark themes and reduced motion.
- `theme-init.js`: initial theme selection before paint, with storage fallback.
- `script.js`: mobile menu, theme controls, current section and footer year.
- `assets/Ha-Quang-Huy-Full-Stack-Developer-CV.pdf`: the CV supplied by the owner, unchanged.
- `assets/favicon.svg`: local favicon.
- `assets/fonts/manrope-latin.woff2`: locally hosted Manrope font, with its OFL license.
- `googlefdc08d88884925ad.html`: existing Google verification file, preserved.
- `docs/portfolio-plan.md`: planning document and confirmed profile information.
- `tests/test_site.py`: dependency-free static hosting regression checks.

## Update content

Edit the HTML directly. Keep all visible copy in English, while preserving proper names. The graduation result is presented as **Very Good classification**; it does not imply a UK degree classification. Keep dates, project scope and job types consistent with the CV. BlueXHome and Love PDF were team projects with three contributors; both frontend and backend contributions are represented. The work at XEPO was part-time, while NETVIET was full-time.

The featured product visuals are original illustrations, not screenshots of the applications. Real screenshots can replace them when available. Backend technology not provided for the NETVIET projects is intentionally not inferred.

The supplied CV currently uses the heading **Backend Developer**. The website follows the owner's requested **Full-stack Developer** positioning. Replace the PDF at the same path when an updated CV is ready.

## Verify

```powershell
python -m unittest discover -s tests -v
node --check script.js
node --check theme-init.js
git diff --check
```

Check the main page and both case studies on mobile and desktop, including the menu, theme, contact anchors and PDF download. Navigation and core content remain available without JavaScript. No external font, JavaScript CDN or runtime service is required to render the portfolio.
