# //src/google — Official Google LLC Sovereign Monorepo

Organized strictly according to Google internal (`google3` / `depot_tools` / Bazel `bzlmod`) engineering conventions:

## Directory Hierarchy

| Monorepo Path | Responsibility |
| :--- | :--- |
| [`//BUILD.bazel`](file:///C:/src/google/BUILD.bazel) & [`//MODULE.bazel`](file:///C:/src/google/MODULE.bazel) | Bazel 8 `bzlmod` build graph for C++, Rust, Go, and TypeScript targets |
| [`//OWNERS`](file:///C:/src/google/OWNERS) & [`//METADATA`](file:///C:/src/google/METADATA) | Google `OWNERS` gatekeeping and `devtools/metadata` protobuf descriptor |
| [`//DEPS`](file:///C:/src/google/DEPS) & [`//third_party/`](file:///C:/src/google/third_party) | Chromium `gclient` dependency manifest and `README.chromium` third-party packages |
| [`//cloud/`](file:///C:/src/google/cloud) | Go 1.27 Cloud Run Paris (`europe-west9`) gateway (`//cloud/gateway`), typed GCP SDK (`//cloud/gcp-client`), Cloud Build, Docker & systemd manifests (`//cloud/infra`) |
| [`//workspace/`](file:///C:/src/google/workspace) | Google Drive 20TB sync engine, YouTube curator, and Stargardt WCAG AAA WebGPU shader (`//workspace/google-dream`) |
| [`//devtools/`](file:///C:/src/google/devtools) | Sovereign `google` CLI (`//devtools/cli`), Google Terminal (`//devtools/terminal`), `zx` shell (`//devtools/zx`), GTS 2026 linter (`//devtools/gts`), and GitHub client (`//devtools/github-client`) |
| [`//g3doc/`](file:///C:/src/google/g3doc) | Engineering architecture, design system, and Google Cloud curriculum documentation |

## Cross-Pillar Federation

- **AI & Compute Layer** (`carbon`, `google_bun_wasm`, `gcloud-learn`, `ai-slop-purger`, `benchmark-ml-engine`, `hallucination-cleaner`, `google-unified-fabric`, `google-benchmark-sandbox`) -> [`C:\src\yolo-ai`](file:///C:/src/yolo-ai)
- **Web Crawling, Indexing & Humanizer Layer** (`google-crawler`, `google-indexer`, `modern-web-humanizer`, `cloudflare-edge-worker.ts`) -> [`C:\src\yolo-web`](file:///C:/src/yolo-web)
- **JS/TS Runtime & Chromium Plugins** (`yolo-bun:lighthouse`, `yolo-bun:web-vitals`, `yolo-bun:web-guidelines`, `yolo-bun:google-styleguide`, `yolo-bun:googleapis`, `yolo-bun:google-stack`) -> [`C:\src\yolo-bun`](file:///C:/src/yolo-bun)
