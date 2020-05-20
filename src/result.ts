import { Some, None } from "./some_none.ts";
import { Unwrap } from "./unwrap.ts";
import { Maybe } from "./maybe.ts";

interface IsError {
  (): boolean;
}

export type Err = Maybe;

export interface Result<T> {
  readonly state: T | Err;
  readonly unwrap: Unwrap<T>;
  readonly isError: IsError;
}

export class Ok<T> {
  readonly state: T;

  constructor(state: T) {
      this.state = state;
  };

  unwrap(): T {
      return this.state;
  }

  isError(): boolean {
      return false;
  }
}

export class Failure {
  readonly state: Err;

  constructor(state: Err) {
      this.state = state;
  };

  unwrap(): Some | None {
      return this.state.unwrap();
  }

  isError(): boolean {
      return true;
  }
}