import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_DATA extends BaseOperator<
  Fluid,
  Tag<IntegratedValue>
> {
  static override internalName = "integrateddynamics:fluidstack_nbt" as const;
  static override numericID = 281;
  static override nicknames = [
    "fluidData",
    "fluidNBT",
    "fluidstackData",
    "fluidStackData",
    "FluidstackData",
    "fluidstackNbt",
    "fluidStackNBT",
    "fluid_data",
    "fluid_n_b_t",
    "fluid_NBT",
    "fluid_stack_data",
    "fluid_stack_n_b_t",
    "fluid_stack_NBT",
    "fluidstack_data",
    "fluidstack_nbt",
    "fluidstack_NBT",
  ];
  static override symbol = "NBT()";
  static override interactName = "fluidstackNbt";
  static override operatorName = "nbt" as const;
  static override displayName = "Fluid NBT" as const;
  static override fullDisplayName = "Fluid Fluid NBT" as const;
  static override tooltipInfo = "Get the NBT tag of the given fluid." as const;

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
          to: {
            type: "NBT",
          },
        },
        normalizeSignature
      ),
      function: (fluid: Fluid): Tag<IntegratedValue> => {
        return fluid.getNBT();
      },
    });
  }
}
