import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ENERGY_STORED extends BaseOperator<
  Entity,
  Integer
> {
  constructor() {
    super({
      internalName: "integrateddynamics:entity_entityenergystored",
      nicknames: [
        "EntityEnergyStored",
        "entity_energy_stored",
        "entityEnergyStored",
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
      symbol: "entity_stored_fe",
      interactName: "entityEnergy",
      function: (entity: Entity): Integer => {
        return entity.getEnergyStored();
      },
    });
  }
}
