export class iError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "iError";
  }
}
