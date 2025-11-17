export class iString {
  str: string;

  constructor(str: string) {
    this.str = str;
  }

  valueOf(): string {
    return this.str;
  }
}
