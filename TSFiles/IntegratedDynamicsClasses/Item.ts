import { Integer } from "JavaNumberClasses/Integer";
import { UniquelyNamed } from "./UniquelyNamed";
import { Properties } from "./Properties";
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";
import { iBoolean } from "./typeWrappers/iBoolean";
import { IntegratedValue } from "./operators/Operator";

export class Item implements UniquelyNamed {
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
    rarity: "",
    // fluid: new Fluid(),
    fluidCapacity: new Integer(0),
    NBT: null,
    uname: "",
    modName: "",
    fuelBurnTime: new Integer(0),
    fuel: new iBoolean(false),
    tagNames: [] as Array<string>,
    feContainer: new iBoolean(false),
    feStored: new Integer(0),
    feCapacity: new Integer(0),
    inventory: [] as Array<IntegratedValue>,
    tooltip: [] as Array<string>,
    itemName: "",
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

  getRarity(): string {
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

  getUniqueName(): string {
    return this.props.get("uname");
  }

  getModName(): string {
    return this.props.get("modName");
  }

  getFuelBurnTime(): Integer {
    return this.props.get("fuelBurnTime");
  }

  isFuel(): iBoolean {
    return this.props.get("fuel");
  }

  getTagNames(): Array<string> {
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

  getInventory(): Array<IntegratedValue> {
    return this.props.get("inventory") || [];
  }

  getTooltip(_player?: Entity): Array<string> {
    return this.props.get("tooltip");
  }

  getItemName(): string {
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

  equals(other: Item) {
    if (!(other instanceof Item)) return false;
    return JSON.stringify(this) === JSON.stringify(other);
  }

  toString() {
    return this.props.get("itemName");
  }
}
