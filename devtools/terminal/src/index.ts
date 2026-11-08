// SPDX-License-Identifier: Apache-2.0
// Google Terminal Emulator Configuration & Shell Design System Generator

export interface TerminalTheme {
  name: string;
  background: string;
  foreground: string;
  colors: {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
  };
}

export const GOOGLE_TERMINAL_THEME: TerminalTheme = {
  name: "Google DeepMind Dark",
  background: "#060911",
  foreground: "#F8FAFC",
  colors: {
    black: "#111829",
    red: "#EA4335",
    green: "#34A853",
    yellow: "#FBBC04",
    blue: "#4285F4",
    magenta: "#9B72CB",
    cyan: "#8AB4F8",
    white: "#E2E8F0",
  },
};

export class GoogleTerminalEngine {
  // Generates Alacritty TOML configuration following Google Shell Design System
  generateAlacrittyToml(theme = GOOGLE_TERMINAL_THEME): string {
    return `# Google Bun Sovereign Terminal Configuration (Alacritty TOML)
# Follows Google Shell Design System and Evolving the Google Identity

[window]
padding = { x = 12, y = 10 }
dynamic_padding = true
opacity = 0.96
decorations = "Full"

[font]
size = 11.5

[font.normal]
family = "Google Sans Mono"
style = "Regular"

[font.bold]
family = "Google Sans Mono"
style = "Bold"

[colors.primary]
background = "${theme.background}"
foreground = "${theme.foreground}"

[colors.normal]
black   = "${theme.colors.black}"
red     = "${theme.colors.red}"
green   = "${theme.colors.green}"
yellow  = "${theme.colors.yellow}"
blue    = "${theme.colors.blue}"
magenta = "${theme.colors.magenta}"
cyan    = "${theme.colors.cyan}"
white   = "${theme.colors.white}"

[colors.bright]
black   = "#1E2B45"
red     = "#F28B82"
green   = "#81C995"
yellow  = "#FDD663"
blue    = "#8AB4F8"
magenta = "#D7AEFB"
cyan    = "#AECBFA"
white   = "#FFFFFF"
`;
  }

  // Generates POSIX / Bash PS1 prompt according to Google Shell Style Guide
  generateGooglePromptBash(): string {
    return `#!/bin/bash
# Google Shell Design System - Prompt Configuration (PS1)
# Clean, deterministic, non-distracting, featuring Google 4-color status

G_BLUE='\\[\\033[38;2;66;133;244m\\]'
G_GREEN='\\[\\033[38;2;52;168;83m\\]'
G_YELLOW='\\[\\033[38;2;251;188;4m\\]'
G_RESET='\\[\\033[0m\\]'

export PS1="\${G_BLUE}google-bun\${G_RESET}:\${G_YELLOW}\\w\${G_RESET} \${G_GREEN}❯\${G_RESET} "
`;
  }
}

export const terminal = new GoogleTerminalEngine();
export default terminal;
