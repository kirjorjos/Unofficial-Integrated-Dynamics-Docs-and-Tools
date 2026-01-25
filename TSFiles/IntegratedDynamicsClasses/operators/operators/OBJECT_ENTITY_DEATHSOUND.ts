import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_DEATHSOUND extends BaseOperator<
  Entity,
  iString
> {
  static override internalName =
    "integrateddynamics:entity_deathsound" as const;
  constructor() {
    super({
      nicknames: ["entityDeathSound", "EntityDeathsound", "entity_death_sound"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "String",
        },
      }),
      symbol: "deathsound",
      interactName: "entityDeathSound",
      function: (entity: Entity): iString => {
        return entity.getDeathSound();
      },
    });
  }
}
