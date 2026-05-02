import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_NBT extends BaseOperator<
  Entity,
  CompoundTag
> {
  static override internalName = "integrateddynamics:entity_nbt" as const;
  static override numericID = 144;
  static override nicknames = [
    "canBreed",
    "entityNbt",
    "entityNBT",
    "EntityNbt",
    "nbt",
    "can_breed",
    "entity_n_b_t",
    "entity_nbt",
  ];
  static override symbol = "NBT()";
  static override interactName = "entityNbt";
  static override operatorName = "nbt" as const;
  static override displayName = "Entity NBT" as const;
  static override fullDisplayName = "Entity Entity NBT" as const;
  static override tooltipInfo = "Get the given entity as NBT." as const;

  static override kind = "entity" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
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
