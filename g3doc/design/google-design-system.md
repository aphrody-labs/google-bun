# Google Bun Design System & Philosophy

# Grounded in "Evolving the Google Identity" and Material Design 3

## 1. Visual Language

The Google visual identity is anchored on four primary colors, balanced by high-contrast dark neutrals:

- **Google Blue** (`#4285F4`): Primary actions, headers, identity core.
- **Google Red** (`#EA4335`): Destructive actions, high-priority errors, vital alerts.
- **Google Yellow** (`#FBBC04`): Pending operations, warnings, attention indicators.
- **Google Green** (`#34A853`): Confirmed states, successful builds, verified telemetry.

## 2. Typography

- **Google Sans**: Display titles, headers, brand lockups.
- **Google Sans Text**: Body copy, descriptions, UI labels.
- **Google Sans Mono**: Code blocks, terminal output, hash strings, telemetry data.

## 3. Terminal & Shell Experience

Terminal outputs must never be noisy or overwhelming.

- Deterministic 4-color status prefixes (``, ``, ``).
- Subdued command execution echoes with ANSI dim rendering.
- Clean box dividers using UTF-8 geometric glyphs (`===`, `───`, ``).
