import { assertStrictEq } from "../dev_deps.ts";
import { ok, Result, some, err, Opt, none } from "../mod.ts";

Deno.test("Generic Ok Example", () => {
  const isOk: Result<string> = ok("Hello");

  assertStrictEq(isOk.unwrap(), "Hello");
});

Deno.test("Result Example One", () => {
  const isSandra = function (name: string): Result<string> {
    if (name === "Sandra") {
      return ok("Is Sandra");
    }
    return err("Is not Sandra");
  };

  const geoff = isSandra("Geoff");

  assertStrictEq(geoff.unwrapErr(), "Is not Sandra");

  const sandra = isSandra("Sandra");

  assertStrictEq(sandra.unwrap(), "Is Sandra");
});

Deno.test("Result Example Two", () => {
  const findNumber = function (toFind: number): Result<number | string> {
    const numbers = [1, 4, 6, 7, 21, 33];

    if (numbers.includes(toFind)) {
      return ok(toFind);
    }
    return err(`Number: ${toFind} could not be found.`);
  };

  const found = findNumber(6);

  assertStrictEq(found.unwrap(), 6);

  const notFound = findNumber(9);

  assertStrictEq(notFound.unwrapErr(), "Number: 9 could not be found.");
});

Deno.test("Option Example One", () => {
  const findRecord = function (id: number): Opt<string> {
    let records = [{ id: 1, value: "Hello" }, { id: 13, value: "World" }];

    records = records.filter((item) => {
      return item.id === id;
    });

    if (records.length === 1) {
      return some(records[0].value);
    }

    return none();
  };

  const found = findRecord(13);

  assertStrictEq(found.unwrap(), "World");

  const notFound = findRecord(2);

  assertStrictEq(notFound.unwrapNone(), null);
});

Deno.test("Result Handle Polymorphism Example", () => {
  const isSandra = function (name: string): Result<string> {
    if (name === "Sandra") {
      return ok("Is Sandra");
    }
    return err("Is not Sandra");
  };

  function processResult(result: string): boolean {
    return result === "Is Sandra";
  }

  const geoff: Result<string> = isSandra("Geoff");

  if (geoff.isError()) {
    assertStrictEq(processResult(geoff.unwrapErr()), false);
  }

  const sandra: Result<string> = isSandra("Sandra");

  if (sandra.isOk()) {
    assertStrictEq(processResult(sandra.unwrap()), true);
  }
});

Deno.test("Option Handle Polymorphism Example", () => {
  const hasSandra = function (name: string): Opt<string> {
    if (name === "Sandra") {
      return some("Has Sandra");
    }
    return none();
  };

  function processResult(result: string): boolean {
    return result === "Has Sandra";
  }

  const geoff: Opt<string> = hasSandra("Geoff");

  if (geoff.isNone()) {
    assertStrictEq(geoff.unwrapNone(), null);
  }

  const sandra: Opt<string> = hasSandra("Sandra");

  if (sandra.isSome()) {
    assertStrictEq(processResult(sandra.unwrap()), true);
  }
});