import { Integer } from "JavaNumberClasses/Integer";
import { UniquelyNamed } from "./UniquelyNamed";
import { Properties } from "./Properties";
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";
import { iBoolean } from "./typeWrappers/iBoolean";
import { iString } from "./typeWrappers/iString";
import { NullTag } from "./NBTFunctions/MinecraftClasses/NullTag";
import { iArray } from "./typeWrappers/iArray";

export class Item implements UniquelyNamed, IntegratedValue {
  props: Properties;

  static defaultProps = new Properties({
    size: new Integer(1),
    maxSize: new Integer(64),
    stackable: new iBoolean(true),
    damageable: new iBoolean(false),
    damage: new Integer(0),
    maxDamage: new Integer(0),
    enchanted: new iBoolean(false),
    enchantable: new iBoolean(false),
    repairCost: new Integer(0),
    rarity: new iString(""),
    // fluid: new Fluid(),
    fluidCapacity: new Integer(0),
    NBT: new NullTag(),
    uname: new iString(""),
    modName: new iString(""),
    fuelBurnTime: new Integer(0),
    fuel: new iBoolean(false),
    tagNames: new iArray<iString>([]),
    feContainer: new iBoolean(false),
    feStored: new Integer(0),
    feCapacity: new Integer(0),
    inventory: new iArray<IntegratedValue>([]),
    tooltip: new iArray<iString>([]),
    itemName: new iString(""),
    // block: new Block()
  });

  constructor(newProps: Properties, oldItem?: Item) {
    let props = Item.defaultProps;
    props.setAll(newProps);
    if (oldItem) props.setAll(oldItem.getProperties());
    Promise.all([import("./Block"), import("./Fluid")]).then((values) => {
      if (!props.has("block"))
        props.set("block", new values[0].Block(new Properties({})));
      if (!props.has("fluid"))
        props.set("fluid", new values[1].Fluid(new Properties({})));
    });
    this.props = props;
  }

  getSize(): Integer {
    return this.props.get("size");
  }

  getMaxSize(): Integer {
    return this.props.get("maxSize");
  }

  isStackable(): iBoolean {
    return this.props.get("stackable");
  }

  isDamageable(): iBoolean {
    return this.props.get("damageable");
  }

  getDamage(): Integer {
    return this.props.get("damage");
  }

  getMaxDamage(): Integer {
    return this.props.get("maxDamage");
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
    return this.props.get("rarity");
  }

  getFluid(): Fluid {
    return this.props.get("fluid");
  }

  getFluidCapacity(): Integer {
    return this.props.get("fluidCapacity");
  }

  getNBT(): CompoundTag {
    return this.props.get("NBT");
  }

  getUniqueName(): iString {
    return this.props.get("uname");
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
    return this.props.get("inventory") || [];
  }

  getTooltip(_player?: Entity): iArray<iString> {
    return this.props.get("tooltip");
  }

  getItemName(): iString {
    return this.props.get("itemName");
  }

  getBlock(): Block {
    return this.props.get("block");
  }

  getProperties(): Properties {
    return this.props;
  }

  async getStrengthVsBlock(block: Block) {
    let { Block } = await import("./Block");
    if (!(block instanceof Block)) throw new Error("block is not a Block");
    throw new Error("getStrengthVsBlock method not implemented");
  }

  canHarvestBlock(_block: Block) {
    throw new Error("canHarvestBlock method not implemented");
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof Item)) return new iBoolean(false);
    else {
      for (const key of Object.keys(this) as Array<keyof Item>) {
        if (key == "equals") continue; // prevent recursion
        if (this[key] instanceof Function) {
          const thisResult = (this[key] as Function)() as IntegratedValue;
          const otherResult = (other[key] as Function)() as IntegratedValue;
          if (!thisResult.equals(otherResult).valueOf())
            return new iBoolean(false);
        }
      }
      return new iBoolean(true);
    }
  }

  getSignatureNode(): TypeRawSignatureAST.RawSignatureNode {
    return {
      type: "Entity",
    };
  }

  toString() {
    return this.props.get("itemName");
  }
}
