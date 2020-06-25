import {
  assertStrictEq,
} from "https://deno.land/std@0.56.0/testing/asserts.ts";
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

  assertStrictEq(notFound.unwrapNone(), undefined);
});
