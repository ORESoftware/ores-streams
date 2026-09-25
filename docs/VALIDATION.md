# Validation

Run:

```sh
npm run validate:lifecycle
```

The validator is dependency-free and checks the machine lifecycle declaration against package metadata, human lifecycle/migration/consumer documentation, and the fail-closed legacy-dependency policy. CI runs the same command on pull requests and pushes to `master`.
