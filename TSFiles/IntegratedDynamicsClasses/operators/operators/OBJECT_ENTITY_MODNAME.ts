import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Entity } from "IntegratedDynamicsClasses/Entity";

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
  ];
  static override symbol = "entity_mod";
  static override interactName = "entityMod";
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
