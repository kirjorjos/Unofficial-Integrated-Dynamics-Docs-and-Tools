import { ASTToCompressed, CompressedToAST } from "lib/transformers/Compressed";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { RedstoneReader } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader";
import { FluidReader } from "lib/IntegratedDynamicsClasses/readers/FluidReader";
import { InventoryReader } from "lib/IntegratedDynamicsClasses/readers/InventoryReader";
import { WorldReader } from "lib/IntegratedDynamicsClasses/readers/WorldReader";
import { NetworkReader } from "lib/IntegratedDynamicsClasses/readers/NetworkReader";
import { BlockReader } from "lib/IntegratedDynamicsClasses/readers/BlockReader";
import { EntityReader } from "lib/IntegratedDynamicsClasses/readers/EntityReader";
import { ExtradimensionalReader } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader";
import { MachineReader } from "lib/IntegratedDynamicsClasses/readers/MachineReader";
import { AudioReader } from "lib/IntegratedDynamicsClasses/readers/AudioReader";

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
      {
        type: "List",
        value: [
          { type: "String", value: "c:armor" },
          { type: "String", value: "c:tools" },
        ],
      },
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
          { type: "Item", value: { id: "minecraft:stone", size: 1 } },
          { type: "Item", value: { id: "minecraft:dirt", size: 2 } },
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
      value: { id: "minecraft:stone", size: 1 },
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

  it("testReaderNumericIDs", () => {
    // Every reader must have a unique numericID within 0-29 (5-bit LiteralKind range).
    // IDs 0-29 are reserved for LiteralKind entries, with reader IDs matching
    // their chronological position in the aspects.json ordering.
    const readerClasses = [
      RedstoneReader,
      InventoryReader,
      WorldReader,
      FluidReader,
      NetworkReader,
      BlockReader,
      EntityReader,
      ExtradimensionalReader,
      MachineReader,
      AudioReader,
    ] as const;

    const expectedIDs = [1, 3, 4, 5, 10, 15, 16, 17, 18, 19];

    const ids = new Map<number, string>();
    for (const cls of readerClasses) {
      const numericID = cls.numericID;
      expect(Number.isInteger(numericID)).toBe(true);
      expect(numericID).toBeGreaterThanOrEqual(0);
      expect(numericID).toBeLessThanOrEqual(29);
      expect(ids.has(numericID)).toBe(false);
      ids.set(numericID, cls.typeName);
    }

    // Verify exact expected IDs
    for (let i = 0; i < readerClasses.length; i++) {
      expect(readerClasses[i].numericID).toBe(expectedIDs[i]);
    }

    // Verify getAspectBitWidth is inherited from ReaderBase
    for (const cls of readerClasses) {
      expect(typeof cls.getAspectBitWidth).toBe("function");
      const bitWidth = cls.getAspectBitWidth();
      expect(bitWidth).toBeGreaterThanOrEqual(1);
      expect(bitWidth).toBeLessThanOrEqual(8);
    }
  });

  it("testReaderOutputTypeMapping", () => {
    // Spot-check that reader aspects resolve to the correct output types
    expect(RedstoneReader.aspectOutputType["BOOLEAN_LOW"]).toBe("Boolean");
    expect(RedstoneReader.aspectOutputType["INTEGER_VALUE"]).toBe("Integer");
    expect(FluidReader.aspectOutputType["FLUIDSTACK"]).toBe("Fluid");
    expect(FluidReader.aspectOutputType["DOUBLE_FILLRATIO"]).toBe("Double");
    expect(InventoryReader.aspectOutputType["OBJECT_ITEM_STACK_SLOT"]).toBe("Item");
    expect(WorldReader.aspectOutputType["LONG_TIME"]).toBe("Long");
    expect(WorldReader.aspectOutputType["LIST_PLAYERS"]).toBe("List");
    expect(NetworkReader.aspectOutputType["BOOLEAN_APPLICABLE"]).toBe("Boolean");
    expect(NetworkReader.aspectOutputType["OPERATOR_GETVARIABLEBYID"]).toBe("Operator");
    expect(NetworkReader.aspectOutputType["ANY_VALUE"]).toBe("Any");
    expect(BlockReader.aspectOutputType["BLOCK"]).toBe("Block");
    expect(BlockReader.aspectOutputType["NBT"]).toBe("NBT");
    expect(EntityReader.aspectOutputType["ENTITY"]).toBe("Entity");
    expect(MachineReader.aspectOutputType["LIST_GETRECIPES"]).toBe("List");
    expect(AudioReader.aspectOutputType["INTEGER_HARP_NOTE"]).toBe("Integer");
  });

  it("testRejectUnknownOperatorID", () => {
    expect(() => CompressedToAST("f-A")).toThrow();
  });

  it("testRejectTruncatedNumericPayload", () => {
    expect(() => CompressedToAST("gA")).toThrow();
  });
});
