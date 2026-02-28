import { Properties } from "IntegratedDynamicsClasses/Properties";
import { gameData } from "./registry";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { RegistryHub } from "./registryHub";

type FluidConstructor = new (customData?: Record<string, any>) => Fluid;
type RawFluids = typeof gameData.fluids;
type FluidNames = {
  [Group in keyof RawFluids]: keyof RawFluids[Group];
}[keyof RawFluids];
export type FluidKeys = Lowercase<FluidNames & string>;
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
        const key = fluid.toLowerCase() as FluidKeys;
        const fullData = { ...fluidData, id: `${mod}:${fluid}` };
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
    if (data["name"]) flattened["displayName"] = data["name"];
    if (!data["rarity"]) flattened["rarity"] = "COMMON";

    return flattened;
  }

  load() {
    RegistryHub.fluidRegistry = this;
  }
}

const fluidRegistry = new FluidRegistry();
fluidRegistry.load();
export { fluidRegistry };
