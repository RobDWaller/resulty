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
  let runResult = function (good: boolean): Result<string> {
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
  let runResult = function (good: boolean): Result<number | string> {
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
  let runResult = function (good: boolean): Result<string> {
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

Deno.test("Generic Ok Example", () => {
  const isOk: Result<string> = ok("Hello");

  assertStrictEq(isOk.unwrap(), "Hello");
});

Deno.test("Result Example One", () => {
  let isSandra = function (name: string): Result<string> {
    if (name === "Sandra") {
      return ok("Is Sandra");
    }
    return err("Is not Sandra");
  };
  
  let geoff = isSandra("Geoff");
  
  assertStrictEq(geoff.unwrap(), "Is not Sandra");

  let sandra = isSandra("Sandra");
  
  assertStrictEq(sandra.unwrap(), "Is Sandra");
});

Deno.test("Result Example Two", () => {
  let findNumber = function (toFind: number): Result<number | string> {
    let numbers = [1, 4, 6, 7, 21, 33];
    
    if (numbers.includes(toFind)) {
      return ok(toFind);
    }
    return err(`Number: ${toFind} could not be found.`);
  };
  
  let found = findNumber(6);
  
  assertStrictEq(found.unwrap(), 6);

  let notFound = findNumber(9);

  assertStrictEq(notFound.unwrap(), "Number: 9 could not be found.");
});

Deno.test("Option Example One", () => {
  let findRecord = function (id: number): Opt<string> {
    let records = [{id: 1, value: "Hello"}, {id: 13, value: "World"}];
    
    records = records.filter((item) => {
      return item.id === id;
    });

    if (records.length === 1) {
      return some(records[0].value);
    }

    return none();
  };
  
  let found = findRecord(13);
  
  assertStrictEq(found.unwrap(), "World");

  let notFound = findRecord(2);

  assertStrictEq(notFound.unwrap(), null);
});
