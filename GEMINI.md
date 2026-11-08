# GEMINI.md — Google LLC Style Monorepo (`C:\src\google`)

> **Doctrine**: No Human In The Loop (NHITL) | Google Piper / Bazel (`BUILD.bazel`, `MODULE.bazel`, `OWNERS`, `METADATA`) | 100% Upstream Bun v1.4.4+ & Rust 2024

## 1. Architecture & Directory Structure
- `//cloud` (`C:\src\google\cloud`): Google Cloud (`aphrody` project `468000409790`), Vertex AI, Secret Manager, Cloud Run (`europe-west9` / `us-central1`), and Data Agent Kit (DAK).
- `//workspace` (`C:\src\google\workspace`): Google Workspace, OAuth 2.0, Keyless Google AI Ultra Subscription Bridge (`yohanpierre15@gmail.com` -> `aphrody-yolo`).
- `//devtools` (`C:\src\google\devtools`): Chromium M156/M157/M158 DevTools, WebMCP (`navigator.modelContext`), and Bazel/Bun build rules.
- `//g3doc` (`C:\src\google\g3doc`): Canonical design documents and architecture specifications.
- `//third_party` (`C:\src\google\third_party`): Hermetic third-party dependencies (`gVisor`, `Abseil`, `Protobuf`, `BoringSSL`).

## 2. Operating Directives
- Zero emojis in all code, documentation, and commits.
- Concise, factual reporting with clickable `file://` links.
