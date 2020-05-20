import { Unwrap } from "./unwrap.ts";

interface IsError {
  (): boolean;
}

export interface Result<T> {
  readonly state: T;
  readonly unwrap: Unwrap<T>;
  readonly isError: IsError;
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
}
