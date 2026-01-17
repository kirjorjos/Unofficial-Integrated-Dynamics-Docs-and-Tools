import { globalMap } from "HelperClasses/TypeMap";
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
  constructor() {
    super({
      internalName: "integrateddynamics:entity_entityfluids",
      nicknames: ["EntityFluids", "entity_fluids", "entityFluids"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: { type: "List", listType: { type: "Fluid" } },
        },
        globalMap
      ),
      symbol: "entity_fluids",
      interactName: "entityFluids",
      function: (entity: Entity): iArray<Fluid> => {
        return new iArrayEager(entity.getFluids());
      },
    });
  }
}
