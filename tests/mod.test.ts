import {
  assert,
  assertEquals,
  assertStrictEq,
  AssertionError,
} from "https://deno.land/std/testing/asserts.ts";
import { ok, Result, some, err, Opt, none, Some, None } from "../mod.ts";

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

Deno.test("Result Functional Ok Integer, Error String", () => {
  let runResult = function (good: boolean): Result<Number | String> {
    if (good) {
      return ok(3);
    }
    return err("Fail!");
  };

  let resultOk = runResult(true);

  assert(!resultOk.isError());
  assertEquals(resultOk.unwrap(), 3);
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

Deno.test("Is instance of Some", () => {
  let maybeSome = function (): Opt<string> {
    return some("Hello!");
  };

  let result = maybeSome();

  if (result instanceof Some) {
    assert(true);
  } else {
    throw new AssertionError("Not instance of Some");
  }
});

Deno.test("Option None", () => {
  let maybeNone = function (): Opt<null> {
    return none();
  };

  let result = maybeNone();

  assertEquals(result.unwrap(), null);
});

Deno.test("Option None", () => {
  let maybeNone = function (): Opt<null> {
    return none();
  };

  let result = maybeNone();

  if (result instanceof None) {
    assert(true);
  } else {
    throw new AssertionError("Not instance of None");
  }
});

Deno.test("Is instance of Some or None", () => {
  let maybeSome = function (name: string): Opt<string> {
    if (name === "Gary") {
      return some("Hello!");
    }

    return none();
  };

  let something = maybeSome("Gary");

  if (something instanceof Some) {
    assert(true);
  } else {
    throw new AssertionError("Not instance of Some");
  }
  
  let nothing = maybeSome("Steve");

  if (nothing instanceof None) {
    assert(true);
  } else {
    throw new AssertionError("Not instance of Some");
  }
});

Deno.test("Result Ok is ok", () => {
  let result = ok("Great!");

  assertStrictEq(result.isOk(), true);
});

Deno.test("Result Err is not ok", () => {
  let result = err("Fail!");

  assertStrictEq(result.isOk(), false);
});
