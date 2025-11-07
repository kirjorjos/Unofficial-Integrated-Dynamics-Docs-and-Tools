import { Integer } from "JavaNumberClasses/Integer";
import { Block } from "./Block";
import { Fluid } from "./Fluid";
import { NBT } from "./NBT";

export class Item {
  size!: Integer;
  maxSize!: Integer;
  stackable!: boolean;
  damageable!: boolean;
  damage!: Integer;
  maxDamage!: Integer;
  enchanted!: boolean;
  enchantable!: boolean;
  repairCost!: Integer;
  rarity!: string;
  fluid!: Fluid;
  fluidCapacity!: Integer;
  NBT!: NBT;
  uname!: string;
  modName!: string;
  fuelBurnTime!: Integer;
  fuel!: boolean;
  tagNames!: Array<string>;
  feContainer!: boolean;
  feStored!: Integer;
  feCapacity!: Integer;
  inventory!: Array<IntegratedValue>;
  tooltip!: Array<string>;
  itemName!: string;
  block!: Block;

  static defaultProps = {
    size: new Integer(1),
    maxSize: new Integer(64),
    stackable: true,
    damageable: false,
    damage: new Integer(0),
    maxDamage: new Integer(0),
    enchanted: false,
    enchantable: false,
    repairCost: new Integer(0),
    rarity: "",
    fluid: new Fluid(),
    fluidCapacity: new Integer(0),
    NBT: new NBT(null),
    uname: "",
    modName: "",
    fuelBurnTime: new Integer(0),
    fuel: false,
    tagNames: [] as Array<string>,
    feContainer: false,
    feStored: new Integer(0),
    feCapacity: new Integer(0),
    inventory: [] as Array<IntegratedValue>,
    tooltip: [] as Array<string>,
    itemName: "",
    block: new Block()
  };

  constructor(newProps = new NBT({}), oldItem = new Item((new NBT({})))) {
    Object.assign(this, Item.defaultProps, oldItem.toJSON(), newProps);
  }

  getSize(): Integer {
    return this.size;
  }

  getMaxSize(): Integer {
    return this.maxSize;
  }

  isStackable(): boolean {
    return this.stackable;
  }

  isDamageable(): boolean {
    return this.damageable;
  }

  getDamage(): Integer {
    return this.damage;
  }

  getMaxDamage(): Integer {
    return this.maxDamage;
  }

  isEnchanted(): boolean {
    return this.enchanted;
  }

  isEnchantable(): boolean {
    return this.enchantable;
  }

  getRepairCost(): Integer {
    return this.repairCost;
  }

  getRarity(): string {
    return this.rarity;
  }

  getFluid(): Fluid {
    return this.fluid;
  }

  getFluidCapacity(): Integer {
    return this.fluidCapacity;
  }

  getNBT(): NBT {
    return this.NBT;
  }

  getUname(): string {
    return this.uname;
  }

  getModName(): string {
    return this.modName;
  }

  getFuelBurnTime(): Integer {
    return this.fuelBurnTime;
  }

  isFuel(): boolean {
    return this.fuel;
  }

  getTagNames(): Array<string> {
    return this.tagNames;
  }

  isFeContainer(): boolean {
    return this.feContainer;
  }

  getFeStored(): Integer {
    return this.feStored;
  }

  getFeCapacity(): Integer {
    return this.feCapacity;
  }

  getInventory(): Array<IntegratedValue> {
    return this.inventory || [];
  }

  getTooltip(): Array<string> {
    return this.tooltip;
  }

  getItemName(): string {
    return this.itemName;
  }

  getBlock(): Block {
    return this.block;
  }

  toJSON(): any {
    const walk = (obj: any): any => {
      if (
        obj === null ||
        typeof obj === "string" ||
        typeof obj === "number" ||
        typeof obj === "boolean"
      ) {
        return obj;
      }

      if (obj instanceof NBT) {
        return obj.toJSON();
      }

      if (Array.isArray(obj)) {
        return obj.map(v => walk(v));
      }

      if (typeof obj === "object") {
        const result: Record<string, any> = {};
        for (const [key, value] of Object.entries(obj)) {
          result[key] = walk(value);
        }
        return result;
      }

      return undefined;
    };

    return walk(this);
  }

  getStrengthVsBlock(block: Block) {
    if (!(block instanceof Block)) throw new Error("block is not a Block");
    throw new Error("getStrengthVsBlock method not implemented");
  }

  canHarvestBlock() {
    throw new Error("canHarvestBlock method not implemented");
  }

  equals(other: Item) {
    if (!(other instanceof Item)) return false;
    return JSON.stringify(this) === JSON.stringify(other);
  }

  toString() {
    return this.itemName;
  }
}
