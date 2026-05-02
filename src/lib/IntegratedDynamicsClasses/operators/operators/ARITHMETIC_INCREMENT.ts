import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_ARITHMETIC_INCREMENT extends BaseOperator<
  TypeNumber,
  TypeNumber
> {
  static override internalName =
    "integrateddynamics:arithmetic_increment" as const;
  static override numericID = 83;
  static override nicknames = [
    "arithmeticIncrement",
    "increment",
    "numberIncrement",
    "arithmetic_increment",
    "number_increment",
    "++",
  ];
  static override symbol = "++";
  static override interactName = "numberIncrement";
  static override operatorName = "increment" as const;
  static override displayName = "Increment" as const;
  static override fullDisplayName = "Arithmetic Increment" as const;
  static override kind = "arithmetic" as const;
  static override renderPattern = "SUFFIX_1" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Number",
          },
        },
        normalizeSignature
      ),
      function: (num1: TypeNumber): TypeNumber => {
        return num1.add(Integer.ONE);
      },
    });
  }
}
