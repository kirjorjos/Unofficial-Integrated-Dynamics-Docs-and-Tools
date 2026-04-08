import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "lib/IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_PLACESOUND extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_placesound" as const;
  static override numericID = 17;
  static override nicknames = [
    "BlockPlacesound",
    "blockPlaceSound",
    "block_place_sound",
    "placeSound",
    "placesound",
    "blockPlacesound",
  ];
  static override symbol = "place_sound";
  static override interactName = "blockPlaceSound";
  static override operatorName = "placesound" as const;
  static override displayName = "Block Place Sound" as const;
  static override fullDisplayName = "Block Block Place Sound" as const;
  static override tooltipInfo = "The place sound of the given block" as const;

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
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (block: Block): iString => {
        return block.getPlaceSound();
      },
    });
  }
}
