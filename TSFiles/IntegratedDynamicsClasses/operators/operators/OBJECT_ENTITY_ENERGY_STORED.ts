import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ENERGY_STORED extends BaseOperator<
  Entity,
  Integer
> {
  static override internalName =
    "integrateddynamics:entity_entityenergystored" as const;
  static override nicknames = [
    "entityEnergy",
    "EntityEnergyStored",
    "entity_energy_stored",
    "entityEnergyStored",
  ];
  static override symbol = "entity_stored_fe";
  static override interactName = "entityEnergy";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (entity: Entity): Integer => {
        return entity.getEnergyStored();
      },
    });
  }
}
