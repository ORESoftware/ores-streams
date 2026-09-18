# Migration procedure

1. Identify whether the consumer needs in-process Node streaming or ORE service transport.
2. Pin the existing `alt-streams` dependency to an immutable version or commit before making behavior changes.
3. For in-process streaming, migrate to Node.js core streams or the WHATWG Web Streams API with behavior tests around backpressure, errors, cancellation, and teardown.
4. For service-to-service transport, migrate the operation to `ORESoftware/ores-transport` rather than reproducing the historical stream abstraction.
5. Remove the legacy dependency only after the replacement path passes the consumer's tests.
6. Do not add new compatibility features to this repository during migration.

Cold historical artifacts and tags remain preserved for reproducibility.
