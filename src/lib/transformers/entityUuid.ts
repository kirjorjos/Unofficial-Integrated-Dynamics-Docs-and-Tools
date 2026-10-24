const UUID_PATTERN =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const isUuidString = (value: unknown): value is string =>
  typeof value === "string" && UUID_PATTERN.test(value);

const hashString = (value: string): number => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const mulberry32 = (seed: number): (() => number) => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const hex = (byte: number): string =>
  (byte & 0xff).toString(16).padStart(2, "0");

export const seededUuid = (seed: number, key: string): string => {
  const random = mulberry32((seed >>> 0) ^ hashString(key));
  const bytes: number[] = [];
  for (let i = 0; i < 16; i++) {
    bytes.push(Math.floor(random() * 256));
  }
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  const text = bytes.map(hex).join("");
  return [
    text.slice(0, 8),
    text.slice(8, 12),
    text.slice(12, 16),
    text.slice(16, 20),
    text.slice(20),
  ].join("-");
};

export const uuidToInts = (uuid: string): number[] => {
  const compact = uuid.replace(/-/g, "");
  if (!/^[0-9a-fA-F]{32}$/.test(compact)) {
    throw new Error(`Not a UUID: ${uuid}`);
  }
  return [0, 8, 16, 24].map((start) => {
    const unsigned = parseInt(compact.slice(start, start + 8), 16);
    return unsigned >= 0x80000000 ? unsigned - 0x100000000 : unsigned;
  });
};

export const intsToUuid = (ints: number[]): string => {
  const compact = ints
    .map((value) => (value >>> 0).toString(16).padStart(8, "0"))
    .join("");
  return [
    compact.slice(0, 8),
    compact.slice(8, 12),
    compact.slice(12, 16),
    compact.slice(16, 20),
    compact.slice(20),
  ].join("-");
};

export const uuidIntArrayTag = (uuid: string): string =>
  `[I;${uuidToInts(uuid).join(",")}]`;
