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
    "FluidstackWithData",
    "fluidstackWithData",
    "fluid_stack_with_data",
    "fluidStackWithData",
  ];
  static override symbol = "with_data";
  static override interactName = "fluidstackWithData";
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
