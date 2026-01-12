import { UniquelyNamed } from "./UniquelyNamed";
import { Integer } from "JavaNumberClasses/Integer";
import { Properties } from "./Properties";
import { iBoolean } from "./typeWrappers/iBoolean";
import { Fluid } from "./Fluid";
import { Item } from "./Item";
import { iString } from "./typeWrappers/iString";
import { iArrayEager } from "./typeWrappers/iArrayEager";
import { iArray } from "./typeWrappers/iArray";

export class Block implements UniquelyNamed {
  static defaultProps = new Properties({
    opaque: new iBoolean(true),
    // item: new Item(),
    modName: "",
    breakSound: "",
    placeSound: "",
    stepSound: "",
    shearable: new iBoolean(false),
    plantAge: new Integer(-1),
    // fluid: new Fluid(),
    fluidCapacity: Integer.ZERO,
    uname: "",
    tagNames: new iArrayEager<iString>([]),
    feContainer: new iBoolean(false),
    feCapacity: Integer.ZERO,
    feStored: Integer.ZERO,
    inventory: new iArrayEager<Item>([]),
    blockName: "",
  });
  props: Properties;

  constructor(newProps: Properties, oldBlock?: Block) {
    let props = Block.defaultProps;
    props.setAll(newProps);
    if (oldBlock) props.setAll(oldBlock.getProperties());
    if (!props.has("item")) props.set("item", new Item(new Properties({})));
    if (!props.has("fluid")) props.set("fluid", new Fluid(new Properties({})));
    this.props = props;
  }

  isOpaque(): iBoolean {
    return this.props.get("opaque");
  }

  getItem(): Item {
    return this.props.get("item");
  }

  getModName(): iString {
    return this.props.get("modName");
  }

  getBreakSound(): iString {
    return this.props.get("breakSound");
  }

  getPlaceSound(): iString {
    return this.props.get("placeSound");
  }

  getStepSound(): iString {
    return this.props.get("stepSound");
  }

  isShearable(): iBoolean {
    return this.props.get("shearable");
  }

  getPlantAge(): Integer {
    return this.props.get("plantAge");
  }

  getProperties(): Properties {
    return this.props;
  }

  getFluid(): Fluid {
    return this.props.get("fluid");
  }

  getFluidCapacity(): Integer {
    return this.props.get("fluidCapacity");
  }

  getUniqueName(): iString {
    return this.props.get("uname");
  }

  getTagNames(): iArray<iString> {
    return this.props.get("tagNames");
  }

  isFeContainer(): iBoolean {
    return this.props.get("feContainer");
  }

  getFeCapacity(): Integer {
    return this.props.get("feCapacity");
  }

  getFeStored(): Integer {
    return this.props.get("feStored");
  }

  getInventory(): iArray<Item> {
    return this.props.get("inventory");
  }

  getBlockName(): string {
    return this.props.get("blockName");
  }

  getStrengthVsBlock() {
    throw new Error("getStrengthVsBlock method not implemented");
  }

  canHarvestBlock() {
    throw new Error("canHarvestBlock method not implemented");
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof Block)) return new iBoolean(false);
    else {
      for (const key of Object.keys(this) as Array<keyof Block>) {
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
      type: "Block",
    };
  }

  toString() {
    return this.props.get("blockName");
  }
}
