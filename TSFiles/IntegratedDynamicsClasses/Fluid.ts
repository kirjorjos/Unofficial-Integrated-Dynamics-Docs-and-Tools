import { UniquelyNamed } from "./UniquelyNamed";
import { Integer } from "../JavaNumberClasses/Integer";
import { Properties } from "./Properties";
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";
import { iBoolean } from "./typeWrappers/iBoolean";
import { Item } from "./Item";
import { Block } from "./Block";
import { iString } from "./typeWrappers/iString";

export class Fluid implements UniquelyNamed {
  static defaultProps = new Properties({
    uname: "",
    amount: Integer.ZERO,
    // block: new Block(),
    lightLevel: Integer.ZERO,
    density: Integer.ZERO,
    temperature: Integer.ZERO,
    viscosity: Integer.ZERO,
    lighterThanAir: new iBoolean(false),
    rarity: "",
    bucketEmptySound: "",
    fluidVaporizeSound: "",
    bucketFillSound: "",
    // bucket: new Item(),
    modName: "",
    nbt: null,
    tagNames: [] as Array<string>,
  });
  props: Properties;

  constructor(newProps: Properties, oldFluid?: Fluid) {
    let props = Fluid.defaultProps;
    props.setAll(newProps);
    if (oldFluid) props.setAll(oldFluid.getProperties());
    if (!props.has("block")) props.set("block", new Block(new Properties({})));
    if (!props.has("item")) props.set("item", new Item(new Properties({})));
    this.props = props;
  }

  getUniqueName(): iString {
    return this.props.get("uname");
  }

  getAmount(): Integer {
    return this.props.get("amount");
  }

  getBlock(): Block {
    return this.props.get("block");
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

  getRarity(): string {
    return this.props.get("rarity");
  }

  getBucketEmptySound(): string {
    return this.props.get("bucketEmptySound");
  }

  getFluidVaporizeSound(): string {
    return this.props.get("fluidVaporizeSound");
  }

  getBucketFillSound(): string {
    return this.props.get("bucketFillSound");
  }

  getBucket(): Item {
    return this.props.get("bucket");
  }

  getUname(): string {
    return this.props.get("uname");
  }

  getModName(): string {
    return this.props.get("modName");
  }

  getNBT(): CompoundTag {
    return this.props.get("nbt");
  }

  getTagNames(): string[] {
    return this.props.get("tagNames");
  }

  getProperties(): Properties {
    return this.props;
  }

  getSignatureNode(): TypeRawSignatureAST.RawSignatureDefiniteValue {
    return {
      type: "Fluid",
    };
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof Fluid)) return new iBoolean(false);
    else {
      for (const key of Object.keys(this) as Array<keyof Fluid>) {
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
}
