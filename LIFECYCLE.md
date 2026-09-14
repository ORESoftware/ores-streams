# Lifecycle contract

`LIFECYCLE.json` is the machine-readable declaration. This file is only a short human index.

- Status: legacy.
- Current architecture authority: no.
- New mutable dependencies: forbidden.
- Existing immutable pins: permitted during migration.
- Compatibility fixes: security and reproducibility only.
- New feature work: forbidden.
- Runtime migration: Node.js core / Web Streams for in-process streaming; `ORESoftware/ores-transport` for ORE service transport.

Run `npm run validate:lifecycle` before merging changes.
