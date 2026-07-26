import { err, ok } from "@lucid-softworks/result";
import { describe, expect, expectTypeOf, it } from "vitest";

import { combineResults } from "../src/index.js";

describe("combineResults", () => {
  it("combines success values while preserving tuple types", () => {
    const result = combineResults([ok(42), ok("ready"), ok(true)] as const);

    expect(result).toEqual({ ok: true, value: [42, "ready", true] });
    if (result.ok) {
      expectTypeOf(result.value).toEqualTypeOf<[number, string, boolean]>();
    }
  });

  it("returns the first failure by identity", () => {
    const first = err("first");
    const second = err(new Error("second"));

    expect(combineResults([ok(1), first, second])).toBe(first);
  });

  it("combines an empty list", () => {
    expect(combineResults([])).toEqual({ ok: true, value: [] });
  });
});
