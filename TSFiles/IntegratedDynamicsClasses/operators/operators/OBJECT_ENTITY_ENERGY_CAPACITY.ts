import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ENERGY_CAPACITY extends BaseOperator<
  Entity,
  Integer
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:entity_entityenergystored",
      nicknames: [
        "EntityEnergyCapacity",
        "entity_energy_capacity",
        "entityEnergyCapacity",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "entity_capacity_fe",
      interactName: "entityEnergyCapacity",
      function: (entity: Entity): Integer => {
        return entity.getEnergyCapacity();
      },
    });
  }
}
