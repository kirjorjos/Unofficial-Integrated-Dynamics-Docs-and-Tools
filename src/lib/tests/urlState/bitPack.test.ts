import {
  PACKED_PREFIX,
  decodePackedList,
  encodePackedList,
  type BitPackConfig,
} from "lib/urlState/bitPack";

const CONFIG: BitPackConfig = {
  indexDigits: 2,
  valueDigits: 2,
  valueCount: 2,
  slotDigits: 2,
};

describe("TestBitPack", () => {
  it("roundTripsSparseWhenFewEntriesMove", () => {
    const entries = [
      { index: 2, values: [1, 2] },
      { index: 5, values: [0, 3] },
    ];
    const encoded = encodePackedList(entries, 20, CONFIG);
    expect(encoded).not.toBeNull();
    expect(encoded!.startsWith(PACKED_PREFIX)).toBe(false);
    expect(decodePackedList(encoded, CONFIG)).toEqual(entries);
  });

  it("packsWhenManyEarlyEntriesMove", () => {
    const entries = Array.from({ length: 10 }, (_, index) => ({
      index,
      values: [index % 4, index % 3],
    }));
    const encoded = encodePackedList(entries, 14, CONFIG)!;
    expect(encoded.startsWith(PACKED_PREFIX)).toBe(true);
    expect(decodePackedList(encoded, CONFIG)).toEqual(entries);
  });

  it("picksWhicheverEncodingIsShorter", () => {
    const sparseWins = encodePackedList(
      [{ index: 40, values: [1, 1] }],
      50,
      CONFIG
    )!;
    expect(sparseWins.startsWith(PACKED_PREFIX)).toBe(false);

    const packedWins = encodePackedList(
      Array.from({ length: 12 }, (_, index) => ({
        index,
        values: [0, 0],
      })),
      12,
      CONFIG
    )!;
    expect(packedWins.startsWith(PACKED_PREFIX)).toBe(true);
  });

  it("returnsNullForEmptyOrUnencodableInput", () => {
    expect(encodePackedList([], 10, CONFIG)).toBeNull();
    expect(
      encodePackedList([{ index: 4, values: [1, 1] }], 2, CONFIG)
    ).toBeNull();
    expect(
      encodePackedList([{ index: 0, values: [999999, 0] }], 4, CONFIG)
    ).toBeNull();
  });

  it("ignoresMalformedInputOnDecode", () => {
    expect(decodePackedList(null, CONFIG)).toBeNull();
    expect(decodePackedList("", CONFIG)).toBeNull();
    expect(decodePackedList("!!!", CONFIG)).toBeNull();
    expect(decodePackedList("0", CONFIG)).toBeNull();
    expect(decodePackedList("-zzzzz", CONFIG)).toBeNull();
  });
});
