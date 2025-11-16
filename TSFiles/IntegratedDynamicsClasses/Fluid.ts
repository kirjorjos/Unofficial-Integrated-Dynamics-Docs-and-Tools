import { UniquelyNamed } from "./UniquelyNamed";
import { Integer } from "../JavaNumberClasses/Integer";
import { Properties } from "./Properties";
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";

export class Fluid implements UniquelyNamed {

  static defaultProps = new Properties({
    uname: "",
    amount: new Integer(0),
    // block: new Block(),
    lightLevel: new Integer(0),
    density: new Integer(0),
    temperature: new Integer(0),
    viscosity: new Integer(0),
    lighterThanAir: false,
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
      Promise.all([import("./Item"), import("./Fluid")]).then((values => {
        if (!props.has("item")) props.set("item", new values[0].Item(new Properties({})));
        if (!props.has("fluid")) props.set("fluid", new values[1].Fluid(new Properties({})));
      }))
      this.props = props;
    }

  getUniqueName(): string {
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

  getLighterThanAir(): boolean {
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
}