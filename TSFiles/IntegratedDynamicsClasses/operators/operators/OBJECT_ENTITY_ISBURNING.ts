import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISBURNING extends BaseOperator<
  Entity,
  iBoolean
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_isburning",
      nicknames: [
        "EntityIsburning",
        "entity_is_burning",
        "entityIsBurning",
        "isBurning",
      ],
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
        globalMap
      ),
      symbol: "is_burning",
      interactName: "entityIsBurning",
      function: (entity: Entity): iBoolean => {
        return entity.isBurning();
      },
    });
  }
}
