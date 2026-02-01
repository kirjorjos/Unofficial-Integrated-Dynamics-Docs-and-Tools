import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "./Operator";

export class BaseOperator<
  I extends IntegratedValue,
  O extends IntegratedValue,
> extends Operator<I, O> {
  nicknames: string[];
  symbol: string;
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
    super({ parsedSignature, function: fn, interactName });
    this.nicknames = nicknames;
    this.symbol = symbol;
    this.serializer = serializer;
  }

}
