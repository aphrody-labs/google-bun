# Google Shell Style Guide & Design System

# Based on the official Google Shell Style Guide (https://google.github.io/styleguide/shellguide.html)

# Adapted for Google Bun and native Bun.$ scripts.

## 1. Core Principles

- **Clarity Over Cleverness**: Shell scripts must be deterministic, portable, and readable.
- **Fail Fast**: Always execute under `set -e`, `set -u`, and `set -o pipefail`.
- **Google 4-Color Palette**: Use Google brand colors exclusively for output status:
  - Blue (`#4285F4` / ANSI `38;2;66;133;244`): Headers & Section titles.
  - Green (`#34A853` / ANSI `38;2;52;168;83`): Success & verified checks.
  - Yellow (`#FBBC04` / ANSI `38;2;251;188;4`): Warnings & pending retries.
  - Red (`#EA4335` / ANSI `38;2;234;67;53`): Errors & blocking failures.

## 2. Formatting & Rules

- Indent by 2 spaces. No tabs.
- Quote all variables: `"${MY_VAR}"`.
- Functions must use `snake_case()` with `local` variables:
  ```bash
  my_google_function() {
    local target_url="${1}"
    echo "Processing ${target_url}..."
  }
  ```
- Executables must carry the standard header:
  ```bash
  #!/bin/bash
  # Copyright 2026 Google LLC / Aphrody Labs
  # SPDX-License-Identifier: Apache-2.0
  set -euo pipefail
  ```
