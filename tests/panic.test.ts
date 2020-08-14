import { assertStrictEquals, assertThrows } from "../dev_deps.ts";
import { Panic } from "../src/panic.ts";

Deno.test("Instance of Panic", () => {
  const panic = new Panic("Oh no!");

  assertStrictEquals(panic instanceof Panic, true);
  assertStrictEquals(panic instanceof Error, true);
  assertStrictEquals(panic.name, "Panic");
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
