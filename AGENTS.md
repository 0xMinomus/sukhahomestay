# Sukha Homestay agent guide

## Scope
This repo is a Vite + React + TypeScript website for Sukha Homestay. Treat `sukha-homestay/` as the source of truth for code, assets, and deploy config.

## Commands
- Install/update deps with npm; `package-lock.json` is authoritative.
- Build check: `npm run build`.
- Lint check: `npm run lint`.
- Local UI smoke: `npm run dev -- --host 127.0.0.1`, then inspect with browser/Playwright.
- Route list, house patterns, exact command outputs and the open-defect list live in `docs/CONTRIBUTING.md`. Read it before changing anything a visitor can see.

## Editing rules
- Source lives in `src/`; public/static deploy files live in `public/`, `index.html`, `vercel.json`.
- Do not edit generated output in `dist/`, dependency folders, or `.code-graph/`.
- Keep content data centralized in `src/data/content.ts` when the same copy/image is reused.
- Reuse existing component patterns in `src/components/` before adding new abstractions.
- Preserve the visual tone: quiet luxury, warm neutral palette, concise hospitality copy.

## Verification
- UI-visible changes need an actual browser smoke against the changed route or component.
- Code/config changes need the narrow command first, then `npm run build` when behavior or imports changed.
- `npm run lint` has a baseline of two known warnings, `src/components/motion.tsx:5` (`only-export-components`, the `EASE` export) and `src/components/Navbar.tsx:46` (`set-state-in-effect`). Do not hide them by loosening rules. A third warning is yours.
- There is no test suite: no `test` script and no test framework. Lint and build are the only automated gates, so a UI-visible change is unproven until someone has looked at it in a browser.

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
- The floor config (userData `munder-difflin/config.json`, not this repo) is `defaultCommand: "omp"` with `godProvider: "custom"`; every hired agent runs the same way on `opencode-zen/space-bunny-free`. `omp` is on PATH at `C:\Users\Andika\.bun\bin\omp.exe` and is the binary the floor actually runs. **An earlier version of this line said `claude` was not installed at all. That is false**: `claude.cmd` is on PATH at `C:\Users\Andika\AppData\Roaming\npm\claude.cmd` and `claude --version` reports `2.1.283 (Claude Code)`, exit 0 (checked 2026-09-26). Having `claude` available does not change which binary the floor uses — `defaultCommand` is `omp`. The config file itself lives in the app's userData directory, not in this repo, so the `defaultCommand` value was not re-verified here; if you need it, read the file, do not repeat this line from memory.
- **Hired agents get the wrong working directory.** All of them default to `docs/munder-difflin/hires`, which is not the project. `npm` walks *up* the folder tree looking for a `package.json`, so from that folder a bare `npm run build` happens to find the repo's and succeeds; from the workspace root `C:\Users\Andika\Documents\SUKHA Homestay`, which has no `package.json` anywhere above it, the same command fails with `npm error code ENOENT` and exit 38 before it reaches the site. The command is neither reliably broken nor reliably fine, which is why it burns people. Never trust a bare `npm` command from a hire: use `npm --prefix "C:\Users\Andika\Documents\SUKHA Homestay\sukha-homestay" run <script>`, read source files by their full path under the repo root, and run `npm prefix` to confirm you are in the right place. If a command fails, report the exact error and stop — an agent that retries a failing command trips the circuit breaker.
- The fifteen hire manifests for this project's floor — one per role in `.omp/agents/`, plus a content/image owner — live in `docs/munder-difflin/hires/`, with the import steps in `docs/munder-difflin/README.md`. Each goal already carries the `--prefix` rule and the absolute repo path, so a hire cannot trip over its own working directory.

## Team agents
- Use `orchestrator` for multi-role planning and delegation.
- Use `scout` for read-only codebase discovery, `task` for implementation, `tester`/`qa-lead` for verification, and `reviewer`/`security-reviewer` for independent review.
- Use `project-lead`, `project-manager`, or `product-owner` when scope, sequencing, or user-visible acceptance needs clarification.
- Use `frontend`, `backend`, `deploy`, or `technical-writer` for the matching specialist slice.
- The main agent remains the integration owner and the only role that commits and pushes after verification.
