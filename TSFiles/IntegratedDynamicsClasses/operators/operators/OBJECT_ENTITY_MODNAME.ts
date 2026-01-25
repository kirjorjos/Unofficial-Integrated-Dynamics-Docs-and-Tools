import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_MODNAME extends BaseOperator<
  Entity,
  iString
> {
  static override internalName = "integrateddynamics:entity_mod" as const;
  constructor() {
    super({
      nicknames: ["EntityMod", "entity_mod", "entityMod", "entityModName"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "String",
        },
      }),
      symbol: "entity_mod",
      interactName: "entityMod",
      function: (entity: Entity): iString => {
        return entity.getModName();
      },
    });
  }
}
