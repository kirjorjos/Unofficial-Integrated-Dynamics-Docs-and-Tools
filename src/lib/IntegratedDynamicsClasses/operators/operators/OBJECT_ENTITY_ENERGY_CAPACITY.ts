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
    "entityenergycapacity",
    "entityEntityenergycapacity",
  ];
  static override symbol = "entity_capacity_fe";
  static override interactName = "entityEnergyCapacity";
  static override operatorName = "entityenergycapacity" as const;
  static override displayName = "Entity Energy Capacity" as const;
  static override fullDisplayName = "Entity Entity Energy Capacity" as const;
  static override tooltipInfo = "The energy capacity of this entity." as const;

  static override kind = "entity" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
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
