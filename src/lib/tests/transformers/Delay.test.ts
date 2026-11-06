import { ASTToCodeLine, CodeLineToAST } from "lib/transformers/CodeLine";
import { ASTToCondensed, CondensedToAST } from "lib/transformers/Condensed";
import { ASTToCompressed, CompressedToAST } from "lib/transformers/Compressed";
import { ASTToExpanded, ExpandedToAST } from "lib/transformers/Expanded";
import { stripAutoCurryVarNames } from "lib/transformers/inputState";
import {
  DELAY_FREEZE_SHAPE_ERROR,
  DELAY_MIN_TICK_ERROR,
  delayDefaultTick,
  delayMinimumTick,
  simulateDelay,
  simulateDocument,
} from "lib/transformers/delaySimulation";
import {
  DEFAULT_TRANSFORMER_SETTINGS,
  decodeSettingsOpts,
  encodeSettingsOpts,
} from "lib/transformers/transformerSettings";
import { astToGiveCommands } from "lib/transformers/astGiveCommands";
import { parseSnbtInput } from "lib/transformers/inputParser";
import { StructuralParseError } from "lib/transformers/parseErrors";

const expectStructuralError = (run: () => unknown, message: RegExp) => {
  expect(run).toThrow(StructuralParseError);
  expect(run).toThrow(message);
};

describe("TestDelayConstructor", () => {
  it("testParsesDefaultsInCondensed", () => {
    const ast = CondensedToAST("Delay(5)");
    expect(ast).toMatchObject({
      type: "Delay",
      value: { type: "Integer", value: "5" },
    });
    expect(ast).not.toHaveProperty("interval");
    expect(ast).not.toHaveProperty("capacity");
    expect(ast).not.toHaveProperty("freezeAt");
  });

  it("testParsesPositionalArguments", () => {
    expect(CondensedToAST("Delay(5, 2)")).toMatchObject({ interval: 2 });
    expect(CondensedToAST("Delay(5, 1)")).not.toHaveProperty("interval");
    expect(CondensedToAST("Delay(5, 2, 3)")).toMatchObject({
      interval: 2,
      capacity: 3,
    });
    expect(CondensedToAST("Delay(5, 1, 10)")).toMatchObject({ capacity: 10 });
    expect(CondensedToAST("Delay(5, 1, 10)")).not.toHaveProperty("interval");
    expect(CondensedToAST("Delay(5, 2, 3, 4)")).toMatchObject({
      interval: 2,
      capacity: 3,
      freezeAt: 4,
    });
  });

  it("testAcceptsAnyCasingOnInput", () => {
    expect(CondensedToAST("delay(5)")).toMatchObject({ type: "Delay" });
    expect(CondensedToAST("DELAY(5, 2)")).toMatchObject({ interval: 2 });
    expect(CodeLineToAST("Delay(5)")).toMatchObject({ type: "Delay" });
    expect(CodeLineToAST("dElAy(5)")).toMatchObject({ type: "Delay" });
  });

  it("testParsesAnExpressionArgument", () => {
    expect(CondensedToAST("Delay(numberAdd(1, 2), 3)")).toMatchObject({
      type: "Delay",
      interval: 3,
      value: { type: "Curry" },
    });
    expect(CondensedToAST("Materialize(Delay(5, 2))")).toMatchObject({
      type: "Materialize",
      value: { type: "Delay", interval: 2 },
    });
    expect(CodeLineToAST("Delay(numberAdd 1 2)")).toMatchObject({
      type: "Delay",
      value: { type: "Curry" },
    });
    expect(CodeLineToAST("Delay(numberAdd 1 2, 3)")).toMatchObject({
      type: "Delay",
      interval: 3,
      value: { type: "Curry" },
    });
    expect(CodeLineToAST("Delay(numberAdd 1 2, 3, 4)")).toMatchObject({
      interval: 3,
      capacity: 4,
    });
  });

  it("testPrintsCanonicalShortFormInCondensed", () => {
    expect(ASTToCondensed(CondensedToAST("Delay(5)"))).toBe("Delay(5)");
    expect(ASTToCondensed(CondensedToAST("Delay(5, 2)"))).toBe("Delay(5, 2)");
    expect(ASTToCondensed(CondensedToAST("Delay(5, 1)"))).toBe("Delay(5)");
    expect(ASTToCondensed(CondensedToAST("Delay(5, 2, 3)"))).toBe(
      "Delay(5, 2, 3)"
    );
    expect(ASTToCondensed(CondensedToAST("Delay(5, 1, 10)"))).toBe(
      "Delay(5, 1, 10)"
    );
    expect(ASTToCondensed(CondensedToAST("Delay(5, 2, 3, 4)"))).toBe(
      "Delay(5, 2, 3, 4)"
    );
    expect(ASTToCondensed(CondensedToAST("Delay(numberAdd(1, 2), 3)"))).toBe(
      "Delay(numberAdd(1, 2), 3)"
    );
  });

  it("testPrintsCanonicalShortFormInCodeLine", () => {
    expect(ASTToCodeLine(CondensedToAST("Delay(5)"))).toBe("Delay(5)");
    expect(ASTToCodeLine(CondensedToAST("Delay(5, 2)"))).toBe("Delay(5, 2)");
    expect(ASTToCodeLine(CondensedToAST("Delay(5, 2, 3, 4)"))).toBe(
      "Delay(5, 2, 3, 4)"
    );
    expect(ASTToCodeLine(CondensedToAST("Delay(numberAdd(1, 2), 3)"))).toBe(
      "Delay(numberAdd 1 2, 3)"
    );
  });

  it("testRoundTripsThroughBothTextFormats", () => {
    for (const source of [
      "Delay(5)",
      "Delay(5, 2)",
      "Delay(5, 1)",
      "Delay(5, 2, 3)",
      "Delay(5, 1, 10)",
      "Delay(5, 2, 3, 4)",
      "Delay(numberAdd(1, 2), 3)",
      "Delay(numberAdd(1, 2), 3, 4, 5)",
      "Materialize(Delay(5, 2))",
    ]) {
      const ast = CondensedToAST(source);
      expect(CondensedToAST(ASTToCondensed(ast))).toEqual(ast);
      expect(CodeLineToAST(ASTToCodeLine(ast))).toEqual(ast);
    }
  });

  it("testRoundTripsThroughExpanded", () => {
    for (const source of [
      "Delay(5)",
      "Delay(5, 2)",
      "Delay(5, 2, 3, 4)",
      "Materialize(Static(Delay(5, 2, 3, 4)))",
    ]) {
      const ast = CondensedToAST(source);
      const text = ASTToExpanded(ast);
      expect(text).toContain("Delay(");
      const back = ExpandedToAST(text) as TypeAST.NetworkCards;
      expect(
        stripVarNames(back.definitions[back.definitions.length - 1]!.node)
      ).toEqual(stripVarNames(ast));
    }
  });

  it("testRejectsInvalidArguments", () => {
    for (const parse of [CondensedToAST, CodeLineToAST]) {
      expectStructuralError(
        () => parse("Delay(5, 0)"),
        /tick interval must be a positive non-zero integer/
      );
      expectStructuralError(
        () => parse("Delay(5, 1.5)"),
        /tick interval must be a positive non-zero integer/
      );
      expectStructuralError(
        () => parse("Delay(5, 1, 0)"),
        /capacity must be a whole number from 1 to 1024/
      );
      expectStructuralError(
        () => parse("Delay(5, 1, 1025)"),
        /capacity must be a whole number from 1 to 1024/
      );
      expectStructuralError(
        () => parse("Delay(5, 1, 5, -1)"),
        /freeze tick must be a positive integer/
      );
      expectStructuralError(
        () => parse("Delay(5, 1, 5, 6, 7)"),
        /at most four arguments/
      );
    }
  });

  it("testReservesTheDelayName", () => {
    expect(() => CondensedToAST("delay => numberAdd delay 1")).toThrow(
      /reserved name/
    );
    expect(() => CodeLineToAST("delay => numberAdd delay 1")).toThrow(
      /reserved name/
    );
  });
});

const delayNode = (source: string): TypeAST.Delay =>
  CondensedToAST(source) as TypeAST.Delay;

const integer = (value: number): TypeAST.Integer =>
  ({ type: "Integer", value: String(value) }) as TypeAST.Integer;

const stripVarNames = (node: TypeAST.AST): TypeAST.AST => {
  const clone = JSON.parse(JSON.stringify(node)) as unknown;
  const visit = (value: unknown): void => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (value === null || typeof value !== "object") return;
    const record = value as Record<string, unknown>;
    delete record["varName"];
    Object.values(record).forEach(visit);
  };
  visit(clone);
  return clone as TypeAST.AST;
};

const historyValues = (history: TypeAST.AST[]): string[] =>
  history.map((entry) => {
    if (entry.type === "Integer" || entry.type === "String") return entry.value;
    return entry.type;
  });

describe("TestDelaySimulation", () => {
  it("testSamplesOnIntervalMultiples", () => {
    expect(
      historyValues(simulateDelay(delayNode("Delay(5)"), 0).history)
    ).toEqual([]);
    expect(
      historyValues(simulateDelay(delayNode("Delay(5)"), 1).history)
    ).toEqual(["5"]);
    expect(
      historyValues(simulateDelay(delayNode("Delay(5)"), 5).history)
    ).toEqual(["5", "5", "5", "5", "5"]);
    expect(
      historyValues(simulateDelay(delayNode("Delay(5, 5)"), 4).history)
    ).toEqual([]);
    expect(
      historyValues(simulateDelay(delayNode("Delay(5, 5)"), 10).history)
    ).toEqual(["5", "5"]);
    expect(
      historyValues(simulateDelay(delayNode("Delay(5, 5)"), 11).history)
    ).toEqual(["5", "5"]);
  });

  it("testDropsTheOldestSampleWhenFull", () => {
    const node: TypeAST.Delay = {
      type: "Delay",
      value: integer(9),
      capacity: 3,
      seeds: [integer(1), integer(2), integer(3)],
    };
    expect(historyValues(simulateDelay(node, 3).history)).toEqual([
      "1",
      "2",
      "3",
    ]);
    expect(historyValues(simulateDelay(node, 4).history)).toEqual([
      "2",
      "3",
      "9",
    ]);
    expect(historyValues(simulateDelay(node, 6).history)).toEqual([
      "9",
      "9",
      "9",
    ]);
  });

  it("testShowsAPrefixOfAFullSeedWhenLowered", () => {
    const node: TypeAST.Delay = {
      type: "Delay",
      value: integer(9),
      seeds: [1, 2, 3, 4, 5].map(integer),
    };
    expect(delayMinimumTick(node)).toBe(1);
    expect(delayDefaultTick(node)).toBe(5);
    expect(historyValues(simulateDelay(node, 3).history)).toEqual([
      "1",
      "2",
      "3",
    ]);
    expect(delayMinimumTick(delayNode("Delay(5)"))).toBe(0);
    expect(delayDefaultTick(delayNode("Delay(5)"))).toBe(0);
    expect(() => simulateDocument(node, 0)).toThrow(DELAY_MIN_TICK_ERROR);
  });

  it("testClearsTheHistoryOnATypeChange", () => {
    const node: TypeAST.Delay = {
      type: "Delay",
      value: integer(9),
      seeds: [
        { type: "String", value: "a" },
        { type: "String", value: "b" },
      ],
    };
    expect(historyValues(simulateDelay(node, 2).history)).toEqual(["a", "b"]);
    expect(historyValues(simulateDelay(node, 3).history)).toEqual(["9"]);
  });

  it("testKeepsALargeIntervalFast", () => {
    const node = delayNode("Delay(5, 10000)");
    expect(simulateDelay(node, 10000).history).toHaveLength(1);
    expect(simulateDelay(node, 49999).history).toHaveLength(4);
    expect(simulateDelay(node, 50000).history).toHaveLength(5);
  });

  it("testFreezesTheHistory", () => {
    expect(() => simulateDocument(delayNode("Delay(5, 1, 5, 3)"), 10)).toThrow(
      DELAY_FREEZE_SHAPE_ERROR
    );
    expect(() =>
      simulateDocument(
        CondensedToAST("Static(Materialize(Delay(5, 1, 5, 3)))"),
        10
      )
    ).toThrow(DELAY_FREEZE_SHAPE_ERROR);

    const frozen = simulateDocument(
      CondensedToAST("Materialize(Static(Delay(5, 1, 5, 3)))"),
      10
    );
    expect(frozen.delays[0]!.history).toHaveLength(3);
    expect(frozen.delays[0]!.frozen).toBe(true);
    expect(
      simulateDocument(
        CondensedToAST("Materialize(Static(Delay(5, 1, 5, 3)))"),
        2
      ).delays[0]!.frozen
    ).toBe(false);
  });

  it("testReportsAStickyEvaluationError", () => {
    const node: TypeAST.Delay = {
      type: "Delay",
      value: { type: "Variable", label: "x" },
    };
    const result = simulateDelay(node, 3);
    expect(result.error).toBeDefined();
    expect(result.errorTick).toBe(1);
    expect(result.history).toEqual([]);
    expect(simulateDelay(node, 0).error).toBeUndefined();
  });

  it("testRejectsANegativeTargetTick", () => {
    expect(() => simulateDocument(delayNode("Delay(5)"), -1)).toThrow(
      StructuralParseError
    );
    expect(() => simulateDocument(delayNode("Delay(5)"), 1.5)).toThrow(
      StructuralParseError
    );
  });
});

describe("TestDelayCompressedEncoding", () => {
  it("testRoundTripsThroughCompressedEncoding", () => {
    for (const source of [
      "Delay(5)",
      "Delay(5, 2)",
      "Delay(5, 1, 10)",
      "Delay(5, 2, 3, 4)",
      "Materialize(Static(Delay(5, 2, 3, 4)))",
    ]) {
      const ast = stripAutoCurryVarNames(CondensedToAST(source));
      const decoded = stripAutoCurryVarNames(
        CompressedToAST(ASTToCompressed(ast))
      );
      expect(decoded).toEqual(ast);
    }
  });

  it("testRoundTripsSeedsAndProxyMetadata", () => {
    const node: TypeAST.Delay = {
      type: "Delay",
      value: integer(3),
      interval: 10000,
      seeds: [integer(3), integer(3), integer(3)],
      proxyId: "2",
      proxyCardId: "107",
    };
    expect(CompressedToAST(ASTToCompressed(node))).toEqual(node);
  });
});

describe("TestDelaySettings", () => {
  it("testStoresTheTargetTickInTheOptsBlob", () => {
    expect(
      encodeSettingsOpts({ ...DEFAULT_TRANSFORMER_SETTINGS, targetTick: 0 })
    ).toBeNull();

    const encoded = encodeSettingsOpts({
      ...DEFAULT_TRANSFORMER_SETTINGS,
      targetTick: 42,
    });
    expect(encoded).not.toBeNull();
    expect(decodeSettingsOpts(encoded).targetTick).toBe(42);
    expect(decodeSettingsOpts(null).targetTick).toBe(0);

    const wrapped = encodeSettingsOpts({
      ...DEFAULT_TRANSFORMER_SETTINGS,
      wrap: true,
    });
    expect(decodeSettingsOpts(wrapped)).toMatchObject({
      wrap: true,
      targetTick: 0,
    });
  });
});

describe("TestDelaySnbt", () => {
  it("testEmitsTheBlockAndAnIndependentHistoryCard", () => {
    const node: TypeAST.Delay = {
      type: "Delay",
      value: integer(3),
      seeds: [integer(3), integer(3), integer(3)],
    };
    const output = astToGiveCommands(node, { targetTick: 3 });
    expect(output.lines).toHaveLength(2);
    expect(output.lines[0]).toContain(
      "/give @p integrateddynamics:delay{proxyId:0,BlockEntityTag:{"
    );
    expect(output.lines[0]).toContain(
      'values:[{value:3,valueType:"integrateddynamics:integer"},{value:3,valueType:"integrateddynamics:integer"},{value:3,valueType:"integrateddynamics:integer"}]'
    );
    expect(output.lines[0]).toContain("Slot:0b");
    expect(output.lines[0]).toContain("Slot:2b");
    expect(output.lines[1]).toContain('typeName:"integrateddynamics:list"');
    expect(output.warnings).toEqual([]);
  });

  it("testDecodesTheEmptyHistoryFixture", () => {
    const fixture =
      '{capacity:5,connected:{map:[{key:0,value:0b},{key:1,value:0b},{key:2,value:0b},{key:3,value:0b},{key:4,value:0b},{key:5,value:0b}],valueType:"java.lang.Boolean"},errors:{collection:[]},id:"integrateddynamics:delay",inventory:[{Count:1b,Slot:0b,id:"integrateddynamics:variable",tag:{_id:67,_type:"integrateddynamics:valuetype",typeName:"integrateddynamics:integer",value:3}},{Count:1b,Slot:2b,id:"integrateddynamics:variable",tag:{_id:107,_type:"integrateddynamics:delay",partId:2}}],proxyId:2,updateInterval:10000,values:[],x:-7,y:-60,z:-5}';
    const parsed = parseSnbtInput(fixture);
    expect(parsed.warnings).toEqual([]);
    expect(parsed.delayBlocks).toHaveLength(1);
    expect(parsed.delayBlocks![0]!.node).toMatchObject({
      type: "Delay",
      interval: 10000,
      proxyId: "2",
      proxyCardId: "107",
      value: { type: "Integer", value: "3" },
    });
    expect(parsed.delayBlocks![0]!.seeds).toEqual([]);
    const delayCard = parsed.cards.find(
      (card) => card.type === "integrateddynamics:delay"
    );
    expect(delayCard?.partId).toBe("2");
    expect(delayCard?.ast).toBe(parsed.delayBlocks![0]!.node);
  });

  it("testRoundTripsThroughSnbt", () => {
    const node: TypeAST.Delay = {
      type: "Delay",
      value: integer(3),
      seeds: [integer(3), integer(3)],
    };
    const output = astToGiveCommands(node, { targetTick: 2 });
    const parsed = parseSnbtInput(output.lines[0]!);
    expect(parsed.delayBlocks).toHaveLength(1);
    const decoded = parsed.delayBlocks![0]!;
    expect(decoded.node).toMatchObject({
      type: "Delay",
      value: { type: "Integer", value: "3" },
    });
    expect(decoded.seeds).toHaveLength(2);
    expect(decoded.seeds[0]).toMatchObject({ type: "Integer", value: "3" });
    expect(parsed.warnings).toEqual([]);
  });
});
