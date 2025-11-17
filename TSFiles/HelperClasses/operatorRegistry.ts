import { Operator } from "IntegratedDynamicsClasses/Operator";
import { ParsedSignature } from "./ParsedSignature";
import { TypeMap } from "./TypeMap";

type operatorDataStructure = {
  internalName: string;
  nicknames: string[];
  symbol: string;
  parsedSignature: TypeRawSignatureAST.RawSignatureFunction;
  interactName: string;
  function: TypeLambda<any, any>;
  serializer?: string;
};

export class OperatorRegistry {
  data: Record<string, Operator>;

  constructor() {
    this.data = {};
  }

  register(
    k: string,
    {
      internalName,
      nicknames,
      symbol,
      parsedSignature,
      interactName,
      function: Function,
      serializer,
    }: operatorDataStructure,
    globalMap: TypeMap
  ) {
    let data = {
      internalName,
      nicknames,
      symbol,
      interactName,
      function: Function,
      serializer,
    } as {
      internalName: string;
      nicknames: string[];
      symbol: string;
      interactName: string;
      parsedSignature: ParsedSignature;
      function: TypeLambda<any, any>;
      serializer?: string;
    };
    data["parsedSignature"] = new ParsedSignature(parsedSignature, globalMap);
    this.data[k] = new Operator(data);
  }

  find(fn: Function) {
    for (const [_, o] of Object.entries(this.data)) {
      if (fn(o)) return o;
    }
    throw new Error("Unknown Operator");
  }
}
