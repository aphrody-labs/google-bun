# 24/7 Autonomous Google Web, DNS & Endpoint Crawler Architecture

## 1. Objectives

- Continuously discover and index endpoints across Google's public and developer web infrastructure.
- Track DNS resolving health across worldwide Google edge POPS.
- Map UI/UX design tokens and Material Web updates directly from `design.google`.
- Maintain real-time `robots.txt` and `llms.txt` specifications for Gemini and LLM indexing.

## 2. Monitored Surface Targets

1. `https://deepmind.google` (AI Research, Gemini, Imagen, Veo models)
2. `https://developers.google.com` (API docs, SDKs, Google Cloud & Android)
3. `https://design.google` (Material Design 3 tokens & case studies)
4. `https://aistudio.google.com` (Gemini API models, prompt engineering, plan limits)
5. `https://cloud.google.com` (Vertex AI, Spanner, BigQuery, Cloud Run, Cloud Functions)

## 3. Crawler Engine Loop

The crawler runs via Bun's event-loop timer with automatic exponential backoff on network jitter. Results are streamed into real-time SQLite/JSON memory tables.
