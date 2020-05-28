import { Unwrap } from "./unwrap.ts";

interface Is {
  (): boolean;
}

export interface Result<T> {
  readonly state: T;
  readonly unwrap: Unwrap<T>;
  readonly isError: Is;
  readonly isOk: Is;
}

export class Ok<T> {
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

export class Err<T> {
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
