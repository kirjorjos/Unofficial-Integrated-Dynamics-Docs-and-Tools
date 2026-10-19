import {
  CHAT_LIMIT,
  inputToGiveCommands,
  remappedIds,
  VARSTORE_CAPACITY,
} from "lib/transformers/giveCommands";
import { parseSnbtInput } from "lib/transformers/inputParser";
import { astContentKey } from "lib/transformers/NetworkCards";
import { snbtExamples } from "../fixtures/snbtExamples";

const cardLine = (tag: string): string =>
  `/give @p integrateddynamics:variable{${tag}}`;

const VALUE_CARD =
  '_id:3,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:5';
const APPLY_CARD =
  '_id:7,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:arithmetic_addition",variableIds:[I;3,3]';

const SMALL_PASTE = [cardLine(VALUE_CARD), cardLine(APPLY_CARD)].join("\n");

const manyCards = (count: number, first = 100): string =>
  Array.from({ length: count }, (_, index) =>
    cardLine(
      `_id:${first + index},_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:${index}`
    )
  ).join("\n");

const READER_PART_PASTE = [
  `/setblock 0 0 0 integrateddynamics:cable{partContainer:{parts:[{__partType:"integrateddynamics:block_reader",__side:"west",aspectProperties:{map:[]},enabled:1b,id:5}]}}`,
  cardLine(
    '_id:12,_type:"integrateddynamics:aspect",aspectName:"integrateddynamics:read_block",partId:5'
  ),
].join("\n");

const PANEL_PASTE = [
  `/setblock 0 0 0 integrateddynamics:cable{partContainer:{parts:[{__partType:"integrateddynamics:display_panel",__side:"east",aspectProperties:{map:[]},enabled:1b,id:2,inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{${VALUE_CARD}}}]}]}}`,
].join("\n");

describe("TestInputToGiveCommands", () => {
  it("testEmitsOneGivePerCardInDefinitionOrder", () => {
    const out = inputToGiveCommands(SMALL_PASTE);
    expect(out.lines).toHaveLength(2);
    expect(out.lines[0]).toBe(
      `/give @p integrateddynamics:variable{_id:0,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:5}`
    );
    expect(out.lines[1]).toBe(
      `/give @p integrateddynamics:variable{_id:1,_type:"integrateddynamics:operator",operatorName:"integrateddynamics:arithmetic_addition",variableIds:[I;0,0]}`
    );
  });

  it("testRenumbersFromTheInitialVariableId", () => {
    const out = inputToGiveCommands(SMALL_PASTE, { startVariableId: 40 });
    expect(out.lines[0]).toContain("_id:40,");
    expect(out.lines[1]).toContain("_id:41,");
    expect(out.lines[1]).toContain("variableIds:[I;40,40]");
  });

  it("testKeepsTheSourceIdsWhenAskedToPreserveThem", () => {
    const out = inputToGiveCommands(SMALL_PASTE, { cardIds: "preserve" });
    expect(out.lines[0]).toContain("_id:3,");
    expect(out.lines[1]).toContain("_id:7,");
    expect(out.lines[1]).toContain("variableIds:[I;3,3]");
  });

  it("testTargetsWhateverSelectorItIsGiven", () => {
    const out = inputToGiveCommands(SMALL_PASTE, { target: "@s" });
    expect(
      out.lines[0]!.startsWith("/give @s integrateddynamics:variable{")
    ).toBe(true);
  });

  it("testReportsTheRemappedIdsItWillUse", () => {
    const parsed = parseSnbtInput(SMALL_PASTE);
    const ids = remappedIds(parsed, 10);
    expect(ids.cards.get("3")).toBe("10");
    expect(ids.cards.get("7")).toBe("11");
  });

  describe("OutputShape", () => {
    it("testFillsOneVariableStoreOf45Slots", () => {
      const out = inputToGiveCommands(manyCards(2), {
        outputShape: "varstore",
      });
      expect(out.lines).toHaveLength(1);
      expect(
        out.lines[0]!.startsWith(
          "/give @p integrateddynamics:variablestore{inventory:["
        )
      ).toBe(true);
      expect(out.lines[0]).toContain(
        '{Count:1b,Slot:0b,id:"integrateddynamics:variable"'
      );
      expect(out.lines[0]).toContain(
        '{Count:1b,Slot:1b,id:"integrateddynamics:variable"'
      );
      expect(out.lines[0]).not.toContain("Slot:2b");
    });

    it("testOverflowsIntoASecondStoreAt45Cards", () => {
      const out = inputToGiveCommands(manyCards(VARSTORE_CAPACITY + 2), {
        outputShape: "varstore",
      });
      expect(out.lines).toHaveLength(2);
      expect(out.lines[0]).toContain("Slot:44b");
      expect(out.lines[0]).not.toContain("Slot:45b");
      expect(out.lines[1]).toContain("Slot:0b");
      expect(out.lines[1]).toContain("Slot:1b");
      expect(out.lines[1]).not.toContain("Slot:2b");
    });
  });

  describe("Parts", () => {
    it("testEmitsAReadersPartCommandBeforeTheCardThatReadsIt", () => {
      const out = inputToGiveCommands(READER_PART_PASTE);
      expect(out.lines).toHaveLength(2);
      expect(
        out.lines[0]!.startsWith(
          "/give @p integrateddynamics:part_block_reader{"
        )
      ).toBe(true);
      expect(out.lines[0]).toContain("aspectProperties:{map:[]}");
      expect(out.lines[1]).toContain('_type:"integrateddynamics:aspect"');
      expect(out.lines[1]).toContain("partId:0");
      expect(out.warnings).toEqual([]);
    });

    it("testRenumbersThePartIdFromTheSameStartAsTheCards", () => {
      const out = inputToGiveCommands(READER_PART_PASTE, {
        startVariableId: 20,
      });
      expect(out.lines[0]).toContain("id:20,");
      expect(out.lines[1]).toContain("partId:20");
    });

    it("testKeepsAPartsOwnIdWhenIdsArePreserved", () => {
      const out = inputToGiveCommands(READER_PART_PASTE, {
        cardIds: "preserve",
      });
      expect(out.lines[0]).toContain("id:5,");
      expect(out.lines[1]).toContain("partId:5");
    });

    it("testEmitsADisplayPanelWithItsCardInsideItOnce", () => {
      const out = inputToGiveCommands(PANEL_PASTE);
      expect(out.lines).toHaveLength(1);
      expect(
        out.lines[0]!.startsWith(
          "/give @p integrateddynamics:part_display_panel{"
        )
      ).toBe(true);
      expect(out.lines[0]).toContain(
        'inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:0,_type:"integrateddynamics:valuetype"'
      );
    });

    it("testWarnsAboutAPartNoEmittedCardReads", () => {
      const out = inputToGiveCommands(
        [
          `/setblock 0 0 0 integrateddynamics:cable{partContainer:{parts:[{__partType:"integrateddynamics:block_reader",__side:"west",enabled:1b,id:5}]}}`,
          cardLine(VALUE_CARD),
        ].join("\n")
      );
      expect(out.lines).toHaveLength(1);
      expect(out.warnings.join("\n")).toContain("no emitted card reads it");
    });

    it("testDropsTheWorldPlacementAndTransientPartFields", () => {
      const out = inputToGiveCommands(PANEL_PASTE);
      expect(out.lines[0]).not.toContain("__partType");
      expect(out.lines[0]).not.toContain("__side");
      expect(out.lines[0]).not.toContain("facingRotation");
      expect(out.lines[0]).not.toContain("displayValue");
      expect(out.lines[0]).not.toContain("globalErrorMessages");
    });

    it("testErrorsOnADanglingPartReferenceByDefaultAndWarnsWhenAsked", () => {
      const orphanCard = cardLine(
        '_id:12,_type:"integrateddynamics:aspect",aspectName:"integrateddynamics:read_block",partId:9'
      );
      expect(() => inputToGiveCommands(orphanCard)).toThrow(/part 9/);
      const out = inputToGiveCommands(orphanCard, { missingParts: "warn" });
      expect(out.warnings.join("\n")).toContain("part 9");
      expect(out.lines).toHaveLength(1);
    });
  });

  describe("Materialize", () => {
    it("testKeepsTheCachedValueAndDropsTheApplication", () => {
      const out = inputToGiveCommands(
        cardLine(
          '_id:4,_type:"integrateddynamics:valuetype",operatorName:"integrateddynamics:operator_apply",typeName:"integrateddynamics:integer",value:1,variableIds:[I;5,5]'
        ),
        { materialize: true }
      );
      expect(out.lines[0]).toBe(
        `/give @p integrateddynamics:variable{_id:0,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:1}`
      );
    });

    it("testKeepsTheApplicationWhenThereIsNoCachedValue", () => {
      const out = inputToGiveCommands(SMALL_PASTE, { materialize: true });
      expect(out.lines[1]).toContain("operatorName:");
      expect(out.warnings.join("\n")).toContain("no cached value");
    });
  });

  describe("Layout", () => {
    it("testBreaksTheNbtOverIndentedLinesWhenReadable", () => {
      const out = inputToGiveCommands(SMALL_PASTE, {
        layout: "readable",
        indentation: 2,
      });
      expect(out.lines[0]).toContain("\n  _type:");
      expect(out.lines[0]).toContain("\n  value: 5");
      expect(out.lines[0]!.split("\n")).toHaveLength(6);
    });
  });

  describe("The256CharacterLimit", () => {
    const longCard = cardLine(
      `_id:1,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:string",value:"${"x".repeat(CHAT_LIMIT)}"`
    );

    it("testMarksACommandThatWillNotFitInChat", () => {
      const out = inputToGiveCommands(longCard);
      expect(out.overlong).toHaveLength(1);
      expect(out.overlong[0]!.length).toBeGreaterThan(CHAT_LIMIT);
      expect(out.lines[0]).toContain("too long for chat");
    });

    it("testLeavesItUnmarkedWhenTheMarkerIsTurnedOff", () => {
      const out = inputToGiveCommands(longCard, { markOverlong: false });
      expect(out.overlong).toHaveLength(1);
      expect(out.lines[0]).not.toContain("too long for chat");
    });

    it("testDoesNotMarkACommandThatFits", () => {
      const out = inputToGiveCommands(SMALL_PASTE);
      expect(out.overlong).toEqual([]);
      expect(out.lines[0]).not.toContain("too long for chat");
    });
  });

  describe("TheReal1192Paste", () => {
    const out = inputToGiveCommands(snbtExamples.join("\n"), {
      missingParts: "warn",
    });

    it("testEmitsOneCommandPerCard", () => {
      expect(out.lines).toHaveLength(out.parsed.cards.length);
      expect(out.lines.every((line) => line.startsWith("/give @p "))).toBe(
        true
      );
    });

    it("testEveryCardCommandCarriesAnId", () => {
      const cards = out.lines.filter((line) =>
        line.startsWith("/give @p integrateddynamics:variable{")
      );
      expect(cards.length).toBeGreaterThan(0);
      for (const line of cards) {
        expect(line).toMatch(/_id:\d+,/);
      }
    });

    it("testEmitsAnOverLongCommandThatPastesBackIn", () => {
      const marked = out.lines.filter((line) =>
        line.includes("too long for chat")
      );
      expect(marked.length).toBeGreaterThan(0);
      for (const line of marked) {
        const reparsed = parseSnbtInput(line, { missingParts: "warn" });
        expect(reparsed.cards).toHaveLength(1);
      }
    });

    it("testRoundTripsTheEmittedCommandsParseBackToTheSameCards", () => {
      const reparsed = parseSnbtInput(out.text, { missingParts: "warn" });
      expect(reparsed.cards).toHaveLength(out.parsed.cards.length);

      const keys = (cards: typeof reparsed.cards): string[] =>
        cards
          .map((card) => card.ast)
          .filter((ast): ast is TypeAST.AST => ast !== undefined)
          .map((ast) =>
            astContentKey(ast).replaceAll(/Variable:@\d+/g, "Variable:@")
          )
          .sort();
      expect(keys(reparsed.cards)).toEqual(keys(out.parsed.cards));
      expect(reparsed.cards.map((card) => card.id).sort()).toEqual(
        reparsed.cards.map((_, index) => String(index)).sort()
      );
    });

    it("testMarksTheCommandsThatExceedTheChatLimit", () => {
      expect(out.overlong.length).toBeGreaterThan(0);
      for (const { line, length } of out.overlong) {
        expect(out.lines[line]!).toContain(`${length} chars`);
      }
    });
  });
});
