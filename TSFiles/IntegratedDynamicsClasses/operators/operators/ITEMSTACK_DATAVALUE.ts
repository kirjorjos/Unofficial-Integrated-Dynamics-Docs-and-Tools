import { globalMap } from "HelperClasses/TypeMap";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_ITEMSTACK_DATAVALUE extends BaseOperator<Item, iBoolean> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_datavalue",
      nicknames: [
        "ItemstackDataValue",
        "itemstack_data_value",
        "itemstackDataValue",
        "item_data_value",
        "itemDataValue",
        "itemNBTValue",
      ],
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
        globalMap
      ),
      symbol: "data_value",
      interactName: "itemstackDataValue",
      function: (item: Item): TypeLambda<iString, Tag<IntegratedValue>> => {
        return (key: iString): Tag<IntegratedValue> => {
          const nbt = item.getNBT();
          if (!nbt || !nbt.has(key)) {
            return new NullTag();
          }
          return nbt.get(key);
        };
      },
    });
  }
}
