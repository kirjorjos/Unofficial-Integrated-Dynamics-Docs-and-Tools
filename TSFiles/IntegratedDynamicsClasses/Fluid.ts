import { UniquelyNamed } from "./UniquelyNamed";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "../JavaNumberClasses/Integer";
import { Properties } from "./Properties";
import { Tag } from "./NBTFunctions/MinecraftClasses/Tag";
import { NullTag } from "./NBTFunctions/MinecraftClasses/NullTag";
import { iBoolean } from "./typeWrappers/iBoolean";
import { iString } from "./typeWrappers/iString";
import { Named } from "./Named";
import { RegistryHub } from "./registries/registryHub";
import { iArrayEager } from "./typeWrappers/iArrayEager";
import { iArray } from "./typeWrappers/iArray";
import { Block } from "./Block";
import { Item } from "./Item";
import { StringTag } from "./NBTFunctions/MinecraftClasses/StringTag";
import { IntTag } from "./NBTFunctions/MinecraftClasses/IntTag";
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";

export class Fluid implements Named, UniquelyNamed, IntegratedValue {
  static defaultProps = new Properties({
    id: new iString(""),
    amount: Integer.ZERO,
    block: new iString(""),
    lightLevel: Integer.ZERO,
    density: Integer.ZERO,
    temperature: Integer.ZERO,
    viscosity: Integer.ZERO,
    lighterThanAir: new iBoolean(false),
    rarity: new iString(""),
    bucketEmptySound: new iString(""),
    fluidVaporizeSound: new iString(""),
    bucketFillSound: new iString(""),
    bucket: new iString(""),
    modName: new iString(""),
    nbt: new NullTag(),
    tagNames: new iArrayEager<iString>([]),
    displayName: new iString(""),
  });
  props: Properties;
  private _signatureCache: any;

  constructor(newProps: Properties, oldFluid?: Fluid) {
    let props = Fluid.defaultProps.clone();
    if (oldFluid) props.setAll(oldFluid.getProperties());
    props.setAll(newProps);
    this.props = props;
  }

  getUniqueName(): iString {
    const id = this.props.get("id") as iString;
    if (id.valueOf() === "") return id;
    const amount = this.getAmount();
    if (amount.toJSNumber() === 0) return id;
    return id.add(" (").add(amount.toString()).add(")");
  }

  getAmount(): Integer {
    return this.props.get("amount");
  }

  getBlock(): Block {
    const blockRegistry = RegistryHub.blockRegistry;
    const key = (this.props.get("block") as iString).valueOf();
    if (!key) return new Block(new Properties({}));
    const BlockConstructor =
      blockRegistry.items[key as keyof typeof blockRegistry.items];
    if (!BlockConstructor) return new Block(new Properties({}));
    return new BlockConstructor();
  }

  getLightLevel(): Integer {
    return this.props.get("lightLevel");
  }

  getDensity(): Integer {
    return this.props.get("density");
  }

  getTemperature(): Integer {
    return this.props.get("temperature");
  }

  getViscosity(): Integer {
    return this.props.get("viscosity");
  }

  isLighterThanAir(): iBoolean {
    return this.props.get("lighterThanAir");
  }

  getRarity(): iString {
    return this.props.get("rarity");
  }

  getBucketEmptySound(): iString {
    return this.props.get("bucketEmptySound");
  }

  getFluidVaporizeSound(): iString {
    return this.props.get("fluidVaporizeSound");
  }

  getBucketFillSound(): iString {
    return this.props.get("bucketFillSound");
  }

  getBucket(): Item {
    const itemRegistry = RegistryHub.itemRegistry;
    const key = (this.props.get("bucket") as iString).valueOf();
    if (!key) return new Item(new Properties({}));
    const ItemConstructor =
      itemRegistry.items[key as keyof typeof itemRegistry.items];
    if (!ItemConstructor) return new Item(new Properties({}));
    return new ItemConstructor();
  }

  getModName(): iString {
    return this.props.get("modName");
  }

  getNBT(): Tag<IntegratedValue> {
    return this.props.get("nbt");
  }

  getTagNames(): iArray<iString> {
    return this.props.get("tagNames");
  }

  getProperties(): Properties {
    return this.props;
  }

  serializeNBT(): CompoundTag {
    const data: Record<string, Tag<IntegratedValue>> = {
      FluidName: new StringTag(this.props.get("id") as iString),
      Amount: new IntTag(this.getAmount()),
    };
    const nbt = this.getNBT();
    if (!(nbt instanceof NullTag)) {
      data["Tag"] = nbt;
    }
    return new CompoundTag(data);
  }

  static deserializeNBT(tag: Tag<IntegratedValue>): Fluid {
    if (!(tag instanceof CompoundTag)) {
      return new Fluid(new Properties({}));
    }
    const compound = tag as CompoundTag;
    const idNode = compound.get(new iString("FluidName"));
    const id =
      idNode instanceof StringTag
        ? (idNode as StringTag).valueOf().valueOf().toLowerCase()
        : "";
    const FluidConstructor =
      RegistryHub.fluidRegistry.items[
        id as keyof typeof RegistryHub.fluidRegistry.items
      ];

    const amountNode = compound.get(new iString("Amount"));
    const amount =
      amountNode instanceof IntTag
        ? (amountNode as IntTag).valueOf()
        : Integer.ZERO;

    const nbtNode = compound.get(new iString("Tag"));
    const nbt =
      nbtNode instanceof CompoundTag ? (nbtNode as CompoundTag) : new NullTag();

    if (FluidConstructor) {
      return new FluidConstructor({ amount, nbt });
    }
    return new Fluid(new Properties({ id: new iString(id), amount, nbt }));
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "Fluid" }, false);
    this._signatureCache = newSignature;
    return newSignature;
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof Fluid)) return new iBoolean(false);

    if (!this.getUniqueName().equals(other.getUniqueName()).valueOf())
      return new iBoolean(false);
    if (!this.props.get("block").equals(other.props.get("block")).valueOf())
      return new iBoolean(false);
    if (!this.props.get("bucket").equals(other.props.get("bucket")).valueOf())
      return new iBoolean(false);

    const keys = Object.getOwnPropertyNames(Fluid.prototype).filter(
      (k) =>
        ![
          "constructor",
          "equals",
          "getSignatureNode",
          "getProperties",
          "getBlock",
          "getBucket",
          "getUniqueName",
        ].includes(k)
    );
    for (const key of keys as Array<keyof Fluid>) {
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

  getName(): iString {
    return this.props.get("displayName");
  }
}
