import { Some, None } from "./some_none.ts";
import { Unwrap } from "./unwrap.ts";

interface IsError {
  (): boolean;
}

export interface Err { 
  readonly option: Some | None;
  readonly unwrap: Unwrap<Some | None>;
}

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