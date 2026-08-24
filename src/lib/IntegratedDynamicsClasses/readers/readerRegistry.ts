import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import type { AspectStatic } from "lib/IntegratedDynamicsClasses/readers/AspectBase";
import { AudioReader } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioReader";
import { BlockReader } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockReader";
import { EntityReader } from "lib/IntegratedDynamicsClasses/readers/EntityReader/EntityReader";
import { ExtradimensionalReader } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/ExtradimensionalReader";
import { FluidReader } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidReader";
import { InventoryReader } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryReader";
import { MachineReader } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineReader";
import { NetworkReader } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkReader";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";
import { RedstoneReader } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/RedstoneReader";
import { WorldReader } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldReader";

export const readerRegistry = {
  RedstoneReader,
  InventoryReader,
  WorldReader,
  FluidReader,
  NetworkReader,
  BlockReader,
  EntityReader,
  ExtradimensionalReader,
  MachineReader,
  AudioReader,
} as const;

export type ReaderClass = (typeof readerRegistry)[keyof typeof readerRegistry];

export const getReaderClassByTypeName = (
  typeName: string
): ReaderClass | undefined => {
  const lower = typeName.toLowerCase();
  for (const cls of Object.values(readerRegistry)) {
    if (cls.typeName.toLowerCase() === lower) return cls;
  }
  return undefined;
};

export const getReaderClassByShortName = (
  shortName: string
): ReaderClass | undefined => {
  const lower = shortName.toLowerCase();
  for (const cls of Object.values(readerRegistry)) {
    if (cls.shortName.toLowerCase() === lower) return cls;
  }
  return undefined;
};

export const getReaderConstructorClass = (
  name: string
): ReaderClass | undefined => {
  const lower = name.toLowerCase();
  if (lower.startsWith("readers.")) {
    const rest = lower.slice("readers.".length);
    return getReaderClassByShortName(rest) ?? getReaderClassByTypeName(rest);
  }
  return getReaderClassByTypeName(lower);
};

/** Matches a reader by typeName or shortName, case-insensitively. */
export const getReaderClassByName = (name: string): ReaderClass | undefined => {
  return getReaderClassByTypeName(name) ?? getReaderClassByShortName(name);
};

export const getReaderClassByNumericID = (
  numericID: number
): ReaderClass | undefined => {
  for (const cls of Object.values(readerRegistry)) {
    if (cls.numericID === numericID) return cls;
  }
  return undefined;
};

export const getReaderAspectKey = (
  readerClass: ReaderClass,
  aspectName: string
): string | undefined => {
  if (aspectName in readerClass.aspects) return aspectName;

  const lower = aspectName.toLowerCase();
  for (const [key, aspect] of Object.entries(readerClass.aspects)) {
    if (key.toLowerCase() === lower) return key;
    if (aspect.displayName?.toLowerCase() === lower) return key;
    if (aspect.fullDisplayName?.toLowerCase() === lower) return key;
    if (
      aspect.nicknames?.some((nickname) => nickname.toLowerCase() === lower)
    ) {
      return key;
    }
  }
  return undefined;
};

export const getReaderAspectDisplayName = (
  readerClass: ReaderClass,
  aspectKey: string
): string => {
  return readerClass.aspects[aspectKey]?.displayName ?? aspectKey;
};

export const getReaderAspect = (
  readerClass: ReaderClass,
  aspectKey: string
): AspectStatic | undefined => {
  return readerClass.aspects[aspectKey];
};

export const getReaderAspectSignature = (
  readerClass: Pick<ReaderClass, "aspects">,
  aspectKey: string
): string[] | undefined => {
  return readerClass.aspects[aspectKey]?.signature;
};

export const getReaderAspectOperatorDisplayText = (
  readerClass: Pick<ReaderClass, "aspects">,
  aspectKey: string
): string | undefined => {
  const aspect = readerClass.aspects[aspectKey];
  const signature = aspect?.signature;
  if (!signature || signature.length === 0) return undefined;
  const indent = "\u00A0";
  const sigLines = signature
    .map((type, i) => (i === 0 ? type : `${indent}-> ${type}`))
    .join("\n");
  return `${aspect!.fullDisplayName} ::\n${sigLines}`;
};

export const getReaderAspectDefaultValue = (
  readerClass: Pick<ReaderClass, "aspects">,
  aspectKey: string
): string => {
  const aspect = readerClass.aspects[aspectKey];
  if (aspect?.inGameDisplayName) {
    return aspect.inGameDisplayName;
  }
  const signature = getReaderAspectSignature(readerClass, aspectKey);
  if (signature && signature.length > 0) {
    return signature.join(" -> ");
  }
  switch (readerClass.aspects[aspectKey]?.outputType ?? "Any") {
    case "Boolean":
      return "false";
    case "Integer":
    case "Double":
    case "Long":
      return "0";
    default:
      return "";
  }
};

export const isReaderOutputTypeAssignable = (
  actual: string,
  expected: string
): boolean => {
  if (expected === "Any") return true;
  return (
    ParsedSignature.typeEquals(expected as never, actual as never) ||
    ParsedSignature.typeEquals(actual as never, expected as never)
  );
};

export const assertReaderSimulatedOutputType = (
  readerClass: ReaderClass,
  aspectKey: string,
  simulatedOutput: { type: string } | undefined
): void => {
  if (!simulatedOutput) return;
  const aspect = readerClass.aspects[aspectKey];
  if (aspect?.signature && aspect.signature.length > 0) {
    throw new Error(
      `${aspect.fullDisplayName} does not support an overridden simulatedValue.`
    );
  }
  const expected = aspect?.outputType ?? "Any";
  if (!isReaderOutputTypeAssignable(simulatedOutput.type, expected)) {
    throw new Error(
      `Expected output type ${expected}, got simulatedOutput type ${simulatedOutput.type}`
    );
  }
};

export { ReaderBase };
