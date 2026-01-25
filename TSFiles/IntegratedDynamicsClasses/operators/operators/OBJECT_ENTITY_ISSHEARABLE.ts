import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISSHEARABLE extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:entity_isshearable" as const;
  constructor() {
    super({
      nicknames: [
        "EntityIsshearable",
        "entity_is_shearable",
        "entityIsShearable",
        "entityIsShearable",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Boolean",
        },
      }),
      symbol: "is_shearable",
      interactName: "entityIsShearable",
      function: (entity: Entity): iBoolean => {
        return entity.isShearable();
      },
    });
  }
}
