import {
  assertStrictEq
} from "https://deno.land/std/testing/asserts.ts";
import { ok, Result, some, err, Opt, none, Some, None } from "../mod.ts";

Deno.test("Result Ok String", () => {
  let resultOk: Result<string> = ok<string>("Hello");

  assertStrictEq(resultOk.isError(), false);
  assertStrictEq(resultOk.unwrap(), "Hello");
});

Deno.test("Result Functional Ok String", () => {
  let runResult = function (good: boolean): Result<String> {
    if (good) {
      return ok("Hello");
    }
    return err("Fail!");
  };

  let resultOk = runResult(true);

  assertStrictEq(resultOk.isError(), false);
  assertStrictEq(resultOk.unwrap(), "Hello");
});

Deno.test("Result Functional Ok Integer, Error String", () => {
  let runResult = function (good: boolean): Result<Number | String> {
    if (good) {
      return ok(3);
    }
    return err("Fail!");
  };

  let resultOk = runResult(true);

  assertStrictEq(resultOk.isError(), false);
  assertStrictEq(resultOk.unwrap(), 3);
});

Deno.test("Result Error", () => {
  let resultError: Result<string> = err("Fail!");

  assertStrictEq(resultError.isError(), true);
  assertStrictEq(resultError.unwrap(), "Fail!");
});

Deno.test("Result Functional Error", () => {
  let runResult = function (good: boolean): Result<String> {
    if (good) {
      return ok("Hello");
    }
    return err("Fail!");
  };

  let resultOk = runResult(false);

  assertStrictEq(resultOk.isError(), true);
  assertStrictEq(resultOk.unwrap(), "Fail!");
});

Deno.test("Option Some", () => {
  let maybeSome = function (): Opt<string> {
    return some("Hello!");
  };

  let result = maybeSome();

  assertStrictEq(result.unwrap(), "Hello!");
});

Deno.test("Is instance of Some", () => {
  let maybeSome = function (): Opt<string> {
    return some("Hello!");
  };

  let result = maybeSome();

  assertStrictEq(result instanceof Some, true);
});

Deno.test("Option None", () => {
  let maybeNone = function (): Opt<null> {
    return none();
  };

  let result = maybeNone();

  assertStrictEq(result.unwrap(), null);
});

Deno.test("Option None", () => {
  let maybeNone = function (): Opt<null> {
    return none();
  };

  let result = maybeNone();

  assertStrictEq(result instanceof None, true);
});

Deno.test("Is instance of Some or None", () => {
  let maybeSome = function (name: string): Opt<string> {
    if (name === "Gary") {
      return some("Hello!");
    }

    return none();
  };

  let something = maybeSome("Gary");

  assertStrictEq(something instanceof Some, true);
  
  let nothing = maybeSome("Steve");

  assertStrictEq(nothing instanceof None, true);
});

Deno.test("Result Ok is ok", () => {
  let result = ok("Great!");

  assertStrictEq(result.isOk(), true);
});

Deno.test("Result Err is not ok", () => {
  let result = err("Fail!");

  assertStrictEq(result.isOk(), false);
});
