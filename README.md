[![Actions Status](https://github.com/robdwaller/resulty/workflows/ci/badge.svg)](https://github.com/robdwaller/resulty/actions)

# Resulty

Provides simple, Rust-like Result and Option objects for Deno.

## Examples

**Result**
```js
import { Result, ok, err } from "../mod.ts";

let runResult = function (good: boolean): Result<String> {
  if (good) {
    return ok("Hello");
  }
  return err("Fail!");
};

let result = runResult(true);

console.log(result.unwrap());
// Outputs: Hello!
```

**Option**
```js
import { Opt, some } from "../mod.ts";

let optionSome = function (): Opt<string> {
  return some("Hello!");
};

let result = optionSome();

console.log(result.unwrap());
// Outputs: Hello!
```