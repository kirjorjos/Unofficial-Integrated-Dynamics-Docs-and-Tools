import { UniquelyNamed } from "./UniquelyNamed";
import { Integer } from "JavaNumberClasses/Integer";
import { Properties } from "./Properties";
import { iBoolean } from "./typeWrappers/iBoolean";

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
    fluidCapacity: new Integer(0),
    uname: "",
    tagNames: [] as Array<string>,
    feContainer: new iBoolean(false),
    feCapacity: new Integer(0),
    feStored: new Integer(0),
    inventory: null as Array<Item> | null,
    blockName: "",
  });
  props: Properties;

  constructor(newProps: Properties, oldBlock?: Block) {
    let props = Block.defaultProps;
    props.setAll(newProps);
    if (oldBlock) props.setAll(oldBlock.getProperties());
    Promise.all([import("./Item"), import("./Fluid")]).then((values) => {
      if (!props.has("item"))
        props.set("item", new values[0].Item(new Properties({})));
      if (!props.has("fluid"))
        props.set("fluid", new values[1].Fluid(new Properties({})));
    });
    this.props = props;
  }

  isOpaque(): iBoolean {
    return this.props.get("opaque");
  }

  getItem(): Item {
    return this.props.get("item");
  }

  getModName(): string {
    return this.props.get("modName");
  }

  getBreakSound(): string {
    return this.props.get("breakSound");
  }

  getPlaceSound(): string {
    return this.props.get("placeSound");
  }

  getStepSound(): string {
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

  getUniqueName(): string {
    return this.props.get("uname");
  }

  getTagNames(): Array<string> {
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

  getInventory(): Array<Item> | null {
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

  equals(other: Block) {
    return JSON.stringify(this) === JSON.stringify(other);
  }

  toString() {
    return this.props.get("blockName");
  }
}
