import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

export class OPERATOR_ITEMSTACK_DATAVALUE extends BaseOperator<Item, iBoolean> {
  static override internalName =
    "integrateddynamics:itemstack_datavalue" as const;
  static override numericID = 288;
  static override nicknames = [
    "ItemstackDataValue",
    "itemstack_data_value",
    "itemstackDataValue",
    "item_data_value",
    "itemDataValue",
    "itemNBTValue",
  ];
  static override symbol = "data_value";
  static override interactName = "itemstackDataValue";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
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
        },
        normalizeSignature
      ),
      function: (item: Item): TypeLambda<iString, Tag<IntegratedValue>> => {
        return (key: iString): Tag<IntegratedValue> => {
          const nbt = item.getNBT();
          if (nbt instanceof CompoundTag && nbt.has(key)) {
            return nbt.get(key);
          }
          return new NullTag();
        };
      },
    });
  }
}
