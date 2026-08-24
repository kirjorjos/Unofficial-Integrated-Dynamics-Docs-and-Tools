import { ASTToCompressed, CompressedToAST } from "lib/transformers/Compressed";
import { getNicknameRegex } from "lib/transformers/helpers";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { AudioReader } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioReader";
import { BlockReader } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockReader";
import { EntityReader } from "lib/IntegratedDynamicsClasses/readers/EntityReader/EntityReader";
import { ExtradimensionalReader } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/ExtradimensionalReader";
import { FluidReader } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidReader";
import { InventoryReader } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryReader";
import { MachineReader } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineReader";
import { NetworkReader } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkReader";
import { RedstoneReader } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/RedstoneReader";
import { WorldReader } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldReader";

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
      expect(readerClasses[i]!.numericID).toBe(expectedIDs[i]!);
    }

    // Verify getAspectBitWidth is inherited from ReaderBase
    for (const cls of readerClasses) {
      expect(typeof cls.getAspectBitWidth).toBe("function");
      const bitWidth = cls.getAspectBitWidth();
      expect(bitWidth).toBeGreaterThanOrEqual(1);
      expect(bitWidth).toBeLessThanOrEqual(8);
    }
  });

  it("testReaderAspectNicknameRules", () => {
    const nicknameRegex = getNicknameRegex();
    const readers = [
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

    for (const reader of readers) {
      const seenDisplayNames = new Set<string>();
      for (const [key, aspect] of Object.entries(reader.aspects)) {
        expect(aspect.displayName).toBeTruthy();
        expect(nicknameRegex.test(aspect.displayName)).toBe(true);
        expect(aspect.fullDisplayName).toBeTruthy();
        expect(aspect.outputType).toBeTruthy();
        expect(aspect.nicknames).toContain(aspect.displayName);
        for (const nickname of aspect.nicknames) {
          expect(nicknameRegex.test(nickname)).toBe(true);
        }
        expect(seenDisplayNames.has(aspect.displayName)).toBe(false);
        seenDisplayNames.add(aspect.displayName);
        expect(reader.aspects[key]!.displayName).toBe(aspect.displayName);
      }
    }
  });

  it("testReaderVarByIdHasSignature", () => {
    expect(
      NetworkReader.aspects["OPERATOR_GETVARIABLEBYID"]!.signature
    ).toEqual(["Integer", "Any"]);
  });

  it("testReaderOutputTypeMapping", () => {
    expect(RedstoneReader.aspects["BOOLEAN_LOW"]!.outputType).toBe("Boolean");
    expect(RedstoneReader.aspects["INTEGER_VALUE"]!.outputType).toBe("Integer");
    expect(FluidReader.aspects["FLUIDSTACK"]!.outputType).toBe("Fluid");
    expect(FluidReader.aspects["DOUBLE_FILLRATIO"]!.outputType).toBe("Double");
    expect(InventoryReader.aspects["OBJECT_ITEM_STACK_SLOT"]!.outputType).toBe(
      "Item"
    );
    expect(WorldReader.aspects["LONG_TIME"]!.outputType).toBe("Long");
    expect(WorldReader.aspects["LIST_PLAYERS"]!.outputType).toBe("List");
    expect(NetworkReader.aspects["BOOLEAN_APPLICABLE"]!.outputType).toBe(
      "Boolean"
    );
    expect(NetworkReader.aspects["OPERATOR_GETVARIABLEBYID"]!.outputType).toBe(
      "Operator"
    );
    expect(NetworkReader.aspects["ANY_VALUE"]!.outputType).toBe("Any");
    expect(BlockReader.aspects["BLOCK"]!.outputType).toBe("Block");
    expect(BlockReader.aspects["NBT"]!.outputType).toBe("NBT");
    expect(EntityReader.aspects["ENTITY"]!.outputType).toBe("Entity");
    expect(MachineReader.aspects["LIST_GETRECIPES"]!.outputType).toBe("List");
    expect(AudioReader.aspects["INTEGER_HARP_NOTE"]!.outputType).toBe(
      "Integer"
    );
  });

  it("testReaderRoundTrip", () => {
    const cases: TypeAST.Reader[] = [
      {
        type: "Reader",
        value: { reader: "RedstoneReader", aspect: "BOOLEAN_LOW" },
      },
      {
        type: "Reader",
        value: {
          reader: "InventoryReader",
          partId: "0",
          aspect: "OBJECT_ITEM_STACK_SLOT",
          settings: { slot: 1 },
        },
      },
      {
        type: "Reader",
        value: {
          reader: "InventoryReader",
          aspect: "OBJECT_ITEM_STACK_SLOT",
          simulatedOutput: {
            type: "Item",
            value: { id: "minecraft:stone", size: "1" },
          },
        },
      },
      {
        type: "Reader",
        value: {
          reader: "MachineReader",
          partId: "7",
          aspect: "DOUBLE_TEMPERATURE",
          settings: {},
          simulatedOutput: { type: "Double", value: "21.5" },
        },
        varName: "machineTemp",
      },
    ];

    for (const ast of cases) {
      expect(CompressedToAST(ASTToCompressed(ast))).toEqual(ast);
    }
  });

  it("testReaderRejectsUnknownAspect", () => {
    const ast: TypeAST.Reader = {
      type: "Reader",
      value: { reader: "RedstoneReader", aspect: "DOES_NOT_EXIST" },
    };
    expect(() => ASTToCompressed(ast)).toThrow();
  });

  it("testRejectUnknownOperatorID", () => {
    expect(() => CompressedToAST("f-A")).toThrow();
  });

  it("testRejectTruncatedNumericPayload", () => {
    expect(() => CompressedToAST("gA")).toThrow();
  });
});
