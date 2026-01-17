import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_MOUNTED extends BaseOperator<
  Entity,
  iBoolean
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_mounted",
      nicknames: ["EntityMounted", "entitys_mounted", "entitysMounted"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: { type: "Boolean" },
        },
        globalMap
      ),
      symbol: "mounted",
      interactName: "entityMounted",
      function: (entity: Entity): iBoolean => {
        return entity.isEntityMounted();
      },
    });
  }
}
