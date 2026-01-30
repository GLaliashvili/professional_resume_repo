Change Log
==========

2026-01-30
----------
Summary
Fixed resume content dates and typos, updated the footer year and one-pager PDF, and corrected bullet list wrapping so multi-line bullets align with the text instead of the bullet.

Details
- Content: updated Buynomics start date (Oct 2023), Stack Browser CEO end date (Oct 2023), and footer year (2026) in `src/components/Resume.tsx`.
- Copy edits: fixed typos in the Georgia's Innovation & Technology Agency section ("Built" and removed stray punctuation).
- Document: replaced the downloadable one-pager PDF in `public/CV-one-pager.pdf` (and regenerated build output).
- Styling: introduced a custom `.resume-list` utility in `src/index.css` to restore list markers (Tailwind base resets list styles) and ensure wrapped bullet lines align under the text, not the bullet.
- Hygiene: added `.DS_Store` to `.gitignore` to avoid committing macOS metadata.

2026-01-30
----------
Summary
Expanded the Tools & Technical Proficiency skill badges with AI tooling and workflow platforms.

Details
- Content: added LLMs, n8n, Claude Code, and AI Agentic Workflows badges in the Tools & Technical Proficiency section of `src/components/Resume.tsx`.
