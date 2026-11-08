// SPDX-License-Identifier: MIT OR Apache-2.0
import { describe, expect, test } from "bun:test";
import {
  auditNodeBunV8BoringSslCoAbi,
  buildGitImportPatchesPlan,
  CEF_AUTOMATE_WORKFLOW_SPEC,
  compareChromiumVersions,
  computeWorktreeUpstreamHeadRef,
  createEvmConfigProfile,
  ELECTRON_GN_ARGS_HIERARCHY,
  ELECTRON_GN_CHECK_TARGETS,
  ELECTRON_PATCH_CONFIG_TARGETS,
  executeElectronBuildToolsCommand,
  injectPatchLocationMetadata,
  mergeEvmConfigs,
  normalizeExportedPatchContent,
  planChromiumRollerUpdate,
} from "../src/index.ts";

describe("Electron & CEF Chromium Workflows", () => {
  test("validates 13 Electron patch targets and GN check targets", () => {
    expect(ELECTRON_PATCH_CONFIG_TARGETS.length).toBe(13);
    expect(ELECTRON_PATCH_CONFIG_TARGETS[0]?.repo).toBe("src");
    expect(ELECTRON_PATCH_CONFIG_TARGETS[4]?.repo).toBe("src/v8");
    expect(ELECTRON_PATCH_CONFIG_TARGETS[5]?.repo).toBe(
      "src/third_party/electron_node",
    );
    expect(ELECTRON_GN_CHECK_TARGETS).toContain("//electron:electron_lib");
  });

  test("creates and merges EVM configs for testing, release, and canary", () => {
    const testing = createEvmConfigProfile("testing");
    const release = createEvmConfigProfile("release");
    expect(testing.gen.out).toBe("Testing");
    expect(release.gen.out).toBe("Release");
    expect(ELECTRON_GN_ARGS_HIERARCHY.releaseGn.flags.is_official_build).toBe(
      true,
    );

    const merged = mergeEvmConfigs(
      { args: ["--flag-b"], out: "Release" },
      { args: ["--flag-a"], out: "Testing", root: "C:/src/chromium" },
    );
    expect(merged.args).toEqual(["--flag-b", "--flag-a"]);
    expect(merged.out).toBe("Release");
  });

  test("injects and normalizes Patch-Dir and Patch-Filename metadata", () => {
    const rawPatch = [
      "From 1234567890abcdef1234567890abcdef12345678 Mon Sep 17 00:00:00 2001",
      "Subject: [PATCH] feat: expose v8 symbols",
      "",
      "---",
      " v8/BUILD.gn | 2 ++",
      " 1 file changed, 2 insertions(+)",
    ].join("\n");

    const injected = injectPatchLocationMetadata(
      rawPatch,
      "src/electron/patches/v8",
      "expose_v8_symbols.patch",
    );
    expect(injected).toContain("Patch-Dir: src/electron/patches/v8");
    expect(injected).toContain("Patch-Filename: expose_v8_symbols.patch");

    const normalized = normalizeExportedPatchContent(injected);
    expect(normalized.extractedFilename).toBe("expose_v8_symbols.patch");
    expect(normalized.normalizedPatch).toContain(
      "From 0000000000000000000000000000000000000000 Mon Sep 17 00:00:00 2001",
    );
    expect(normalized.normalizedPatch).not.toContain("Patch-Filename:");
  });

  test("builds fast-index git-import-patches plan and upstream-head ref", () => {
    const ref = computeWorktreeUpstreamHeadRef("C:/src/chromium/src/electron/script/lib");
    expect(ref.startsWith("refs/patches/upstream-head-")).toBe(true);

    const plan = buildGitImportPatchesPlan({
      repo: "src/v8",
      patchDir: "src/electron/patches/v8",
      threeway: true,
      dryRun: true,
    });
    expect(plan.fastIndexFlags).toContain("index.skipHash=true");
    expect(plan.fastIndexFlags).toContain("index.version=4");
    expect(plan.gitAmArgs).toContain("--3way");
  });

  test("computes Chromium roller DEPS deltas and audits Node+Bun+V8+BoringSSL Co-ABI", () => {
    expect(compareChromiumVersions("159.0.8140.0", "158.0.8098.12")).toBe(1);
    const roll = planChromiumRollerUpdate({
      branch: "main",
      currentChromiumVersion: "158.0.8098.12",
      targetChannel: "canary",
    });
    expect(roll.upgradeAvailable).toBe(true);
    expect(roll.targetMilestone).toBe(159);

    const abi = auditNodeBunV8BoringSslCoAbi();
    expect(abi.valid).toBe(true);
    expect(abi.v8EmbedderDataArraySize).toBe(40);
    expect(abi.nodeOpensslPath).toBe("//third_party/boringssl");
    expect(CEF_AUTOMATE_WORKFLOW_SPEC.corePatches.length).toBe(5);

    const cliOut = executeElectronBuildToolsCommand("gn-check");
    expect(cliOut.command).toBe("e gn-check");
  });
});
