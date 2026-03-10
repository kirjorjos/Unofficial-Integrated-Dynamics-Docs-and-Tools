import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "IntegratedDynamicsClasses/Properties";

export class OPERATOR_OBJECT_FLUIDSTACK_WITH_NBT extends BaseOperator<
  Fluid,
  CompoundTag
> {
  static override internalName =
    "integrateddynamics:fluidstack_withnbt" as const;
  static override nicknames = [
    "fluidWithNBT",
    "fluid_stack_with_nbt",
    "fluidStackWithNBT",
  ];
  static override symbol = "with_nbt";
  static override interactName = "fluidstackWithNBT";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Fluid",
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
      }),
      function: (fluid: Fluid): TypeLambda<CompoundTag, Fluid> => {
        return (nbt: CompoundTag): Fluid => {
          return new Fluid(new Properties({ nbt: nbt }), fluid);
        };
      },
    });
  }
}
