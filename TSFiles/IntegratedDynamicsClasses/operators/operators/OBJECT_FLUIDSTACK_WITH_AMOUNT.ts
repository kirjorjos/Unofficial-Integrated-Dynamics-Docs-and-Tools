import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { Integer } from "JavaNumberClasses/Integer";
import { Properties } from "IntegratedDynamicsClasses/Properties";
import { Operator } from "../Operator";

export class OPERATOR_OBJECT_FLUIDSTACK_WITH_AMOUNT extends BaseOperator<
  Fluid,
  Operator<Integer, Fluid>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:fluidstack_with_amount",
      nicknames: [
        "FluidstackWithAmount",
        "fluidstackWithAmount",
        "fluid_stack_with_amount",
        "fluidStackWithAmount",
        "fluid_stack_with_amount",
        "fluid_with_amount",
        "fluidWithAmount",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Fluid",
            },
          },
        },
        globalMap
      ),
      symbol: "with_amount",
      interactName: "fluidstackWithAmount",
      function: (fluid: Fluid): TypeLambda<Integer, Fluid> => {
        return (amount: Integer): Fluid => {
          return new Fluid(new Properties({ amount }), fluid);
        };
      },
    });
  }
}
