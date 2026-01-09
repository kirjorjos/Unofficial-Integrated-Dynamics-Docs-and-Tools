import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "IntegratedDynamicsClasses/Block";

export class OPERATOR_OBJECT_BLOCK_PLACESOUND extends BaseOperator<
  Block,
  iString
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:block_placesound",
      nicknames: [
        "BlockPlacesound",
        "blockPlaceSound",
        "block_place_sound",
        "placeSound",
      ],
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
        globalMap
      ),
      symbol: "place_sound",
      interactName: "blockPlaceSound",
      function: (block: Block): iString => {
        return block.getPlaceSound();
      },
    });
  }
}
