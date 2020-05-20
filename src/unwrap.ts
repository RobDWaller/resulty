import { Some, None } from "./some_none.ts";

export interface Unwrap<T> {
  (): T | Some | None;
}