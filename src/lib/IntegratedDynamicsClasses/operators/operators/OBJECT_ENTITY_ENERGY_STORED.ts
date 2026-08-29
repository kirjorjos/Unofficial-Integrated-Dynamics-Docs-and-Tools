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
    "entityenergystored",
    "entityEnergyStored",
    "EntityEnergyStored",
    "entityEntityenergystored",
    "entity_energy",
    "entity_energy_stored",
    "entity_entityenergystored",
  ];
  static override symbol = "entity_stored_fe";
  static override interactName = "entityEnergy";
  static override operatorName = "entityenergystored" as const;
  static override displayName = "Entity Energy Stored" as const;
  static override fullDisplayName = "Entity Entity Energy Stored" as const;
  static override stringDisplayNames = [
    "entity energy stored",
    "entity energy Stored",
    "entity Energy stored",
    "entity Energy Stored",
    "Entity energy stored",
    "Entity energy Stored",
    "Entity Energy stored",
    "Entity Energy Stored",
    "entity entity energy stored",
    "entity entity energy Stored",
    "entity entity Energy stored",
    "entity entity Energy Stored",
    "entity Entity energy stored",
    "entity Entity energy Stored",
    "entity Entity Energy stored",
    "entity Entity Energy Stored",
    "Entity entity energy stored",
    "Entity entity energy Stored",
    "Entity entity Energy stored",
    "Entity entity Energy Stored",
    "Entity Entity energy stored",
    "Entity Entity energy Stored",
    "Entity Entity Energy stored",
    "Entity Entity Energy Stored",
  ];
  static override tooltipInfo =
    "The amount of energy that is stored in this entity." as const;

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
