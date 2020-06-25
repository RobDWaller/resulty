import { Unwrap } from "./unwrap.ts";
import { Is } from "./is.ts";
import { Panic } from "./panic.ts";

export interface Result<T> {
  readonly state: T;
  unwrap: Unwrap<T>;
  unwrapErr: Unwrap<T>;
  isError: Is;
  isOk: Is;
}

export class Ok<T> implements Result<T> {
  readonly state: T;

  constructor(state: T) {
    this.state = state;
  }

  unwrap(): T {
    return this.state;
  }

  unwrapErr(): T {
    throw new Panic(String(this.state));
  }

  isError(): boolean {
    return false;
  }

  isOk(): boolean {
    return true;
  }
}

export class Err<T> implements Result<T> {
  readonly state: T;

  constructor(state: T) {
    this.state = state;
  }

  unwrap(): T {
    throw new Panic(String(this.state));
  }

  unwrapErr(): T {
    return this.state;
  }

  isError(): boolean {
    return true;
  }

  isOk(): boolean {
    return false;
  }
}
