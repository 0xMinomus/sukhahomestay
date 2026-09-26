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

## Munder Difflin floor
This repo is the folder of a Munder Difflin floor (app 0.5.4, ticket prefix `SHM`). The app writes its runtime into the working tree, and those paths are git-ignored: `hive/`, `roster.json`, `roster-backups/`. `hive/` is its own nested git repo.

- Never edit, stage, or commit `hive/`, `roster.json`, or `roster-backups/`. They are app-owned; the app overwrites them and keeps a write audit in `roster-backups/`.
- The floor's orchestrator is the `god` agent (Michael, provider `custom` on oh-my-pi, cwd = this repo). It is the only scribe of `hive/board.md`, and only the orchestrator may write `hive/spawn-requests/*.json` to start a temp.
- Shared work surfaces: `hive/board.md` (narrative plan), `hive/tasks.json` (ticket ledger, `todo/doing/blocked/done`), `hive/registry.json` + `hive/fleet.json` (roster and live per-agent state), `hive/log.jsonl` (event feed).
- Webhook and Slack setup goes through `hive/connections/requests/<id>.json`; the app answers in `hive/connections/results/<id>.json` and the current picture in `hive/connections/state.json`. See `hive/connections/README.md` for the op list.
- `hive/COMMANDS.md` is the fleet's Claude Code command reference; `hive/PROTOCOL.md` is the messaging and task protocol.
- The floor config (userData `munder-difflin/config.json`, not this repo) is `defaultCommand: "omp"` with `godProvider: "custom"`; every hired agent runs the same way on `opencode/space-bunny-free`. `omp` is on PATH and `claude` is not installed at all. Agents therefore do not need to name a command to start.
- **Hired agents get the wrong working directory.** All of them defaulted to `docs/munder-difflin/hires`, which has no `package.json`, so a bare `npm run build` fails before it reaches the site — and an agent that retries a failing command trips the circuit breaker. Never trust a bare `npm` command from a hire. Use `npm --prefix "C:\Users\Andika\Documents\SUKHA Homestay\sukha-homestay" run <script>`, and read source files by their full path under the repo root.
- The three hire manifests for this project's floor live in `docs/munder-difflin/hires/`, with the import steps in `docs/munder-difflin/README.md`.

## Team agents
- Use `orchestrator` for multi-role planning and delegation.
- Use `scout` for read-only codebase discovery, `task` for implementation, `tester`/`qa-lead` for verification, and `reviewer`/`security-reviewer` for independent review.
- Use `project-lead`, `project-manager`, or `product-owner` when scope, sequencing, or user-visible acceptance needs clarification.
- Use `frontend`, `backend`, `deploy`, or `technical-writer` for the matching specialist slice.
- The main agent remains the integration owner and the only role that commits and pushes after verification.
