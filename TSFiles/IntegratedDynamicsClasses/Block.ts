export class Block {
    blockName?: string;
    static defaultProps = {
      NBT: null,
      fluid: null,
      fluidCapacity: 0,
      uname: "",
      modName: "",
      tagNames: [],
      feContainer: false,
      feCapacity: 0,
      feStored: 0,
      inventory: null,
      blockName: ""
    };
  
    constructor(newProps = {}, oldItem = {}) {
      Object.assign(this, Block.defaultProps, oldItem, newProps);
  
      for (const key of Object.keys(Block.defaultProps)) {
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

    getStrengthVsBlock(block: Block) {
      throw new Error("getStrengthVsBlock method not implemented");
    }

    canHarvestBlock(block: Block) {
      throw new Error("canHarvestBlock method not implemented");
    }

    equals(other: Block) {
      return JSON.stringify(this) === JSON.stringify(other);
    }

    toString() {
      return this.blockName;
    }
  }