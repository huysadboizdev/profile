# Recommendations Preview Implementation Plan

**Goal:** Let the owner review an English star-rating and feedback workflow locally, without committing or pushing.

**Architecture:** Add a dedicated section before Contact and a separate vanilla JavaScript module. The local preview stores submitted feedback in browser storage, marks it pending, and offers explicit preview approval/removal controls. Only approved preview entries count towards the preview average. No invented testimonials, backend, public submission endpoint, or secure admin interface is included.

**Tech Stack:** Static HTML/CSS, native form validation, JavaScript, Node's built-in test runner, existing local Playwright QA.

## Tasks

- [x] Add failing behavioral tests in `tests/reviews.test.cjs` for validation, approved-only averages and safe handling of stored data. Run `node --test tests/reviews.test.cjs` and confirm failure before implementation.
- [x] Add `reviews.js` with exported validation/summary/storage parsing helpers and DOM handlers. Restrict preview submission and moderation to localhost; preserve a clear disabled state on public hosts. Render user text with `textContent`.
- [x] Update `index.html` with navigation, an honest empty state, rating summary, accessible native radio buttons, name/relationship/project/comment fields, consent and status messages. Add preview-only moderation controls.
- [x] Add independent responsive styles in `reviews.css`, respecting existing light/dark tokens and keyboard focus. Include no-JavaScript guidance.
- [x] Document how to preview locally and the remaining shared-storage integration in `README.md`.
- [x] Run Node behavioral tests, existing Python link checks, JavaScript syntax checks and `git diff --check`.
- [x] Run local browser checks for submit/pending/approve/remove/reload, invalid fields, injected markup, corrupt/blocked storage, public-host disabled behavior, keyboard stars, mobile and dark theme. Inspect screenshots.
- [x] Leave all changes uncommitted and unpushed. Deliver a local preview URL and clearly state the browser-only scope.

## Verification result

5 Node behavior tests, 2 static-hosting tests, 18 recommendations browser checks and 22 existing portfolio browser checks passed. JavaScript syntax and tracked diff checks passed. Desktop/mobile light/dark screenshots were inspected. No commit or push was performed.
