import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_MODNAME extends BaseOperator<
  Entity,
  iString
> {
  static override internalName = "integrateddynamics:entity_mod" as const;
  static override numericID = 33;
  static override nicknames = [
    "EntityMod",
    "entity_mod",
    "entityMod",
    "entityModName",
    "mod",
  ];
  static override symbol = "entity_mod";
  static override interactName = "entityMod";
  static override operatorName = "mod" as const;
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
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): iString => {
        return entity.getModName();
      },
    });
  }
}
