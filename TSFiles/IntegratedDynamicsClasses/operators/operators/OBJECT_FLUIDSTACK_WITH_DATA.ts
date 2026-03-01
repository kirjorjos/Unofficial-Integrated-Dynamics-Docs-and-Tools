import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { Operator } from "../Operator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "IntegratedDynamicsClasses/Properties";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_OBJECT_FLUIDSTACK_WITH_DATA extends BaseOperator<
  Fluid,
  Operator<iString, Operator<CompoundTag, Fluid>>
> {
  static override internalName =
    "integrateddynamics:fluidstack_withdata" as const;
  constructor() {
    super({
      nicknames: [
        "FluidstackWithData",
        "fluidstackWithData",
        "fluid_stack_with_data",
        "fluidStackWithData",
        "fluidWithNBT",
      ],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "with_data",
      interactName: "fluidstackWithData",
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
