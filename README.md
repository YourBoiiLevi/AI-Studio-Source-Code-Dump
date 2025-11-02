# AI Studio Source Code Dump

This repository contains the source code of Google AI Studio (aistudio.google.com), extracted, de-obfuscated, and beautified.

## Contents

| Directory | Description | Pipeline Step |
| :--- | :--- | :--- |
| `extracted/` | Raw files extracted directly from the `target.har` file. | `har-extract` |
| `cleaned/` | JavaScript files after initial de-obfuscation and un-minification. | `webcrack` |
| `beautified/` | The final, most human-readable version of the largest JavaScript files after applying variable renaming and code formatting. | `jsnice` |
