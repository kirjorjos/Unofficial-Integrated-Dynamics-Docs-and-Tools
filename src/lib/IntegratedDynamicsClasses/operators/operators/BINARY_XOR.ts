import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_BINARY_XOR extends BaseOperator<
  Integer,
  Operator<Integer, Integer>
> {
  static override internalName = "integrateddynamics:binary_xor" as const;
  static override numericID = 12;
  static override nicknames = ["binaryXor", "integerXor"];
  static override symbol = "^";
  static override interactName = "integerXor";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Integer",
            },
          },
        },
        normalizeSignature
      ),
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return int1.binaryXor(int2);
        };
      },
      flipTarget: "BINARY_XOR",
    });
  }
}
