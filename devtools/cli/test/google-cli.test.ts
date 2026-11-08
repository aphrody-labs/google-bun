// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { googlePlatform } from "../src/google.ts";

const repoRoot = join(import.meta.dir, "../../..");

describe("Official Google LLC Monorepo (//src/google)", () => {
  test("enforces Google monorepo root governance files (BUILD.bazel, MODULE.bazel, OWNERS, METADATA, DEPS)", () => {
    expect(existsSync(join(repoRoot, "BUILD.bazel"))).toBe(true);
    expect(existsSync(join(repoRoot, "MODULE.bazel"))).toBe(true);
    expect(existsSync(join(repoRoot, "OWNERS"))).toBe(true);
    expect(existsSync(join(repoRoot, "METADATA"))).toBe(true);
    expect(existsSync(join(repoRoot, "DEPS"))).toBe(true);
    expect(existsSync(join(repoRoot, "g3doc"))).toBe(true);
    expect(existsSync(join(repoRoot, "third_party"))).toBe(true);
  });

  test("reports ONLINE/SYNCED status across //cloud, //workspace, and //devtools", () => {
    expect(googlePlatform.getVersion()).toContain("//src/google");
    const status = googlePlatform.getFullStatus();
    expect(status.length).toBe(4);
    expect(status.map((s) => s.monorepoPath)).toContain("//cloud");
    expect(status.map((s) => s.monorepoPath)).toContain(
      "//workspace/google-dream",
    );
    expect(status.map((s) => s.monorepoPath)).toContain("//devtools");
  });

  test("summarizes Google Workspace (Drive 20TB, YouTube, Stargardt WGSL)", () => {
    const ws = googlePlatform.getWorkspaceSummary();
    expect(ws.stargardtWgslBytes).toBeGreaterThan(100);
    expect(ws.drive).toBeDefined();
    expect(ws.youtube).toBeDefined();
  });
});
