import {
  CONVENIENCE_BY_NAME,
  CONVENIENCE_NAMES,
  CONVENIENCE_OPERATORS,
  CONVENIENCE_SOURCE,
  generatePipeExpression,
  generateRotateExpression,
  isConvenienceName,
  parsePipeName,
  parseRotateName,
  resolveConvenienceOperator,
} from "lib/transformers/convenienceOperators";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { ASTToExpanded, ExpandedToAST } from "lib/transformers/Expanded";

const identifierPattern = /[A-Za-z_][A-Za-z0-9_]*/g;

const referencedNames = (expression: string): string[] =>
  (expression.match(identifierPattern) ?? []).filter((name) =>
    CONVENIENCE_BY_NAME.has(name)
  );

describe("TestConvenienceOperators", () => {
  it("testWholeTableParses", () => {
    const ast = ExpandedToAST(CONVENIENCE_SOURCE, 0, {});
    expect(ast.type).toBe("NetworkCards");
    const names = (ast as TypeAST.NetworkCards).definitions.map((d) => d.name);
    expect(names).toEqual(CONVENIENCE_OPERATORS.map(({ name }) => name));
  });

  it("testEveryEntryRenders", () => {
    const ast = ExpandedToAST(CONVENIENCE_SOURCE, 0, {});
    expect(() => ASTToExpanded(ast)).not.toThrow();
  });

  it("testEntriesOnlyReferenceEarlierEntries", () => {
    const seen = new Set<string>();
    for (const { name, expression } of CONVENIENCE_OPERATORS) {
      for (const referenced of referencedNames(expression)) {
        expect({ name, referenced, earlier: seen.has(referenced) }).toEqual({
          name,
          referenced,
          earlier: true,
        });
      }
      seen.add(name);
    }
  });

  it("testPublicNamesDoNotCollideWithOperatorAliases", () => {
    for (const name of CONVENIENCE_NAMES) {
      expect(operatorRegistry.operatorByNickname(name)).toBeUndefined();
    }
  });

  it("testCirculatingPentaDefinitionIsAcceptedAsAValue", () => {
    const ast = ExpandedToAST(
      `${CONVENIENCE_SOURCE}\nrotate_1_2_3_4_6_5 = pipe_4(apply3, rotate_1_2_4_3(apply3))`,
      0,
      {}
    ) as TypeAST.NetworkCards;
    const last = ast.definitions.at(-1)!;
    expect(last.name).toBe("rotate_1_2_3_4_6_5");
    expect(() => ASTToExpanded(ast)).not.toThrow();
  });

  it("testHelpersAreNotPublic", () => {
    for (const { name, helper } of CONVENIENCE_OPERATORS) {
      expect(isConvenienceName(name)).toBe(!helper);
    }
    expect(CONVENIENCE_NAMES).not.toContain("flipPipe");
    expect(CONVENIENCE_NAMES).not.toContain("temp1");
    expect(CONVENIENCE_NAMES).toContain("pipe_2");
    expect(CONVENIENCE_NAMES).toContain("rotate_2_3_1");
  });

  it("testRotateNamesAreRecognised", () => {
    for (const name of ["rotate_1_3_2", "rotate_132", "r_1_3_2", "r132"]) {
      expect([name, parseRotateName(name)]).toEqual([name, [1, 3, 2]]);
    }
    expect(parseRotateName("rotate_1_2_3_4_6_5")).toEqual([1, 2, 3, 4, 6, 5]);
  });

  it("testRotateNamesReachPastNinePositions", () => {
    const ten = [10, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(parseRotateName("rotate_10_1_2_3_4_5_6_7_8_9")).toEqual(ten);
    expect(parseRotateName("r_10_1_2_3_4_5_6_7_8_9")).toEqual(ten);
    expect(parseRotateName("rotate_2_3_4_5_6_7_8_9_10_11_1")).toEqual([
      2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1,
    ]);
    expect(parseRotateName("r12345678910")).toBeNull();
  });

  it("testRotateNamesNeedEveryPositionExactlyOnce", () => {
    const rejected = [
      "rotate",
      "r",
      "rotate_1_1",
      "rotate_2_1_1",
      "rotate_2_3",
      "rotate_1_3",
      "rotate_0_1",
      "rotate_01_2",
      "rotate_1_02",
      "rotate_1_2_10",
      "rotate_x_1",
      "rotate_1_",
      "rota_1_2",
    ];
    for (const name of rejected) {
      expect([name, parseRotateName(name)]).toEqual([name, null]);
    }
  });

  it("testPipeNamesAreGeneratedForAnyArity", () => {
    expect(generatePipeExpression(5)).toBe(
      "pipe_2(flip(pipe(flip(pipe_4), flipPipe)), expOpRes_3)"
    );
    expect(resolveConvenienceOperator("pipe_5")?.expression).toBe(
      generatePipeExpression(5)
    );
    expect(resolveConvenienceOperator("pipe_6")?.expression).toBe(
      "pipe_2(flip(pipe(flip(pipe_5), flipPipe)), expOpRes_3)"
    );
    expect(parsePipeName("pipe_30")).toBe(30);
    expect(isConvenienceName("pipe_5")).toBe(true);
    for (const name of [
      "pipe_1",
      "pipe_0",
      "pipe5",
      "pipe.5",
      "pipe_05",
      "pipe_",
      "pipe_5_2",
    ]) {
      expect([name, resolveConvenienceOperator(name)]).toEqual([
        name,
        undefined,
      ]);
    }
  });

  it("testUnlistedRotationsAreGenerated", () => {
    const order = [1, 2, 3, 4, 6, 5];
    expect(resolveConvenienceOperator("rotate_1_2_3_4_6_5")?.expression).toBe(
      generateRotateExpression(order)
    );
    expect(
      resolveConvenienceOperator("rotate_1_2_3_4_6_5")?.expression
    ).toContain("apply(flipPipe");
    expect(resolveConvenienceOperator("rotate_1_2")?.expression).toBe(
      "identity"
    );
    expect(isConvenienceName("rotate_1_2_3_4_6_5")).toBe(true);
    expect(isConvenienceName("rotate_9_8")).toBe(false);
    expect(isConvenienceName("flipPipe")).toBe(false);
    expect(resolveConvenienceOperator("rotate_1_2_500")).toBeUndefined();
  });

  it("testListedRotatesKeepTheirExpression", () => {
    for (const name of CONVENIENCE_NAMES.filter(
      (candidate) => parseRotateName(candidate) !== null
    )) {
      expect([name, resolveConvenienceOperator(name)?.expression]).toEqual([
        name,
        CONVENIENCE_BY_NAME.get(name)?.expression,
      ]);
    }
    expect(resolveConvenienceOperator("rotate_231")?.expression).toBe(
      "rotate_2_3_1"
    );
  });

  it("testNoDuplicateNames", () => {
    const names = CONVENIENCE_OPERATORS.map(({ name }) => name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("testEveryIdentifierIsKnown", () => {
    const seen = new Set<string>();
    for (const { name, expression } of CONVENIENCE_OPERATORS) {
      for (const identifier of expression.match(identifierPattern) ?? []) {
        const known =
          seen.has(identifier) ||
          operatorRegistry.operatorByNickname(identifier) !== undefined;
        expect({ name, identifier, known }).toEqual({
          name,
          identifier,
          known: true,
        });
      }
      seen.add(name);
    }
  });

  it("testRotateFamilyIsComplete", () => {
    const tetra = CONVENIENCE_NAMES.filter((name) =>
      /^rotate_\d(_\d){3}$/.test(name)
    );
    const tri = CONVENIENCE_NAMES.filter((name) =>
      /^rotate_\d(_\d){2}$/.test(name)
    );
    expect(tetra).toHaveLength(23);
    expect(tri).toHaveLength(5);
    expect(CONVENIENCE_NAMES).toContain("rotate_1");
    expect(CONVENIENCE_NAMES).toContain("rotate_2_1");
  });

  it("testSmallerAritiesAliasTheTetraRotates", () => {
    const expressionOf = (name: string) =>
      CONVENIENCE_BY_NAME.get(name)?.expression;

    for (const name of CONVENIENCE_NAMES.filter((n) =>
      /^rotate_\d(_\d){2}$/.test(n)
    )) {
      expect(expressionOf(name)).toBe(`${name}_4`);
    }
    expect(expressionOf("rotate_2_1")).toBe("rotate_2_1_3_4");
    expect(expressionOf("rotate_1")).toBe("identity");
  });
});
