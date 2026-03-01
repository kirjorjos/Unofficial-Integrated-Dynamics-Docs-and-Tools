import { UniquelyNamed } from "./UniquelyNamed";
import { Named } from "./Named";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "../JavaNumberClasses/Integer";
import { Double } from "../JavaNumberClasses/Double";
import { Properties } from "./Properties";
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";
import { iBoolean } from "./typeWrappers/iBoolean";
import { iString } from "./typeWrappers/iString";
import { iNull } from "./typeWrappers/iNull";
import { iArrayEager } from "./typeWrappers/iArrayEager";
import { Block } from "./Block";
import { Item } from "./Item";
import { iArray } from "./typeWrappers/iArray";

export class Entity implements UniquelyNamed, Named {
  static defaultProps = new Properties({
    id: new iString(""),
    displayName: new iString(""),
    mob: new iBoolean(false),
    animal: new iBoolean(false),
    player: new iBoolean(false),
    health: Integer.ZERO,
    width: Integer.ZERO,
    height: Integer.ZERO,
    burning: new iBoolean(false),
    wet: new iBoolean(false),
    crouching: new iBoolean(false),
    eating: new iBoolean(false),
    armorInventory: new iArrayEager<Item>([]),
    inventory: [] as Array<Item>,
    modName: new iString(""),
    targetBlock: new Block(new Properties({})),
    guiOpen: new iBoolean(false),
    heldItemMain: new Item(new Properties({})),
    heldItemOffHand: new Item(new Properties({})),
    entityMounted: new iBoolean(false),
    itemFrameContents: new Item(new Properties({})),
    itemFrameRotation: Integer.ZERO,
    hurtSound: new iString(""),
    deathSound: new iString(""),
    age: Integer.ZERO,
    child: new iBoolean(false),
    breedable: new iBoolean(false),
    inLove: new iBoolean(false),
    shearable: new iBoolean(false),
    breedableList: new iArrayEager<iString>([]),
    NBT: new iNull(),
    entityType: new iString(""),
    itemList: new iArrayEager<Item>([]),
    fluids: new iArrayEager<Fluid>([]),
    energyStored: Integer.ZERO,
    energyCapacity: Integer.ZERO,
  });

  props: Properties;
  private _signatureCache: any;

  constructor(newProps: Properties, oldEntity?: Entity) {
    let props = Entity.defaultProps.clone();
    if (oldEntity) props.setAll(oldEntity.getProperties());
    props.setAll(newProps);
    if (!props.has("heldItemMain"))
      props.set("heldItemMain", new Item(new Properties({})));
    if (!props.has("heldItemOffHand"))
      props.set("heldItemOffHand", new Item(new Properties({})));
    if (!props.has("itemFrameContents"))
      props.set("itemFrameContents", new Item(new Properties({})));
    if (!props.has("targetBlock"))
      props.set("targetBlock", new Block(new Properties({})));
    this.props = props;
  }

  getUniqueName(): iString {
    return this.props.get("id");
  }

  isMob(): iBoolean {
    return this.props.get("mob");
  }

  isAnimal(): iBoolean {
    return this.props.get("animal");
  }

  isItem(): iBoolean {
    return new iBoolean(this.getUniqueName().valueOf() === "minecraft:item");
  }

  isPlayer(): iBoolean {
    return this.props.get("player");
  }

  isMinecart(): iBoolean {
    return new iBoolean(
      this.getUniqueName().valueOf().includes("minecraft:minecart")
    );
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

  getArmorInventory(): iArray<Item> {
    return this.props.get("armorInventory");
  }

  getInventory(): iArray<Item> {
    return this.props.get("inventory");
  }

  getModName(): iString {
    return this.props.get("modName");
  }

  getTargetBlock(): Block {
    return this.props.get("targetBlock");
  }

  getTargetEntity(): Entity {
    if (!this.props.has("targetEntity")) return new Entity(new Properties({}));
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

  getMountedEntities(): Array<Entity> {
    return [];
  }

  isItemFrame(): iBoolean {
    const name = this.getUniqueName().valueOf();
    return new iBoolean(
      name === "minecraft:item_frame" || name === "minecraft:glow_item_frame"
    );
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

  getBreadableList(): iArray<iString> {
    return new iArrayEager<iString>([
      ...this.props.get("breedableList").valueOf(),
      this.getUniqueName(),
    ]);
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

  getName(): iString {
    return this.props.get("displayName");
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "Entity" }, false);
    this._signatureCache = newSignature;
    return newSignature;
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof Entity)) return new iBoolean(false);
    else {
      const keys = Object.getOwnPropertyNames(
        Object.getPrototypeOf(this)
      ).filter(
        (k) => !["constructor", "equals", "getSignatureNode"].includes(k)
      );
      for (const key of keys as Array<keyof Entity>) {
        if (this[key] instanceof Function) {
          try {
            const thisResult = (this[key] as Function)() as IntegratedValue;
            const otherResult = (other[key] as Function)() as IntegratedValue;
            if (!thisResult.equals(otherResult).valueOf())
              return new iBoolean(false);
          } catch {
            continue;
          }
        }
      }
      return new iBoolean(true);
    }
  }
}
