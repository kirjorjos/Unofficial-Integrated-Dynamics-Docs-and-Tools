import { parseSnbtInput } from "lib/transformers/inputParser";
import { snbtExamples } from "../fixtures/snbtExamples";

const parsed = () =>
  parseSnbtInput(snbtExamples.join("\n"), { missingParts: "warn" });

describe("TestSnbtFixture", () => {
  it("testReadsEveryBlobOnePerLine", () => {
    const { sources } = parsed();
    expect(sources).toHaveLength(snbtExamples.length);
    expect(sources.map((source) => source.envelope.kind)).toEqual([
      "setblock",
      "setblock",
      "setblock",
      "setblock",
      "setblock",
      "block",
      "entity",
      "entity",
      "setblock",
      "setblock",
    ]);
  });

  it("testReadsEveryCardWithAUniqueIdEach", () => {
    const { cards } = parsed();
    expect(cards).toHaveLength(58);
    expect(cards.every((card) => card.id !== undefined)).toBe(true);
    expect(new Set(cards.map((card) => card.id)).size).toBe(58);
  });

  it("testDecodesEveryCardExceptTheAspectWhichNeedsAPartItDoesNotHave", () => {
    const { cards } = parsed();
    expect(
      cards.filter((card) => card.ast === undefined).map((card) => card.id)
    ).toEqual(["90"]);
    expect(cards.find((card) => card.id === "90")?.aspectName).toBe(
      "integrateddynamics:read_any_network_value"
    );
  });

  it("testCollapsesTheCardsThatAppearInMoreThanOnePaste", () => {
    const { warnings } = parsed();
    expect(warnings.join("\n")).toContain(
      "4 duplicate cards were collapsed onto an identical definition"
    );
  });

  it("testReadsAValuetypeCardAsItsOwnValueIgnoringThePairBesideIt", () => {
    const { cards, warnings } = parsed();
    const recipe = cards.find((card) => card.id === "77")!;
    expect(recipe.application).toBe(false);
    expect(recipe.typeName).toBe("integrateddynamics:recipe");
    expect(recipe.ast?.type).toBe("Recipe");

    const fluid = cards.find((card) => card.id === "104")!;
    expect(fluid.application).toBe(false);
    expect(fluid.typeName).toBe("integrateddynamics:fluidstack");
    expect(fluid.ast?.type).toBe("Fluid");

    expect(warnings.join("\n")).not.toContain("defined twice");
  });

  it("testReadsTheVariableStores40Cards", () => {
    const { sources, cards } = parsed();
    expect(sources[0]!.varStores).toHaveLength(1);
    expect(sources[0]!.varStores[0]!.cards).toHaveLength(40);
    expect(sources[0]!.envelope.id).toBe("integrateddynamics:variablestore");
    expect(sources[0]!.cards.map((card) => card.id)).toContain("4");
    expect(cards.map((card) => card.id)).toContain("103");
  });

  it("testReadsThePartsOfBothCablesAndThePartItemsInThePlayersInventory", () => {
    const { parts } = parsed();
    expect(parts.map((part) => part.partId).filter(Boolean)).toEqual([
      "18",
      "1",
      "22",
      "6",
    ]);
    expect(
      parts
        .filter((part) => part.partId === undefined)
        .map((part) => part.itemId)
    ).toEqual([
      "integrateddynamics:part_audio_reader",
      "integrateddynamics:part_block_reader",
      "integrateddynamics:part_entity_reader",
      "integrateddynamics:part_extradimensional_reader",
      "integrateddynamics:part_fluid_reader",
      "integrateddynamics:part_inventory_reader",
      "integrateddynamics:part_machine_reader",
      "integrateddynamics:part_world_reader",
      "integrateddynamics:part_entity_reader",
      "integrateddynamics:part_redstone_reader",
    ]);
    expect(parts.filter((part) => part.family === "panel")).toHaveLength(2);
    expect(parts.filter((part) => part.family === "reader")).toHaveLength(12);
    expect(parts).toHaveLength(14);
  });

  it("testCollapsesThePartsOfTheCableThatWasPastedTwice", () => {
    const { parts, warnings } = parsed();
    expect(new Set(parts.map((part) => part.partId).filter(Boolean)).size).toBe(
      4
    );
    expect(warnings.join("\n")).not.toContain("Part 18");
    expect(warnings.join("\n")).not.toContain("Part 1 ");
  });

  it("testReportsTheOnePartThePasteDoesNotContain", () => {
    const result = parsed();
    expect(result.missingPartIds).toEqual(["15"]);
    expect(result.warnings.join("\n")).toContain(
      "The paste refers to part 15, which is not in it"
    );
    expect(() => parseSnbtInput(snbtExamples.join("\n"))).toThrow(
      /refers to part 15, which is not in it/
    );
  });

  it("testReportsTheVariablesRemovedBeforeTheCopyWasTaken", () => {
    const { warnings } = parsed();
    for (const id of ["16", "48", "53", "56", "63"]) {
      expect(warnings.join("\n")).toContain(
        `refers to variable ${id}, which is not in the paste`
      );
    }
  });
});
