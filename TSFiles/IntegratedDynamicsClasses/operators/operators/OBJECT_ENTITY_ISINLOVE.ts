import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISINLOVE extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_isinlove" as const;
  constructor() {
    super({
      nicknames: [
        "EntityIsinlove",
        "entity_is_in_love",
        "entityIsInLove",
        "isInLove",
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
      symbol: "is_in_love",
      interactName: "entityIsInLove",
      function: (entity: Entity): iBoolean => {
        return entity.isInLove();
      },
    });
  }
}
