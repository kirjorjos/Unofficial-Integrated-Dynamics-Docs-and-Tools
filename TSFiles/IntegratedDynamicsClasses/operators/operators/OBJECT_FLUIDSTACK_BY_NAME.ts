import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_BY_NAME extends BaseOperator<
  iString,
  Fluid
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:fluidstack_by_name",
      nicknames: [
        "FluidstackByName",
        "fluidstack_by_name",
        "fluidstackByName",
        "fluid_by_name",
        "fluidByName",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Fluid",
          },
        },
        globalMap
      ),
      symbol: "fluid_by_name",
      interactName: "stringFluidByName",
      function: (_name: iString): never => {
        throw new Error(
          "Fluid by name is infeasible without a registry. This is a placeholder function."
        );
      },
    });
  }
}
