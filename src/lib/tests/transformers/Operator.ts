/**
 * Test the operator transformer.
 * @author kirjorjos
 */

import { ASTtoOperator, OperatortoAST } from "lib/transformers/Operator";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Double } from "lib/JavaNumberClasses/Double";
import { Long } from "lib/JavaNumberClasses/Long";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iNull } from "lib/IntegratedDynamicsClasses/typeWrappers/iNull";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { CurriedOperator } from "lib/IntegratedDynamicsClasses/operators/CurriedOperator";
import { PipeOperator } from "lib/IntegratedDynamicsClasses/operators/PipeOperator";
import { FlipOperator } from "lib/IntegratedDynamicsClasses/operators/FlipOperator";
import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { Recipe } from "lib/IntegratedDynamicsClasses/Recipe";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { CodeLineToAST } from "lib/transformers/CodeLine";
import {
  evaluateFullyAppliedCurryWithSteps,
  buildVariableValueByIdOperator,
} from "lib/transformers/helpers";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";

describe("Operator Transformer Tests", () => {
  let i10: Integer;
  let sHello: iString;
  let bTrue: iBoolean;
  let nNull: iNull;

  let i10AST: TypeAST.Integer;
  let l100AST: TypeAST.Long;
  let d105AST: TypeAST.Double;
  let sHelloAST: TypeAST.String;
  let bTrueAST: TypeAST.Boolean;
  let nNullAST: TypeAST.Null;

  let itemAST: TypeAST.Item;
  let blockAST: TypeAST.Block;
  let ingredientsAST: TypeAST.Ingredients;
  let recipeAST: TypeAST.Recipe;

  let opAST: TypeAST.BaseOperator;
  let curryAST: TypeAST.Curried;
  let pipeAST: TypeAST.Pipe;
  let flipAST: TypeAST.Flip;

  beforeEach(() => {
    i10 = new Integer(10);
    sHello = new iString("hello");
    bTrue = new iBoolean(true);
    nNull = new iNull();

    i10AST = { type: "Integer", value: "10" };
    l100AST = { type: "Long", value: "100" };
    d105AST = { type: "Double", value: "10.5" };
    sHelloAST = { type: "String", value: "hello" };
    bTrueAST = { type: "Boolean", value: true };
    nNullAST = { type: "Null" };

    itemAST = { type: "Item", value: { itemName: "Stone" } };
    blockAST = {
      type: "Block",
      value: { blockName: "minecraft:stone", displayName: "Stone" },
    };

    ingredientsAST = {
      type: "Ingredients",
      value: {
        items: [itemAST],
        energy: [{ type: "Long", value: "1000" }],
      },
    };

    recipeAST = {
      type: "Recipe",
      value: {
        input: ingredientsAST,
        output: {
          type: "Ingredients",
          value: {
            items: [{ type: "Item", value: { displayName: "Iron Block" } }],
          },
        },
        inputReuseable: {
          items: [],
          fluids: [],
          energies: [],
        },
      },
    };

    opAST = { type: "Operator", opName: "ARITHMETIC_ADDITION" };

    curryAST = {
      type: "Curry",
      base: opAST,
      args: [i10AST],
    };

    pipeAST = {
      type: "Pipe",
      op1: opAST,
      op2: { type: "Operator", opName: "ARITHMETIC_MULTIPLICATION" },
    };

    flipAST = {
      type: "Flip",
      arg: opAST,
    };
  });

  /**
   * ----------------------------------- ASTtoOperator -----------------------------------
   */
  describe("TestASTtoOperator", () => {
    it("testPrimativeASTToOperator", () => {
      expect(ASTtoOperator(i10AST)).toEqual(i10);
      expect(ASTtoOperator(l100AST)).toBeInstanceOf(Long);
      expect(ASTtoOperator(d105AST)).toBeInstanceOf(Double);
      expect(ASTtoOperator(sHelloAST)).toEqual(sHello);
      expect(ASTtoOperator(bTrueAST)).toEqual(bTrue);
      expect(ASTtoOperator(nNullAST)).toEqual(nNull);
    });

    it("testComplexASTNodesToOperator", () => {
      const item = ASTtoOperator(itemAST) as Item;
      expect(item).toBeInstanceOf(Item);
      expect(item.getName().valueOf()).toBe("Stone");

      const block = ASTtoOperator(blockAST) as Block;
      expect(block).toBeInstanceOf(Block);
      expect(block.getBlockName().valueOf()).toBe("minecraft:stone");
    });

    it("testIngredientsAndRecipeASTToOperator", () => {
      const ingredients = ASTtoOperator(ingredientsAST) as Ingredients;
      expect(ingredients).toBeInstanceOf(Ingredients);
      expect(ingredients.getItems().size().toJSNumber()).toBe(1);
      expect(ingredients.getEnergies().size().toJSNumber()).toBe(1);

      const recipe = ASTtoOperator(recipeAST) as Recipe;
      expect(recipe).toBeInstanceOf(Recipe);
      expect(recipe.getInput().getItems().size().toJSNumber()).toBe(1);
      expect(recipe.getOutput().getItems().size().toJSNumber()).toBe(1);
    });

    it("testBaseOperatorASTToOperator", () => {
      const op = ASTtoOperator(opAST);
      expect(op).toBeInstanceOf(Operator);
      expect((op as any).getUniqueName().valueOf()).toBe(
        "integrateddynamics:arithmetic_addition"
      );
    });

    it("testStructuralOperatorASTToOperator", () => {
      const curry = ASTtoOperator(curryAST);
      expect(curry).toBeInstanceOf(CurriedOperator);

      const pipe = ASTtoOperator(pipeAST);
      expect(pipe).toBeInstanceOf(PipeOperator);

      const flip = ASTtoOperator(flipAST);
      expect(flip).toBeInstanceOf(FlipOperator);
    });

    it("testReaderASTToOperatorUsesDefaultValue", () => {
      const reader = ASTtoOperator({
        type: "Reader",
        value: {
          reader: "RedstoneReader",
          aspect: "INTEGER_VALUE",
        },
      });
      expect(reader).toBeInstanceOf(Integer);
      expect((reader as Integer).toJSNumber()).toBe(0);
    });

    it("testReaderASTToOperatorUsesSimulatedOutput", () => {
      const reader = ASTtoOperator({
        type: "Reader",
        value: {
          reader: "RedstoneReader",
          aspect: "BOOLEAN_LOW",
          simulatedOutput: { type: "Boolean", value: true },
        },
      });
      expect(reader).toBeInstanceOf(iBoolean);
      expect(reader.valueOf()).toBe(true);
    });

    it("testInvalidASTToOperator", () => {
      const unknownType = { type: "Unknown", value: null };
      expect(() => ASTtoOperator(unknownType as any)).toThrow();
    });
  });

  /**
   * ----------------------------------- OperatortoAST -----------------------------------
   */
  describe("TestOperatortoAST", () => {
    it("should transform IntegratedValues back to AST", () => {
      expect(OperatortoAST(i10)).toEqual(i10AST);
      expect(OperatortoAST(sHello)).toEqual(sHelloAST);
      expect(OperatortoAST(bTrue)).toEqual(bTrueAST);
      expect(OperatortoAST(nNull)).toEqual(nNullAST);
    });

    it("testBaseOperatorToAST", () => {
      const op = new operatorRegistry.ARITHMETIC_ADDITION();
      const ast = OperatortoAST(op) as TypeAST.BaseOperator;
      expect(ast.type).toBe("Operator");
      expect(ast.opName).toBe("ARITHMETIC_ADDITION");
    });

    it("testCurriedOperatorRoundTrip", () => {
      const operator = ASTtoOperator(curryAST);
      const roundTripAST = OperatortoAST(operator);

      expect(roundTripAST).toEqual(curryAST);
    });

    it("should handle NBT tags via toJSON", () => {
      const mockTag = {
        toJSON: () => ({ some: "data" }),
        constructor: { name: "ByteTag" },
      };
      Object.setPrototypeOf(mockTag, Tag.prototype);

      const ast = OperatortoAST(mockTag as any) as TypeAST.Nbt;
      expect(ast).toEqual({ type: "NBT", value: { some: "data" } });
    });

    it("testInvalidOperatorToAST", () => {
      const unknownType = { constructor: { name: "Unknown" } };
      expect(() => OperatortoAST(unknownType as any)).toThrow();
    });
  });

  /**
   * ------------------------- VariableValueById resolution -------------------------
   */
  describe("VariableValueByIdResolution Tests", () => {
    const twoCardSteps = (): { variableId: number; node: TypeAST.AST }[] => [
      { variableId: 0, node: { type: "Integer", value: "319" } },
      { variableId: 1, node: { type: "Integer", value: "236" } },
    ];

    it("testMapOverVarIdsResolvesAgainstSteps", () => {
      const ast = CodeLineToAST(
        "apply apply map readers.network.variableValueById [0, 1]"
      );
      const value = evaluateFullyAppliedCurryWithSteps(ast, twoCardSteps());
      expect(value).toBeDefined();
      const arr = (value as any).valueOf();
      expect(Array.isArray(arr)).toBe(true);
      expect(arr.map((v: any) => v.toJSNumber())).toEqual([319, 236]);
    });

    it("testReduce1OverMappedVarIdsResolvesToSum", () => {
      const ast = CodeLineToAST(
        "apply apply reduce1 add (apply apply map readers.network.variableValueById [0, 1])"
      );
      const value = evaluateFullyAppliedCurryWithSteps(ast, twoCardSteps());
      expect(value).toBeDefined();
      expect((value as Integer).toJSNumber()).toBe(555);
    });

    it("testMissingStepFailsResolution", () => {
      const ast = CodeLineToAST(
        "apply apply map readers.network.variableValueById [0, 1]"
      );
      const value = evaluateFullyAppliedCurryWithSteps(ast, [
        { variableId: 0, node: { type: "Integer", value: "319" } },
      ]);
      expect(value).toBeUndefined();
    });

    it("testVarByIdOperatorThrowsNotInNetworkForUnknownId", () => {
      const op = buildVariableValueByIdOperator([
        { variableId: 0, node: { type: "Integer", value: "319" } },
      ]);
      expect(() => op.apply(new Integer(5))).toThrow(iError);
    });
  });
});
