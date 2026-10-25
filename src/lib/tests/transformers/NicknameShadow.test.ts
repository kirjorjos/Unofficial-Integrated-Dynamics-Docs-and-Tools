import { ASTToCondensed, CondensedToAST } from "lib/transformers/Condensed";
import { CodeLineToAST } from "lib/transformers/CodeLine";
import {
  ASTToExpanded,
  ExpandedToAST,
  type ExpandedToASTOptions,
} from "lib/transformers/Expanded";
import {
  aliasesAfterShadowing,
  isReservedName,
  validAliasesFor,
} from "lib/transformers/nicknameShadow";
import {
  DEFAULT_TRANSFORMER_SETTINGS,
  decodeSettingsOpts,
  encodeSettingsOpts,
} from "lib/transformers/transformerSettings";

const parse = (
  input: string,
  opts: ExpandedToASTOptions = {}
): { ast: TypeAST.AST; warnings: string[] } => {
  const warnings: string[] = [];
  const ast = ExpandedToAST(input, 0, { ...opts, warnings });
  return { ast, warnings };
};

describe("TestNicknameShadow", () => {
  it("testBaseAliasShadowIsAHardErrorByDefault", () => {
    expect(() => parse("flip = 3")).toThrow(
      /overshadows an operator nickname \(Flip\)/
    );
    expect(() => parse("flip = 3")).toThrow(/Operator shadow/);
  });

  it("testSelfShadowIsAllowedInBothModes", () => {
    const { ast } = parse("flip = operatorFlip");
    expect(ast.type).toBe("NetworkCards");
  });

  it("testWarnModeAllowsTheShadowAndReportsIt", () => {
    const { ast, warnings } = parse("flip = 3\nresult = flip", {
      operatorShadow: "warn",
    });
    expect(ast.type).toBe("NetworkCards");
    expect(warnings.join("\n")).toMatch(
      /Variable "flip" shadows the operator Flip/
    );
  });

  it("testWarnModeRenamesTheOperatorInOutput", () => {
    const { ast } = parse('flip = 3\nother = operator("flip")', {
      operatorShadow: "warn",
    });
    const condensed = ASTToCondensed(ast, true, 0, true);
    expect(condensed).toContain("operatorFlip");
    expect(condensed).not.toMatch(/\bflip\b/);
  });

  it("testLastRemainingAliasCannotBeShadowed", () => {
    const aliases = validAliasesFor("OPERATOR_FLIP");
    expect(aliases.length).toBeGreaterThan(1);
    const shadowed = aliases.slice(0, -1);
    const last = aliases[aliases.length - 1]!;
    const input = [
      ...shadowed.map((alias) => `${alias} = 1`),
      `${last} = 2`,
    ].join("\n");
    expect(() => parse(input, { operatorShadow: "warn" })).toThrow(
      /last remaining name/
    );
    expect(aliasesAfterShadowing("OPERATOR_FLIP", new Set(shadowed))).toEqual([
      last,
    ]);
  });

  it("testUsingTheNameAsAnOperatorBeforeDefiningItConflicts", () => {
    expect(() => parse("value = flip\nflip = 3")).toThrow(
      /already used as an operator on line 1/
    );

    const { warnings } = parse("value = flip\nflip = 3", {
      allowDuplicateNames: true,
    });
    expect(warnings.join("\n")).toMatch(/the definition was dropped/);
  });

  it("testReservedNamesCannotBeDefined", () => {
    for (const name of ["Materialize", "Dynamic", "operator", "Variable"]) {
      expect(() => parse(`${name} = 1`)).toThrow(/reserved name/);
      expect(isReservedName(name)).toBe(true);
    }
    expect(isReservedName("flip")).toBe(false);
  });

  it("testLiteralWordsAreReserved", () => {
    for (const name of ["true", "false", "null", "True", "NULL"]) {
      expect(isReservedName(name)).toBe(true);
      expect(() => parse(`${name} = 1`)).toThrow(/reserved name/);
      expect(() => parse(`x = Variable("${name}")`)).toThrow(/reserved name/);
      expect(() => CondensedToAST(`(${name}) => 1`)).toThrow();
      expect(() => CodeLineToAST(`(${name}) => 1`)).toThrow();
    }
  });

  it("testCodeLineLambdaParamsFollowTheSameSetting", () => {
    expect(() => CodeLineToAST("(flip) => flip")).toThrow(
      /clashes with an existing operator nickname/
    );
    const warnings: string[] = [];
    expect(() =>
      CodeLineToAST("(flip) => flip", undefined, 0, false, true, {
        operatorShadow: "warn",
        warnings,
      })
    ).not.toThrow();
    expect(warnings.join("\n")).toMatch(/Parameter "flip" clashes/);
  });

  it("testLambdaParamsFollowTheSameSetting", () => {
    expect(() => CondensedToAST("(flip) => flip")).toThrow(
      /clashes with an existing operator nickname/
    );
    const warnings: string[] = [];
    expect(() =>
      CondensedToAST("(flip) => flip", undefined, 0, false, true, {
        operatorShadow: "warn",
        warnings,
      })
    ).not.toThrow();
    expect(warnings.join("\n")).toMatch(/Parameter "flip" clashes/);
  });

  it("testVariableWrapperObeysTheSetting", () => {
    expect(() => CodeLineToAST('Variable("flip")')).toThrow(
      /overshadows an operator nickname/
    );
    const warnings: string[] = [];
    const ast = CodeLineToAST('Variable("flip")', undefined, 0, false, true, {
      operatorShadow: "warn",
      warnings,
    });
    expect(ast.type).toBe("Operator");
    expect(warnings.join("\n")).toMatch(/refers to the operator Flip/);
  });

  it("testReservedVariableWrapperErrors", () => {
    expect(() => CodeLineToAST('Variable("Materialize")')).toThrow(
      /reserved name/
    );
  });

  it("testShadowSettingRoundTrips", () => {
    expect(
      encodeSettingsOpts({ ...DEFAULT_TRANSFORMER_SETTINGS }, "condensed")
    ).toBeNull();
    const encoded = encodeSettingsOpts(
      { ...DEFAULT_TRANSFORMER_SETTINGS, operatorShadow: "warn" },
      "condensed"
    );
    expect(encoded).not.toBeNull();
    expect(decodeSettingsOpts(encoded).operatorShadow).toBe("warn");
  });

  it("testExpandedOutputKeepsValuesWhenANameIsShadowed", () => {
    const { ast } = parse("flip = 3\nresult = flip", {
      operatorShadow: "warn",
    });
    const expanded = ASTToExpanded(ast);
    expect(expanded).toContain("flip = 3");
    expect(expanded).toContain("result = 3");
  });
});
