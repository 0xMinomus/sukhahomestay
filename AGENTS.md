# Sukha Homestay agent guide

## Scope
This repo is a Vite + React + TypeScript website for Sukha Homestay. Treat `sukha-homestay/` as the source of truth for code, assets, and deploy config.

## Commands
- Install/update deps with npm; `package-lock.json` is authoritative.
- Build check: `npm run build`.
- Lint check: `npm run lint`.
- Local UI smoke: `npm run dev -- --host 127.0.0.1`, then inspect with browser/Playwright.

## Editing rules
- Source lives in `src/`; public/static deploy files live in `public/`, `index.html`, `vercel.json`.
- Do not edit generated output in `dist/`, dependency folders, or `.code-graph/`.
- Keep content data centralized in `src/data/content.ts` when the same copy/image is reused.
- Reuse existing component patterns in `src/components/` before adding new abstractions.
- Preserve the visual tone: quiet luxury, warm neutral palette, concise hospitality copy.

## Verification
- UI-visible changes need an actual browser smoke against the changed route or component.
- Code/config changes need the narrow command first, then `npm run build` when behavior or imports changed.
- `npm run lint` currently reports warnings in existing files; do not hide warnings by loosening rules.

## Git safety
- Push completed work automatically to the configured remote after verification, without waiting for a second confirmation.
- Keep destructive Git commands (`reset --hard`, `clean`, `branch -D`, `restore .`) gated behind explicit user instruction.
- Before pushing, run the narrow relevant verification and inspect `git status --short`; report the commit, branch, remote, and push result.

## MCP and memory
- Project MCP config is `.mcp.json`; root sessions may also use `../.mcp.json`.
- Keep memory minimal: write durable project facts here or in README, not in global memory, unless the user asks for cross-project recall.
