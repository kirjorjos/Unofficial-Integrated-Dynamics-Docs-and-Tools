import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_ITEMSTACK_WITHDATA extends BaseOperator<
  Item,
  Operator<iString, Operator<Tag<IntegratedValue>, Item>>
> {
  static override internalName =
    "integrateddynamics:itemstack_withdata" as const;
  static override numericID = 289;
  static override nicknames = [
    "itemstackItemstackWithdata",
    "itemstackWithdata",
    "itemstackWithData",
    "ItemstackWithData",
    "itemWithData",
    "item_with_data",
    "itemstack_with_data",
    "itemstack_withdata",
    "itemstackItemstack_withdata",
  ];
  static override symbol = "with_data";
  static override interactName = "itemstackWithData";
  static override operatorName = "itemstack_withdata" as const;
  static override displayName = "Item With Data" as const;
  static override fullDisplayName = "Item Item With Data" as const;
  static override kind = "itemstack" as const;
  static override renderPattern = "INFIX_2_LONG" as const;
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
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                type: "Item",
              },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        item: Item
      ): TypeLambda<iString, TypeLambda<Tag<IntegratedValue>, Item>> => {
        return (key: iString): TypeLambda<Tag<IntegratedValue>, Item> => {
          return (value: Tag<IntegratedValue>): Item => {
            let nbt = item.getNBT();
            if (!(nbt instanceof CompoundTag)) {
              nbt = new CompoundTag({});
            }
            const newNbt = (nbt as CompoundTag).set(key.valueOf(), value);
            return new Item(new Properties({ NBT: newNbt }), item);
          };
        };
      },
    });
  }
}
