import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";

export class OPERATOR_NBT_COMPOUND_VALUE_BOOLEAN extends BaseOperator<
  CompoundTag,
  Operator<iString, iBoolean>
> {
  static override internalName =
    "integrateddynamics:nbt_compound_value_iBoolean" as const;
  constructor() {
    super({
      nicknames: ["nbtCompoundValueBoolean", "compoundValueBoolean"],
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
            type: "Boolean",
          },
        },
      }),
      symbol: "NBT{}.get_iBoolean",
      interactName: "nbtGetBoolean",
      function: (nbt: CompoundTag): TypeLambda<iString, iBoolean> => {
        return (key: iString): iBoolean => {
          const value = nbt.get(key);
          if (value instanceof ByteTag) {
            return new iBoolean(value.valueOf().toJSNumber() === 1);
          }
          if (value instanceof NullTag) {
            return new iBoolean(false);
          }
          throw new Error(
            `${key.valueOf()} is not a boolean in ${JSON.stringify(
              nbt.toJSON()
            )}`
          );
        };
      },
    });
  }
}
