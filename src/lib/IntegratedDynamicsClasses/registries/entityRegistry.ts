import { Properties } from "lib/IntegratedDynamicsClasses/Properties";
import { gameData } from "lib/IntegratedDynamicsClasses/registries/registry";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { RegistryHub } from "lib/IntegratedDynamicsClasses/registries/registryHub";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

export type EntityConstructor = new (
  customData?: Record<string, any>
) => Entity;
type RawEntities = typeof gameData.entities;
type EntityNames = {
  [Mod in keyof RawEntities]: `${Mod & string}:${keyof RawEntities[Mod] & string}`;
}[keyof RawEntities];
export type EntityKeys = Lowercase<EntityNames>;
type EntityRegistryMap = {
  [K in EntityKeys]: EntityConstructor;
};

class EntityRegistry {
  items: EntityRegistryMap;

  constructor() {
    this.items = EntityRegistry.loadEntities();
  }

  private static loadEntities(): EntityRegistryMap {
    const rawData = gameData.entities;
    let classObj = {} as EntityRegistryMap;
    for (const [mod, data] of Object.entries(rawData)) {
      for (const [entity, entityData] of Object.entries(data)) {
        const id = `${mod}:${entity}`;
        const key = id.toLowerCase() as EntityKeys;
        const fullData = { ...entityData, id: id };
        classObj[key] = EntityRegistry.createEntityClass(fullData);
      }
    }
    return classObj;
  }

  private static createEntityClass(
    entityData: Record<string, any>
  ): EntityConstructor {
    const flattenedBase = EntityRegistry.flattenEntityData(entityData);
    return class extends Entity {
      constructor(customData: Record<string, any> = {}) {
        super(
          new Properties({
            ...flattenedBase,
            ...EntityRegistry.flattenEntityData(customData),
          })
        );
      }
    };
  }

  private static flattenEntityData(
    data: Record<string, any>
  ): Record<string, any> {
    const flattened: Record<string, any> = { ...data };

    if (data["isMob"]) flattened["mob"] = data["isMob"];
    if (data["isAnimal"]) flattened["animal"] = data["isAnimal"];
    if (data["isPlayer"]) flattened["player"] = data["isPlayer"];
    if (data["isChild"]) flattened["child"] = data["isChild"];
    if (data["canBreed"]) flattened["breedable"] = data["canBreed"];
    if (data["isInLove"]) flattened["inLove"] = data["isInLove"];
    if (data["isBurning"]) flattened["burning"] = data["isBurning"];
    if (data["isWet"]) flattened["wet"] = data["isWet"];
    if (data["isCrouching"]) flattened["crouching"] = data["isCrouching"];
    if (data["isEating"]) flattened["eating"] = data["isEating"];

    if (data["mod"]) flattened["modName"] = data["mod"];
    if (data["id"]) {
      flattened["id"] = data["id"];
    }
    if (data["name"]) flattened["displayName"] = data["name"];
    if (data["tags"]) {
      flattened["tagNames"] = new iArrayEager(
        data["tags"].map((t: string) => new iString(t))
      );
    }
    if (data["breedableList"]) {
      flattened["breedableList"] = new iArrayEager(
        data["breedableList"].map((t: string) => new iString(t))
      );
    }
    if (data["nbt"]) {
      flattened["NBT"] = new CompoundTag(data["nbt"]);
    }

    if (data["sounds"]) {
      if (data["sounds"]["hurt"])
        flattened["hurtSound"] = data["sounds"]["hurt"];
      if (data["sounds"]["death"])
        flattened["deathSound"] = data["sounds"]["death"];
      delete flattened["sounds"];
    }

    return flattened;
  }

  load() {
    RegistryHub.entityRegistry = this;
  }
}

const entityRegistry = new EntityRegistry();
entityRegistry.load();
export { entityRegistry };
