import { globalMap } from "HelperClasses/TypeMap";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";

export class OPERATOR_NBT_COMPOUND_VALUE_BOOLEAN extends BaseOperator<
  CompoundTag,
  Operator<iString, iBoolean>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:nbt_compound_value_iBoolean",
      nicknames: ["nbtCompoundValueBoolean", "compoundValueBoolean"],
      parsedSignature: new ParsedSignature(
        {
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
        },
        globalMap
      ),
      symbol: "NBT{}.get_iBoolean",
      interactName: "nbtGetBoolean",
      function: (nbt: CompoundTag): TypeLambda<iString, iBoolean> => {
        return (key: iString): iBoolean => {
          const result = nbt.get(key).valueOf();
          if (!(result instanceof iBoolean)) return new iBoolean(false);
          return result;
        };
      },
    });
  }
}
