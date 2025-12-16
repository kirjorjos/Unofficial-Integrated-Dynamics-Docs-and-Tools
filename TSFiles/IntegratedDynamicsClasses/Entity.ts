import { UniquelyNamed } from "./UniquelyNamed";
import { Integer } from "../JavaNumberClasses/Integer";
import { Double } from "../JavaNumberClasses/Double";
import { Properties } from "./Properties";
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";
import { iBoolean } from "./typeWrappers/iBoolean";
import { iString } from "./typeWrappers/iString";
import { iNull } from "./typeWrappers/iNull";
import { iArray } from "./typeWrappers/iArray";

export class Entity implements UniquelyNamed, IntegratedValue {
  static defaultProps = new Properties({
    uname: new iString(""),
    mob: new iBoolean(false),
    animal: new iBoolean(false),
    player: new iBoolean(false),
    minecart: new iBoolean(false),
    isItem: new iBoolean(false),
    health: new Integer(0),
    width: new Integer(0),
    height: new Integer(0),
    burning: new iBoolean(false),
    wet: new iBoolean(false),
    crouching: new iBoolean(false),
    eating: new iBoolean(false),
    armorInventory: new iArray<Item>([]),
    inventory: [] as Array<Item>,
    modName: new iString(""),
    // targetBlock: new Block(),
    targetEntity: new Entity(new Properties({})),
    guiOpen: new iBoolean(false),
    // heldItemMain: new Item(),
    // heldItemOffHand: new Item(),
    entityMounted: new iBoolean(false),
    itemFrame: new iBoolean(false),
    // itemFrameContents: new Item(),
    itemFrameRotation: new Integer(0),
    hurtSound: new iString(""),
    deathSound: new iString(""),
    age: new Integer(0),
    child: new iBoolean(false),
    breedable: new iBoolean(false),
    inLove: new iBoolean(false),
    shearable: new iBoolean(false),
    breedableList: new iArray<iString>([]),
    NBT: new iNull(),
    entityType: new iString(""),
    itemList: new iArray<Item>([]),
    fluids: new iArray<Fluid>([]),
    energyStored: new Integer(0),
    energyCapacity: new Integer(0),
  });

  props: Properties;

  constructor(newProps: Properties, oldEntity?: Entity) {
    let props = Entity.defaultProps;
    props.setAll(newProps);
    if (oldEntity) props.setAll(oldEntity.getProperties());
    Promise.all([import("./Item"), import("./Block")]).then((values) => {
      if (!props.has("heldItemMain"))
        props.set("heldItemMain", new values[0].Item(new Properties({})));
      if (!props.has("helpItemOffHand"))
        props.set("helpItemOffHand", new values[0].Item(new Properties({})));
      if (!props.has("itemFrameContents"))
        props.set("itemFrameContents", new values[0].Item(new Properties({})));
      if (!props.has("targetBlock"))
        props.set("targetBlock", new values[1].Block(new Properties({})));
    });
    this.props = props;
  }

  getUniqueName(): iString {
    return this.props.get("uname");
  }

  isMob(): iBoolean {
    return this.props.get("mob");
  }

  isAnimal(): iBoolean {
    return this.props.get("animal");
  }

  isItem(): iBoolean {
    return new iBoolean(!this.props.get("isItem").valueOf());
  }

  isPlayer(): iBoolean {
    return this.props.get("player");
  }

  isMinecart(): iBoolean {
    return this.props.get("minecart");
  }

  getItem(): Item {
    return this.props.get("item");
  }

  getHealth(): Double {
    return new Double(this.props.get("health").toDecimal());
  }

  getWidth(): Double {
    return new Double(this.props.get("width").toDecimal());
  }

  getHeight(): Double {
    return new Double(this.props.get("height").toDecimal());
  }

  isBurning(): iBoolean {
    return this.props.get("burning");
  }

  isWet(): iBoolean {
    return this.props.get("wet");
  }

  isCrouching(): iBoolean {
    return this.props.get("crouching");
  }

  isEating(): iBoolean {
    return this.props.get("eating");
  }

  getArmorInventory(): Array<Item> {
    return this.props.get("armorInventory");
  }

  getInventory(): Array<Item> {
    return this.props.get("inventory");
  }

  getModName(): iString {
    return this.props.get("modName");
  }

  getTargetBlock(): Block {
    return this.props.get("targetBlock");
  }

  getTargetEntity(): Entity {
    return this.props.get("targetEntity");
  }

  hasGuiOpen(): iBoolean {
    return this.props.get("guiOpen");
  }

  getHeldItemMain(): Item {
    return this.props.get("heldItemMain");
  }

  getHeldItemOffHand(): Item {
    return this.props.get("heldItemOffHand");
  }

  isEntityMounted(): iBoolean {
    return this.props.get("entityMounted");
  }

  isItemFrame(): iBoolean {
    return this.props.get("itemFrame");
  }

  getItemFrameContents(): Item {
    return this.props.get("itemFrameContents");
  }

  getItemFrameRotation(): Integer {
    return this.props.get("itemFrameRotation");
  }

  getHurtSound(): iString {
    return this.props.get("hurtSound");
  }

  getDeathSound(): iString {
    return this.props.get("deathSound");
  }

  getAge(): Integer {
    return this.props.get("age");
  }

  isChild(): iBoolean {
    return this.props.get("child");
  }

  canBreed(): iBoolean {
    return this.props.get("breedable");
  }

  isInLove(): iBoolean {
    return this.props.get("inLove");
  }

  isShearable(): iBoolean {
    return this.props.get("shearable");
  }

  getBreadableList(): Array<iString> {
    return [...this.props.get("breedableList"), this.props.get("uname")];
  }

  getNBT(): CompoundTag {
    return this.props.get("NBT");
  }

  getEntityType(): iString {
    return this.props.get("entityType");
  }

  getItemList(): Array<Item> {
    return this.props.get("itemList");
  }

  getFluids(): Array<Fluid> {
    return this.props.get("fluids");
  }

  getEnergyStored(): Integer {
    return this.props.get("energyStored");
  }

  getEnergyCapacity(): Integer {
    return this.props.get("energyCapacity");
  }

  getProperties(): Properties {
    return this.props;
  }

  getSignatureNode(): TypeRawSignatureAST.RawSignatureNode {
    return {
      type: "Entity",
    };
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof Entity)) return new iBoolean(false);
    else {
      for (const key of Object.keys(this) as Array<keyof Entity>) {
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
