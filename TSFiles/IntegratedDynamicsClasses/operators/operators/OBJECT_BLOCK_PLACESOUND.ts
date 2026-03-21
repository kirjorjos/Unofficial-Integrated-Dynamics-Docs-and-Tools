import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_PLACESOUND extends BaseOperator<
  Block,
  iString
> {
  static override internalName = "integrateddynamics:block_placesound" as const;
  static override nicknames = [
    "BlockPlacesound",
    "blockPlaceSound",
    "block_place_sound",
    "placeSound",
  ];
  static override symbol = "place_sound";
  static override interactName = "blockPlaceSound";
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
