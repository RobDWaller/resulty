import { Unwrap } from "./unwrap.ts";

export type Opt<T> = Some<T> | None;

interface Options<T> {
  readonly option: T | null;
  unwrap: Unwrap<T>;
}

export class Some<T> implements Options<T> {
  readonly option: T;

  constructor(option: T) {
    this.option = option;
  }

  unwrap(): T {
    return this.option;
  }
}

export class None implements Options<null> {
  readonly option = null;

  unwrap(): null {
    return this.option;
  }
}
