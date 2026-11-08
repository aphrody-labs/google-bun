# Google Engineering Standards, Modern Web & Systems Architecture Reference

Comprehensive compilation of Google Style Guides, developers.google.com standards, Modern Web recommendations, Comprehensive Rust, and Chromium Architectural Patterns for the Google Bun & YOLO ecosystem.

---

## 1. Google Style Guides Core Compilation

### A. TypeScript & JavaScript (GTS / Google TypeScript Style)
*Based on [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)*

1. **Source Organization & Strictness**:
   - Every file must compile under strict flags: `"strict": true`, `"noImplicitAny": true`, `"noUnusedLocals": true`, `"exactOptionalPropertyTypes": true`.
   - Prefer ES modules (`import` / `export`) with explicit path specifiers.
   - Never use `var`. Use `const` by default; use `let` only when re-assignment is required.
   - Explicit return types are required on exported functions and public methods.
2. **Type Safety & Constructs**:
   - Never use `any` unless writing low-level FFI or boundary parsing where an immediate conversion to a known type occurs. Prefer `unknown`.
   - Favor interfaces for public API contracts and object models; use type aliases for unions, primitives, and mapped types.
   - Use `readonly` for immutable properties and arrays (`readonly T[]` or `ReadonlyArray<T>`).
3. **Naming Conventions**:
   - `PascalCase`: Types, interfaces, classes, enums, type parameters (`T`, `TItem`).
   - `camelCase`: Variables, functions, methods, properties.
   - `UPPER_SNAKE_CASE`: Global constants and immutable enum values.

---

### B. Comprehensive Rust (Google Android & Systems Style)
*Based on [Google Comprehensive Rust](https://google.github.io/comprehensive-rust/)*

1. **Safety & Concurrency**:
   - Enforce `#![deny(unsafe_code)]` at crate root unless interfacing with C ABI (`bun:ffi`, win32, or POSIX syscalls).
   - All `unsafe` blocks must have a preceding `// SAFETY:` comment explaining the invariant guarantees.
   - Use RAII and standard traits (`Drop`, `Deref`, `AsRef`) to manage hardware and system resources deterministically.
2. **Error Handling**:
   - Libraries must return typed error enums implementing `std::error::Error` (or `thiserror`). No `unwrap()` in production paths; use `?` or explicit match/expect with descriptive operational context.
3. **Zero-Copy & Memory Layout**:
   - Prefer borrowed slices (`&str`, `&[u8]`, `&[T]`) over owned structures (`String`, `Vec<T>`) across internal module boundaries.
   - Use `#[repr(C)]` for cross-language FFI stability.

---

### C. Chromium Architecture & Multi-Process Model
*Based on Chromium Engineering Practices & Source Architecture*

1. **Process Separation & Sandboxing**:
   - Strict separation between Browser Process (orchestration, I/O, storage, networking) and Renderer/Guest Processes (untrusted JS/HTML execution).
   - Inter-Process Communication (IPC): Use structured messages (Mojo / JSON-RPC / Protobuf) with strong validation on receiver endpoints.
2. **Threading & Task Scheduling**:
   - Never block the UI / Main thread. Offload disk I/O, crypto, and network requests to dedicated task runners or thread pools.
   - Follow the Chromium sequence checker pattern: ensure tasks bound to a specific sequence are never accessed concurrently without locks.
3. **Resource Ownership**:
   - Explicit lifetime ownership semantics (`scoped_refptr`, `std::unique_ptr` equivalents in TS/Rust: `using`, `Drop`, and weak reference cycles prevention).

---

## 2. Modern Web Guidelines & developers.google.com Standards

### A. Core Web Vitals & Web Performance
1. **LCP (Largest Contentful Paint)**: Target `< 2.5s`. Preload critical hero assets, avoid render-blocking scripts, and server-render above-the-fold HTML.
2. **INP (Interaction to Next Paint)**: Target `< 200ms`. Break long tasks into sub-50ms chunks (`scheduler.yield()`, microtask queues), avoid long synchronous layout recalculations.
3. **CLS (Cumulative Layout Shift)**: Target `< 0.1`. Always define explicit `aspect-ratio` or `width`/`height` on images, embeds, and dynamic widgets.

### B. Progressive Web & Architecture (PWA, Edge, Cloud Run)
1. **Offline & Resilient**: Standard service worker caching strategies (stale-while-revalidate for data, cache-first for immutable static assets).
2. **Semantic HTML & Accessibility (A11y)**:
   - Full semantic tag usage (`<main>`, `<nav>`, `<header>`, `<article>`, `<section>`, `<aside>`).
   - Accessible Name & Role parity: All interactive controls have distinct accessible names (`aria-label` or visible text) and conform to WCAG 2.2 AA (minimum 4.5:1 contrast ratio).
3. **Structured Data & SEO**: Schema.org JSON-LD microdata, OpenGraph meta tags, canonical URLs, and valid `robots.txt` / `llms.txt`.

---

## 3. Google Dev Environment Configuration

### Environment Variables & Tooling
```bash
# Google Cloud & Bun Standard Toolchain
GOOGLE_CLOUD_PROJECT=aphrody-paris
GCLOUD_PROJECT=aphrody-paris
NODE_ENV=production
BUN_ENV=production
FORCE_COLOR=1
```

### Editor & Formatting Baseline
- Indentation: 2 spaces (TS/JS/JSON/YAML), 4 spaces (Rust/Python), tabs (Go).
- Line ending: LF (`\n`).
- Encoding: UTF-8 without BOM.
