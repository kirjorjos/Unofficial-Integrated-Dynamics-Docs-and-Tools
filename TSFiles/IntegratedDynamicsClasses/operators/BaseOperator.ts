import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "./Operator";

export class BaseOperator<
  I extends IntegratedValue,
  O extends IntegratedValue,
> extends Operator<I, O> {
  static readonly internalName: string;
  nicknames: string[];
  symbol: string;
  interactName: string;
  serializer?: string;

  constructor({
    nicknames,
    parsedSignature,
    symbol,
    interactName,
    function: fn,
    serializer,
  }: {
    nicknames: string[];
    symbol: string;
    interactName: string;
    parsedSignature: ParsedSignature;
    function: TypeLambda<any, any>;
    serializer?: string;
  }) {
    super({ parsedSignature, function: fn });
    this.nicknames = nicknames;
    this.symbol = symbol;
    this.interactName = interactName;
    this.serializer = serializer;
  }

  getUname() {
    return (this.constructor as typeof BaseOperator).internalName;
  }
}
