import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_OBJECT_FLUIDSTACK_WITH_DATA extends BaseOperator<
  Fluid,
  Operator<iString, Operator<CompoundTag, Fluid>>
> {
  static override internalName =
    "integrateddynamics:fluidstack_withdata" as const;
  static override numericID = 286;
  static override nicknames = [
    "fluidstackFluidstackWithdata",
    "fluidstackWithdata",
    "fluidstackWithData",
    "fluidStackWithData",
    "FluidstackWithData",
    "fluid_stack_with_data",
    "fluidstack_with_data",
    "fluidstack_withdata",
    "fluidstackFluidstack_withdata",
  ];
  static override symbol = "with_data";
  static override interactName = "fluidstackWithData";
  static override operatorName = "fluidstack_withdata" as const;
  static override displayName = "Fluid With Data" as const;
  static override fullDisplayName = "Fluid Fluid With Data" as const;
  static override stringDisplayNames = [
    "fluid fluid with data",
    "fluid fluid with Data",
    "fluid fluid With data",
    "fluid fluid With Data",
    "fluid Fluid with data",
    "fluid Fluid with Data",
    "fluid Fluid With data",
    "fluid Fluid With Data",
    "Fluid fluid with data",
    "Fluid fluid with Data",
    "Fluid fluid With data",
    "Fluid fluid With Data",
    "Fluid Fluid with data",
    "Fluid Fluid with Data",
    "Fluid Fluid With data",
    "Fluid Fluid With Data",
    "fluid fluidstack with data",
    "fluid fluidstack with Data",
    "fluid fluidstack With data",
    "fluid fluidstack With Data",
    "fluid Fluidstack with data",
    "fluid Fluidstack with Data",
    "fluid Fluidstack With data",
    "fluid Fluidstack With Data",
    "fluid fluidStack with data",
    "fluid fluidStack with Data",
    "fluid fluidStack With data",
    "fluid fluidStack With Data",
    "fluid FluidStack with data",
    "fluid FluidStack with Data",
    "fluid FluidStack With data",
    "fluid FluidStack With Data",
    "Fluid fluidstack with data",
    "Fluid fluidstack with Data",
    "Fluid fluidstack With data",
    "Fluid fluidstack With Data",
    "Fluid Fluidstack with data",
    "Fluid Fluidstack with Data",
    "Fluid Fluidstack With data",
    "Fluid Fluidstack With Data",
    "Fluid fluidStack with data",
    "Fluid fluidStack with Data",
    "Fluid fluidStack With data",
    "Fluid fluidStack With Data",
    "Fluid FluidStack with data",
    "Fluid FluidStack with Data",
    "Fluid FluidStack With data",
    "Fluid FluidStack With Data",
    "fluidstack fluid with data",
    "fluidstack fluid with Data",
    "fluidstack fluid With data",
    "fluidstack fluid With Data",
    "fluidstack Fluid with data",
    "fluidstack Fluid with Data",
    "fluidstack Fluid With data",
    "fluidstack Fluid With Data",
    "Fluidstack fluid with data",
    "Fluidstack fluid with Data",
    "Fluidstack fluid With data",
    "Fluidstack fluid With Data",
    "Fluidstack Fluid with data",
    "Fluidstack Fluid with Data",
    "Fluidstack Fluid With data",
    "Fluidstack Fluid With Data",
    "fluidStack fluid with data",
    "fluidStack fluid with Data",
    "fluidStack fluid With data",
    "fluidStack fluid With Data",
    "fluidStack Fluid with data",
    "fluidStack Fluid with Data",
    "fluidStack Fluid With data",
    "fluidStack Fluid With Data",
    "FluidStack fluid with data",
    "FluidStack fluid with Data",
    "FluidStack fluid With data",
    "FluidStack fluid With Data",
    "FluidStack Fluid with data",
    "FluidStack Fluid with Data",
    "FluidStack Fluid With data",
    "FluidStack Fluid With Data",
    "fluidstack fluidstack with data",
    "fluidstack fluidstack with Data",
    "fluidstack fluidstack With data",
    "fluidstack fluidstack With Data",
    "fluidstack Fluidstack with data",
    "fluidstack Fluidstack with Data",
    "fluidstack Fluidstack With data",
    "fluidstack Fluidstack With Data",
    "fluidstack fluidStack with data",
    "fluidstack fluidStack with Data",
    "fluidstack fluidStack With data",
    "fluidstack fluidStack With Data",
    "fluidstack FluidStack with data",
    "fluidstack FluidStack with Data",
    "fluidstack FluidStack With data",
    "fluidstack FluidStack With Data",
    "Fluidstack fluidstack with data",
    "Fluidstack fluidstack with Data",
    "Fluidstack fluidstack With data",
    "Fluidstack fluidstack With Data",
    "Fluidstack Fluidstack with data",
    "Fluidstack Fluidstack with Data",
    "Fluidstack Fluidstack With data",
    "Fluidstack Fluidstack With Data",
    "Fluidstack fluidStack with data",
    "Fluidstack fluidStack with Data",
    "Fluidstack fluidStack With data",
    "Fluidstack fluidStack With Data",
    "Fluidstack FluidStack with data",
    "Fluidstack FluidStack with Data",
    "Fluidstack FluidStack With data",
    "Fluidstack FluidStack With Data",
    "fluidStack fluidstack with data",
    "fluidStack fluidstack with Data",
    "fluidStack fluidstack With data",
    "fluidStack fluidstack With Data",
    "fluidStack Fluidstack with data",
    "fluidStack Fluidstack with Data",
    "fluidStack Fluidstack With data",
    "fluidStack Fluidstack With Data",
    "fluidStack fluidStack with data",
    "fluidStack fluidStack with Data",
    "fluidStack fluidStack With data",
    "fluidStack fluidStack With Data",
    "fluidStack FluidStack with data",
    "fluidStack FluidStack with Data",
    "fluidStack FluidStack With data",
    "fluidStack FluidStack With Data",
    "FluidStack fluidstack with data",
    "FluidStack fluidstack with Data",
    "FluidStack fluidstack With data",
    "FluidStack fluidstack With Data",
    "FluidStack Fluidstack with data",
    "FluidStack Fluidstack with Data",
    "FluidStack Fluidstack With data",
    "FluidStack Fluidstack With Data",
    "FluidStack fluidStack with data",
    "FluidStack fluidStack with Data",
    "FluidStack fluidStack With data",
    "FluidStack fluidStack With Data",
    "FluidStack FluidStack with data",
    "FluidStack FluidStack with Data",
    "FluidStack FluidStack With data",
    "FluidStack FluidStack With Data",
    "fluid with data",
    "fluid with Data",
    "fluid With data",
    "fluid With Data",
    "Fluid with data",
    "Fluid with Data",
    "Fluid With data",
    "Fluid With Data",
    "fluidstack with data",
    "fluidstack with Data",
    "fluidstack With data",
    "fluidstack With Data",
    "Fluidstack with data",
    "Fluidstack with Data",
    "Fluidstack With data",
    "Fluidstack With Data",
    "fluidStack with data",
    "fluidStack with Data",
    "fluidStack With data",
    "fluidStack With Data",
    "FluidStack with data",
    "FluidStack with Data",
    "FluidStack With data",
    "FluidStack With Data",
  ];
  static override kind = "fluidstack" as const;
  static override renderPattern = "INFIX_2_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (
        fluid: Fluid
      ): TypeLambda<iString, TypeLambda<Tag<IntegratedValue>, Fluid>> => {
        return (key: iString): TypeLambda<Tag<IntegratedValue>, Fluid> => {
          return (value: Tag<IntegratedValue>): Fluid => {
            let nbt = fluid.getNBT();
            if (!(nbt instanceof CompoundTag)) {
              nbt = new CompoundTag({});
            }
            const newNbt = (nbt as CompoundTag).set(key.valueOf(), value);
            return new Fluid(new Properties({ nbt: newNbt }), fluid);
          };
        };
      },
    });
  }
}
