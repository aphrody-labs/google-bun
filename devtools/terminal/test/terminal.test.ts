// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { terminal, GOOGLE_TERMINAL_THEME } from "../src/index.ts";

describe("google-terminal: Google Terminal Emulator & Shell Design System", () => {
  test("defines authentic Google DeepMind 4-color palette", () => {
    expect(GOOGLE_TERMINAL_THEME.colors.blue).toBe("#4285F4");
    expect(GOOGLE_TERMINAL_THEME.colors.red).toBe("#EA4335");
    expect(GOOGLE_TERMINAL_THEME.colors.yellow).toBe("#FBBC04");
    expect(GOOGLE_TERMINAL_THEME.colors.green).toBe("#34A853");
  });

  test("generates valid Alacritty TOML configuration", () => {
    const toml = terminal.generateAlacrittyToml();
    expect(toml).toContain("[window]");
    expect(toml).toContain("Google Sans Mono");
    expect(toml).toContain("#060911");
    expect(toml).toContain("#4285F4");
  });

  test("generates Google Shell PS1 prompt", () => {
    const bash = terminal.generateGooglePromptBash();
    expect(bash).toContain("PS1=");
    expect(bash).toContain("google-bun");
  });
});
