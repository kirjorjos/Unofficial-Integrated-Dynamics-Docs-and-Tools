import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_OBJECT_ENTITY_MOUNTED extends BaseOperator<
  Entity,
  iArray<Entity>
> {
  static override internalName = "integrateddynamics:entity_mounted" as const;
  static override numericID = 34;
  static override nicknames = [
    "entityMounted",
    "EntityMounted",
    "entitys_mounted",
    "entitysMounted",
    "mounted",
  ];
  static override symbol = "mounted";
  static override interactName = "entityMounted";
  static override operatorName = "mounted" as const;
  static override displayName = "Mounted Entities" as const;
  static override fullDisplayName = "Entity Mounted Entities" as const;
  static override tooltipInfo =
    "The entities that are currently mounted on the given entity." as const;

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
          to: { type: "List", listType: { type: "Entity" } },
        },
        normalizeSignature
      ),
      function: (entity: Entity): iArray<Entity> => {
        return new iArrayEager(entity.getMountedEntities());
      },
    });
  }
}
