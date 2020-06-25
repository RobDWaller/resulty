import { Unwrap } from "./unwrap.ts";
import { Is } from "./is.ts";

export type Opt<T> = Some<T> | None;

interface Options<T> {
  readonly option: T | null;
  unwrap: Unwrap<T>;
  isSome: Is;
  isNone: Is;
}

export class Some<T> implements Options<T> {
  readonly option: T;

  constructor(option: T) {
    this.option = option;
  }

  unwrap(): T {
    return this.option;
  }

  isSome(): boolean {
    return true;
  }

  isNone(): boolean {
    return false;
  }
}

export class None implements Options<null> {
  readonly option = null;

  unwrap(): null {
    return this.option;
  }

  isSome(): boolean {
    return false;
  }

  isNone(): boolean {
    return true;
  }
}
