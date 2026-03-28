import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ENERGY_CAPACITY extends BaseOperator<
  Entity,
  Integer
> {
  static override internalName =
    "integrateddynamics:entity_entityenergycapacity" as const;
  static override numericID = 173;
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
