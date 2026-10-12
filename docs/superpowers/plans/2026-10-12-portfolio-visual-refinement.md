# Portfolio Visual Refinement

User request: the UI looked like an AI-generated landing page; review and revise fonts and UI/UX locally, without publishing.

The revised design uses the owner's name, role and specific work as the introduction, with factual section headings instead of slogans. Shared system typography supports both English and Vietnamese. Heading weights/sizes are reduced, body text is larger, gradients and hover movement are removed, and project summaries replace decorative mockups. Experience and skill sections use simple separators instead of repeated floating cards. The existing small avatar, EN/VI switching, theme, CV links and browser-only feedback workflow are preserved.

Review desktop/mobile screenshots and computed typography/contrast, then run existing language, feedback, navigation and link checks. Keep the changes uncommitted and unpushed.

## Verification

Desktop/mobile screenshots were inspected in Vietnamese and project sections in both themes. Computed body and input text are 16px, main desktop heading 40px/600 weight; both languages share the same font stack. Main text, muted text and primary button contrast exceed 4.5:1 in both themes. 8 Node tests, 2 static-link tests, 53 bilingual browser checks, 18 feedback checks and 22 existing portfolio browser checks passed. Independent review found no significant issues. JavaScript syntax and tracked diff checks passed. No commit/push performed.
