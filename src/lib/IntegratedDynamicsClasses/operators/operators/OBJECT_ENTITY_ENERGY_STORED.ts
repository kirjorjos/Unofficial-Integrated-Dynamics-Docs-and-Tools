import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ENERGY_STORED extends BaseOperator<
  Entity,
  Integer
> {
  static override internalName =
    "integrateddynamics:entity_entityenergystored" as const;
  static override numericID = 174;
  static override nicknames = [
    "entityEnergy",
    "EntityEnergyStored",
    "entity_energy_stored",
    "entityEnergyStored",
    "entityenergystored",
    "entityEntityenergystored",
  ];
  static override symbol = "entity_stored_fe";
  static override interactName = "entityEnergy";
  static override operatorName = "entityenergystored" as const;
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
        return entity.getEnergyStored();
      },
    });
  }
}
