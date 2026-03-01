import { Properties } from "IntegratedDynamicsClasses/Properties";
import { gameData } from "./registry";
import { Block } from "IntegratedDynamicsClasses/Block";
import { RegistryHub } from "./registryHub";

export type BlockConstructor = new (customData?: Record<string, any>) => Block;
type RawBlocks = typeof gameData.blocks;
type BlockNames = {
  [Mod in keyof RawBlocks]: `${Mod & string}:${keyof RawBlocks[Mod] & string}`;
}[keyof RawBlocks];
export type BlockKeys = Lowercase<BlockNames>;
type BlockRegistryMap = {
  [K in BlockKeys]: BlockConstructor;
};

class BlockRegistry {
  items: BlockRegistryMap;

  constructor() {
    this.items = BlockRegistry.loadBlocks();
  }

  private static loadBlocks(): BlockRegistryMap {
    const rawData = gameData.blocks;
    let classObj = {} as BlockRegistryMap;
    for (const [mod, data] of Object.entries(rawData)) {
      for (const [block, blockData] of Object.entries(data)) {
        const id = `${mod}:${block}`;
        const key = id.toLowerCase() as BlockKeys;
        const fullData = { ...blockData, id: id };
        classObj[key] = BlockRegistry.createBlockClass(fullData);
      }
    }
    return classObj;
  }

  private static createBlockClass(
    blockData: Record<string, any>
  ): BlockConstructor {
    const flattenedBase = BlockRegistry.flattenBlockData(blockData);
    return class extends Block {
      constructor(customData: Record<string, any> = {}) {
        super(
          new Properties({
            ...flattenedBase,
            ...BlockRegistry.flattenBlockData(customData),
          })
        );
      }
    };
  }

  private static flattenBlockData(
    data: Record<string, any>
  ): Record<string, any> {
    const flattened: Record<string, any> = { ...data };

    if (data["sounds"]) {
      if (data["sounds"]["break"])
        flattened["breakSound"] = data["sounds"]["break"];
      if (data["sounds"]["place"])
        flattened["placeSound"] = data["sounds"]["place"];
      if (data["sounds"]["step"])
        flattened["stepSound"] = data["sounds"]["step"];
      delete flattened["sounds"];
    }

    if (data["energy"]) {
      flattened["feContainer"] = data["energy"]["isContainer"];
      flattened["feCapacity"] = data["energy"]["capacity"];
      flattened["feStored"] = data["energy"]["stored"];
      delete flattened["energy"];
    }

    if (data["mod"]) flattened["modName"] = data["mod"];
    if (data["id"]) {
      flattened["id"] = data["id"];
      if (!flattened["blockName"]) flattened["blockName"] = data["id"];
    }
    if (data["name"]) flattened["displayName"] = data["name"];
    if (data["tags"]) flattened["tagNames"] = data["tags"];
    if (!data["rarity"]) flattened["rarity"] = "COMMON";

    return flattened;
  }

  load() {
    RegistryHub.blockRegistry = this;
  }
}

const blockRegistry = new BlockRegistry();
blockRegistry.load();
export { blockRegistry };
