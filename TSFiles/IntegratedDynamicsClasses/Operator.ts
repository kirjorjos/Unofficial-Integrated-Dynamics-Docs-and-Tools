import { TypeLambda, TypeOperator } from "../types";
import { ParsedSignature } from "./ParsedSignature";
import { TypeMap } from "./TypeMap";

export class Operator extends Function {
  fn: (...args: any[]) => any;
  parsedSignature: ParsedSignature;
  typeMap: TypeMap;
  internalName: string;
  nicknames: string[];
  symbol: string;
  interactName: string;

  constructor({
    internalName,
    nicknames,
    parsedSignature,
    rawSignature,
    symbol,
    interactName,
    function: fn,
  }: {
    internalName: string;
    nicknames: string[];
    symbol: string;
    interactName: string;
    function: TypeLambda<any, any>;
  } & (
    | { rawSignature: TypeOperator; parsedSignature?: never }
    | { rawSignature?: never; parsedSignature: ParsedSignature }
  )) {
    super("...args", "return this.__call__(...args)");
    this.fn = fn;
    this.typeMap = rawSignature
      ? new TypeMap(rawSignature)
      : new TypeMap(parsedSignature.getAST());
    this.parsedSignature = rawSignature
      ? new ParsedSignature(rawSignature)
      : parsedSignature;
    this.internalName = internalName;
    this.nicknames = nicknames;
    this.symbol = symbol;
    this.interactName = interactName;
  }

  __call__(...args: any[]) {
    if (args.length !== this.parsedSignature.args.length) {
      throw new Error(
        `Operator expected ${this.parsedSignature.args.length} args, got ${args.length}`
      );
    }
    return this.fn(...args);
  }

  apply(arg: any) {
    const parsedSignature = this.parsedSignature.apply(arg);
    const newFn = (...rest: any[]) => this.fn(arg, ...rest);
    return new Operator({
      internalName: this.internalName,
      nicknames: this.nicknames,
      parsedSignature: parsedSignature,
      symbol: this.symbol,
      interactName: this.interactName,
      function: newFn,
    });
  }
}
