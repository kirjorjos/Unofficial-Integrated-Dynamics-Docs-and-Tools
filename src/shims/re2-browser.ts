export type RE2ExecArray = RegExpExecArray;

export class RE2 extends RegExp {
  constructor(pattern: string | RegExp, flags?: string) {
    super(pattern, flags);
  }
}
