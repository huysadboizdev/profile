# Bilingual Portfolio Implementation Plan

**Goal:** Add EN/VI controls to all three pages, translate static content and review interactions, and preserve the local-only unpushed preview.

**Architecture:** Keep English in the source HTML as the no-JavaScript fallback. Load a local Vietnamese dictionary and a shared language controller before the existing UI scripts. Cache source text nodes and translatable attributes once, retaining DOM elements, event handlers, input values and links. Dynamic review text uses the same translation API and updates on language changes. Preserve relationship option values in English so translations cannot change validation or storage. Store the chosen locale as an optional browser preference.

**Tech Stack:** Vanilla JavaScript, local translation dictionary, existing static hosting, Node tests and local Playwright checks.

- [x] Add failing tests for supported languages, translations and safe dynamic interpolation.
- [x] Create `i18n-vi.js` and `i18n.js`; add accessible language controls and relative script links to all three HTML pages.
- [x] Translate menu/theme accessibility labels and all review validation, status, rating and moderation messages. Keep submitted names/comments in the author's original language.
- [x] Adapt responsive header spacing and Vietnamese typography. Default to English; language buttons require JavaScript and preserve page state.
- [x] Update README and verify English/Vietnamese on all pages, storage persistence/fallback, responsive layouts, form state and native option values. Run the existing static/browser checks.
- [x] Leave changes uncommitted and unpushed.

The supplied CV PDF remains the original document; changing the website language does not translate its contents.

## Verification result

8 Node tests and 2 static-hosting tests passed. The local browser suites passed 53 bilingual checks, 18 feedback checks and 22 existing portfolio checks, with no browser/resource errors. Vietnamese screenshots were inspected; a textarea placeholder regression was reproduced and corrected. JavaScript syntax and tracked diff checks passed. No commit or push was performed.

Independent code review found a public-host rating hint missed by the dynamic translator. A local intercepted public-host browser test reproduced the issue, and the hint now updates in render() on initial load and language changes. No other actionable review findings.
