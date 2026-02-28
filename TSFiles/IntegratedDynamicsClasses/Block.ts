import { UniquelyNamed } from "./UniquelyNamed";
import { Named } from "./Named";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Properties } from "./Properties";
import { iBoolean } from "./typeWrappers/iBoolean";
import { iString } from "./typeWrappers/iString";
import { iArrayEager } from "./typeWrappers/iArrayEager";
import { iArray } from "./typeWrappers/iArray";
import { RegistryHub } from "./registries/registryHub";
import { Item } from "./Item";
import { Fluid } from "./Fluid";

export class Block implements UniquelyNamed, Named, IntegratedValue {
  static defaultProps = new Properties({
    opaque: new iBoolean(true),
    item: new iString(""),
    modName: new iString(""),
    breakSound: new iString(""),
    placeSound: new iString(""),
    stepSound: new iString(""),
    shearable: new iBoolean(false),
    plantAge: new Integer(-1),
    fluid: new iString(""),
    fluidCapacity: Integer.ZERO,
    id: new iString(""),
    tagNames: new iArrayEager<iString>([]),
    feContainer: new iBoolean(false),
    feCapacity: Integer.ZERO,
    feStored: Integer.ZERO,
    inventory: new iArrayEager<Item>([]),
    blockName: new iString(""),
    displayName: new iString(""),
  });
  props: Properties;
  private _signatureCache: any;

  constructor(newProps: Properties, oldBlock?: Block) {
    let props = Block.defaultProps.clone();
    if (oldBlock) props.setAll(oldBlock.getProperties());
    props.setAll(newProps);
    this.props = props;
  }

  isOpaque(): iBoolean {
    return this.props.get("opaque");
  }

  getItem(): Item {
    const itemRegistry = RegistryHub.itemRegistry;
    const key = (this.props.get("item") as iString).valueOf();
    if (!key) return new Item(new Properties({}));
    const ItemConstructor =
      itemRegistry.items[key as keyof typeof itemRegistry.items];
    if (!ItemConstructor) return new Item(new Properties({}));
    return new ItemConstructor();
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

  getName(): iString {
    return this.props.get("displayName");
  }

  getFluid(): Fluid {
    const fluidRegistry = RegistryHub.fluidRegistry;
    const key = (this.props.get("fluid") as iString).valueOf();
    if (!key) return new Fluid(new Properties({}));
    const FluidConstructor =
      fluidRegistry.items[key as keyof typeof fluidRegistry.items];
    if (!FluidConstructor) return new Fluid(new Properties({}));
    return new FluidConstructor();
  }

  getFluidCapacity(): Integer {
    return this.props.get("fluidCapacity");
  }

  getUniqueName(): iString {
    return this.props.get("id");
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

  getBlockName(): iString {
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

    if (!this.getUniqueName().equals(other.getUniqueName()).valueOf())
      return new iBoolean(false);
    if (!this.props.get("item").equals(other.props.get("item")).valueOf())
      return new iBoolean(false);
    if (!this.props.get("fluid").equals(other.props.get("fluid")).valueOf())
      return new iBoolean(false);

    const keys = Object.getOwnPropertyNames(Block.prototype).filter(
      (k) =>
        ![
          "constructor",
          "equals",
          "getSignatureNode",
          "getProperties",
          "getItem",
          "getFluid",
          "getUniqueName",
        ].includes(k)
    );
    for (const key of keys as Array<keyof Block>) {
      if (this[key] instanceof Function && this[key].length === 0) {
        try {
          const thisResult = (this[key] as Function)() as IntegratedValue;
          const otherResult = (other[key] as Function)() as IntegratedValue;
          if (!thisResult.equals(otherResult).valueOf())
            return new iBoolean(false);
        } catch (e: any) {
          continue;
        }
      }
    }
    return new iBoolean(true);
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "Block" }, false);
    this._signatureCache = newSignature;
    return newSignature;
  }

  toString(): iString {
    return this.props.get("blockName");
  }
}
