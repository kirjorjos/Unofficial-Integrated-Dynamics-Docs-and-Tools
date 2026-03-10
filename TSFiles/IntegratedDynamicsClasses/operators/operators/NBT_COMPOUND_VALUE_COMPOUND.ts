import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Operator } from "../Operator";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

export class OPERATOR_NBT_COMPOUND_VALUE_COMPOUND extends BaseOperator<
  CompoundTag,
  Operator<iString, CompoundTag>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_compound" as const;
  static override nicknames = [
    "nbtCompoundValueCompound",
    "compoundValueCompound",
  ];
  static override symbol = "NBT{}.get_compound";
  static override interactName = "nbtGetCompound";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "NBT",
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
      }),
      function: (nbt: CompoundTag): TypeLambda<iString, CompoundTag> => {
        return (key: iString): CompoundTag => {
          let value = nbt.get(key);
          if (value instanceof CompoundTag) {
            return value;
          }
          if (value instanceof NullTag) {
            return new CompoundTag({});
          }
          throw new Error(
            `${key.valueOf()} is not a Compound in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
