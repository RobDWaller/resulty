import { Some, None } from "./some_none.ts";
import { Unwrap } from "./unwrap.ts";

export interface Maybe {
  readonly option: Some | None;
  readonly unwrap: Unwrap<Some | None>;
}

export class Opt {
  readonly option: Some | None;

  constructor(option: Some | None) {
      this.option = option;
  }

  unwrap(): Some | None {
      return this.option;
  }
}