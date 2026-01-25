import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_MOUNTED extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_mounted" as const;
  constructor() {
    super({
      nicknames: ["EntityMounted", "entitys_mounted", "entitysMounted"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: { type: "Boolean" },
      }),
      symbol: "mounted",
      interactName: "entityMounted",
      function: (entity: Entity): iBoolean => {
        return entity.isEntityMounted();
      },
    });
  }
}
