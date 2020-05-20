import { Result, Ok, Err, Failure } from "./src/result.ts";
import { Some, None } from "./src/some_none.ts";
import { Maybe, Opt } from "./src/maybe.ts";

export function some(something: any): any {
  return something;
}

export function none(): null {
  return null;
}

export function maybe(option: Some | None): Maybe {
  return new Opt(option);
}

export function ok<T>(result: T): Result<T> {
  return new Ok<T>(result);
}

export function err(error: Some | None): Result<Err> {
  return new Failure(new Opt(error));
}

export { Result, Err, Maybe };