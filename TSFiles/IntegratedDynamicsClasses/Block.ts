import { Integer } from "JavaNumberClasses/Integer";
import { Fluid } from "./Fluid";
import { Item } from "./Item";
import { NBT } from "./NBT";

export class Block {
  opaque!: boolean;
  item!: Item;
  modName!: string;
  breakSound!: string;
  placeSound!: string;
  stepSound!: string;
  shearable!: boolean;
  plantAge!: Integer;
  properties!: NBT;
  fluid!: Fluid;
  fluidCapacity!: Integer;
  uname!: string;
  tagNames!: Array<string>;
  feContainer!: boolean;
  feCapacity!: Integer;
  feStored!: Integer;
  inventory!: Array<Item> | null;
  blockName!: string;

  static defaultProps = {
    opaque: true,
    item: new Item(),
    modName: "",
    breakSound: "",
    placeSound: "",
    stepSound: "",
    shearable: false,
    plantAge: new Integer(-1),
    properties: new NBT(null),
    fluid: new Fluid(),
    fluidCapacity: new Integer(0),
    uname: "",
    tagNames: [] as Array<string>,
    feContainer: false,
    feCapacity: new Integer(0),
    feStored: new Integer(0),
    inventory: null as Array<Item> | null,
    blockName: "",
  };

  constructor(newProps = new NBT({}), oldBlock = new Block(new NBT({}))) {
    Object.assign(this, Block.defaultProps, oldBlock.toJSON(), newProps.toJSON());
  }

  isOpaque(): boolean {
    return this.opaque;
  }

  getItem(): Item {
    return this.item;
  }

  getModName(): string {
    return this.modName;
  }

  getBreakSound(): string {
    return this.breakSound;
  }

  getPlaceSound(): string {
    return this.placeSound;
  }

  getStepSound(): string {
    return this.stepSound;
  }

  isShearable(): boolean {
    return this.shearable;
  }

  getPlantAge(): Integer {
    return this.plantAge;
  }

  getProperties(): NBT {
    return this.properties;
  }

  getFluid(): Fluid {
    return this.fluid;
  }

  getFluidCapacity(): Integer {
    return this.fluidCapacity;
  }

  getUname(): string {
    return this.uname;
  }

  getTagNames(): Array<string> {
    return this.tagNames;
  }

  isFeContainer(): boolean {
    return this.feContainer;
  }

  getFeCapacity(): Integer {
    return this.feCapacity;
  }

  getFeStored(): Integer {
    return this.feStored;
  }

  getInventory(): Array<Item> | null {
    return this.inventory;
  }

  getBlockName(): string {
    return this.blockName;
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

  getStrengthVsBlock() {
    throw new Error("getStrengthVsBlock method not implemented");
  }

  canHarvestBlock() {
    throw new Error("canHarvestBlock method not implemented");
  }

  equals(other: Block) {
    return JSON.stringify(this) === JSON.stringify(other);
  }

  toString() {
    return this.blockName;
  }
}
