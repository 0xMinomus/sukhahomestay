# Munder Difflin team for Sukha Homestay

Three hire manifests for the Munder Difflin floor whose folder is this repo, plus the
steps to import them. The floor's orchestrator is `god` (Michael); these three are the
specialists it briefs.

| Manifest | Agent | Owns | Model | Budget |
| --- | --- | --- | --- | --- |
| `hires/oscar-frontend.hire.json` | Oscar | UI, routes, components, responsive, a11y | `opencode/space-bunny-free` | 2,000,000 tokens |
| `hires/pam-content.hire.json` | Pam | Copy in `src/data/content.ts`, image sourcing, `docs/image-sources.md` | `opencode/space-bunny-free` | 2,000,000 tokens |
| `hires/dwight-qa.hire.json` | Dwight | Build/lint gate and browser verification | `opencode/space-bunny-free` | 2,000,000 tokens |

All three run on the free OpenCode Zen model, pinned explicitly. That matters: the
Munder Difflin source notes that with OpenCode and no model pinned, the CLI silently
falls back to whatever it can reach while the app keeps reporting the model you picked.
Pinning `opencode/space-bunny-free` is what makes the card honest.
`opencode-go/space-bunny-free` is the other free id `opencode models` lists, if you
prefer that route.

`isolate: false` on all three, deliberately: they edit disjoint files (components and
pages, one content file, and read-only verification), so a shared worktree avoids merge
overhead and lets the orchestrator see every diff immediately. Turn it on only if two
agents ever need to touch the same file at the same time.

## Before you import — one blocking prerequisite

The app builds each agent's command from the provider preset, and a hire manifest may
only name `claude`, `antigravity`, `codex` or `cursor` — the validator rejects anything
else, `opencode` and `pi` included. These manifests therefore **omit `provider`** and
inherit your default command, so the default has to be the CLI that is actually
installed:

```
config.json (floor)  "defaultCommand": "claude"     <- wrong, not installed
where claude          not found
where pi              C:\Users\Andika\AppData\Roaming\npm\pi.cmd
where opencode        opencode 1.18.32
```

So in **Settings set the default command to `opencode`** first (or `pi`, if you would
rather keep the orchestrator on Pi and only run the workers on OpenCode). Import before
that and every agent will pre-fill with `claude` and fail to start.

## Import

1. **Add agent → import hire…**
2. Select all three files at once from
   `C:\Users\Andika\Documents\SUKHA Homestay\sukha-homestay\docs\munder-difflin\hires\`
3. Review each pre-filled card. The command should read
   `opencode --model opencode/space-bunny-free`. Nothing else is needed: OpenCode has no
   skip-permissions flag, and when the floor's auto mode is on the harness injects
   `permission:allow` into the agent's OpenCode config instead.
4. Set the working directory to the repo root if the modal offers a field for it. The
   floor's own folder is already the repo, so it should default correctly.
5. Spawn. The three appear as separate cards on the floor once each is running.

## How they fit together

`god` owns the board (`hive/board.md`), the ticket ledger (`hive/tasks.json`) and the
commit. None of the three manifests contains a commit, push or git instruction beyond
"never commit, push or run destructive git commands" — the harness is the only thing
that runs git on the floor. None of them touches `hive/`, `roster.json` or
`roster-backups/`; those are app-owned and git-ignored.

The house rules they are briefed on come from `AGENTS.md` at the repo root, so a rule
changed there changes what the floor is told without touching these files.

## Verified

All three manifests were run through the app's own validator
(`src/shared/hire.ts` from the Munder Difflin repo) and returned `ok: true`, with
`model: "opencode/space-bunny-free"` accepted. The same harness confirms the two
constraints: `provider: "opencode"` and `provider: "pi"` are both rejected, as is
`commandFlags: ["--approve"]`.
