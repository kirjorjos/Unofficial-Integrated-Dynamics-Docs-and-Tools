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
    symbol,
    interactName,
    function: fn,
    serializer,
  }: {
    internalName: string;
    nicknames: string[];
    symbol: string;
    interactName: string;
    parsedSignature: ParsedSignature;
    function: TypeLambda<any, any>;
    serializer?: string;
  }) {
    super("...args", "return this.__call__(...args)");
    this.fn = fn;
    this.typeMap = new TypeMap(parsedSignature.getAST());
    this.parsedSignature = parsedSignature;
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

  override apply(arg: IntegratedValue): IntegratedValue {
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
