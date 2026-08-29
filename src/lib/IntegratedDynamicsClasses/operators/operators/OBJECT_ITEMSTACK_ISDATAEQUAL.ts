import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_ITEMSTACK_ISDATAEQUAL extends BaseOperator<
  Item,
  Operator<Item, iBoolean>
> {
  static override internalName =
    "integrateddynamics:itemstack_isnbtequal" as const;
  static override numericID = 283;
  static override nicknames = [
    "isnbtequal",
    "itemstackIsDataequal",
    "ItemstackIsdataequal",
    "itemstackIsnbtequal",
    "itemstackIsNbtEqual",
    "itemstack_is_dataequal",
    "itemstack_is_nbt_equal",
    "itemstack_isdataequal",
    "itemstack_isnbtequal",
  ];
  static override symbol = "=NBT=";
  static override interactName = "itemstackIsNbtEqual";
  static override operatorName = "isnbtequal" as const;
  static override displayName = "NBT equals" as const;
  static override fullDisplayName = "Item NBT equals" as const;
  static override stringDisplayNames = [
    "item nbt equals",
    "item nbt Equals",
    "item Nbt equals",
    "item Nbt Equals",
    "Item nbt equals",
    "Item nbt Equals",
    "Item Nbt equals",
    "Item Nbt Equals",
    "item NBT equals",
    "item NBT Equals",
    "Item NBT equals",
    "Item NBT Equals",
    "itemstack nbt equals",
    "itemstack nbt Equals",
    "itemstack Nbt equals",
    "itemstack Nbt Equals",
    "Itemstack nbt equals",
    "Itemstack nbt Equals",
    "Itemstack Nbt equals",
    "Itemstack Nbt Equals",
    "itemStack nbt equals",
    "itemStack nbt Equals",
    "itemStack Nbt equals",
    "itemStack Nbt Equals",
    "ItemStack nbt equals",
    "ItemStack nbt Equals",
    "ItemStack Nbt equals",
    "ItemStack Nbt Equals",
    "itemstack NBT equals",
    "itemstack NBT Equals",
    "Itemstack NBT equals",
    "Itemstack NBT Equals",
    "itemStack NBT equals",
    "itemStack NBT Equals",
    "ItemStack NBT equals",
    "ItemStack NBT Equals",
    "nbt equals",
    "nbt Equals",
    "Nbt equals",
    "Nbt Equals",
    "NBT equals",
    "NBT Equals",
  ];
  static override tooltipInfo =
    "If the NBT tags of the given items are equal" as const;

  static override kind = "itemstack" as const;
  static override renderPattern = "INFIX" as const;
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
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (item1: Item): TypeLambda<Item, iBoolean> => {
        return (item2: Item): iBoolean => {
          const itemsEqual = item1
            .getUniqueName()
            .equals(item2.getUniqueName())
            .valueOf();
          if (!itemsEqual) return new iBoolean(false);
          return item1.getNBT().equals(item2.getNBT());
        };
      },
      flipTarget: "OBJECT_ITEMSTACK_ISDATAEQUAL",
    });
  }
}
