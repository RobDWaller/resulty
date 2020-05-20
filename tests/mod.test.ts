import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { ok, Result, some, err, Opt, none } from "../mod.ts";

Deno.test("Result Ok String", () => {
  let resultOk: Result<string> = ok<string>("Hello");

  assert(!resultOk.isError());
  assertEquals(resultOk.unwrap(), "Hello");
});

Deno.test("Result Functional Ok String", () => {
  let runResult = function (good: boolean): Result<String> {
    if (good) {
      return ok("Hello");
    }
    return err("Fail!");
  };

  let resultOk = runResult(true);

  assert(!resultOk.isError());
  assertEquals(resultOk.unwrap(), "Hello");
});

Deno.test("Result Error", () => {
  let resultError: Result<string> = err("Fail!");

  assert(resultError.isError());
  assertEquals(resultError.unwrap(), "Fail!");
});

Deno.test("Result Functional Error", () => {
  let runResult = function (good: boolean): Result<String> {
    if (good) {
      return ok("Hello");
    }
    return err("Fail!");
  };

  let resultOk = runResult(false);

  assert(resultOk.isError());
  assertEquals(resultOk.unwrap(), "Fail!");
});

Deno.test("Option Some", () => {
  let maybeSome = function (): Opt<string> {
    return some("Hello!");
  };

  let result = maybeSome();

  assertEquals(result.unwrap(), "Hello!");
});

Deno.test("Option None", () => {
  let maybeNone = function (): Opt<null> {
    return none();
  };

  let result = maybeNone();

  assertEquals(result.unwrap(), null);
});
