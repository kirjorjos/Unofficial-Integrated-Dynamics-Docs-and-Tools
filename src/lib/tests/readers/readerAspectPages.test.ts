import { AUDIO_INTEGER_BANJO_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_BANJO_NOTE";
import { NETWORK_OPERATOR_GETVARIABLEBYID } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/Aspects/OPERATOR_GETVARIABLEBYID";
import { NetworkReader } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkReader";
import { REDSTONE_BOOLEAN_CLOCK } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/Aspects/BOOLEAN_CLOCK";
import { REDSTONE_INTEGER_VALUE } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/Aspects/INTEGER_VALUE";
import { RedstoneReader } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/RedstoneReader";
import {
  getAspectSettingsEntries,
  getReaderAspectDefaultValue,
  getReaderSimulatedValueTypeError,
  isSimulatedValueParseError,
  parseSimulatedValueText,
  readerRegistry,
} from "lib/IntegratedDynamicsClasses/readers/readerRegistry";
import type { AspectStatic } from "lib/IntegratedDynamicsClasses/readers/AspectBase";

describe("ported aspect descriptions (tooltipInfo)", () => {
  it("ports the mod-lang description onto aspects", () => {
    expect(REDSTONE_INTEGER_VALUE.tooltipInfo).toBe(
      "Get the exact redstone level"
    );
    expect(AUDIO_INTEGER_BANJO_NOTE.tooltipInfo).toContain(
      "Reads a banjo note"
    );
    expect(NETWORK_OPERATOR_GETVARIABLEBYID.tooltipInfo).toContain(
      "returns the value of a variable by its integer identifier"
    );
  });

  it("leaves the known 8 aspects without a description", () => {
    const withoutDescription = Object.values(readerRegistry)
      .flatMap((readerClass) =>
        Object.values(readerClass.aspects).filter(
          (aspect) => !aspect.tooltipInfo
        )
      )
      .map((aspect) => aspect.fullDisplayName)
      .sort();
    expect(withoutDescription).toEqual(
      [
        "Block",
        "Slot Item",
        "Recipe By Input",
        "Recipe By Output",
        "Recipe Inputs By Output",
        "Recipe Output By Input",
        "Recipes By Input",
        "Recipes By Output",
      ].sort()
    );
  });

  it("has descriptions for the vast majority of aspects", () => {
    let total = 0;
    let withDescription = 0;
    for (const readerClass of Object.values(readerRegistry)) {
      for (const aspect of Object.values(readerClass.aspects)) {
        total++;
        if (aspect.tooltipInfo) withDescription++;
      }
    }
    expect(total).toBe(115);
    expect(withDescription).toBe(107);
  });
});

describe("ported settings metadata (settingsInfo)", () => {
  it("maps redstone clock settings to display names", () => {
    expect(REDSTONE_BOOLEAN_CLOCK.settingsInfo).toEqual({
      interval: { displayName: "Pulse Interval" },
      length: { displayName: "Pulse Length" },
      offset: { displayName: "Pulse Time Offset" },
    });
  });

  it("inherits the audio range setting metadata from the base class", () => {
    expect(AUDIO_INTEGER_BANJO_NOTE.settings).toEqual({ range: 64 });
    expect(AUDIO_INTEGER_BANJO_NOTE.settingsInfo).toEqual({
      range: { displayName: "Range" },
    });
  });

  it("builds 3-line settings entries (name / value / optional description)", () => {
    const entries = getAspectSettingsEntries(REDSTONE_BOOLEAN_CLOCK);
    expect(entries).toEqual([
      { key: "interval", displayName: "Pulse Interval", value: "20" },
      { key: "length", displayName: "Pulse Length", value: "1" },
      { key: "offset", displayName: "Pulse Time Offset", value: "0" },
    ]);
  });

  it("produces no entries for aspects without settings", () => {
    expect(
      getAspectSettingsEntries(REDSTONE_INTEGER_VALUE as AspectStatic)
    ).toEqual([]);
  });
});

describe("parseSimulatedValueText", () => {
  it("parses numbers, booleans, strings and lists", () => {
    expect(parseSimulatedValueText("5")).toEqual({
      ok: true,
      ast: { type: "Integer", value: "5" },
    });
    expect(parseSimulatedValueText("5.5")).toMatchObject({
      ok: true,
      ast: { type: "Double" },
    });
    expect(parseSimulatedValueText("true")).toMatchObject({
      ok: true,
      ast: { type: "Boolean", value: true },
    });
    expect(parseSimulatedValueText("[1, 2]")).toMatchObject({
      ok: true,
      ast: { type: "List" },
    });
  });

  it("treats empty text as no simulated value", () => {
    expect(parseSimulatedValueText("")).toEqual({ ok: true, ast: undefined });
    expect(parseSimulatedValueText("   ")).toEqual({
      ok: true,
      ast: undefined,
    });
  });

  it("fails on unparseable text", () => {
    const result = parseSimulatedValueText("hello");
    expect(isSimulatedValueParseError(result)).toBe(true);
    if (isSimulatedValueParseError(result)) {
      expect(result.message).toContain("Unknown identifier");
    }
  });
});

describe("getReaderSimulatedValueTypeError", () => {
  it("returns no error for a valid typed value", () => {
    expect(
      getReaderSimulatedValueTypeError("Integer", parseSimulatedValueText("5"))
    ).toBeUndefined();
    expect(
      getReaderSimulatedValueTypeError("Any", parseSimulatedValueText("5"))
    ).toBeUndefined();
  });

  it("reports a type mismatch", () => {
    expect(
      getReaderSimulatedValueTypeError(
        "Integer",
        parseSimulatedValueText("true")
      )
    ).toBe("Expected output type Integer, got simulatedOutput type Boolean");
  });

  it("surfaces parse errors", () => {
    const error = getReaderSimulatedValueTypeError(
      "Integer",
      parseSimulatedValueText("hello")
    );
    expect(error).toContain("Unknown identifier");
  });

  it("is never an error for empty input", () => {
    expect(
      getReaderSimulatedValueTypeError("Integer", parseSimulatedValueText(""))
    ).toBeUndefined();
  });
});

describe("aspect page defaults", () => {
  it("uses type-based default values", () => {
    expect(getReaderAspectDefaultValue(RedstoneReader, "INTEGER_VALUE")).toBe(
      "0"
    );
    expect(getReaderAspectDefaultValue(RedstoneReader, "BOOLEAN_LOW")).toBe(
      "false"
    );
  });

  it("uses the in-game display name for operator aspects", () => {
    expect(
      getReaderAspectDefaultValue(NetworkReader, "OPERATOR_GETVARIABLEBYID")
    ).toBe("Virtual operator.integrateddynamics.virtual.variablebyid");
  });
});
