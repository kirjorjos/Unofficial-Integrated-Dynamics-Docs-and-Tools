import { Properties } from "IntegratedDynamicsClasses/Properties";
import { gameData } from "./registry";
import { Item } from "IntegratedDynamicsClasses/Item";
import { RegistryHub } from "./registryHub";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

type ItemConstructor = new (customData?: Record<string, any>) => Item;
type RawItems = typeof gameData.items;
type ItemNames = {
  [Mod in keyof RawItems]: `${Mod & string}:${keyof RawItems[Mod] & string}`;
}[keyof RawItems];
export type ItemKeys = Lowercase<ItemNames>;
type ItemRegistryMap = {
  [K in ItemKeys]: ItemConstructor;
};

class ItemRegistry {
  items: ItemRegistryMap;

  constructor() {
    this.items = ItemRegistry.loadItems();
  }

  private static loadItems(): ItemRegistryMap {
    const rawData = gameData.items;
    let classObj = {} as ItemRegistryMap;
    for (const [mod, data] of Object.entries(rawData)) {
      for (const [item, itemData] of Object.entries(data)) {
        const id = `${mod}:${item}`;
        const key = id.toLowerCase() as ItemKeys;
        const fullData = { ...itemData, id: id };
        classObj[key] = ItemRegistry.createItemClass(fullData);
      }
    }
    return classObj;
  }

  private static createItemClass(
    itemData: Record<string, any>
  ): ItemConstructor {
    const flattenedBase = ItemRegistry.flattenItemData(itemData);
    return class extends Item {
      constructor(customData: Record<string, any> = {}) {
        const baseProps = new Properties(flattenedBase);
        const flattenedCustom = ItemRegistry.flattenCustomItemData(customData);
        const customProps = new Properties(flattenedCustom);

        const baseNbt = baseProps.get("NBT");
        const customNbt = customProps.get("NBT");
        if (
          baseNbt instanceof CompoundTag &&
          customNbt instanceof CompoundTag
        ) {
          customProps.set("NBT", baseNbt.compoundUnion(customNbt));
        }

        super(baseProps);
        this.props.setAll(customProps);
      }
    };
  }

  private static flattenItemData(
    data: Record<string, any>
  ): Record<string, any> {
    const flattened = ItemRegistry.flattenCustomItemData(data);

    let nbt = flattened["NBT"];
    if (nbt) flattened["NBT"] = nbt;

    return flattened;
  }

  private static flattenCustomItemData(
    data: Record<string, any>
  ): Record<string, any> {
    const flattened: Record<string, any> = { ...data };

    if (data["mod"]) flattened["modName"] = data["mod"];
    if (data["id"]) {
      flattened["id"] = data["id"];
      if (!flattened["itemName"]) flattened["itemName"] = data["id"];
    }
    if (data["name"]) flattened["itemName"] = data["name"];
    if (data["isEnchantable"] !== undefined)
      flattened["enchantable"] = data["isEnchantable"];
    if (data["tags"]) flattened["tagNames"] = data["tags"];
    if (!data["rarity"]) flattened["rarity"] = "COMMON";
    if (data["fuelBurnTime"] && data["fuelBurnTime"] > 0)
      flattened["fuel"] = true;
    if (data["inventorySize"] !== undefined)
      flattened["inventorySize"] = data["inventorySize"];
    if (data["feCapacity"] !== undefined)
      flattened["feCapacity"] = data["feCapacity"];

    if (flattened["NBT"] === null || flattened["NBT"] === undefined) {
      delete flattened["NBT"];
    }

    return flattened;
  }

  load() {
    RegistryHub.itemRegistry = this;
  }
}

const itemRegistry = new ItemRegistry();
itemRegistry.load();
export { itemRegistry };
