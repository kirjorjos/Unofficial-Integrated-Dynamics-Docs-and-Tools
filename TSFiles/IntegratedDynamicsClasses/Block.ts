import { NBT } from "./NBT";

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
    blockName: "",
  };

  constructor(newProps = new NBT({}), oldBlock = new Block(new NBT({}))) {
    Object.assign(this, Block.defaultProps, oldBlock.toJSON(), newProps.toJSON());

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
