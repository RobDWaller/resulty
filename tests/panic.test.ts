import {
  assertStrictEq,
  assertThrows,
} from "https://deno.land/std@0.56.0/testing/asserts.ts";
import { Panic } from "../src/panic.ts";

Deno.test("Instance of Panic", () => {
  const panic = new Panic("Oh no!");

  assertStrictEq(panic instanceof Panic, true);
  assertStrictEq(panic instanceof Error, true);
  assertStrictEq(panic.name, "Panic");
});

Deno.test("Throws Panic", () => {
  assertThrows(
    () => {
      throw new Panic("Oh no!");
    },
    Panic,
    "Oh no!",
  );
});
