import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";

export class OPERATOR_OBJECT_FLUIDSTACK_WITH_NBT extends BaseOperator<
  Fluid,
  CompoundTag
> {
  static override internalName =
    "integrateddynamics:fluidstack_withnbt" as const;
  static override numericID = 300;
  static override nicknames = [
    "fluidstackWithNBT",
    "fluidWithNBT",
    "fluid_stack_with_nbt",
    "fluidStackWithNBT",
    "fluidwithtag",
    "fluidstackFluidwithtag",
  ];
  static override symbol = "with_nbt";
  static override interactName = "fluidstackWithNBT";
  static override operatorName = "fluidwithtag" as const;
  static override displayName = "Fluid With Tag" as const;
  static override fullDisplayName = "Fluid Fluid With Tag" as const;
  static override kind = "fluidstack" as const;
  static override renderPattern = "INFIX_LONG" as const;
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
              type: "NBT",
            },
            to: {
              type: "Fluid",
            },
          },
        },
        normalizeSignature
      ),
      function: (fluid: Fluid): TypeLambda<CompoundTag, Fluid> => {
        return (nbt: CompoundTag): Fluid => {
          return new Fluid(new Properties({ nbt: nbt }), fluid);
        };
      },
    });
  }
}
