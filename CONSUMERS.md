# Consumer inventory

Inventory date: 2026-09-14.

GitHub code search across the ORESoftware organization found no active dependency reference to `ORESoftware/ores-streams` or the `alt-streams` package outside:

- organization/repository metadata;
- this repository; and
- `ORESoftware/alt-streams`, which is a historical mirror carrying the same package metadata.

That means the current active fleet consumer set is empty. If a consumer is discovered later, add the repository and immutable revision here and in `LIFECYCLE.json` before changing compatibility code.

New consumers are not permitted. Existing historical consumers should pin an immutable package version or commit and migrate to Node.js core/Web Streams for in-process streaming, or `ORESoftware/ores-transport` when the requirement is ORE service transport semantics.
