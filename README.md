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
- `style.css`: shared responsive layout, system typography, light/dark themes and reduced motion.
- `theme-init.js`: initial theme selection before paint, with storage fallback.
- `script.js`: mobile menu, theme controls, current section and footer year.
- `assets/Ha-Quang-Huy-Full-Stack-Developer-CV.pdf`: the CV supplied by the owner, unchanged.
- `assets/favicon.svg`: local favicon.
- `assets/fonts/manrope-latin.woff2`: retained font asset and OFL license; the current UI uses system fonts.
- `googlefdc08d88884925ad.html`: existing Google verification file, preserved.
- `docs/portfolio-plan.md`: planning document and confirmed profile information.
- `tests/test_site.py`: dependency-free static hosting regression checks.

## Update content

Edit the English source HTML and add matching Vietnamese translations in `i18n-vi.js`, preserving proper names. The graduation result is presented as **Very Good classification** in English and **Giỏi** in Vietnamese; it does not imply a UK degree classification. Keep dates, project scope and job types consistent with the CV. BlueXHome and Love PDF were team projects with three contributors; both frontend and backend contributions are represented. The work at XEPO was part-time, while NETVIET was full-time.

Projects use written summaries, dates, contributions and links to their case studies and websites. Decorative product illustrations have been removed. Backend technology not provided for the NETVIET projects is intentionally not inferred.

The supplied CV currently uses the heading **Backend Developer**. The website follows the owner's requested **Full-stack Developer** positioning. Replace the PDF at the same path when an updated CV is ready.

## Recommendations preview

Open the locally served main page at `http://localhost:8000/#recommendations` to try rating and feedback. Local submissions start as pending; **Preview moderation** is always expanded so entries and approval/removal buttons appear immediately. Only approved entries contribute to the preview average. Empty states do not fabricate ratings or testimonials.

The preview stores feedback in this browser's local storage. If storage is blocked, it keeps entries only for the current page and displays that limitation. Nothing is sent to the owner or shared with other visitors. On public hosts, submission is disabled and preview moderation is hidden; the email recommendation link remains available. This is a UI/interaction preview, not a live feedback service or an authenticated admin interface.

Before enabling real submissions, integrate shared storage with server-side validation, abuse controls and authenticated moderation. Never put privileged backend credentials in client files. `reviews.js` owns this preview's validation, safe text rendering and local state; `reviews.css` contains its independent responsive styles.

## Languages

Use the **EN / VI** buttons in the header on every page. English is the default; the chosen language persists across pages and reloads when browser storage is available. With storage blocked, switching still works on the current page. Without JavaScript, the original English content remains available and the language controls stay hidden.

`i18n.js` translates static text and accessibility labels without replacing DOM elements or modifying form input. Review messages and relationship labels follow the selected language, but submitted comments/names and the original CV PDF are not translated. Both languages use the same system-font stack to render accented characters consistently without remote font requests.

## Verify

```powershell
python -m unittest discover -s tests -v
node --check script.js
node --check theme-init.js
node --check reviews.js
node --check i18n.js
node --check i18n-vi.js
node --test tests/*.test.cjs
git diff --check
```

Check the main page and both case studies on mobile and desktop, including the menu, theme, contact anchors and PDF download. Navigation and core content remain available without JavaScript. No external font, JavaScript CDN or runtime service is required to render the portfolio.
