import { UniquelyNamed } from "./UniquelyNamed";
import { NBT } from "./NBT";
import { Integer } from "../JavaNumberClasses/Integer";
import { Block } from "./Block";
import { Item } from "./Item";

export class Fluid implements UniquelyNamed {
  uname!: string;
  amount!: Integer;
  block!: Block;
  lightLevel!: Integer;
  density!: Integer;
  temperature!: Integer;
  viscosity!: Integer;
  lighterThanAir!: boolean;
  rarity!: string;
  bucketEmptySound!: string;
  fluidVaporizeSound!: string;
  bucketFillSound!: string;
  bucket!: Item;
  modName!: string;
  nbt!: NBT;
  tagNames!: string[];

  static defaultProps = {
    uname: "",
    amount: new Integer(0),
    block: new Block(),
    lightLevel: new Integer(0),
    density: new Integer(0),
    temperature: new Integer(0),
    viscosity: new Integer(0),
    lighterThanAir: false,
    rarity: "",
    bucketEmptySound: "",
    fluidVaporizeSound: "",
    bucketFillSound: "",
    bucket: new Item(),
    modName: "",
    nbt: new NBT(null),
    tagNames: [] as Array<string>,
  };

  constructor(newProps = new NBT({}), oldFluid = new Fluid(new NBT({}))) {
    Object.assign(this, Fluid.defaultProps, oldFluid.toJSON(), newProps.toJSON());
  }

  getUniqueName(): string {
    return this.uname;
  }

  toJSON(): Record<string, any> {
    const obj: Record<string, any> = {};
    for (const key in this) {
      if (typeof this[key] !== 'function') {
        obj[key] = this[key];
      }
    }
    return obj;
  }

  getAmount(): Integer {
    return this.amount;
  }

  getBlock(): Block {
    return this.block;
  }

  getLightLevel(): Integer {
    return this.lightLevel;
  }

  getDensity(): Integer {
    return this.density;
  }

  getTemperature(): Integer {
    return this.temperature;
  }

  getViscosity(): Integer {
    return this.viscosity;
  }

  getLighterThanAir(): boolean {
    return this.lighterThanAir;
  }

  getRarity(): string {
    return this.rarity;
  }

  getBucketEmptySound(): string {
    return this.bucketEmptySound;
  }

  getFluidVaporizeSound(): string {
    return this.fluidVaporizeSound;
  }

  getBucketFillSound(): string {
    return this.bucketFillSound;
  }

  getBucket(): Item {
    return this.bucket;
  }

  getUname(): string {
    return this.uname;
  }

  getModName(): string {
    return this.modName;
  }

  getNBT(): NBT {
    return this.nbt;
  }

  getTagNames(): string[] {
    return this.tagNames;
  }
}