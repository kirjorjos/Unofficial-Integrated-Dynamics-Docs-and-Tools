import { Integer } from "JavaNumberClasses/Integer";
import { UniquelyNamed } from "./UniquelyNamed";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Properties } from "./Properties";
import { Tag } from "./NBTFunctions/MinecraftClasses/Tag";
import { iBoolean } from "./typeWrappers/iBoolean";
import { iString } from "./typeWrappers/iString";
import { NullTag } from "./NBTFunctions/MinecraftClasses/NullTag";
import { iArrayEager } from "./typeWrappers/iArrayEager";
import { iArray } from "./typeWrappers/iArray";
import { Named } from "./Named";
import { RegistryHub } from "./registries/registryHub";
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";
import { Fluid } from "./Fluid";
import { Block } from "./Block";

export class Item implements UniquelyNamed, Named, IntegratedValue {
  props: Properties;

  static defaultProps = new Properties({
    size: Integer.ONE,
    maxSize: Integer.SIXTY_FOUR,
    stackable: new iBoolean(true),
    damageable: new iBoolean(false),
    damage: Integer.ZERO,
    maxDamage: Integer.ZERO,
    enchanted: new iBoolean(false),
    enchantable: new iBoolean(false),
    repairCost: Integer.ZERO,
    rarity: new iString(""),
    fluid: new iString(""),
    fluidCapacity: Integer.ZERO,
    NBT: new NullTag(),
    id: new iString(""),
    modName: new iString(""),
    fuelBurnTime: Integer.ZERO,
    fuel: new iBoolean(false),
    tagNames: new iArrayEager<iString>([]),
    feContainer: new iBoolean(false),
    feStored: Integer.ZERO,
    feCapacity: Integer.ZERO,
    inventory: new iArrayEager<IntegratedValue>([]),
    tooltip: new iArrayEager<iString>([]),
    itemName: new iString(""),
    block: new iString(""),
    inventorySize: Integer.ZERO,
  });
  private _signatureCache: any;

  constructor(newProps: Properties, oldItem?: Item) {
    let props = Item.defaultProps.clone();
    if (oldItem) props.setAll(oldItem.getProperties());

    const baseNbt = props.get("NBT");
    const newNbt = newProps.get("NBT");
    if (
      baseNbt?.getType() === Tag.TAG_COMPOUND &&
      newNbt?.getType() === Tag.TAG_COMPOUND
    ) {
      newProps.set(
        "NBT",
        (baseNbt as CompoundTag).compoundUnion(newNbt as CompoundTag)
      );
    }

    props.setAll(newProps);
    this.props = props;
  }

  getSize(): Integer {
    return this.props.get("size");
  }

  getMaxSize(): Integer {
    return this.props.get("maxSize");
  }

  isStackable(): iBoolean {
    return new iBoolean(this.getMaxSize().gt(Integer.ONE));
  }

  isDamageable(): iBoolean {
    return new iBoolean(this.getMaxDamage().gt(Integer.ZERO));
  }

  getDamage(): Integer {
    return this.props.get("damage");
  }

  getMaxDamage(): Integer {
    const maxDamage = this.props.get("maxDamage") as Integer;
    if (maxDamage.toJSNumber() === -1) return Integer.ZERO;
    return maxDamage;
  }

  isEnchanted(): iBoolean {
    return this.props.get("enchanted");
  }

  isEnchantable(): iBoolean {
    return this.props.get("enchantable");
  }

  getRepairCost(): Integer {
    return this.props.get("repairCost");
  }

  getRarity(): iString {
    const rarity = this.props.get("rarity") as iString;
    if (this.isEnchanted().valueOf() && rarity.valueOf() === "COMMON") {
      return new iString("RARE");
    }
    return rarity;
  }

  getFluid(): Fluid {
    const fluidRegistry = RegistryHub.fluidRegistry;
    let key = (this.props.get("fluid") as iString).valueOf().toLowerCase();
    if (!key) return new Fluid(new Properties({}));
    const FluidConstructor =
      fluidRegistry.items[key as keyof typeof fluidRegistry.items];
    if (!FluidConstructor) return new Fluid(new Properties({}));
    return new FluidConstructor();
  }

  getFluidCapacity(): Integer {
    const capacity = this.props.get("fluidCapacity") as Integer;
    if (
      capacity.toJSNumber() === 0 &&
      (this.props.get("fluid") as iString).valueOf() !== ""
    ) {
      return new Integer(1000);
    }
    return capacity;
  }

  getNBT(): Tag<IntegratedValue> {
    return this.props.get("NBT");
  }

  getUniqueName(): iString {
    return this.props.get("id");
  }

  getModName(): iString {
    return this.props.get("modName");
  }

  getFuelBurnTime(): Integer {
    return this.props.get("fuelBurnTime");
  }

  isFuel(): iBoolean {
    return this.props.get("fuel");
  }

  getTagNames(): iArray<iString> {
    return this.props.get("tagNames");
  }

  isFeContainer(): iBoolean {
    return this.props.get("feContainer");
  }

  getFeStored(): Integer {
    return this.props.get("feStored");
  }

  getFeCapacity(): Integer {
    return this.props.get("feCapacity");
  }

  getInventory(): iArray<IntegratedValue> {
    return this.props.get("inventory") || new iArrayEager([]);
  }

  getInventorySize(): Integer {
    return this.props.get("inventorySize");
  }

  getTooltip(_player?: Entity): iArray<iString> {
    return this.props.get("tooltip");
  }

  getItemName(): iString {
    return this.props.get("itemName");
  }

  getBlock(): Block {
    const blockRegistry = RegistryHub.blockRegistry;
    let key = (this.props.get("block") as iString).valueOf().toLowerCase();
    if (!key) return new Block(new Properties({}));
    const BlockConstructor =
      blockRegistry.items[key as keyof typeof blockRegistry.items];
    if (!BlockConstructor) return new Block(new Properties({}));
    return new BlockConstructor();
  }

  getProperties(): Properties {
    return this.props;
  }

  getStrengthVsBlock(block: Block) {
    if (block.getSignatureNode().getRootType() !== "Block")
      throw new Error("block is not a Block");
    throw new Error("getStrengthVsBlock method not implemented");
  }

  canHarvestBlock(_block: Block) {
    throw new Error("canHarvestBlock method not implemented");
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof Item)) return new iBoolean(false);

    if (!this.getUniqueName().equals(other.getUniqueName()).valueOf())
      return new iBoolean(false);
    if (!this.props.get("fluid").equals(other.props.get("fluid")).valueOf())
      return new iBoolean(false);
    if (!this.props.get("block").equals(other.props.get("block")).valueOf())
      return new iBoolean(false);

    const keys = Object.getOwnPropertyNames(Item.prototype).filter(
      (k) =>
        ![
          "constructor",
          "equals",
          "getSignatureNode",
          "getProperties",
          "getFluid",
          "getBlock",
          "getInventory",
          "getUniqueName",
        ].includes(k)
    );
    for (const key of keys as Array<keyof Item>) {
      if (this[key] instanceof Function && this[key].length === 0) {
        try {
          const thisResult = (this[key] as Function)() as IntegratedValue;
          const otherResult = (other[key] as Function)() as IntegratedValue;

          if (!thisResult.equals(otherResult).valueOf()) {
            return new iBoolean(false);
          }
        } catch (e: any) {
          continue;
        }
      }
    }
    return new iBoolean(true);
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "Item" }, false);
    this._signatureCache = newSignature;
    return newSignature;
  }

  toString(): iString {
    return this.props.get("itemName");
  }

  getName(): iString {
    return this.props.get("itemName");
  }
}
