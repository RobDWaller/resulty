export interface Unwrap<T> {
  (): T | void;
}

export interface Expect<T> {
  (message: string): T | void;
}
