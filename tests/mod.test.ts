import { assertStrictEquals, assertThrows } from "../dev_deps.ts";
import { ok, Result, some, err, Opt, none, Some, None, Panic } from "../mod.ts";

Deno.test("Result Ok String", () => {
  const resultOk: Result<string> = ok<string>("Hello");

  assertStrictEquals(resultOk.isError(), false);
  assertStrictEquals(resultOk.unwrap(), "Hello");
});

Deno.test("Result Functional Ok String", () => {
  const runResult = function (good: boolean): Result<string> {
    if (good) {
      return ok("Hello");
    }
    return err("Fail!");
  };

  const resultOk = runResult(true);

  assertStrictEquals(resultOk.isError(), false);
  assertStrictEquals(resultOk.unwrap(), "Hello");
});

Deno.test("Result Functional Ok Integer, Error String", () => {
  const runResult = function (good: boolean): Result<number | string> {
    if (good) {
      return ok(3);
    }
    return err("Fail!");
  };

  const resultOk = runResult(true);

  assertStrictEquals(resultOk.isError(), false);
  assertStrictEquals(resultOk.unwrap(), 3);
});

Deno.test("Result Error", () => {
  const resultError: Result<string> = err("Fail!");

  assertStrictEquals(resultError.isError(), true);
  assertStrictEquals(resultError.unwrapErr(), "Fail!");
});

Deno.test("Result Functional Error", () => {
  const runResult = function (good: boolean): Result<string> {
    if (good) {
      return ok("Hello");
    }
    return err("Fail!");
  };

  const resultOk = runResult(false);

  assertStrictEquals(resultOk.isError(), true);
  assertStrictEquals(resultOk.unwrapErr(), "Fail!");
});

Deno.test("Option Some", () => {
  const maybeSome = function (): Opt<string> {
    return some("Hello!");
  };

  const result = maybeSome();

  assertStrictEquals(result.unwrap(), "Hello!");
});

Deno.test("Is instance of Some", () => {
  const maybeSome = function (): Opt<string> {
    return some("Hello!");
  };

  const result = maybeSome();

  assertStrictEquals(result instanceof Some, true);
});

Deno.test("Option None", () => {
  const maybeNone = function (): Opt<null> {
    return none();
  };

  const result = maybeNone();

  assertStrictEquals(result instanceof None, true);
  assertStrictEquals(result.unwrapNone(), null);
});

Deno.test("Is instance of Some or None", () => {
  const maybeSome = function (name: string): Opt<string> {
    if (name === "Gary") {
      return some("Hello!");
    }

    return none();
  };

  const something = maybeSome("Gary");

  assertStrictEquals(something instanceof Some, true);

  const nothing = maybeSome("Steve");

  assertStrictEquals(nothing instanceof None, true);
});

Deno.test("Result Ok is ok", () => {
  const result = ok("Great!");

  assertStrictEquals(result.isOk(), true);
});

Deno.test("Result Err is not ok", () => {
  const result = err("Fail!");

  assertStrictEquals(result.isOk(), false);
});

Deno.test("Is Some", () => {
  const isSome = some("Hello");

  assertStrictEquals(isSome.isSome(), true);
  assertStrictEquals(isSome.isNone(), false);
});

Deno.test("Is None", () => {
  const isNone = none();

  assertStrictEquals(isNone.isNone(), true);
  assertStrictEquals(isNone.isSome(), false);
});

Deno.test("Error Unwrap Panics", () => {
  const error = err("Error!");

  assertThrows(
    () => {
      error.unwrap();
    },
    Panic,
    "Error!",
  );
});

Deno.test("Ok Unwrap Error Panics", () => {
  const cool = ok("All Cool");

  assertThrows(
    () => {
      cool.unwrapErr();
    },
    Panic,
    "All Cool",
  );
});

Deno.test("None Unwrap Panics", () => {
  const nothing = none();

  assertThrows(
    () => {
      nothing.unwrap();
    },
    Panic,
    "Cannot unwrap None.",
  );
});

Deno.test("Some Unwrap None Panics", () => {
  const something = some("Something!");

  assertThrows(
    () => {
      something.unwrapNone();
    },
    Panic,
    "Something!",
  );
});

Deno.test("Ok Expects", () => {
  const isOk = ok("All Good!");

  assertStrictEquals(isOk.expect("Is Good!"), "All Good!");
});

Deno.test("Err Expects Panic", () => {
  const isErr = err("Not Error!");

  assertThrows(
    () => {
      isErr.expect("Oh No!");
    },
    Panic,
    "Oh No! Not Error!",
  );
});
