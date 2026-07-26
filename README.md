# `@lucid-softworks/result-combine`

Combine a tuple of `Result` values. Successes become a type-preserving value
tuple; the first failure is returned unchanged.

```ts
import { combineResults } from "@lucid-softworks/result-combine";
import { ok } from "@lucid-softworks/result";

combineResults([ok(42), ok("ready")]);
// { ok: true, value: [42, "ready"] }
```
