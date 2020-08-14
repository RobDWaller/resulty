import { Unwrap, Expect } from "./interfaces.ts";
import { Panic } from "./panic.ts";

export type Opt<T> = Some<T> | None;

interface Options<T> {
  readonly option: T | null;
  unwrap: Unwrap<T>;
  unwrapNone: Unwrap<T>;
  expect: Expect<T>;
  expectNone: Expect<T>;
  isSome(): this is Some<T>;
  isNone(): this is None;
}

export class Some<T> implements Options<T> {
  readonly option: T;

  constructor(option: T) {
    this.option = option;
  }

  unwrap(): T {
    return this.option;
  }

  unwrapNone(): void {
    throw new Panic(String(this.option));
  }

  expect(message: string): T {
    return this.option;
  }

  expectNone(message: string): void {
    throw new Panic(message + ": " + String(this.option));
  }

  isSome(): this is Some<T> {
    return true;
  }

  isNone(): this is None {
    return false;
  }
}

export class None implements Options<null> {
  readonly option = null;

  unwrap(): void {
    throw new Panic("Cannot unwrap None.");
  }

  unwrapNone(): null {
    return null;
  }

  expect(message: string): void {
    throw new Panic(message);
  }

  expectNone(message: string): null {
    return null;
  }

  isSome(): this is Some<null> {
    return false;
  }

  isNone(): this is None {
    return true;
  }
}
