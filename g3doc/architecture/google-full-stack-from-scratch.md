# Recreating the Full Google.com Stack From Scratch (`@google-bun/google-stack`)

This document specifies the architecture of the sovereign **Google.com Full-Stack Engine** implemented in `C:\src\google-bun` and designed to be developed inside **Zed (GPUI)** and **Antigravity IDE 2.0**.

---

## 1. End-to-End Architecture Matrix

| Layer                    | Internal Google Production Stack                                                     | `google-bun` Open Implementation                                                              | Package / Location                         |
| :----------------------- | :----------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- | :----------------------------------------- |
| **Backend RPC & SSR**    | **BOQ** (`boq_*_uiserver`, `batchexecute`, `WIZ_global_data`, `AF_initDataCallback`) | `BoqServerEngine` with `)]}'\n\n` XSSI framing, multiplexed RPCs & `SNlM0e` XSRF              | `packages/google-stack/src/boq.ts`         |
| **Web Frontend Runtime** | **Wiz + Angular Signals** (`jscontroller`, `jsaction`, `jsname`, `jsmodel`)          | `WizResumableRuntime` + `createSignal` / `createComputed` (0 KB eager hydration)              | `packages/google-stack/src/wiz.ts`         |
| **Design System**        | **Material Design 3 (M3)** HCT / Google 4-Color Identity                             | `GOOGLE_M3_DARK_TOKENS` + `docs/design/google-design-system.md`                               | `packages/google-stack/src/ui-compiler.ts` |
| **Multi-Surface UI**     | **Material Web, Android Jetpack Compose, Flutter, Google TV Leanback, Desktop**      | `GoogleMultiSurfaceCompiler` (`json-render` -> Web Wiz, Compose, Flutter, Zed GPUI, TV)       | `packages/google-stack/src/ui-compiler.ts` |
| **Style, Lint & Format** | **`google/gts` + `google/zx` + Style Guides 2026**                                   | `@google-bun/gts-bun` + `@google-bun/zx-bun` + `oxc` (`oxlint`, `tsrs`, `tsgolint`)           | `packages/gts-bun`, `packages/zx-bun`      |
| **Polyglot Runtimes**    | **TypeScript, C++/Rust, Go, Python, Dart**                                           | Upstream Bun v1.4.4+, TS 7 (`tsgo`), Rust 2024 (`gpui`/`oxc`), Go 1.27, Python `uv`, Dart 3.8 | `packages/google-stack/src/polyglot.ts`    |

---

## 2. Coding in Zed & Antigravity IDE 2.0

Open `C:\src\google-bun` in Zed or Antigravity IDE:

- `.zed/settings.json` configures `Google Sans Mono`, 2-space Google indentation, `bun fmt` on save, `oxc-zed` (`type_aware: true`), and `rust-analyzer`.
- `.zed/tasks.json` provides one-keystroke tasks for:
  1. `Google-Bun: Full Pipeline (GTS + Oxc + Tests + Crawler)`
  2. `Google-Bun: Compile Multi-Surface UI (Web/Compose/Flutter/GPUI/TV)`
  3. `Google-Bun: GTS 2026 + Oxc Audit`
