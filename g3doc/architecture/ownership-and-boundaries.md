# Matrice d'Architecture, Typologie et Ownership de l'Écosystème (2026)

Ce document établit la frontière stricte entre les 5 couches distinctes de l'écosystème :

1. **Outils Internes & Infrastructure Privée** (Mesh, VPS, Tunnels, Bare-metal, Secrets)
2. **Serveurs MCP & Protocoles Machine-to-Machine** (JSON-RPC 2.0, Tool calling, Antigravity, Obscura)
3. **CLI & Plateformes Développeur Spécialisées** (`google-bun`, `gcloud-learn`, `zx-bun`)
4. **CLI & Outils Généralistes Grand Public** (`google.exe`, assistants d'accessibilité)
5. **Portails Web & Vitrines Publiques** (Landing pages, Documentation, Showcase Stargardt)

---

## 1. Cartographie des Responsabilités & Niveaux d'Accès

| Couche            | Nom du Composant                       | Dépôt Local / Scope                     | Audience Cible          | Authentification & Données                  | Rôle Strict                                                    |
| :---------------- | :------------------------------------- | :-------------------------------------- | :---------------------- | :------------------------------------------ | :------------------------------------------------------------- |
| **Infra Privée**  | `@google-bun/google-unified-fabric`    | `packages/google-unified-fabric`        | Admin / Système         | Clés WireGuard, SSH Ed25519, SQLite WAL VPS | Orchestration nœuds, tunnels Cloudflare/GCP, disques RAM       |
| **Infra Privée**  | `yolo-vps` & `yolo-backend`            | `C:/src/yolo-vps`, `yolo-backend`       | Système / Daemons       | Tokens internes, TLS mTLS                   | Services système de fond, stockage local WAL                   |
| **Protocole MCP** | `aphrody-mcp` & `gemini-app-runtime`   | `C:/Users/aphro/.aphrody`, port `:8789` | Modèles d'IA / Agents   | JSON-RPC 2.0 local `127.0.0.1`              | Exposition des outils d'automatisation, DevTools, Win32        |
| **Protocole MCP** | `@google-bun/free-context7`            | `packages/free-context7`                | Agents & CLI            | Base SQLite WAL locale                      | Résolution de documentation AST sans appel externe             |
| **Dev Platform**  | `@google-bun/google-benchmark-sandbox` | `packages/google-benchmark-sandbox`     | Ingénieurs / CI         | Sandbox gVisor / GTS                        | Exécution isolée de code non sécurisé, compilation TS7         |
| **Dev Platform**  | `@google-bun/gcloud-learn`             | `packages/gcloud-learn`                 | Apprenants GCP / Devs   | Cloud Run public / SSO Google               | Entraînement certifications, lab interactif Cloud Paris        |
| **AI & Runtime**  | `@google-bun/carbon`                   | `packages/carbon`                       | Ingénieurs / Agents     | Session locale Google AI Ultra / FFI        | Passerelle Gemini Web & OpenAI, noyaux SIMD Rust FFI Gemma 4   |
| **Grand Public**  | `google.exe` (CLI Omniprésent)         | `src/cli/google.ts`, `dist/google.exe`  | Utilisateur Final       | Zero API Key (session unifiée locale)       | Accès terminal unifié aux services Google (Search, Lens, Live) |
| **Grand Public**  | Assistive Stargardt WebGPU             | `packages/google-dream`                 | Malvoyants / DMLA       | Client WebGPU local shaders                 | Affichage optimisé contraste OLED et zoom oculaire             |
| **Web Public**    | Vitrine & Documentation                | `dist-pages/`, GitHub Pages             | Recruteurs / Communauté | 100% Statique, WCAG AAA                     | Récit de parcours, benchmarks vérifiés, `/llms.txt`            |

---

## 2. Règles d'Isolation et Anti-Contamination

1. **Aucun secret d'infrastructure dans le CLI Grand Public** :
   - `google.exe` ne doit jamais manipuler ou exposer de clés SSH, configurations Nginx ou paramètres de disques RAM du VPS.
   - Les commandes de `google.exe` s'adressent à des flux standards d'utilisation (recherche, multimédia, synthèse vocale, documentation, status utilisateur).

2. **Frontière stricte MCP vs CLI** :
   - Un serveur MCP expose des schemas d'outils formels (`inputSchema`, JSON-RPC 2.0) consommables par des LLMs.
   - Un CLI fournit une boucle REPL ou des commandes de ligne de commande directement utilisables par un humain ou un script shell.

3. **Frontière Statique Publique vs API Privée** :
   - Le portail web (`dist-pages/`, `docs/`) est statique, servi via GitHub Pages ou Cloudflare Pages avec headers COOP/COEP pour WebAssembly.
   - Tout calcul lourd ou accès base de données passe par les services isolés (Cloud Run europe-west9 avec gVisor ou Workers à la périphérie).

---

## 3. Matrice d'Ownership par Dépôt

- **`google-bun`** (`C:/src/google-bun`) : Monorepo central Google consolidé comprenant l'infrastructure de développement, la suite d'outils souverains, le CLI unifié (`google.exe`), `packages/gcloud-learn` (`docs/gcloud-learn`), `packages/google-dream` (`docs/google-dream`), `packages/carbon`, et `third_party/gvisor`.
- **`yolo-web` / `yolo-backend`** : Moteurs de navigation headless (Obscura, Servo) et services réseau sous-jacents.
- **`yolo-vps`** : Déploiement et administration bare-metal (systemd, disques NVMe, routage réseau).
