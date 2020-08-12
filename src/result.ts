import { Unwrap, Expect } from "./interfaces.ts";
import { Panic } from "./panic.ts";

export interface Result<T> {
  readonly state: T;
  unwrap: Unwrap<T>;
  unwrapErr: Unwrap<T>;
  expect: Expect<T>;
  expectErr: Expect<T>;
  isError(): this is Err<T>;
  isOk(): this is Ok<T>;
}

export class Ok<T> implements Result<T> {
  readonly state: T;

  constructor(state: T) {
    this.state = state;
  }

  unwrap(): T {
    return this.state;
  }

  unwrapErr(): void {
    throw new Panic(String(this.state));
  }

  expect(message: string): T {
    return this.state;
  }
  
  expectErr(message: string): void {
    throw new Panic(message + ": " + String(this.state));
  }

  isError(): this is Err<T> {
    return false;
  }

  isOk(): this is Ok<T> {
    return true;
  }
}

export class Err<T> implements Result<T> {
  readonly state: T;

  constructor(state: T) {
    this.state = state;
  }

  unwrap(): void {
    throw new Panic(String(this.state));
  }

  unwrapErr(): T {
    return this.state;
  }

  expect(message: string): void {
    throw new Panic(message + ": " + String(this.state));
  }

  expectErr(message: string): T {
    return this.state;
  }

  isError(): this is Err<T> {
    return true;
  }

  isOk(): this is Ok<T> {
    return false;
  }
}
