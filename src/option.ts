import { Unwrap } from "./unwrap.ts";

export interface Opt<T> {
  readonly option: T | null;
  readonly unwrap: Unwrap<T>;
}

export class Some<T> {
  readonly option: T;

  constructor(option: T) {
    this.option = option;
  }

  unwrap(): T {
    return this.option;
  }
}

export class None {
  readonly option = null;

  unwrap(): null {
    return this.option;
  }
}
