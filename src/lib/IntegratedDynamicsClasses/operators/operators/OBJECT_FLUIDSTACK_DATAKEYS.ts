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
    "fluidDataKeys",
    "fluidNBTKeys",
    "fluidstackDatakeys",
    "fluidstackDataKeys",
    "fluidStackDataKeys",
    "FluidstackDataKeys",
    "fluidstackFluidstackDatakeys",
    "fluidstackNBTKeys",
    "fluidStackNBTKeys",
    "fluid_data_keys",
    "fluid_n_b_t_keys",
    "fluid_NBT_keys",
    "fluid_stack_data_keys",
    "fluid_stack_n_b_t_keys",
    "fluid_stack_NBT_keys",
    "fluidstack_data_keys",
    "fluidstack_datakeys",
    "fluidstack_n_b_t_keys",
    "fluidstack_NBT_keys",
    "fluidstackFluidstack_datakeys",
  ];
  static override symbol = "data_keys";
  static override interactName = "fluidstackDataKeys";
  static override operatorName = "fluidstack_datakeys" as const;
  static override displayName = "Fluid Data Keys" as const;
  static override fullDisplayName = "Fluid Fluid Data Keys" as const;
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
