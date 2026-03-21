import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISMOB extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_ismob" as const;
  static override nicknames = [
    "EntityIsmob",
    "entity_is_mob",
    "entityIsMob",
    "isMob",
  ];
  static override symbol = "is_mob";
  static override interactName = "entityIsMob";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): iBoolean => {
        return entity.isMob();
      },
    });
  }
}
