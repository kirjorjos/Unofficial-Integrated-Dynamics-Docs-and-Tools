import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_BLOCK_ISSHEARABLE extends BaseOperator<
  Block,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:block_isshearable" as const;
  static override numericID = 131;
  static override nicknames = [
    "blockIsshearable",
    "block_is_shearable",
    "blockIsShearable",
    "isshearable",
  ];
  static override symbol = "is_shearable";
  static override interactName = "blockIsShearable";
  static override operatorName = "isshearable" as const;
  static override kind = "block" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (block: Block): iBoolean => {
        return block.isShearable();
      },
    });
  }
}
