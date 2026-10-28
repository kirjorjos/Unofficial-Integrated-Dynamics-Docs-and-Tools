import { NbtPath } from "lib/IntegratedDynamicsClasses/NBTFunctions/NbtPath";
import { SNBTToCompoundTag, SNBTToTag, TagToSNBT } from "lib/transformers/SNBT";

const matches = (path: string, snbt: string): string[] => {
  const expression = NbtPath.parse(path);
  return expression!
    .match(SNBTToTag(snbt))
    .getMatches()
    .map((tag) => TagToSNBT(tag, { layout: "minimize" }));
};

const parseError = (path: string): string | null => {
  try {
    NbtPath.parse(path);
    return null;
  } catch (error) {
    return (error as Error).message;
  }
};

describe("NbtPath", () => {
  it("testNamedUnionMatchesSiblingChildren", () => {
    expect(matches("[a,c]", "{a:1,b:2,c:3}")).toEqual(["1", "3"]);
  });

  it("testNumericUnionMatchesListElementsOfAnyType", () => {
    expect(matches(".list[0,2]", "{list:[5,4,3]}")).toEqual(["5", "3"]);
    expect(matches(".list[0,2]", '{list:["a","b","c"]}')).toEqual([
      '"a"',
      '"c"',
    ]);
  });

  it("testMixedUnionIsRejected", () => {
    expect(() => NbtPath.parse("[aa,0]")).toThrow();
  });

  it("testListSliceIsInclusive", () => {
    expect(matches(".list[1:4]", "{list:[0,1,2,3,4,5]}")).toEqual([
      "1",
      "2",
      "3",
      "4",
    ]);
  });

  it("testListSliceWithStepUsesIntegerDivision", () => {
    expect(matches(".list[1:6:2]", "{list:[0,1,2,3,4,5]}")).toEqual([
      "1",
      "3",
      "5",
    ]);
  });

  it("testChildPathsRequireLeadingDot", () => {
    expect(matches(".stats.health", "{stats:{health:20}}")).toEqual(["20"]);
    expect(parseError("stats.health")).toMatch(/Failed to parse expression/);
  });

  it("testArrayTagIsAddressableButElementsAreNot", () => {
    expect(matches(".bytearray", "{bytearray:[B;1b,2b]}")).toEqual([
      "[B;1B,2B]",
    ]);
    expect(matches(".bytearray[0]", "{bytearray:[B;1b,2b]}")).toEqual([]);
  });

  it("testRootPathIsDollarSign", () => {
    const tag = SNBTToCompoundTag("{a:1}");
    expect(NbtPath.parse("$")!.match(tag).getMatches()).toHaveLength(1);
    expect(parseError(".")).toMatch(/Failed to parse expression/);
  });
});
