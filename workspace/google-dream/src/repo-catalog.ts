// SPDX-License-Identifier: Apache-2.0
// Google Official Repositories Read-Only Catalog, Upstream Watcher, Candidate Profile & Certification Quizzes

export interface GoogleOfficialRepo {
  name: string;
  url: string;
  localPath: string;
  category: "browser" | "os" | "compiler" | "cloud" | "ai";
  description: string;
}

export const GOOGLE_OFFICIAL_REPOS: GoogleOfficialRepo[] = [
  {
    name: "gvisor",
    url: "https://github.com/google/gvisor.git",
    localPath: "C:/src/google-bun/third_party/gvisor",
    category: "os",
    description:
      "Container runtime sandbox with system call virtualization in Go (Sentry + Gofer LISAFS).",
  },
  {
    name: "abseil-cpp",
    url: "https://github.com/abseil/abseil-cpp.git",
    localPath: "C:/src/google-bun/third_party/abseil-cpp",
    category: "compiler",
    description:
      "C++ common libraries code designed to augment the C++ standard library.",
  },
  {
    name: "googletest",
    url: "https://github.com/google/googletest.git",
    localPath: "C:/src/google-bun/third_party/googletest",
    category: "compiler",
    description: "Google Testing and Mocking Framework.",
  },
  {
    name: "flatbuffers",
    url: "https://github.com/google/flatbuffers.git",
    localPath: "C:/src/google-bun/third_party/flatbuffers",
    category: "compiler",
    description:
      "Memory-efficient zero-copy cross-platform serialization library.",
  },
  {
    name: "jax",
    url: "https://github.com/google/jax.git",
    localPath: "C:/src/google-bun/third_party/jax",
    category: "ai",
    description:
      "Composable transformations of Python+NumPy programs: differentiate, vectorize, JIT to GPU/TPU.",
  },
];

export interface TechnicalQuiz {
  id: string;
  domain: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const GOOGLE_CLOUD_QUIZZES: TechnicalQuiz[] = [
  {
    id: "gcp-q1",
    domain: "Cloud Spanner & TrueTime",
    question:
      "Why does Cloud Spanner require atomic clocks and GPS receivers in each data center?",
    options: [
      "To measure network packet round-trip time with microsecond accuracy",
      "To bound clock uncertainty (epsilon) and guarantee strict external consistency (serializability)",
      "To synchronize CPU cycles across distributed TPU pods",
      "To prevent DDoS attacks by timestamping ingress HTTP headers",
    ],
    correctIndex: 1,
    explanation:
      "TrueTime API provides bounded uncertainty [now - eps, now + eps]. By waiting out 2*eps before committing, Spanner guarantees linearizability without central locks.",
  },
  {
    id: "gcp-q2",
    domain: "gVisor Security Architecture",
    question:
      "How does gVisor protect the host Linux kernel from untrusted container payloads?",
    options: [
      "By running every container in a dedicated KVM hypervisor micro-VM",
      "By translating container syscalls to eBPF bytecode programs",
      "By intercepting syscalls in user space through the Sentry and running filesystem operations in a sandboxed Gofer",
      "By statically analyzing binaries before container boot",
    ],
    correctIndex: 2,
    explanation:
      "gVisor's Sentry acts as an application kernel in user space written in Go, implementing over 300 Linux syscalls without ever delegating raw privileged syscalls to the host kernel.",
  },
  {
    id: "gcp-q3",
    domain: "Chromium V8 & Upstream Bun AoT",
    question:
      "How does Upstream Bun v1.4.4+ AoT compilation complement V8 / JavaScriptCore execution in Google Bun?",
    options: [
      "By replacing HTML with XML",
      "By lowering statically typed TS/JS call graphs into 7-pass SSA IR and compiling native machine code via Cranelift with fat LTO",
      "By disabling garbage collection globally",
      "By running an Electron wrapper around Node.js",
    ],
    correctIndex: 1,
    explanation:
      "Bun AoT lowers pure TypeScript/JavaScript functions into SSA IR, performs 7 optimization passes, and emits native binaries via Cranelift while preserving JSC bytecode fallback for dynamic code.",
  },
];

export interface GoogleCandidateProfile {
  name: string;
  age: number;
  location: string;
  targetRoles: string[];
  targetOffices: string[];
  hiringPillars: Array<"GCA" | "RRK" | "Leadership" | "Googliness">;
  assistiveMission: string;
  flagshipProjects: string[];
}

export const YOHAN_PIERRE_GOOGLE_PARIS_PROFILE: GoogleCandidateProfile = {
  name: "Yohan Pierre",
  age: 23,
  location: "210 Avenue de Lodeve, 34080 Montpellier, France",
  targetRoles: [
    "Software Engineer (L4/L5)",
    "Customer Engineer GCP",
    "Solutions Architect",
  ],
  targetOffices: [
    "Google Cloud Paris (8 Rue de Londres / Velizy)",
    "Googleplex Mountain View (Building 43)",
  ],
  hiringPillars: ["GCA", "RRK", "Leadership", "Googliness"],
  assistiveMission:
    "From compiling Chromium OS & AOSP at 14 in Guadeloupe without Wi-Fi to engineering Stargardt monocular high-contrast WebGPU WGSL shaders, Google Glass / Project Astra assistive interfaces, and sovereign europe-west9 cloud systems.",
  flagshipProjects: [
    "google-bun (Sovereign Google Stack in Upstream Bun v1.4.4+, BOQ, Wiz, M3, TS7, Oxc, gVisor)",
    "gcloud-learn (100% TypeScript Serverless SQLite WAL RAG, WebGPU 3D, europe-west9 Terraform)",
    "carbon & aphrody (Keyless Google AI Ultra bridge, GPUI Zed fork, 139/139 live HTTPS endpoints)",
  ],
};
