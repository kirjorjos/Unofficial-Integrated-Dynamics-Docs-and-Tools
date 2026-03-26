import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_NBT extends BaseOperator<
  Entity,
  CompoundTag
> {
  static override internalName = "integrateddynamics:entity_nbt" as const;
  static override numericID = 144;
  static override nicknames = [
    "entityNbt",
    "EntityNbt",
    "entity_nbt",
    "canBreed",
    "entityNBT",
  ];
  static override symbol = "NBT()";
  static override interactName = "entityNbt";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): CompoundTag => {
        return entity.getNBT();
      },
    });
  }
}
