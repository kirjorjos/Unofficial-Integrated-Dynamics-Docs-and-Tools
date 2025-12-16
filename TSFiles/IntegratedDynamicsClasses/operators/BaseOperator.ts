import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { Operator } from "./Operator";

export class BaseOperator<
  I extends IntegratedValue,
  O extends IntegratedValue,
> extends Operator<I, O> {
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
    super({ parsedSignature, function: fn });
    this.fn = fn;
    this.typeMap = new TypeMap(parsedSignature.getAST());
    this.parsedSignature = parsedSignature;
    this.internalName = internalName;
    this.nicknames = nicknames;
    this.symbol = symbol;
    this.interactName = interactName;
    this.serializer = serializer;
  }

  evaluate(...args: IntegratedValue[]) {
    const arity = this.parsedSignature.getArity();
    if (args.length !== arity) {
      throw new Error(`Operator expected ${arity} args, got ${args.length}`);
    }

    args = args.reverse();
    let result = this.fn(args.pop() as I) as IntegratedValue;
    while (args.length > 0) {
      result = (result as Operator<IntegratedValue, IntegratedValue>).fn(
        args.pop() as IntegratedValue
      );
    }

    return result;
  }
}
