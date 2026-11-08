#!/usr/bin/env bun
// SPDX-License-Identifier: Apache-2.0
import { terminal } from "./index.ts";

console.log("[Google-Terminal] Emitting Alacritty TOML Configuration:\n");
console.log(terminal.generateAlacrittyToml());
