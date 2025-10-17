import { IntegratedValue, TypeLambda, TypeRawSignatureAST } from "../types";
import { ParsedSignature } from "../HelperClasses/ParsedSignature";
import { TypeMap } from "../HelperClasses/TypeMap";

export class Operator extends Function {
  fn: (...args: any[]) => any;
  parsedSignature: ParsedSignature;
  typeMap: TypeMap;
  internalName: string;
  nicknames: string[];
  symbol: string;
  interactName: string;
  serializer?: string;

  constructor({
    internalName,
    nicknames,
    parsedSignature,
    rawSignature,
    symbol,
    interactName,
    function: fn,
    serializer,
  }: {
    internalName: string;
    nicknames: string[];
    symbol: string;
    interactName: string;
    function: TypeLambda<any, any>;
    serializer?: string;
  } & (
    | { rawSignature: TypeRawSignatureAST.RawSignatureFunction; parsedSignature?: never }
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
    this.serializer = serializer;
  }

  __call__(...args: any[]) {
    if (args.length !== this.parsedSignature.getArity()) {
      throw new Error(
        `Operator expected ${this.parsedSignature.getArity()} args, got ${args.length}`
      );
    }
    return this.fn(...args);
  }

  apply(arg: IntegratedValue): IntegratedValue {
    const parsedSignature = this.parsedSignature.apply(arg);
    const newFn = (...rest: any[]) => this.fn(arg, ...rest);

  if (this.parsedSignature.getArity() === 1) {
    return this.fn(arg);
  }

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