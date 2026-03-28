import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { entityRegistry } from "lib/IntegratedDynamicsClasses/registries/entityRegistry";
import { itemRegistry } from "lib/IntegratedDynamicsClasses/registries/itemRegistry";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Double } from "lib/JavaNumberClasses/Double";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { iNull } from "lib/IntegratedDynamicsClasses/typeWrappers/iNull";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

/**
 * Test the different entity operators.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

// Mock the CyclopsCoreInstance
const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();
entityRegistry.load();
itemRegistry.load();

describe("TestEntityOperators", () => {
  let eZombie: Entity;
  let eZombieBurning: Entity;
  let eZombieWet: Entity;
  let eZombieCrouching: Entity;
  let eZombieEating: Entity;
  let eChicken: Entity;
  let eItem: Entity;
  let eItemFrame: Entity;
  let ePlayer: Entity;
  let eZombieHeldItems: Entity;
  let eBoat: Entity;
  let eItemframe: Entity;
  let eZombieAged: Entity;
  let eZombieBaby: Entity;
  let eCow: Entity;
  let eCowAlreadyBred: Entity;
  let eCowBaby: Entity;
  let eCowInLove: Entity;
  let ePig: Entity;
  let eSheep: Entity;
  let eSheepSheared: Entity;

  let iCarrot: Item;
  let iWheat: Item;

  let DUMMY_VARIABLE: iNull;

  beforeEach(() => {
    eZombie = new entityRegistry.items["minecraft:zombie"]();
    eZombieBurning = new entityRegistry.items["minecraft:zombie"]({
      burning: true,
    });
    eZombieWet = new entityRegistry.items["minecraft:zombie"]({ wet: true });
    eZombieCrouching = new entityRegistry.items["minecraft:zombie"]({
      crouching: true,
    });
    eZombieEating = new entityRegistry.items["minecraft:zombie"]({
      eating: true,
    });
    eChicken = new entityRegistry.items["minecraft:chicken"]();
    eItem = new entityRegistry.items["minecraft:item"]();
    eItemFrame = new entityRegistry.items["minecraft:item_frame"]();
    ePlayer = new entityRegistry.items["minecraft:player"]();
    eZombieHeldItems = new entityRegistry.items["minecraft:zombie"]({
      heldItemMain: new itemRegistry.items["minecraft:apple"](),
      heldItemOffHand: new itemRegistry.items["minecraft:potato"](),
    });
    eBoat = new entityRegistry.items["minecraft:boat"]();
    eItemframe = new entityRegistry.items["minecraft:item_frame"]({
      itemFrame: true,
      itemFrameContents: new itemRegistry.items["minecraft:potato"](),
      itemFrameRotation: new Integer(3),
    });
    eZombieAged = new entityRegistry.items["minecraft:zombie"]({
      age: new Integer(3),
    });
    eZombieBaby = new entityRegistry.items["minecraft:zombie"]({
      child: true,
    });
    eCow = new entityRegistry.items["minecraft:cow"]();
    eCowAlreadyBred = new entityRegistry.items["minecraft:cow"]({
      breedingAge: new Integer(10),
    });
    eCowBaby = new entityRegistry.items["minecraft:cow"]({
      breedingAge: new Integer(-10),
    });
    eCowInLove = new entityRegistry.items["minecraft:cow"]({ inLove: true });
    ePig = new entityRegistry.items["minecraft:pig"]();
    eSheep = new entityRegistry.items["minecraft:sheep"]();
    eSheepSheared = new entityRegistry.items["minecraft:sheep"]({
      isSheared: true,
    });

    iCarrot = new itemRegistry.items["minecraft:carrot"]();
    iWheat = new itemRegistry.items["minecraft:wheat"]();

    DUMMY_VARIABLE = new iNull();
  });

  /**
   * ----------------------------------- ISMOB -----------------------------------
   */

  it("testBlockIsMob", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_ISMOB().evaluate(eZombie);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.OBJECT_ENTITY_ISMOB().evaluate(eChicken);
    expect((res2 as iBoolean).valueOf()).toBe(false);

    const res3 = new operatorRegistry.OBJECT_ENTITY_ISMOB().evaluate(eItem);
    expect((res3 as iBoolean).valueOf()).toBe(false);

    const res4 = new operatorRegistry.OBJECT_ENTITY_ISMOB().evaluate(
      eItemFrame
    );
    expect((res4 as iBoolean).valueOf()).toBe(false);

    const res5 = new operatorRegistry.OBJECT_ENTITY_ISMOB().evaluate(ePlayer);
    expect((res5 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeIsMobLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISMOB().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeIsMobSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISMOB().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsMob", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISMOB().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISANIMAL -----------------------------------
   */

  it("testBlockIsAnimal", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_ISANIMAL().evaluate(
      eZombie
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ENTITY_ISANIMAL().evaluate(
      eChicken
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 = new operatorRegistry.OBJECT_ENTITY_ISANIMAL().evaluate(eItem);
    expect((res3 as iBoolean).valueOf()).toBe(false);

    const res4 = new operatorRegistry.OBJECT_ENTITY_ISANIMAL().evaluate(
      eItemFrame
    );
    expect((res4 as iBoolean).valueOf()).toBe(false);

    const res5 = new operatorRegistry.OBJECT_ENTITY_ISANIMAL().evaluate(
      ePlayer
    );
    expect((res5 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeIsAnimalLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISANIMAL().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeIsAnimalSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISANIMAL().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsAnimal", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISANIMAL().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISITEM -----------------------------------
   */

  it("testBlockIsItem", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_ISITEM().evaluate(eZombie);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ENTITY_ISITEM().evaluate(eChicken);
    expect((res2 as iBoolean).valueOf()).toBe(false);

    const res3 = new operatorRegistry.OBJECT_ENTITY_ISITEM().evaluate(eItem);
    expect((res3 as iBoolean).valueOf()).toBe(true);

    const res4 = new operatorRegistry.OBJECT_ENTITY_ISITEM().evaluate(
      eItemFrame
    );
    expect((res4 as iBoolean).valueOf()).toBe(false);

    const res5 = new operatorRegistry.OBJECT_ENTITY_ISITEM().evaluate(ePlayer);
    expect((res5 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeIsItemLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISITEM().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeIsItemSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISITEM().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsItem", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISITEM().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISPLAYER -----------------------------------
   */

  it("testBlockIsPlayer", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_ISPLAYER().evaluate(
      eZombie
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ENTITY_ISPLAYER().evaluate(
      eChicken
    );
    expect((res2 as iBoolean).valueOf()).toBe(false);

    const res3 = new operatorRegistry.OBJECT_ENTITY_ISPLAYER().evaluate(eItem);
    expect((res3 as iBoolean).valueOf()).toBe(false);

    const res4 = new operatorRegistry.OBJECT_ENTITY_ISPLAYER().evaluate(
      eItemFrame
    );
    expect((res4 as iBoolean).valueOf()).toBe(false);

    const res5 = new operatorRegistry.OBJECT_ENTITY_ISPLAYER().evaluate(
      ePlayer
    );
    expect((res5 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsPlayerLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISPLAYER().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeIsPlayerSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISPLAYER().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsPlayer", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISPLAYER().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ITEMSTACK -----------------------------------
   */

  it("testBlockItemStack", () => {
    const res1 = new operatorRegistry.ENTITY_ITEM().evaluate(eZombie);
    expect(res1).toBeInstanceOf(Item);
    expect((res1 as Item).getUniqueName().valueOf()).toBe("");

    const res2 = new operatorRegistry.ENTITY_ITEM().evaluate(eItem);
    expect((res2 as Item).getUniqueName().valueOf()).toBe("");
  });

  it("testInvalidInputSizeItemStackLarge", () => {
    expect(() => {
      new operatorRegistry.ENTITY_ITEM().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeItemStackSmall", () => {
    expect(() => {
      new operatorRegistry.ENTITY_ITEM().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeItemStack", () => {
    expect(() => {
      new operatorRegistry.ENTITY_ITEM().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- HEALTH -----------------------------------
   */

  it("testBlockHealth", () => {
    const res1 = new operatorRegistry.ENTITY_HEALTH().evaluate(eZombie);
    expect(res1).toBeInstanceOf(Double);
    expect((res1 as Double).toJSNumber()).toBe(20.0);

    const res2 = new operatorRegistry.ENTITY_HEALTH().evaluate(eItem);
    expect((res2 as Double).toJSNumber()).toBe(0);
  });

  it("testInvalidInputSizeHealthLarge", () => {
    expect(() => {
      new operatorRegistry.ENTITY_HEALTH().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeHealthSmall", () => {
    expect(() => {
      new operatorRegistry.ENTITY_HEALTH().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeHealth", () => {
    expect(() => {
      new operatorRegistry.ENTITY_HEALTH().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- WIDTH -----------------------------------
   */

  it("testBlockWidth", () => {
    const res1 = new operatorRegistry.ENTITY_WIDTH().evaluate(eZombie);
    expect(res1).toBeInstanceOf(Double);
    expect((res1 as Double).toJSNumber()).toBe(0.6);

    const res2 = new operatorRegistry.ENTITY_WIDTH().evaluate(eItem);
    expect((res2 as Double).toJSNumber()).toBe(0.25);
  });

  it("testInvalidInputSizeWidthLarge", () => {
    expect(() => {
      new operatorRegistry.ENTITY_WIDTH().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeWidthSmall", () => {
    expect(() => {
      new operatorRegistry.ENTITY_WIDTH().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeWidth", () => {
    expect(() => {
      new operatorRegistry.ENTITY_WIDTH().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- HEIGHT -----------------------------------
   */

  it("testBlockHeight", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_HEIGHT().evaluate(eZombie);
    expect(res1).toBeInstanceOf(Double);
    expect((res1 as Double).toJSNumber()).toBe(1.95);

    const res2 = new operatorRegistry.OBJECT_ENTITY_HEIGHT().evaluate(eItem);
    expect((res2 as Double).toJSNumber()).toBe(0.25);
  });

  it("testInvalidInputSizeHeightLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_HEIGHT().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeHeightSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_HEIGHT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeHeight", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_HEIGHT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISBURNING -----------------------------------
   */

  it("testBlockIsBurning", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_ISBURNING().evaluate(
      eZombie
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ENTITY_ISBURNING().evaluate(
      eZombieBurning
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsBurningLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISBURNING().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeIsBurningSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISBURNING().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsBurning", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISBURNING().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISWET -----------------------------------
   */

  it("testBlockIsWet", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_ISWET().evaluate(eZombie);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ENTITY_ISWET().evaluate(
      eZombieWet
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsWetLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISWET().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeIsWetSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISWET().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsWet", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISWET().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISCROUCHING -----------------------------------
   */

  it("testBlockIsCrouching", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_ISCROUCHING().evaluate(
      eZombie
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ENTITY_ISCROUCHING().evaluate(
      eZombieCrouching
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsCrouchingLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISCROUCHING().evaluate(
        eZombie,
        eZombie
      );
    }).toThrow();
  });

  it("testInvalidInputSizeIsCrouchingSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISCROUCHING().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsCrouching", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISCROUCHING().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISEATING -----------------------------------
   */

  it("testBlockIsEating", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_ISEATING().evaluate(
      eZombie
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ENTITY_ISEATING().evaluate(
      eZombieEating
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsEatingLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISEATING().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeIsEatingSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISEATING().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsEating", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISEATING().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- MODNAME -----------------------------------
   */

  it("testEntityModName", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_MODNAME().evaluate(eZombie);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("Minecraft");
  });

  it("testInvalidInputSizeModNameLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_MODNAME().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeModNameSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_MODNAME().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeModName", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_MODNAME().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- HELDITEM_MAIN -----------------------------------
   */

  it("testEntityHeldItemMain", () => {
    const res1 = new operatorRegistry.ENTITY_HELDITEM().evaluate(
      eZombieHeldItems
    );
    expect(res1).toBeInstanceOf(Item);
    expect((res1 as Item).getUniqueName().valueOf()).toBe("minecraft:apple");
  });

  it("testInvalidInputSizeHeldItemMainLarge", () => {
    expect(() => {
      new operatorRegistry.ENTITY_HELDITEM().evaluate(
        eZombieHeldItems,
        eZombieHeldItems
      );
    }).toThrow();
  });

  it("testInvalidInputSizeHeldItemMainSmall", () => {
    expect(() => {
      new operatorRegistry.ENTITY_HELDITEM().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeHeldItemMain", () => {
    expect(() => {
      new operatorRegistry.ENTITY_HELDITEM().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- HELDITEM_OFF -----------------------------------
   */

  it("testEntityHeldItemOff", () => {
    const res1 = new operatorRegistry.ENTITY_HELDITEMOFFHAND().evaluate(
      eZombieHeldItems
    );
    expect(res1).toBeInstanceOf(Item);
    expect((res1 as Item).getUniqueName().valueOf()).toBe("minecraft:potato");
  });

  it("testInvalidInputSizeHeldItemOffLarge", () => {
    expect(() => {
      new operatorRegistry.ENTITY_HELDITEMOFFHAND().evaluate(
        eZombieHeldItems,
        eZombieHeldItems
      );
    }).toThrow();
  });

  it("testInvalidInputSizeHeldItemOffSmall", () => {
    expect(() => {
      new operatorRegistry.ENTITY_HELDITEMOFFHAND().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeHeldItemOff", () => {
    expect(() => {
      new operatorRegistry.ENTITY_HELDITEMOFFHAND().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- MOUNTED -----------------------------------
   */

  it("testEntityMounted", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_MOUNTED().evaluate(eBoat);
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<Entity>).size().toJSNumber()).toBe(0);
  });

  it("testInvalidInputSizeMountedLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_MOUNTED().evaluate(eBoat, eBoat);
    }).toThrow();
  });

  it("testInvalidInputSizeMountedSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_MOUNTED().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeMounted", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_MOUNTED().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ITEMFRAME_CONTENTS -----------------------------------
   */

  it("testEntityItemframeContents", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMFRAME_CONTENTS().evaluate(
      eItemframe
    );
    expect(res1).toBeInstanceOf(Item);
    expect((res1 as Item).getUniqueName().valueOf()).toBe("minecraft:potato");
  });

  it("testInvalidInputSizeItemframeContentsLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMFRAME_CONTENTS().evaluate(
        eItemframe,
        eItemframe
      );
    }).toThrow();
  });

  it("testInvalidInputSizeItemframeContentsSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMFRAME_CONTENTS().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeItemframeContents", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMFRAME_CONTENTS().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ITEMFRAME_ROTATION -----------------------------------
   */

  it("testEntityItemframeRotation", () => {
    const res1 = new operatorRegistry.OBJECT_ITEMFRAME_ROTATION().evaluate(
      eItemframe
    );
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(3);
  });

  it("testInvalidInputSizeItemframeRotationLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMFRAME_ROTATION().evaluate(
        eItemframe,
        eItemframe
      );
    }).toThrow();
  });

  it("testInvalidInputSizeItemframeRotationSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMFRAME_ROTATION().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeItemframeRotation", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ITEMFRAME_ROTATION().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- HURTSOUND -----------------------------------
   */

  it("testEntityHurtSound", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_HURTSOUND().evaluate(
      eZombie
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("minecraft:entity.zombie.hurt");
  });

  it("testInvalidInputSizeHurtSoundLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_HURTSOUND().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeHurtSoundSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_HURTSOUND().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeHurtSound", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_HURTSOUND().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- DEATHSOUND -----------------------------------
   */

  it("testEntityDeathSound", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_DEATHSOUND().evaluate(
      eZombie
    );
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("minecraft:entity.zombie.death");
  });

  it("testInvalidInputSizeDeathSoundLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_DEATHSOUND().evaluate(
        eZombie,
        eZombie
      );
    }).toThrow();
  });

  it("testInvalidInputSizeDeathSoundSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_DEATHSOUND().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeDeathSound", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_DEATHSOUND().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- AGE -----------------------------------
   */

  it("testBlockAge", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_AGE().evaluate(eZombieAged);
    expect(res1).toBeInstanceOf(Integer);
    expect((res1 as Integer).toJSNumber()).toBe(3);
  });

  it("testInvalidInputSizeAgeLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_AGE().evaluate(
        eZombieAged,
        eZombieAged
      );
    }).toThrow();
  });

  it("testInvalidInputSizeAgeSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_AGE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeAge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_AGE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISCHILD -----------------------------------
   */

  it("testBlockIsChild", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_ISCHILD().evaluate(eZombie);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ENTITY_ISCHILD().evaluate(
      eZombieBaby
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsChildLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISCHILD().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeIsChildSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISCHILD().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsChild", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISCHILD().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- CANBREED -----------------------------------
   */

  it("testBlockCanBreed", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_CANBREED().evaluate(eCow);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(true);

    const res2 = new operatorRegistry.OBJECT_ENTITY_CANBREED().evaluate(
      eCowAlreadyBred
    );
    expect((res2 as iBoolean).valueOf()).toBe(false);

    const res3 = new operatorRegistry.OBJECT_ENTITY_CANBREED().evaluate(
      eCowBaby
    );
    expect((res3 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeCanBreedLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_CANBREED().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeCanBreedSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_CANBREED().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeCanBreed", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_CANBREED().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ISINLOVE -----------------------------------
   */

  it("testBlockIsInLove", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_ISINLOVE().evaluate(eCow);
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ENTITY_ISINLOVE().evaluate(
      eCowInLove
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);
  });

  it("testInvalidInputSizeIsInLoveLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISINLOVE().evaluate(eCow, eCow);
    }).toThrow();
  });

  it("testInvalidInputSizeIsInLoveSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISINLOVE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsInLove", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISINLOVE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- CANBREEDWITH -----------------------------------
   */

  it("testBlockCanBreedWith", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_CANBREEDWITH().evaluate(
      eCow,
      iCarrot
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ENTITY_CANBREEDWITH().evaluate(
      eCow,
      iWheat
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 = new operatorRegistry.OBJECT_ENTITY_CANBREEDWITH().evaluate(
      ePig,
      iCarrot
    );
    expect((res3 as iBoolean).valueOf()).toBe(true);

    const res4 = new operatorRegistry.OBJECT_ENTITY_CANBREEDWITH().evaluate(
      ePig,
      iWheat
    );
    expect((res4 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeCanBreedWithLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_CANBREEDWITH().evaluate(
        eCow,
        iCarrot,
        iCarrot
      );
    }).toThrow();
  });

  it("testInvalidInputSizeCanBreedWithSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_CANBREEDWITH().evaluate(eCow);
    }).toThrow();
  });

  it("testInvalidInputTypeCanBreedWith", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_CANBREEDWITH().evaluate(
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- ISSHEARABLE -----------------------------------
   */

  it("testBlockIsShearable", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_ISSHEARABLE().evaluate(
      eCow
    );
    expect(res1).toBeInstanceOf(iBoolean);
    expect((res1 as iBoolean).valueOf()).toBe(false);

    const res2 = new operatorRegistry.OBJECT_ENTITY_ISSHEARABLE().evaluate(
      eSheep
    );
    expect((res2 as iBoolean).valueOf()).toBe(true);

    const res3 = new operatorRegistry.OBJECT_ENTITY_ISSHEARABLE().evaluate(
      eSheepSheared
    );
    expect((res3 as iBoolean).valueOf()).toBe(false);
  });

  it("testInvalidInputSizeIsShearableLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISSHEARABLE().evaluate(eCow, eCow);
    }).toThrow();
  });

  it("testInvalidInputSizeIsShearableSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISSHEARABLE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeIsShearable", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_ISSHEARABLE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- NBT -----------------------------------
   */

  it("testBlockNbt", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_NBT().evaluate(eZombie);
    expect(res1).toBeInstanceOf(CompoundTag);
    expect((res1 as CompoundTag).equals(new CompoundTag()).valueOf()).toBe(
      true
    );
  });

  it("testInvalidInputSizeNbtLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_NBT().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeNbtSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_NBT().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeNbt", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_NBT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- TYPE -----------------------------------
   */

  it("testEntityType", () => {
    const res1 = new operatorRegistry.OBJECT_ENTITY_TYPE().evaluate(eZombie);
    expect(res1).toBeInstanceOf(iString);
    expect((res1 as iString).valueOf()).toBe("minecraft:zombie");
  });

  it("testInvalidInputSizeTypeLarge", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_TYPE().evaluate(eZombie, eZombie);
    }).toThrow();
  });

  it("testInvalidInputSizeTypeSmall", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_TYPE().evaluate();
    }).toThrow();
  });

  it("testInvalidInputTypeType", () => {
    expect(() => {
      new operatorRegistry.OBJECT_ENTITY_TYPE().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });
});
