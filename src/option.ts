import { Unwrap } from "./interfaces.ts";
import { Panic } from "./panic.ts";

export type Opt<T> = Some<T> | None;

interface Options<T> {
  readonly option: T | null;
  unwrap: Unwrap<T>;
  unwrapNone: Unwrap<T>;
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

  isSome(): this is Some<null> {
    return false;
  }

  isNone(): this is None {
    return true;
  }
}
