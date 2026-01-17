import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { Operator } from "../Operator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "IntegratedDynamicsClasses/Properties";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

export class OPERATOR_OBJECT_FLUIDSTACK_WITH_DATA extends BaseOperator<
  Fluid,
  Operator<iString, Operator<CompoundTag, Fluid>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:fluidstack_withdata",
      nicknames: [
        "FluidstackWithData",
        "fluidstackWithData",
        "fluid_stack_with_data",
        "fluidStackWithData",
        "fluidWithNBT",
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
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                type: "Fluid",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "with_data",
      interactName: "fluidstackWithData",
      function: (
        fluid: Fluid
      ): TypeLambda<iString, TypeLambda<CompoundTag, Fluid>> => {
        return (key: iString): TypeLambda<CompoundTag, Fluid> => {
          return (value: CompoundTag): Fluid => {
            let nbt: CompoundTag =
              fluid.getNBT() instanceof NullTag
                ? new CompoundTag({})
                : (fluid.getNBT() as CompoundTag);
            nbt = nbt.set(key.valueOf(), value);
            return new Fluid(new Properties({ nbt }), fluid);
          };
        };
      },
    });
  }
}
