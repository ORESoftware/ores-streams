# ores-streams / alt-streams

> **Lifecycle: legacy / compatibility-only.** This repository is not a current ORESoftware architecture authority and must not receive new feature work or new mutable fleet dependencies.

`alt-streams` is an older alternative streaming API for Node.js. Historical tags, commits, and already-published artifacts remain valid for reproducible legacy consumers, but new code should use standard stream primitives or the current ORE transport boundary instead of treating this repository as a shared platform dependency.

## What new consumers should use

- For in-process Node.js streaming, prefer Node.js core streams or the WHATWG Web Streams API.
- For ORE service-to-service transport semantics, use `ORESoftware/ores-transport`.
- There is no declared drop-in replacement for the historical `alt-streams` API; migration should be explicit rather than silently swapping implementations.

## Compatibility policy

Existing consumers may remain pinned to an immutable commit or already-published immutable package version while they migrate. New branch references, moving tags, Git dependencies, submodules, or package-source declarations pointing at this repository are forbidden unless a reviewed legacy-compatibility exception is recorded. Compatibility fixes here are limited to security or reproducibility defects; new features belong in the current owning boundary.

The machine-readable policy is [`LIFECYCLE.json`](./LIFECYCLE.json). `npm run validate:lifecycle` checks that the declaration and this README remain consistent.

## Consumer inventory

A fleet search on 2026-09-14 found no active ORESoftware code dependency on `ores-streams` / `alt-streams`. `ORESoftware/alt-streams` remains as a historical mirror. Organization metadata and repository catalogs may still name this repository and do not count as runtime consumers.

If an active consumer is discovered later, add it to `LIFECYCLE.json`, pin it immutably before migration, and document the target API before changing this repository's retirement state.

## Retirement criterion

This repository is eligible for archive-only treatment when it has no mutable fleet dependencies, no compatibility release has been required for 180 days, and historical tags/artifacts remain preserved. History must not be rewritten or deleted as part of retirement.
