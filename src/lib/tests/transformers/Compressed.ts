import { ASTToCompressed, CompressedToAST } from "lib/transformers/Compressed";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";

type OperatorStatic = {
  numericID: number;
};

const cloneAST = <T extends TypeAST.AST>(ast: T): T => {
  return JSON.parse(JSON.stringify(ast)) as T;
};

describe("TestCompressedTransformer", () => {
  it("testNumericIDs", () => {
    const ids = new Map<number, string>();
    const getNumericID = (opClass: OperatorStatic) => opClass.numericID;

    for (const [key, opClass] of Object.entries(operatorRegistry)) {
      if (key === "find" || key === "operatorByNickname") continue;
      if (typeof opClass !== "function") continue;

      const numericID = getNumericID(opClass as OperatorStatic);
      expect(Number.isInteger(numericID)).toBe(true);
      expect(numericID).toBeGreaterThanOrEqual(0);
      expect(numericID).toBeLessThanOrEqual(511);
      expect(ids.has(numericID)).toBe(false);
      ids.set(numericID, key);
    }

    expect(getNumericID(operatorRegistry.ARITHMETIC_ADDITION)).toBe(0);
    expect(getNumericID(operatorRegistry.BINARY_AND)).toBe(6);
    expect(getNumericID(operatorRegistry.ITEMSTACK_WITHDATA)).toBe(289);
    expect(getNumericID(operatorRegistry.OBJECT_FLUIDSTACK_BY_NAME)).toBe(303);
  });

  it("testPrimitiveRoundTrip", () => {
    const cases: TypeAST.AST[] = [
      { type: "Integer", value: "10", varName: "ten" },
      { type: "Long", value: "1000" },
      { type: "Double", value: "3.0" },
      { type: "String", value: "hello" },
      { type: "Boolean", value: true },
      { type: "Null" },
      { type: "Variable", name: "x", varName: "namedVar" },
    ];

    for (const ast of cases) {
      expect(CompressedToAST(ASTToCompressed(ast))).toEqual(ast);
    }
  });

  it("testURLSafeOutput", () => {
    const compressed = ASTToCompressed({
      type: "String",
      value: "hello world",
    });
    expect(compressed).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it("testDirectOperatorApplications", () => {
    const ast: TypeAST.AST = {
      type: "Curry",
      varName: "sum",
      base: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
      args: [
        { type: "Integer", value: "10" },
        { type: "Integer", value: "11" },
      ],
    };

    expect(CompressedToAST(ASTToCompressed(ast))).toEqual(ast);
  });

  it("testGenericCurryBases", () => {
    const ast: TypeAST.AST = {
      type: "Curry",
      base: {
        type: "Flip",
        arg: { type: "Operator", opName: "ARITHMETIC_ADDITION" },
      },
      args: [{ type: "Integer", value: "1" }],
      varName: "flippedAddOne",
    };

    expect(CompressedToAST(ASTToCompressed(ast))).toEqual(ast);
  });

  it("testIngredientsAndRecipeRoundTrip", () => {
    const ingredients: TypeAST.Ingredients = {
      type: "Ingredients",
      value: {
        items: [
          { type: "Item", value: { id: "minecraft:stone", count: 1 } },
          { type: "Item", value: { id: "minecraft:dirt", count: 2 } },
        ],
        fluids: [
          { type: "Fluid", value: { id: "minecraft:water", amount: 1000 } },
        ],
        energy: [{ type: "Long", value: "500" }],
      },
      varName: "inOut",
    };
    const ast: TypeAST.Recipe = {
      type: "Recipe",
      value: {
        input: cloneAST(ingredients),
        output: cloneAST(ingredients),
        inputReuseable: {
          items: [0],
          fluids: [],
          energies: [0],
        },
      },
    };

    expect(CompressedToAST(ASTToCompressed(ast))).toEqual(ast);
  });

  it("testSharedNodeReferences", () => {
    const shared: TypeAST.Item = {
      type: "Item",
      value: { id: "minecraft:stone", count: 1 },
      varName: "sharedItem",
    };
    const ast: TypeAST.Curried = {
      type: "Curry",
      base: { type: "Operator", opName: "RELATIONAL_EQUALS" },
      args: [shared, shared],
    };

    const back = CompressedToAST(ASTToCompressed(ast)) as TypeAST.Curried;
    expect(back.args[0]).toBe(back.args[1]);
    expect(back.args[0]).toEqual(shared);
  });

  it("testRejectUnknownOperatorID", () => {
    expect(() => CompressedToAST("f-A")).toThrow();
  });

  it("testRejectTruncatedNumericPayload", () => {
    expect(() => CompressedToAST("gA")).toThrow();
  });
});
