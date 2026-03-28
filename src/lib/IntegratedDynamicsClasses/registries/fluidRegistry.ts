import { Properties } from "lib/IntegratedDynamicsClasses/Properties";
import { gameData } from "lib/IntegratedDynamicsClasses/registries/registry";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { RegistryHub } from "lib/IntegratedDynamicsClasses/registries/registryHub";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export type FluidConstructor = new (customData?: Record<string, any>) => Fluid;
type RawFluids = typeof gameData.fluids;
import { Integer } from "lib/JavaNumberClasses/Integer";

type FluidNames = {
  [Mod in keyof RawFluids]: `${Mod & string}:${keyof RawFluids[Mod] & string}`;
}[keyof RawFluids];
export type FluidKeys = Lowercase<FluidNames>;
type FluidRegistryMap = {
  [K in FluidKeys]: FluidConstructor;
};

class FluidRegistry {
  items: FluidRegistryMap;

  constructor() {
    this.items = FluidRegistry.loadFluids();
  }

  private static loadFluids(): FluidRegistryMap {
    const rawData = gameData.fluids;
    let classObj = {} as FluidRegistryMap;
    for (const [mod, data] of Object.entries(rawData)) {
      for (const [fluid, fluidData] of Object.entries(data)) {
        const id = `${mod}:${fluid}`;
        const key = id.toLowerCase() as FluidKeys;
        const fullData = { ...fluidData, id: id, amount: new Integer(1000) };
        classObj[key] = FluidRegistry.createFluidClass(fullData);
      }
    }
    return classObj;
  }

  private static createFluidClass(
    fluidData: Record<string, any>
  ): FluidConstructor {
    const flattenedBase = FluidRegistry.flattenFluidData(fluidData);
    return class extends Fluid {
      constructor(customData: Record<string, any> = {}) {
        super(
          new Properties({
            ...flattenedBase,
            ...FluidRegistry.flattenFluidData(customData),
          })
        );
      }
    };
  }

  private static flattenFluidData(
    data: Record<string, any>
  ): Record<string, any> {
    const flattened: Record<string, any> = { ...data };

    if (data["mod"]) flattened["modName"] = data["mod"];
    if (data["id"]) {
      flattened["id"] = data["id"];
    }
    if (data["tags"]) {
      flattened["tagNames"] = new iArrayEager(
        data["tags"].map((t: string) => new iString(t))
      );
    }
    if (data["lightLevel"] !== undefined) {
      flattened["lightLevel"] = new Integer(data["lightLevel"]);
    }
    if (data["name"]) flattened["displayName"] = data["name"];
    if (!data["rarity"]) flattened["rarity"] = "COMMON";

    if (data["sounds"]) {
      if (data["sounds"]["bucketEmpty"])
        flattened["bucketEmptySound"] = data["sounds"]["bucketEmpty"];
      if (data["sounds"]["bucketFill"])
        flattened["bucketFillSound"] = data["sounds"]["bucketFill"];
      if (data["sounds"]["vaporize"])
        flattened["fluidVaporizeSound"] = data["sounds"]["vaporize"];
      delete flattened["sounds"];
    }

    return flattened;
  }

  load() {
    RegistryHub.fluidRegistry = this;
  }
}

const fluidRegistry = new FluidRegistry();
fluidRegistry.load();
export { fluidRegistry };
