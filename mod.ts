import { Result, Ok, Err } from "./src/result.ts";
import { Opt, None, Some } from "./src/option.ts";

export function some<T>(something: T): Opt<T> {
  return new Some<T>(something);
}

export function none(): Opt<null> {
  return new None();
}
export function ok<T>(result: T): Result<T> {
  return new Ok<T>(result);
}

export function err<T>(error: T): Result<T> {
  return new Err<T>(error);
}

export { Result, Err, Opt };
