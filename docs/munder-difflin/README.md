# Munder Difflin team for Sukha Homestay

Three hire manifests for the Munder Difflin floor whose folder is this repo, plus the
steps to import them. The floor's orchestrator is `god` (Michael); these three are the
specialists it briefs.

| Manifest | Agent | Owns | Model | Budget |
| --- | --- | --- | --- | --- |
| `hires/oscar-frontend.hire.json` | Oscar | UI, routes, components, responsive, a11y | `opencode-zen/space-bunny-free` | 2,000,000 tokens |
| `hires/pam-content.hire.json` | Pam | Copy in `src/data/content.ts`, image sourcing, `docs/image-sources.md` | `opencode-zen/space-bunny-free` | 2,000,000 tokens |
| `hires/dwight-qa.hire.json` | Dwight | Build/lint gate and browser verification | `opencode-zen/space-bunny-free` | 2,000,000 tokens |

All three run on the free oh-my-pi model, pinned explicitly rather than left to a
default, so the card and the terminal always agree on what is running.

`isolate: false` on all three, deliberately: they edit disjoint files (components and
pages, one content file, and read-only verification), so a shared worktree avoids merge
overhead and lets the orchestrator see every diff immediately. Turn it on only if two
agents ever need to touch the same file at the same time.

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

So the command every agent on this floor should run is:

```
omp --model opencode-zen/space-bunny-free --auto-approve
```

`--auto-approve` is oh-my-pi's own flag (the pi CLI spells it `--approve`; do not mix
them up). It is what the floor's auto mode would otherwise inject, and it can be
dropped if you would rather approve each tool call by hand in the terminal.

## Import

1. **Add agent → import hire…**
2. Select all three files at once from
   `C:\Users\Andika\Documents\SUKHA Homestay\sukha-homestay\docs\munder-difflin\hires\`
3. On each pre-filled card set the provider to **Custom** and make the command field read
   exactly `omp --model opencode-zen/space-bunny-free --auto-approve`. Import cannot set
   the provider for you: the validator only accepts `claude`, `antigravity`, `codex` and
   `cursor`, and it rejects any command flag outside a four-name allowlist
   (`--model`, `--max-turns`, `--output-format`, `--verbose`).
4. Set the working directory to the repo root if the modal offers a field. The floor's
   own folder is already the repo, so it should default correctly.
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
commit. None of the three manifests contains a commit, push or git instruction beyond
"never commit, push or run destructive git commands" — the harness is the only thing
that runs git on the floor. None of them touches `hive/`, `roster.json` or
`roster-backups/`; those are app-owned and git-ignored.

The house rules they are briefed on come from `AGENTS.md` at the repo root, so a rule
changed there changes what the floor is told without touching these files.

## Verified

All three manifests were run through the app's own validator
(`src/shared/hire.ts` from the Munder Difflin repo) and returned `ok: true`, with
`model: "opencode-zen/space-bunny-free"` accepted. The same harness confirms the
constraints above: `provider: "opencode"` and `provider: "pi"` are both rejected, as is
`commandFlags: ["--approve"]`.
