import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { NumericTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NumericTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import {
  getReaderClassByTypeName,
  readerRegistry,
  type ReaderClass,
} from "lib/IntegratedDynamicsClasses/readers/readerRegistry";
import { PART_TYPE_TO_ITEM_ID } from "lib/transformers/partItemIds";

export const ASPECT_NAME_PREFIX = "integrateddynamics:read_";
export const deriveAspectName = (icon: string): string =>
  `${ASPECT_NAME_PREFIX}${icon.replace(/\//g, "_")}`;

export interface AspectId {
  readerClass: ReaderClass;
  aspectKey: string;
  name: string;
}

interface AspectEntry extends AspectId {
  icon: string;
}

let entries: AspectEntry[] | undefined;
let byName: Map<string, AspectEntry> | undefined;
let duplicateNames: { name: string; icons: string[] }[] | undefined;

const build = (): void => {
  if (byName !== undefined) return;
  const built: AspectEntry[] = [];
  const builtByName = new Map<string, AspectEntry>();
  const builtDuplicates: { name: string; icons: string[] }[] = [];

  for (const readerClass of Object.values(readerRegistry)) {
    for (const [aspectKey, aspect] of Object.entries(readerClass.aspects)) {
      const icon = aspect.icon;
      if (icon === undefined) continue;
      const name = deriveAspectName(icon);
      const entry: AspectEntry = { readerClass, aspectKey, name, icon };
      built.push(entry);

      const existing = builtByName.get(name);
      if (existing) {
        const collision = builtDuplicates.find((d) => d.name === name);
        if (collision) collision.icons.push(icon);
        else builtDuplicates.push({ name, icons: [existing.icon, icon] });
        continue;
      }
      builtByName.set(name, entry);
    }
  }

  entries = built;
  byName = builtByName;
  duplicateNames = builtDuplicates;
};

export const getAspects = (): readonly AspectEntry[] => {
  build();
  return entries!;
};

export const getAmbiguousAspectNames = (): readonly {
  name: string;
  icons: string[];
}[] => {
  build();
  return duplicateNames!;
};

export const getAspectName = (
  readerClass: ReaderClass,
  aspectKey: string
): string | undefined => {
  const icon = readerClass.aspects[aspectKey]?.icon;
  return icon === undefined ? undefined : deriveAspectName(icon);
};

export const getAspectId = (
  aspectName: string,
  readerTypeName?: string
): AspectId | undefined => {
  build();
  const entry = byName!.get(aspectName);
  if (!entry) return undefined;
  if (
    readerTypeName !== undefined &&
    entry.readerClass.typeName.toLowerCase() !== readerTypeName.toLowerCase()
  ) {
    return undefined;
  }
  return entry;
};

export const getReaderClassForPartType = (
  partType: string
): ReaderClass | undefined => {
  const separator = partType.indexOf(":");
  const name = separator === -1 ? partType : partType.slice(separator + 1);
  if (!name.endsWith("_reader")) return undefined;
  const family = name.slice(0, -"_reader".length);
  for (const readerClass of Object.values(readerRegistry)) {
    if (readerClass.shortName.toLowerCase() === family.toLowerCase()) {
      return readerClass;
    }
  }
  return getReaderClassByTypeName(partType);
};

export const getReaderPartType = (
  readerClass: ReaderClass
): string | undefined =>
  Object.keys(PART_TYPE_TO_ITEM_ID).find(
    (partType) => getReaderClassForPartType(partType) === readerClass
  );

export const readAspectSettings = (
  partTag: CompoundTag,
  aspectName: string
): Record<string, number | boolean | string> | undefined => {
  const properties = partTag.get(new iString("aspectProperties"));
  if (!(properties instanceof CompoundTag)) return undefined;
  const map = properties.get(new iString("map"));
  if (!(map instanceof ListTag)) return undefined;

  for (const entry of map.valueOf().valueOf()) {
    if (!(entry instanceof CompoundTag)) continue;
    if (getString(entry, "key") !== aspectName) continue;
    const inner = entry.get(new iString("value"));
    if (!(inner instanceof CompoundTag)) return {};
    const innerMap = inner.get(new iString("map"));
    if (!(innerMap instanceof ListTag)) return {};

    const settings: Record<string, number | boolean | string> = {};
    for (const property of innerMap.valueOf().valueOf()) {
      if (!(property instanceof CompoundTag)) continue;
      const label = getString(property, "label");
      const key = label?.split(".").pop();
      if (key === undefined || key === "") continue;
      const value = readSettingValue(
        getString(property, "key"),
        property.get(new iString("value"))
      );
      if (value !== undefined) settings[key] = value;
    }
    return settings;
  }
  return undefined;
};

const getString = (tag: CompoundTag, key: string): string | undefined => {
  const value = tag.get(new iString(key));
  return value instanceof StringTag ? value.valueOf().valueOf() : undefined;
};

const readSettingValue = (
  propertyType: string | undefined,
  tag: IntegratedValue
): number | boolean | string | undefined => {
  if (tag instanceof StringTag) return tag.valueOf().valueOf();
  if (tag instanceof NumericTag) {
    if (propertyType?.endsWith("boolean")) return tag.getAsDouble() !== 0;
    return tag.getAsDouble();
  }
  return undefined;
};
