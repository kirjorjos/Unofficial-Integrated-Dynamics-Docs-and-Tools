import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_GENERAL_CONSTANT extends BaseOperator<
  IntegratedValue,
  Operator<IntegratedValue, IntegratedValue>
> {
  static override internalName = "integrateddynamics:general_constant" as const;
  static override numericID = 178;
  static override nicknames = [
    "generalConstant",
    "const",
    "constant",
    "anyConstant",
    "K",
  ];
  static override symbol = "K";
  static override interactName = "anyConstant";
  static override operatorName = "constant" as const;
  static override displayName = "Constant" as const;
  static override fullDisplayName = "General Constant" as const;
  static override tooltipInfo = "A copy of the first input value." as const;

  static override kind = "general" as const;
  static override renderPattern = "PREFIX_2" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 2,
            },
            to: {
              type: "Any",
              typeID: 1,
            },
          },
        },
        normalizeSignature
      ),
      function: (value: IntegratedValue): TypeLambda<void, IntegratedValue> => {
        return () => {
          return value;
        };
      },
    });
  }
}
