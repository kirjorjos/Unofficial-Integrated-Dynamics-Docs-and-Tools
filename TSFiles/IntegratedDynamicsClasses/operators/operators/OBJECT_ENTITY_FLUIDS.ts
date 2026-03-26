import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_OBJECT_ENTITY_FLUIDS extends BaseOperator<
  Entity,
  iArray<Fluid>
> {
  static override internalName =
    "integrateddynamics:entity_entityfluids" as const;
  static override numericID = 175;
  static override nicknames = ["EntityFluids", "entity_fluids", "entityFluids"];
  static override symbol = "entity_fluids";
  static override interactName = "entityFluids";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: { type: "List", listType: { type: "Fluid" } },
        },
        normalizeSignature
      ),
      function: (entity: Entity): iArray<Fluid> => {
        return new iArrayEager(entity.getFluids());
      },
    });
  }
}
