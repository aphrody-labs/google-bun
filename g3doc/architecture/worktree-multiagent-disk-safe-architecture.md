# Deep Research & Autonomous Architecture Blueprint: Multi-Language Monorepos & Git Worktrees

**Target Languages**: Rust, Bun / TypeScript, C / C++, Python (`uv`), Go  
**Ecosystem**: Upstream Bun v1.4.4+, Cargo/Rust 2024, Chromium patterns, Autonomous NHITL Agent fleet  
**Host Root**: `C:\src`

---

## 1. Executive Summary & Core Constraints

Operating a multi-agent autonomous fleet across large polyglot monorepos requires solving four foundational challenges:
1. **Disk Contention & Duplication**: `target/`, `node_modules/`, Python virtual environments, and C/C++ object caches can consume 100+ GB per worktree if left uncoordinated.
2. **Locking & Race Conditions**: Parallel AI agents sharing a raw `CARGO_TARGET_DIR` or build lock will deadlock (`Blocking waiting for file lock`).
3. **Absolute Path Fingerprinting**: Compilers embedding full paths (Rust, C++, TypeScript buildinfo) cause cache thrashing across worktrees.
4. **Git Metadata Hygiene**: Worktrees must share git history objects while isolating working trees in a standard, predictable hierarchy.

---

## 2. Multi-Language Worktree & Cache Sharing Matrix

| Ecosystem | Primary Tool | Worktree Disk-Safe Strategy | Global Cache Mechanism | Isolation Invariant |
| :--- | :--- | :--- | :--- | :--- |
| **Rust** | `cargo` (Rust 2024) | Per-worktree `target/` or isolated agent slots | `sccache` (`RUSTC_WRAPPER=sccache`) on `C:\Users\aphro\AppData\Local\Aphrody\cache\sccache` (50 GiB) | Never share raw `CARGO_TARGET_DIR` concurrently between active agents. |
| **TS / JS** | Upstream Bun v1.4.4+ | Isolated workspace `node_modules` per worktree | Bun Global Cache (`~/.bun/install/cache`) + hardlinks/symlinks | Zero `npm`/`pnpm`/`yarn`. Bun executes sub-second installs without network overhead. |
| **C / C++** | MSVC / Clang / CMake | Ninja out-of-source builds (`build/<config>`) | `sccache` C/C++ compiler wrapper (`CMAKE_C_COMPILER_LAUNCHER=sccache`) | Build trees strictly git-ignored; object hashes reused across worktrees. |
| **Python** | `uv` (v0.13.7+) | Ephemeral worktree `.venv` via `uv venv` | Global `uv` cache (`%LOCALAPPDATA%\uv\cache`) hardlinked into `.venv` | Zero pip/virtualenv duplication; instant symlinked wheels. |
| **Go** | Go 1.27+ | Native workspace `go.work` at monorepo root | Shared global `GOCACHE` and `GOMODCACHE` | Worktrees leverage content-addressed Go build cache natively. |

---

## 3. Git Worktree Layout Standard

To prevent workspace clutter and preserve root configuration visibility, all repositories under `C:\src` adhere to the **Embedded Worktree Sandbox** pattern:

```text
C:\src\<repo-name>/
├── .git/                  # Shared object store & ref storage
├── .worktrees/            # Dedicated, git-ignored worktree directory
│   ├── agent-alpha/       # Autonomous Subagent A workspace
│   │   ├── .git           # gitdir file pointing back to main .git/worktrees/...
│   │   ├── target/        # Isolated target dir for Agent Alpha
│   │   └── node_modules/  # Bun workspace symlinks
│   └── agent-beta/        # Autonomous Subagent B workspace
│       ├── .git
│       ├── target/        # Isolated target dir for Agent Beta
│       └── node_modules/
├── crates/ / packages/    # Primary monorepo working tree (main branch)
├── .gitignore             # Includes: .worktrees/, target/, node_modules/, .cache/
└── package.json / Cargo.toml
```

### Git Worktree Lifecycle Commands:
```bash
# 1. Create a dedicated worktree for a parallel task
git worktree add .worktrees/<task-slug> -b <feature-branch>

# 2. Worktree cleanup & object pruning after push
git worktree remove .worktrees/<task-slug>
git worktree prune
```

---

## 4. Multi-Agent Autonomous Automation Script

The following automated orchestration script provides:
- Safe parallel worktree creation for sub-agents.
- Automatic injection of `sccache` environment variables for Rust and C/C++.
- Automated dependency hydration via `bun install` and `uv sync`.
- Disk-safe cleanup, pruning, and verification.

```powershell
# scripts/worktree-manager.ps1
param (
    [Parameter(Mandatory=$true)][string]$RepoPath,
    [Parameter(Mandatory=$true)][string]$AgentId,
    [Parameter(Mandatory=$true)][string]$BranchName,
    [ValidateSet('create', 'remove', 'prune')][string]$Action = 'create'
)

$ErrorActionPreference = 'Stop'
$worktreesDir = Join-Path $RepoPath '.worktrees'
$targetWorktree = Join-Path $worktreesDir $AgentId

switch ($Action) {
    'create' {
        if (-not (Test-Path $worktreesDir)) {
            New-Item -ItemType Directory -Path $worktreesDir -Force | Out-Null
        }
        Write-Host "Creating worktree for $AgentId on branch $BranchName..."
        git -C $RepoPath worktree add $targetWorktree -b $BranchName

        # Setup Compiler & Runtime Environment
        $env:RUSTC_WRAPPER = "sccache"
        $env:SCCACHE_DIR = "$env:LOCALAPPDATA\Aphrody\cache\sccache"

        # Hydrate dependencies using fast global caches
        if (Test-Path (Join-Path $targetWorktree 'package.json')) {
            Write-Host "Hydrating Bun dependencies from global cache..."
            bun install --cwd $targetWorktree --frozen-lockfile
        }
        if (Test-Path (Join-Path $targetWorktree 'pyproject.toml')) {
            Write-Host "Hydrating Python virtual environment via uv..."
            uv sync --project $targetWorktree
        }
        Write-Host "Worktree ready at: $targetWorktree"
    }
    'remove' {
        Write-Host "Removing worktree: $targetWorktree..."
        git -C $RepoPath worktree remove $targetWorktree --force
        git -C $RepoPath worktree prune
        Write-Host "Worktree removed and git references pruned."
    }
    'prune' {
        git -C $RepoPath worktree prune
        Write-Host "All stale worktrees pruned."
    }
}
```

---

## 5. Continuous Disk Health & Autonomous Verification

1. **`sccache` Optimization**: Running `sccache --show-stats` monitors cache hit rates across Rust and C/C++ builds without locking issues.
2. **Zero-Waste Hygiene**:
   - Worktrees are short-lived: created for a specific sub-agent goal, verified via tests, committed, pushed, and immediately removed.
   - Root `.gitignore` in every repository guarantees that `.worktrees/`, `.cache/`, `target/`, and `.tmp/` are never committed.
