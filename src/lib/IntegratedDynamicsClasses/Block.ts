import { UniquelyNamed } from "lib/IntegratedDynamicsClasses/UniquelyNamed";
import { Named } from "lib/IntegratedDynamicsClasses/Named";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Double } from "lib/JavaNumberClasses/Double";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { RegistryHub } from "lib/IntegratedDynamicsClasses/registries/registryHub";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

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
    age: new Integer(-1),
    isPlantable: new iBoolean(false),
    plantType: new iString("none"),
    plant: new iString(""),
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
    destroySpeed: new Double(1.0),
    requiredTier: Integer.ZERO,
  });
  props: Properties;
  possibleProperties: Properties;
  private _signatureCache: any;

  constructor(newProps: Properties, oldBlock?: Block) {
    let props = Block.defaultProps.clone();
    if (oldBlock) props.setAll(oldBlock.getProperties());
    props.setAll(newProps);
    this.props = props;

    if (newProps.has("possibleProperties")) {
      const rawPossible = newProps.get("possibleProperties");
      if (rawPossible instanceof CompoundTag) {
        this.possibleProperties = new Properties(rawPossible.valueOf());
      } else if (rawPossible instanceof Properties) {
        this.possibleProperties = rawPossible;
      } else {
        this.possibleProperties = this.props;
      }
    } else {
      this.possibleProperties = this.props;
    }
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

  getAge(): Integer {
    return this.props.get("age");
  }

  isPlantable(): iBoolean {
    return this.props.get("isPlantable");
  }

  getPlantType(): iString {
    return this.props.get("plantType");
  }

  getPlant(): Block {
    const blockRegistry = RegistryHub.blockRegistry;
    const key = (this.props.get("plant") as iString).valueOf();
    if (!key) return new Block(new Properties({}));
    const BlockConstructor =
      blockRegistry.items[
        key.toLowerCase() as keyof typeof blockRegistry.items
      ];
    if (!BlockConstructor) return new Block(new Properties({}));
    return new BlockConstructor();
  }

  getDestroySpeed(): Double {
    return this.props.get("destroySpeed");
  }

  getRequiredTier(): Integer {
    return this.props.get("requiredTier");
  }

  getProperties(): Properties {
    return this.props;
  }

  getPossibleProperties(): Properties {
    return this.possibleProperties;
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
          "getPossibleProperties",
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
