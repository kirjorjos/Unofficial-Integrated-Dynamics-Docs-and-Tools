import { SNBTToCompoundTag } from "lib/transformers/SNBT";
import {
  deriveAspectName,
  getAmbiguousAspectNames,
  getAspectId,
  getAspectName,
  getAspects,
  getReaderClassForPartType,
  readAspectSettings,
} from "lib/transformers/aspectNames";
import { readerRegistry } from "lib/IntegratedDynamicsClasses/readers/readerRegistry";
import { FluidReader } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidReader";
import { NetworkReader } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkReader";

describe("TestAspectNames", () => {
  it("testDerivesANameFromTheIconTheModBuildsItFrom", () => {
    expect(deriveAspectName("any/network/value")).toBe(
      "integrateddynamics:read_any_network_value"
    );
    expect(deriveAspectName("integer/fluid/capacity")).toBe(
      "integrateddynamics:read_integer_fluid_capacity"
    );
    expect(deriveAspectName("nbt/block/tile")).toBe(
      "integrateddynamics:read_nbt_block_tile"
    );
  });

  it("testMatchesTheAspectNamesARealPasteContains", () => {
    expect(
      getAspectId("integrateddynamics:read_any_network_value")
    ).toMatchObject({
      readerClass: NetworkReader,
      aspectKey: "ANY_VALUE",
    });
    expect(
      getAspectId("integrateddynamics:read_fluidstack_fluid")
    ).toMatchObject({
      readerClass: FluidReader,
      aspectKey: "FLUIDSTACK",
    });
    expect(
      getAspectId("integrateddynamics:read_integer_fluid_capacity")
    ).toMatchObject({
      readerClass: FluidReader,
      aspectKey: "INTEGER_CAPACITY",
    });
    expect(
      getAspectId("integrateddynamics:read_integer_fluid_amount")
    ).toMatchObject({ readerClass: FluidReader, aspectKey: "INTEGER_AMOUNT" });
    expect(
      getAspectId("integrateddynamics:read_double_fluid_fillratio")
    ).toMatchObject({
      readerClass: FluidReader,
      aspectKey: "DOUBLE_FILLRATIO",
    });
  });

  it("testCoversEveryAspectOfEveryReader", () => {
    const expected = Object.values(readerRegistry).flatMap((readerClass) =>
      Object.keys(readerClass.aspects).map((aspectKey) => ({
        readerClass,
        aspectKey,
      }))
    );
    expect(getAspects()).toHaveLength(expected.length);
    for (const { readerClass, aspectKey } of expected) {
      const name = getAspectName(readerClass, aspectKey);
      expect(name).toBeDefined();
      expect(getAspectId(name!)?.aspectKey).toBe(aspectKey);
      expect(getAspectId(name!)?.readerClass.typeName).toBe(
        readerClass.typeName
      );
    }
  });

  it("testNeverLetsTwoAspectsShareAName", () => {
    expect(getAmbiguousAspectNames()).toEqual([]);
  });

  it("testDoesNotResolveAnUnknownName", () => {
    expect(getAspectId("integrateddynamics:read_nonsense")).toBeUndefined();
    expect(
      getAspectId(
        "integrateddynamics:read_integer_fluid_capacity",
        "BlockReader"
      )
    ).toBeUndefined();
    expect(
      getAspectId(
        "integrateddynamics:read_integer_fluid_capacity",
        "FluidReader"
      )
    ).toBeDefined();
  });

  it("testFindsTheReaderAPartTypeBelongsTo", () => {
    expect(getReaderClassForPartType("integrateddynamics:block_reader")).toBe(
      readerRegistry.BlockReader
    );
    expect(
      getReaderClassForPartType("integrateddynamics:redstone_reader")
    ).toBe(readerRegistry.RedstoneReader);
    expect(getReaderClassForPartType("integrateddynamics:display_panel")).toBe(
      undefined
    );
  });

  it("testReadsAPartsPerAspectSettings", () => {
    const part = SNBTToCompoundTag(
      '{__partType:"integrateddynamics:fluid_reader",id:22,aspectProperties:{map:[{key:"integrateddynamics:read_integer_fluid_capacity",value:{map:[{key:"integrateddynamics:integer",label:"aspect.aspecttypes.integrateddynamics.integer.tankid",value:3}]}}]}}'
    );
    expect(
      readAspectSettings(part, "integrateddynamics:read_integer_fluid_capacity")
    ).toEqual({ tankid: 3 });
    expect(
      readAspectSettings(part, "integrateddynamics:read_fluidstack_fluid")
    ).toBeUndefined();
  });

  it("testReadsABooleanPropertyAsABoolean", () => {
    const part = SNBTToCompoundTag(
      '{aspectProperties:{map:[{key:"integrateddynamics:read_x",value:{map:[{key:"integrateddynamics:boolean",label:"aspect.aspecttypes.integrateddynamics.boolean.flag",value:1b}]}}]}}'
    );
    expect(readAspectSettings(part, "integrateddynamics:read_x")).toEqual({
      flag: true,
    });
  });
});
