export class Panic extends Error {
  readonly name: string;

  constructor(message: string) {
    super(message);

    this.name = "Panic";
  }
}
