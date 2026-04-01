import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_OBJECT_FLUIDSTACK_DATAKEYS extends BaseOperator<
  Fluid,
  iArray<iString>
> {
  static override internalName =
    "integrateddynamics:fluidstack_datakeys" as const;
  static override numericID = 284;
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
    "fluidstack_datakeys",
    "fluidstackFluidstack_datakeys",
  ];
  static override symbol = "data_keys";
  static override interactName = "fluidstackDataKeys";
  static override operatorName = "fluidstack_datakeys" as const;
  static override kind = "fluidstack" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        normalizeSignature
      ),
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
