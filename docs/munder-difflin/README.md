# Munder Difflin team for Sukha Homestay

Fifteen hire manifests for the Munder Difflin floor whose folder is this repo, one per
role in `.omp/agents/`, plus the steps to import them. The floor's orchestrator is `god`
(Michael); these are the specialists it briefs.

| Manifest | Agent | Role | Cast | Model |
| --- | --- | --- | --- | --- |
| `hires/frontend.hire.json` | Frontend | React/TS UI, responsive, a11y, browser-verified changes | oscar | space-bunny-free |
| `hires/backend.hire.json` | Backend | APIs, data contracts, validation, integrations | kevin | space-bunny-free |
| `hires/deploy.hire.json` | Deploy | Build artifacts, Vercel config, git state, release readiness | andy | space-bunny-free |
| `hires/task.hire.json` | Task | Bounded implementation slice, generalist | darryl | space-bunny-free |
| `hires/scout.hire.json` | Scout | Read-only codebase mapping and evidence handoff | stanley | space-bunny-free |
| `hires/tester.hire.json` | Tester | Hands-on CLI/web/responsive/regression runs | kelly | space-bunny-free |
| `hires/qa-lead.hire.json` | QA Lead | Risk-based strategy, acceptance scenarios, release gate | dwight | space-bunny-free |
| `hires/reviewer.hire.json` | Reviewer | Patch-introduced correctness and regressions | jim | space-bunny-free:xhigh |
| `hires/security-reviewer.hire.json` | Security Reviewer | Untrusted input to dangerous sink, CWE evidence | creed | space-bunny-free:xhigh |
| `hires/technical-writer.hire.json` | Technical Writer | Docs, guides, provenance records | phyllis | space-bunny-free |
| `hires/sonic.hire.json` | Sonic | Tightly scoped mechanical edits and renames | tobias | space-bunny-free |
| `hires/product-owner.hire.json` | Product Owner | User value, scope, UX intent, acceptance | meredith | space-bunny-free |
| `hires/project-manager.hire.json` | Project Manager | Ordered plan, dependencies, status | angela | space-bunny-free |
| `hires/project-lead.hire.json` | Project Lead | Scope, architecture, tradeoffs, delivery risk | gareth | space-bunny-free:xhigh |
| `hires/pam-content.hire.json` | Pam | Hospitality copy and real-photo sourcing (no `.omp` role covers this) | pam | space-bunny-free |

Every `description` is the role's own `description` from `.omp/agents/<role>.md`, and every
`goal` is that role's responsibility, method and rules, rewritten against this repo's
real commands, routes and constraints, plus the house block: read `AGENTS.md` first, npm
only, never touch `dist/`, never an AI-generated image, never commit or push, never touch
`hive/`, report to god.

**`orchestrator` is deliberately missing.** The floor already has one, and the hive
protocol makes god the sole orchestrator and the sole scribe of `board.md`; a second
orchestrator would be a protocol violation, not a teammate. `project-lead` is the closest
safe second pair of eyes: it produces the brief, god routes it.

The `:xhigh` suffix goes to the three roles that `.omp` marks `@slow` (reviewer,
security-reviewer, project-lead) — the thinking tier omp supports on the free model, as
`~/.omp/agent/config.yml` already uses for its default role. There is only one free model
available, so the `@smol` / `@task` / `@slow` split collapses onto it; the tier survives
only as reasoning depth.

`isolate: false` on all of them, deliberately: they edit disjoint files, so a shared
worktree avoids merge overhead and lets god see every diff immediately. Turn it on only
when two writers genuinely need the same file at the same time.

## The binary is `omp`, not `pi`

This is the one thing that trips people up on this machine. Two different CLIs are
installed and only one of them is the one you want:

```
where pi        C:\Users\Andika\AppData\Roaming\npm\pi.cmd
                -> @earendil-works/pi-coding-agent 0.85.1  (NOT oh-my-pi, and its
                   `pi models` currently answers "Invalid bearer token")

C:\Users\Andika\.bun\bin\omp.exe
                -> @oh-my-pi/pi-coding-agent 18.3.1  (oh-my-pi; bin name is "omp",
                   not "pi", so nothing called "pi" points at it)
```

oh-my-pi is the one that offers the free model:

```
omp --version            omp/18.3.1
omp models | grep zen    opencode-zen (43)
                         space-bunny-free   1M ctx   minimal..xhigh thinking
```

`omp` also already defaults to that model, so a bare `omp` is enough:

```
~/.omp/agent/config.yml
  modelRoles:
    default: opencode-zen/space-bunny-free:xhigh
    smol:    opencode-zen/space-bunny-free
    memory:  opencode-zen/space-bunny-free
    vision:  opencode-zen/space-bunny-free
```

## Michael on omp too

`omp` is not one of Munder Difflin's provider ids (`claude`, `codex`, `grok`, `kimi`,
`gemini`, `antigravity`, `qwen`, `opencode`, `crush`, `pi`, `copilot`, `cursor`,
`custom`), so the orchestrator runs it as **Custom**. In the app's `config.json`:

```json
{ "defaultCommand": "omp", "godProvider": "custom" }
```

The `custom` preset has no binary of its own, so it falls back to `defaultCommand`,
and `supportsModel: false` means no `--model` is spliced in — which is fine, because
`omp`'s own default is already the free space-bunny at xhigh thinking. Restart the app
and Michael respawns as `omp`.

Two consequences of Custom, both from the app's own preset table:

- **No auto-approve.** The preset's `autoModeFlag` is empty, so the floor's auto mode
  injects nothing. Add `--auto-approve` to Michael's command by hand, or he stops on
  every tool call waiting for you in the terminal.
- **No lifecycle bridge.** `canReceiveInbox: false`, so the router has no drain path
  into his session. Typed messages still reach him (it is a plain PTY), but the
  scheduled missions — the enabled `ops-standup` heartbeat, for one — are the thing
  most likely to go quiet. Check that one still lands after the switch; if it does
  not, put `godProvider` back to `opencode` and keep the three workers on `omp`.

Keeping a bridge and still running `omp` means picking the **Pi** preset and editing
the binary, which is untested: the pi bridge is written against the pi CLI's extension
API, the pi fork of that code is unverified on oh-my-pi, and the preset appends
`--approve`, which `omp` does not know.

So the command every agent on this floor should run is:

```
omp --model opencode-zen/space-bunny-free --auto-approve
```

`--auto-approve` is oh-my-pi's own flag (the pi CLI spells it `--approve`; do not mix
them up). It is what the floor's auto mode would otherwise inject, and it can be
dropped if you would rather approve each tool call by hand in the terminal.

## Import

1. **Add agent → import hire…**
2. Select the manifests you want at once from
   `C:\Users\Andika\Documents\SUKHA Homestay\sukha-homestay\docs\munder-difflin\hires\`
   (all fifteen, or just the ones you want on the floor — you do not need the whole roster
   resident at once).
3. On each pre-filled card set the provider to **Custom** and make the command field read
   `omp --model opencode-zen/space-bunny-free --auto-approve` — drop the `:xhigh` suffix
   from the three reviewer/lead roles if you would rather they think faster. Import
   cannot set the provider for you: the validator only accepts `claude`, `antigravity`,
   `codex` and `cursor`, and it rejects any command flag outside a four-name allowlist
   (`--model`, `--max-turns`, `--output-format`, `--verbose`).
4. **Check the working directory on every card.** The app has been handing new hires the
   `hires/` folder as their cwd, which has no `package.json`: a bare `npm run build` dies
   before it reaches the site, and an agent that retries a failing command trips the
   circuit breaker. Set the field to the repo root if the modal offers it. If it does
   not, that is fine now — every goal in this folder carries the absolute repo path and
   spells npm as `npm --prefix "C:\Users\Andika\Documents\SUKHA Homestay\sukha-homestay"
   run <script>` — but expect the agent's `memory.md` to be written next to the manifests
   rather than into `hive/agents/<id>/`. Those strays are git-ignored, so they cannot be
   committed by accident, but they are a reliable tell that the cwd is not the repo.
5. Spawn.

Picking the **Pi** preset instead and only editing the binary to `omp` is worth a try:
that path keeps Munder Difflin's pi lifecycle bridge, but the bridge is written against
the pi CLI's extension API and has not been verified against the oh-my-pi fork, and the
preset appends `--approve`, which oh-my-pi does not know. Custom is the honest choice
until that is tested.

Already spawned an agent on the wrong binary? Edit the command on its card if the app
offers it; otherwise archive the agent and re-spawn from the manifest. Archiving is
recoverable — the roster keeps archived agents and the app writes a copy of every
roster change into `roster-backups/`.

## How they fit together

`god` owns the board (`hive/board.md`), the ticket ledger (`hive/tasks.json`) and the
commit. No manifest contains a commit, push or git instruction beyond "never commit, push
or run destructive git commands" — the harness is the only thing that runs git on the
floor. None of them touches `hive/`, `roster.json` or `roster-backups/`; those are
app-owned and git-ignored.

The house rules they are briefed on come from `AGENTS.md` at the repo root, so a rule
changed there changes what the floor is told without touching these files.

## Verified

All fifteen manifests were run through the app's own validator (`src/shared/hire.ts` from
the Munder Difflin repo) and returned `ok: true`, with both
`model: "opencode-zen/space-bunny-free"` and the `:xhigh` variant accepted. The same
harness confirms the constraints above: `provider: "opencode"` and `provider: "pi"` are
both rejected, as is `commandFlags: ["--approve"]`.

The earlier character-named manifests (`oscar-frontend`, `dwight-qa`) were removed when
the role-named ones landed, so there is exactly one manifest per role and no duplicate
frontend or QA agent in the import list. Agents already spawned from the old files keep
running; archive the ones that duplicate a role you now spawn.
