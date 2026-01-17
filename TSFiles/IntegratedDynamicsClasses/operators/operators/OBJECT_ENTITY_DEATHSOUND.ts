import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_DEATHSOUND extends BaseOperator<
  Entity,
  iString
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_deathsound",
      nicknames: ["entityDeathSound", "EntityDeathsound", "entity_death_sound"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "deathsound",
      interactName: "entityDeathSound",
      function: (entity: Entity): iString => {
        return entity.getDeathSound();
      },
    });
  }
}
