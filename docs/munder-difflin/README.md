# Munder Difflin team for Sukha Homestay

Three hire manifests for the Munder Difflin floor whose folder is this repo, plus the
steps to import them. The floor's orchestrator is `god` (Michael, provider `pi`); these
three are the specialists it briefs.

| Manifest | Agent | Owns | Model | Budget |
| --- | --- | --- | --- | --- |
| `hires/oscar-frontend.hire.json` | Oscar | UI, routes, components, responsive, a11y | `anthropic/claude-sonnet-4-5` | 2,000,000 tokens |
| `hires/pam-content.hire.json` | Pam | Copy in `src/data/content.ts`, image sourcing, `docs/image-sources.md` | `anthropic/claude-sonnet-4-5` | 2,000,000 tokens |
| `hires/dwight-qa.hire.json` | Dwight | Build/lint gate and browser verification | `anthropic/claude-sonnet-4-5` | 2,000,000 tokens |

`isolate: false` on all three, deliberately: they edit disjoint files (components and
pages, one content file, and read-only verification), so a shared worktree avoids merge
overhead and lets the orchestrator see every diff immediately. Turn it on only if two
agents ever need to touch the same file at the same time.

## Before you import — one blocking prerequisite

The app builds each agent's command from the provider preset, and a hire manifest may
only name `claude`, `antigravity`, `codex` or `cursor` — the validator rejects anything
else, `pi` included. These manifests therefore **omit `provider`** and inherit your
default, and on this machine the default is wrong:

```
config.json (floor)  "defaultCommand": "claude"
where claude          not found
where pi              C:\Users\Andika\AppData\Roaming\npm\pi.cmd
```

So in **Settings set the default command to `pi`** first. Import them before that and
every agent will pre-fill with `claude` and fail to start.

## Import

1. **Add agent → import hire…**
2. Select all three files at once from `C:\Users\Andika\Documents\SUKHA Homestay\sukha-homestay\docs\munder-difflin\hires\`
3. Review each pre-filled card, then fix the command field by hand: the safe-flag
   allowlist in the validator rejects `--approve`, so append it yourself —
   `pi --model anthropic/claude-sonnet-4-5 --approve`, the same command the orchestrator runs.
4. Set the working directory to the repo root if the modal offers a field for it. The
   floor's own folder is already the repo, so it should default correctly.
5. Spawn.

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
(`src/shared/hire.ts` from the Munder Difflin repo) and returned `ok: true`. The same
harness confirms the two constraints above: `provider: "pi"` and
`commandFlags: ["--approve"]` are both rejected, while
`model: "anthropic/claude-sonnet-4-5"` passes.
