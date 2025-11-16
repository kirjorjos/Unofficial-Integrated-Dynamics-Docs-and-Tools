import { UniquelyNamed } from "./UniquelyNamed";
import { Integer } from "../JavaNumberClasses/Integer";
import { Double } from "../JavaNumberClasses/Double";
import { Properties } from "./Properties";
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";

export class Entity implements UniquelyNamed {

  static defaultProps = new Properties({
    uname: "",
    mob: false,
    animal: false,
    player: false,
    minecart: false,
    isItem: false,
    health: new Integer(0),
    width: new Integer(0),
    height: new Integer(0),
    burning: false,
    wet: false,
    crouching: false,
    eating: false,
    armorInventory: [] as Array<Item>,
    inventory: [] as Array<Item>,
    modName: "",
    // targetBlock: new Block(),
    targetEntity: new Entity(new Properties({})),
    guiOpen: false,
    // heldItemMain: new Item(),
    // heldItemOffHand: new Item(),
    entityMounted: false,
    itemFrame: false,
    // itemFrameContents: new Item(),
    itemFrameRotation: new Integer(0),
    hurtSound: "",
    deathSound: "",
    age: new Integer(0),
    child: false,
    breedable: false,
    inLove: false,
    shearable: false,
    breedableList: [] as Array<string>,
    NBT: null,
    entityType: "",
    itemList: [] as Array<Item>,
    fluids: [] as Array<Fluid>,
    energyStored: new Integer(0),
    energyCapacity: new Integer(0),
  });

  props: Properties;

  constructor(newProps: Properties, oldEntity?: Entity) {
    let props = Entity.defaultProps;
    props.setAll(newProps);
    if (oldEntity) props.setAll(oldEntity.getProperties());
    Promise.all([import("./Item"), import("./Block")]).then((values => {
      if (!props.has("heldItemMain")) props.set("heldItemMain", new values[0].Item(new Properties({})));
      if (!props.has("helpItemOffHand")) props.set("helpItemOffHand", new values[0].Item(new Properties({})));
      if (!props.has("itemFrameContents")) props.set("itemFrameContents", new values[0].Item(new Properties({})));
      if (!props.has("targetBlock")) props.set("targetBlock", new values[1].Block(new Properties({})));
    }))
    this.props = props;
  }

  getUniqueName(): string {
    return this.props.get("uname");
  }

  isMob(): boolean {
    return this.props.get("mob");
  }

  isAnimal(): boolean {
    return this.props.get("animal");
  }

  isItem(): boolean {
    return !this.props.get("isItem");
  }

  isPlayer(): boolean {
    return this.props.get("player");
  }

  isMinecart(): boolean {
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

  isBurning(): boolean {
    return this.props.get("burning");
  }

  isWet(): boolean {
    return this.props.get("wet");
  }

  isCrouching(): boolean {
    return this.props.get("crouching");
  }

  isEating(): boolean {
    return this.props.get("eating");
  }

  getArmorInventory(): Array<Item> {
    return this.props.get("armorInventory");
  }

  getInventory(): Array<Item> {
    return this.props.get("inventory");
  }

  getModName(): string {
    return this.props.get("modName");
  }

  getTargetBlock(): Block {
    return this.props.get("targetBlock");
  }

  getTargetEntity(): Entity {
    return this.props.get("targetEntity");
  }

  hasGuiOpen(): boolean {
    return this.props.get("guiOpen");
  }

  getHeldItemMain(): Item {
    return this.props.get("heldItemMain");
  }

  getHeldItemOffHand(): Item {
    return this.props.get("heldItemOffHand");
  }

  isEntityMounted(): boolean {
    return this.props.get("entityMounted");
  }

  isItemFrame(): boolean {
    return this.props.get("itemFrame");
  }

  getItemFrameContents(): Item {
    return this.props.get("itemFrameContents");
  }

  getItemFrameRotation(): Integer {
    return this.props.get("itemFrameRotation");
  }

  getHurtSound(): string {
    return this.props.get("hurtSound");
  }

  getDeathSound(): string {
    return this.props.get("deathSound");
  }

  getAge(): Integer {
    return this.props.get("age");
  }

  isChild(): boolean {
    return this.props.get("child");
  }

  canBreed(): boolean {
    return this.props.get("breedable");
  }

  isInLove(): boolean {
    return this.props.get("inLove");
  }

  isShearable(): boolean {
    return this.props.get("shearable");
  }

  getBreadableList(): Array<string> {
    return [...this.props.get("breedableList"), this.props.get("uname")];
  }

  getNBT(): CompoundTag {
    return this.props.get("NBT");
  }

  getEntityType(): string {
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
}