import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Entity } from "IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ENERGY_CAPACITY extends BaseOperator<
  Entity,
  Integer
> {
  static override internalName =
    "integrateddynamics:entity_entityenergycapacity" as const;
  static override nicknames = [
    "EntityEnergyCapacity",
    "entity_energy_capacity",
    "entityEnergyCapacity",
  ];
  static override symbol = "entity_capacity_fe";
  static override interactName = "entityEnergyCapacity";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (entity: Entity): Integer => {
        return entity.getEnergyCapacity();
      },
    });
  }
}
