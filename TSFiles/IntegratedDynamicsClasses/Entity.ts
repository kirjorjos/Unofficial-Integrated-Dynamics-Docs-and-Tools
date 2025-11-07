import { UniquelyNamed } from "./UniquelyNamed";
import { NBT } from "./NBT";
import { Integer } from "../JavaNumberClasses/Integer";
import { Item } from "./Item";
import { Block } from "./Block";
import { Fluid } from "./Fluid";
import { Double } from "../JavaNumberClasses/Double";

export class Entity implements UniquelyNamed {
  uname!: string;
  mob!: boolean;
  animal!: boolean;
  player!: boolean;
  minecart!: boolean;
  item!: Item;
  health!: Integer;
  width!: Integer;
  height!: Integer;
  burning!: boolean;
  wet!: boolean;
  crouching!: boolean;
  eating!: boolean;
  armorInventory!: Array<Item>;
  inventory!: Array<Item>;
  modName!: string;
  targetBlock!: Block;
  targetEntity!: Entity;
  guiOpen!: boolean;
  heldItemMain!: Item;
  heldItemOffHand!: Item;
  entityMounted!: boolean;
  itemFrame!: boolean;
  itemFrameContents!: Item;
  itemFrameRotation!: Integer;
  hurtSound!: string;
  deathSound!: string;
  age!: Integer;
  child!: boolean;
  breedable!: boolean;
  inLove!: boolean;
  shearable!: boolean;
  breedableList!: Array<string>;
  NBT!: NBT;
  entityType!: string;
  itemList!: Array<Item>;
  fluids!: Array<Fluid>;
  energyStored!: Integer;
  energyCapacity!: Integer;


  static defaultProps = {
    uname: "",
    mob: false,
    animal: false,
    player: false,
    minecart: false,
    item: new Item(),
    health: new Integer(0),
    width: new Integer(0),
    height: new Integer(0),
    burning: false,
    wet: false,
    crouching: false,
    eating: false,
    armorInventory: [] as Array<Item>,
    inventory: [] as Array<Item>,
    modName: "",
    targetBlock: new Block(),
    targetEntity: new Entity(),
    guiOpen: false,
    heldItemMain: new Item(),
    heldItemOffHand: new Item(),
    entityMounted: false,
    itemFrame: false,
    itemFrameContents: new Item(),
    itemFrameRotation: new Integer(0),
    hurtSound: "",
    deathSound: "",
    age: new Integer(0),
    child: false,
    breedable: false,
    inLove: false,
    shearable: false,
    breedableList: [] as Array<string>,
    NBT: new NBT(null),
    entityType: "",
    itemList: [] as Array<Item>,
    fluids: [] as Array<Fluid>,
    energyStored: new Integer(0),
    energyCapacity: new Integer(0),
  };

  constructor(newProps = new NBT({}), oldEntity = new Entity()) {
    Object.assign(this, Entity.defaultProps, oldEntity.toJSON(), newProps.toJSON());
  }

  getUniqueName(): string {
    return this.uname;
  }

  isMob(): boolean {
    return this.mob;
  }

  isAnimal(): boolean {
    return this.animal;
  }

  isItem(): boolean {
    return !this.item.equals(new Item());
  }

  getIsItem(): boolean {
    return this.item.equals(new Item());
  }

  isPlayer(): boolean {
    return this.player;
  }

  isMinecart(): boolean {
    return this.minecart;
  }

  getItem(): Item {
    return this.item;
  }

  getHealth(): Double {
    return new Double(this.health.toDecimal());
  }

  getWidth(): Double {
    return new Double(this.width.toDecimal());
  }

  getHeight(): Double {
    return new Double(this.height.toDecimal());
  }

  isBurning(): boolean {
    return this.burning;
  }

  isWet(): boolean {
    return this.wet;
  }

  isCrouching(): boolean {
    return this.crouching;
  }

  isEating(): boolean {
    return this.eating;
  }

  getArmorInventory(): Array<Item> {
    return this.armorInventory;
  }

  getInventory(): Array<Item> {
    return this.inventory;
  }

  getModName(): string {
    return this.modName;
  }

  getTargetBlock(): Block {
    return this.targetBlock;
  }

  getTargetEntity(): Entity {
    return this.targetEntity;
  }

  hasGuiOpen(): boolean {
    return this.guiOpen;
  }

  getHeldItemMain(): Item {
    return this.heldItemMain;
  }

  getHeldItemOffHand(): Item {
    return this.heldItemOffHand;
  }

  isEntityMounted(): boolean {
    return this.entityMounted;
  }

  isItemFrame(): boolean {
    return this.itemFrame;
  }

  getItemFrameContents(): Item {
    return this.itemFrameContents;
  }

  getItemFrameRotation(): Integer {
    return this.itemFrameRotation;
  }

  getHurtSound(): string {
    return this.hurtSound;
  }

  getDeathSound(): string {
    return this.deathSound;
  }

  getAge(): Integer {
    return this.age;
  }

  isChild(): boolean {
    return this.child;
  }

  canBreed(): boolean {
    return this.breedable;
  }

  isInLove(): boolean {
    return this.inLove;
  }

  isShearable(): boolean {
    return this.shearable;
  }

  getBreadableList(): Array<string> {
    return [...this.breedableList, this.uname];
  }

  getNBT(): NBT {
    return this.NBT;
  }

  getEntityType(): string {
    return this.entityType;
  }

  getItemList(): Array<Item> {
    return this.itemList;
  }

  getFluids(): Array<Fluid> {
    return this.fluids;
  }

  getEnergyStored(): Integer {
    return this.energyStored;
  }

  getEnergyCapacity(): Integer {
    return this.energyCapacity;
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
}