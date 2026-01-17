import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_HURTSOUND extends BaseOperator<
  Entity,
  iString
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_hurtsound",
      nicknames: ["EntityHurtsound", "entity_hurt_sound", "entityHurtSound"],
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
      symbol: "hurtsound",
      interactName: "entityHurtSound",
      function: (entity: Entity): iString => {
        return entity.getHurtSound();
      },
    });
  }
}
