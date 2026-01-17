import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { Operator } from "../Operator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

export class OPERATOR_OBJECT_FLUIDSTACK_DATA_VALUE extends BaseOperator<
  Fluid,
  Operator<iString, Tag<IntegratedValue>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:fluidstack_datavalue",
      nicknames: [
        "FluidstackDataValue",
        "fluidstackDataValue",
        "fluid_stack_data_value",
        "fluidStackDataValue",
        "fluid_stack_data_value",
        "fluid_data_value",
        "fluidDataValue",
        "fluid_NBT_value",
        "fluidStackNBTValue",
        "fluid_stack_NBT_value",
        "fluidstack_NBT_value",
        "fluidstackNBTValue",
        "fluidNBTValue",
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
              type: "NBT",
            },
          },
        },
        globalMap
      ),
      symbol: "data_value",
      interactName: "fluidstackDataValue",
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
