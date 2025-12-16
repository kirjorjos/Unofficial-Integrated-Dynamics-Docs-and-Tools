import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { TypeMap } from "HelperClasses/TypeMap";

export class OPERATOR_BINARY_COMPLEMENT extends BaseOperator<Integer, Integer> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:binary_complement",
      nicknames: ["binaryComplement", "~", "integerComplement"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "~",
      interactName: "integerComplement",
      function: (int: Integer): Integer => {
        return int.binaryComplement();
      },
    });
  }
}
