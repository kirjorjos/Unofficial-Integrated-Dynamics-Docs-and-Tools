import { Block } from "./Block";

export class Item {
    itemName?: string;
    static defaultProps = {
      size: 1,
      maxSize: 64,
      stackable: true,
      damageable: false,
      damage: 0,
      maxDamage: 0,
      enchanted: false,
      enchantable: false,
      repairCost: 0,
      rarity: "",
      NBT: null,
      fluid: null,
      fluidCapacity: 0,
      uname: "",
      modName: "",
      fuelBurnTime: 0,
      fuel: false,
      tagNames: [],
      feContainer: false,
      feCapacity: 0,
      feStored: 0,
      inventory: null,
      tooltip: [],
      itemName: ""
    };
  
    constructor(newProps = {}, oldItem = {}) {
      Object.assign(this, Item.defaultProps, oldItem, newProps);
  
      for (const key of Object.keys(Item.defaultProps)) {
        const capKey = key.charAt(0).toUpperCase() + key.slice(1);
  
        if (!this.constructor.prototype[`get${capKey}`]) {
          this.constructor.prototype[`get${capKey}`] = function () {
            return this[key];
          };
        }
        if (!this.constructor.prototype[`set${capKey}`]) {
          this.constructor.prototype[`set${capKey}`] = function (value: any) {
            this[key] = value;
          };
        }
      }
    }

    getStrengthVsBlock(block: any) { // Any because typescript is a b***h and won't see the block type
      if (!(block instanceof Block)) throw new Error("block is not a Block");
      throw new Error("getStrengthVsBlock method not implemented");
    }

    canHarvestBlock(block: any) { // Any because typescript is a b***h and won't see the block type
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