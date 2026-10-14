---
title: VoxBar
summary: >-
  Privacy-first dictation for macOS: on-device speech recognition, a local LLM
  that cleans up the transcript, and a phone companion. Rust and Tauri.
role: Sole engineer
year: "2026"
status: live
stack: [Rust, Tauri, GGUF]
order: 1
repo: https://github.com/nexiouscaliver/voxbar
hero: images/voxbar-local-ready.png
gallery: [images/voxbar-providers.png, images/voxbar-ja-ready.png]
---

VoxBar started as a fork of [Handy](https://github.com/cjpais/Handy), an
open-source macOS dictation app by cjpais, and grew into a product line of its
own: about 50,000 lines added across the Rust tree, from a local LLM
post-processing pipeline to a phone companion that pairs over the local
network.

The pitch is simple: hold a key, talk, release, and the text lands wherever
your cursor is. Speech recognition runs locally, and an on-device language
model cleans up the raw transcript in an isolated worker process, with
grammar-constrained output and models pinned by hash so nothing can be swapped
underneath you. A small state machine keeps the voice model and the polish
model from ever sitting in memory at the same time. Local models are available
per language, including Arabic, German, Japanese, and Chinese.

The discipline is in the shipping. Nineteen releases went out in five days, up
to four a day at the peak, and every one was byte-verified through a 13-gate
battery and a 944-function test suite before it went out the door. A small
group of daily early users dictates with it today.
