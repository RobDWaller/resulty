import { Unwrap } from "./unwrap.ts";

interface Is {
  (): boolean;
}

export interface Result<T> {
  readonly state: T;
  unwrap: Unwrap<T>;
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
    return this.state;
  }

  isError(): boolean {
    return true;
  }

  isOk(): boolean {
    return false;
  }
}
