import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_DATA extends BaseOperator<
  Fluid,
  Tag<IntegratedValue>
> {
  static override internalName = "integrateddynamics:fluidstack_nbt" as const;
  static override nicknames = [
    "fluidstackNbt",
    "FluidstackData",
    "fluidstackData",
    "fluid_stack_data",
    "fluidStackData",
    "fluid_data",
    "fluidData",
    "fluid_NBT",
    "fluidStackNBT",
    "fluid_stack_NBT",
    "fluidstack_NBT",
    "fluidNBT",
    "fluidNBTKeys",
  ];
  static override symbol = "NBT()";
  static override interactName = "fluidstackNbt";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Fluid",
        },
        to: {
          type: "NBT",
        },
      }),
      function: (fluid: Fluid): Tag<IntegratedValue> => {
        return fluid.getNBT();
      },
    });
  }
}
