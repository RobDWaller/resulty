import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { ok, Result, some, Err, err, none, Maybe, maybe } from "../mod.ts";

Deno.test("Result Ok String", () => {
  let resultOk: Result<string> = ok<string>("Hello");

  assert(!resultOk.isError());
  assertEquals(resultOk.unwrap(), "Hello");
});

Deno.test("Result Error Some", () => {
  let resultError: Result<Err> = err(some("Fail!"));

  assert(resultError.isError());
  assertEquals(resultError.unwrap(), "Fail!");
});

Deno.test("Result Error None", () => {
  let resultError: Result<Err> = err(none());

  assert(resultError.isError());
});

Deno.test("Maybe Some", () => {
  let maybeSome: Maybe = maybe(some("Hello!"));

  assertEquals(maybeSome.unwrap(), "Hello!");
});

Deno.test("Maybe None", () => {
  let maybeSome: Maybe = maybe(none());

  assertEquals(maybeSome.unwrap(), null);
});