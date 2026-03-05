import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_NBT extends BaseOperator<
  Entity,
  CompoundTag
> {
  static override internalName = "integrateddynamics:entity_nbt" as const;
  constructor() {
    super({
      nicknames: ["EntityNbt", "entity_nbt", "canBreed", "entityNBT"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "NBT",
        },
      }),
      symbol: "NBT()",
      interactName: "entityNbt",
      function: (entity: Entity): CompoundTag => {
        return entity.getNBT();
      },
    });
  }
}
