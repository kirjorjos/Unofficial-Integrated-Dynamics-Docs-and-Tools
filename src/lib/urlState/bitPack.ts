export const PACKED_PREFIX = "-";

const BASE = 36;
const BASE36_PATTERN = /^[0-9a-z]+$/;
const BITS_PER_DIGIT = Math.log2(BASE);

export interface PackedListEntry {
  index: number;
  values: number[];
}

export interface BitPackConfig {
  indexDigits: number;
  valueDigits: number;
  valueCount: number;
  slotDigits: number;
}

const capacity = (digits: number): number => BASE ** digits;

export const writeBase36 = (value: number, digits: number): string | null => {
  if (!Number.isInteger(value) || value < 0 || value >= capacity(digits)) {
    return null;
  }
  return value.toString(BASE).padStart(digits, "0");
};

export const readBase36 = (raw: string): number | null => {
  if (raw === "" || !BASE36_PATTERN.test(raw)) return null;
  const value = Number.parseInt(raw, BASE);
  return Number.isInteger(value) ? value : null;
};

const packedBitmaskDigits = (slotCount: number): number =>
  Math.max(1, Math.ceil(slotCount / BITS_PER_DIGIT));

const sortedByIndex = (entries: PackedListEntry[]): PackedListEntry[] =>
  [...entries].sort((left, right) => left.index - right.index);

const validEntries = (
  entries: PackedListEntry[],
  slotCount: number,
  config: BitPackConfig
): boolean => {
  if (slotCount <= 0 || writeBase36(slotCount, config.slotDigits) === null) {
    return false;
  }
  return entries.every(
    (entry) =>
      entry.values.length === config.valueCount &&
      entry.index >= 0 &&
      entry.index < slotCount &&
      writeBase36(entry.index, config.indexDigits) !== null &&
      entry.values.every(
        (value) => writeBase36(value, config.valueDigits) !== null
      )
  );
};

const encodeSparse = (
  entries: PackedListEntry[],
  config: BitPackConfig
): string =>
  entries
    .map(
      (entry) =>
        writeBase36(entry.index, config.indexDigits)! +
        entry.values
          .map((value) => writeBase36(value, config.valueDigits)!)
          .join("")
    )
    .join("");

const encodePacked = (
  entries: PackedListEntry[],
  slotCount: number,
  config: BitPackConfig
): string | null => {
  const highestIndex = entries[entries.length - 1]!.index;
  if (highestIndex > 52) return null;

  const bitmask = entries.reduce((mask, entry) => mask + 2 ** entry.index, 0);
  const bitmaskDigits = packedBitmaskDigits(slotCount);
  const positions = entries
    .flatMap((entry) => entry.values)
    .map((value) => writeBase36(value, config.valueDigits)!)
    .join("");

  return (
    PACKED_PREFIX +
    writeBase36(slotCount, config.slotDigits)! +
    bitmask.toString(BASE).padStart(bitmaskDigits, "0") +
    positions
  );
};

export const encodePackedList = (
  entries: PackedListEntry[],
  slotCount: number,
  config: BitPackConfig
): string | null => {
  const sorted = sortedByIndex(entries).filter((entry) =>
    entry.values.every((value) => Number.isInteger(value))
  );
  if (sorted.length === 0) return null;
  if (!validEntries(sorted, slotCount, config)) return null;

  const sparse = encodeSparse(sorted, config);
  const packed = encodePacked(sorted, slotCount, config);
  if (packed === null) return sparse;
  return sparse.length <= packed.length ? sparse : packed;
};

export const decodePackedList = (
  raw: string | null,
  config: BitPackConfig
): PackedListEntry[] | null => {
  if (!raw) return null;

  if (raw.startsWith(PACKED_PREFIX)) {
    const body = raw.slice(PACKED_PREFIX.length);
    const headerLength = config.slotDigits;
    if (body.length < headerLength) return null;

    const slotCount = readBase36(body.slice(0, headerLength));
    if (slotCount === null || slotCount <= 0) return null;

    const bitmaskDigits = packedBitmaskDigits(slotCount);
    const bitmaskRaw = body.slice(headerLength, headerLength + bitmaskDigits);
    if (bitmaskRaw.length !== bitmaskDigits) return null;
    const bitmask = readBase36(bitmaskRaw);
    if (bitmask === null) return null;

    const occupied: number[] = [];
    for (let index = 0; index < slotCount; index += 1) {
      if (Math.floor(bitmask / 2 ** index) % 2 === 1) occupied.push(index);
    }

    const rest = body.slice(headerLength + bitmaskDigits);
    const chunks = rest.length / config.valueDigits;
    if (!Number.isInteger(chunks)) return null;
    if (chunks !== occupied.length * config.valueCount) return null;

    const entries: PackedListEntry[] = [];
    for (let i = 0; i < occupied.length; i += 1) {
      const values: number[] = [];
      for (let v = 0; v < config.valueCount; v += 1) {
        const value = readBase36(
          rest.slice(
            i * config.valueCount * config.valueDigits + v * config.valueDigits,
            i * config.valueCount * config.valueDigits +
              (v + 1) * config.valueDigits
          )
        );
        if (value === null) return null;
        values.push(value);
      }
      entries.push({ index: occupied[i]!, values });
    }
    return entries;
  }

  const entryLength =
    config.indexDigits + config.valueCount * config.valueDigits;
  if (raw.length === 0 || raw.length % entryLength !== 0) return null;

  const entries: PackedListEntry[] = [];
  for (let offset = 0; offset < raw.length; offset += entryLength) {
    const chunk = raw.slice(offset, offset + entryLength);
    const index = readBase36(chunk.slice(0, config.indexDigits));
    if (index === null) return null;
    const values: number[] = [];
    for (let v = 0; v < config.valueCount; v += 1) {
      const start = config.indexDigits + v * config.valueDigits;
      const value = readBase36(chunk.slice(start, start + config.valueDigits));
      if (value === null) return null;
      values.push(value);
    }
    entries.push({ index, values });
  }
  return entries;
};
