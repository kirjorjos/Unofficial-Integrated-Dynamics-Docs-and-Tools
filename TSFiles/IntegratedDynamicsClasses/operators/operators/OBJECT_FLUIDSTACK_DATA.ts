import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_DATA extends BaseOperator<
  Fluid,
  CompoundTag
> {
  constructor() {
    super({
      internalName: "integrateddynamics:fluidstack_nbt",
      nicknames: [
        "FluidstackData",
        "fluidstackData",
        "fluid_stack_data",
        "fluidStackData",
        "fluid_stack_data",
        "fluid_data",
        "fluidData",
        "fluid_NBT",
        "fluidStackNBT",
        "fluid_stack_NBT",
        "fluidstack_NBT",
        "fluidstackNBT",
        "fluidNBT",
        "fluidNBTKeys",
      ],
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
        globalMap
      ),
      symbol: "NBT()",
      interactName: "fluidstackNbt",
      function: (fluid: Fluid): CompoundTag => {
        return fluid.getNBT();
      },
    });
  }
}
