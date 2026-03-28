import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

export class OPERATOR_OBJECT_FLUIDSTACK_DATA_VALUE extends BaseOperator<
  Fluid,
  Operator<iString, Tag<IntegratedValue>>
> {
  static override internalName =
    "integrateddynamics:fluidstack_datavalue" as const;
  static override numericID = 285;
  static override nicknames = [
    "FluidstackDataValue",
    "fluidstackDataValue",
    "fluid_stack_data_value",
    "fluidStackDataValue",
    "fluid_data_value",
    "fluidDataValue",
    "fluid_NBT_value",
    "fluidStackNBTValue",
    "fluid_stack_NBT_value",
    "fluidstack_NBT_value",
    "fluidNBTValue",
  ];
  static override symbol = "data_value";
  static override interactName = "fluidstackDataValue";
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
              type: "NBT",
            },
          },
        },
        normalizeSignature
      ),
      function: (fluid: Fluid): TypeLambda<iString, Tag<IntegratedValue>> => {
        return (key: iString): Tag<IntegratedValue> => {
          const nbt = fluid.getNBT();
          if (!(nbt instanceof CompoundTag) || !nbt.has(key)) {
            return new NullTag();
          }
          return nbt.get(key);
        };
      },
    });
  }
}
