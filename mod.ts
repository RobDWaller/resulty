/** 
 * The benefit of Options and Result objects is they enable the standardisation
 * of interfaces. This removes the need for mixed return types in code which
 * reduces the need for type checking. And it reduces the need to throw
 * exceptions as errors can be bubbled up.
 * 
 * If a method generates either a string or null instead of returning either
 * of these types you can return an Option object.
 * 
 * If a method can succeed or fail instead of returning a result of type X or a 
 * failure message of type Y you can return a Result object.
 */
import { Result, Ok, Err } from "./src/result.ts";
import { Opt, None, Some } from "./src/option.ts";
export { Panic } from "./src/panic.ts";

/**
 * Returns the Some option containing the value to be returned.
 */
export function some<T>(something: T): Opt<T> {
  return new Some<T>(something);
}

/**
 * Returns the None option when no value is available to return.
 */
export function none(): None {
  return new None();
}

/**
 * Returns the Ok result containing the result value on successful execution of 
 * the parent method.
 */
export function ok<T>(result: T): Result<T> {
  return new Ok<T>(result);
}

/**
 * Returns the Err result containing the error message or value when the parent 
 * method fails to execute.
 */
export function err<T>(error: T): Result<T> {
  return new Err<T>(error);
}

export { Result, Err, Opt, Some, None };
