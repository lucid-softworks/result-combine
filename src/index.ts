import { ok, type Err, type Result } from "@lucid-softworks/result";

export type CombinedValues<
  TResults extends readonly Result<unknown, unknown>[],
> = {
  -readonly [TKey in keyof TResults]: TResults[TKey] extends Result<
    infer TValue,
    unknown
  >
    ? TValue
    : never;
};

export type CombinedError<
  TResults extends readonly Result<unknown, unknown>[],
> = TResults[number] extends Result<unknown, infer TError> ? TError : never;

/** Combine results, returning the first failure or every success value. */
export function combineResults<
  const TResults extends readonly Result<unknown, unknown>[],
>(
  results: TResults,
): Result<CombinedValues<TResults>, CombinedError<TResults>> {
  const values: unknown[] = [];

  for (const result of results) {
    if (!result.ok) {
      return result as Err<CombinedError<TResults>>;
    }

    values.push(result.value);
  }

  return ok(values as CombinedValues<TResults>);
}
