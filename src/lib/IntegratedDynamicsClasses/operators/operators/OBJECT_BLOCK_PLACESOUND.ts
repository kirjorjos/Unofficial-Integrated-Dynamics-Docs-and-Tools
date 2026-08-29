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
    "blockPlacesound",
    "blockPlaceSound",
    "BlockPlacesound",
    "placesound",
    "placeSound",
    "block_place_sound",
    "block_placesound",
    "place_sound",
  ];
  static override symbol = "place_sound";
  static override interactName = "blockPlaceSound";
  static override operatorName = "placesound" as const;
  static override displayName = "Block Place Sound" as const;
  static override fullDisplayName = "Block Block Place Sound" as const;
  static override stringDisplayNames = [
    "block block place sound",
    "block block place Sound",
    "block block Place sound",
    "block block Place Sound",
    "block Block place sound",
    "block Block place Sound",
    "block Block Place sound",
    "block Block Place Sound",
    "Block block place sound",
    "Block block place Sound",
    "Block block Place sound",
    "Block block Place Sound",
    "Block Block place sound",
    "Block Block place Sound",
    "Block Block Place sound",
    "Block Block Place Sound",
    "block place sound",
    "block place Sound",
    "block Place sound",
    "block Place Sound",
    "Block place sound",
    "Block place Sound",
    "Block Place sound",
    "Block Place Sound",
  ];
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
