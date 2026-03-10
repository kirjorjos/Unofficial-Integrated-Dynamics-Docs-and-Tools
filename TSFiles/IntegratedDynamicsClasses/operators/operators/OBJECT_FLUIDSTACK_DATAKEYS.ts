import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_OBJECT_FLUIDSTACK_DATAKEYS extends BaseOperator<
  Fluid,
  iArray<iString>
> {
  static override internalName =
    "integrateddynamics:fluidstack_datakeys" as const;
  static override nicknames = [
    "FluidstackDataKeys",
    "fluidstackDataKeys",
    "fluid_stack_data_keys",
    "fluidStackDataKeys",
    "fluid_data_keys",
    "fluidDataKeys",
    "fluid_NBT_keys",
    "fluidStackNBTKeys",
    "fluid_stack_NBT_keys",
    "fluidstack_NBT_keys",
    "fluidstackNBTKeys",
    "fluidNBTKeys",
  ];
  static override symbol = "data_keys";
  static override interactName = "fluidstackDataKeys";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Fluid",
        },
        to: { type: "List", listType: { type: "String" } },
      }),
      function: (fluid: Fluid): iArray<iString> => {
        const nbt = fluid.getNBT();
        if (nbt instanceof CompoundTag) {
          return nbt.getAllKeys();
        }
        return new iArrayEager([]);
      },
    });
  }
}
