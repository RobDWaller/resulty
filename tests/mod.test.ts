import {
  assertStrictEq,
} from "https://deno.land/std@0.56.0/testing/asserts.ts";
import { ok, Result, some, err, Opt, none, Some, None } from "../mod.ts";

Deno.test("Result Ok String", () => {
  const resultOk: Result<string> = ok<string>("Hello");

  assertStrictEq(resultOk.isError(), false);
  assertStrictEq(resultOk.unwrap(), "Hello");
});

Deno.test("Result Functional Ok String", () => {
  const runResult = function (good: boolean): Result<string> {
    if (good) {
      return ok("Hello");
    }
    return err("Fail!");
  };

  const resultOk = runResult(true);

  assertStrictEq(resultOk.isError(), false);
  assertStrictEq(resultOk.unwrap(), "Hello");
});

Deno.test("Result Functional Ok Integer, Error String", () => {
  const runResult = function (good: boolean): Result<number | string> {
    if (good) {
      return ok(3);
    }
    return err("Fail!");
  };

  const resultOk = runResult(true);

  assertStrictEq(resultOk.isError(), false);
  assertStrictEq(resultOk.unwrap(), 3);
});

Deno.test("Result Error", () => {
  const resultError: Result<string> = err("Fail!");

  assertStrictEq(resultError.isError(), true);
  assertStrictEq(resultError.unwrap(), "Fail!");
});

Deno.test("Result Functional Error", () => {
  const runResult = function (good: boolean): Result<string> {
    if (good) {
      return ok("Hello");
    }
    return err("Fail!");
  };

  const resultOk = runResult(false);

  assertStrictEq(resultOk.isError(), true);
  assertStrictEq(resultOk.unwrap(), "Fail!");
});

Deno.test("Option Some", () => {
  const maybeSome = function (): Opt<string> {
    return some("Hello!");
  };

  const result = maybeSome();

  assertStrictEq(result.unwrap(), "Hello!");
});

Deno.test("Is instance of Some", () => {
  const maybeSome = function (): Opt<string> {
    return some("Hello!");
  };

  const result = maybeSome();

  assertStrictEq(result instanceof Some, true);
});

Deno.test("Option None", () => {
  const maybeNone = function (): Opt<null> {
    return none();
  };

  const result = maybeNone();

  assertStrictEq(result.unwrap(), null);
});

Deno.test("Option None", () => {
  const maybeNone = function (): Opt<null> {
    return none();
  };

  const result = maybeNone();

  assertStrictEq(result instanceof None, true);
});

Deno.test("Is instance of Some or None", () => {
  const maybeSome = function (name: string): Opt<string> {
    if (name === "Gary") {
      return some("Hello!");
    }

    return none();
  };

  const something = maybeSome("Gary");

  assertStrictEq(something instanceof Some, true);

  const nothing = maybeSome("Steve");

  assertStrictEq(nothing instanceof None, true);
});

Deno.test("Result Ok is ok", () => {
  const result = ok("Great!");

  assertStrictEq(result.isOk(), true);
});

Deno.test("Result Err is not ok", () => {
  const result = err("Fail!");

  assertStrictEq(result.isOk(), false);
});

Deno.test("Is Some", () => {
  const isSome = some("Hello");

  assertStrictEq(isSome.isSome(), true);
  assertStrictEq(isSome.isNone(), false);
});

Deno.test("Is None", () => {
  const isNone = none();

  assertStrictEq(isNone.isNone(), true);
  assertStrictEq(isNone.isSome(), false);
});