# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-08-28
### Fixed
- **UI/UX Friction:** Removed the 1.2-second auto-trigger timeout on the search bar in `/explore` and `/compare`. AI generation is now explicitly triggered via a new inline "Generate AI" button or the `Enter` key.
- **Security False Positives:** Fixed a deployment issue where Netlify's secret scanner falsely flagged Next.js Turbopack cache files.
- **Git History:** Scrubbed hardcoded development API keys from legacy scraping scripts and removed them from git history.

## [1.0.0] - 2026-08-27
### Added
- **Production SEO & Social Sharing:** Added comprehensive OpenGraph and Twitter Card metadata in `layout.tsx`.
- **Search Engine Discovery:** Created dynamic `sitemap.ts` and `robots.ts` for automated Google/Bing indexing.
- **Server-Side Rendering (SSG):** Refactored dynamic routes (`/career/[id]`) to Server Components utilizing `generateStaticParams` for instant edge delivery of 48+ static careers.
- **Custom Error Handling:** Implemented branded `not-found.tsx` and global `error.tsx` boundaries.
- **Spam Protection:** Added hidden honeypot fields to the `/api/feedback` route.
- **Rate Limiting:** Implemented in-memory IP rate limiting on all API routes (Feedback & Gemini AI generation) to prevent abuse and quota exhaustion.
- **Legal Disclaimer:** Added an educational/salary disclaimer to the global footer.

## [0.1.0] - 2026-08-20
### Added
- Initial Next.js App Router initialization.
- Base UI implementation with Tailwind CSS.
- Client-side static career database mapping.
- Radar chart implementation for career comparisons.
