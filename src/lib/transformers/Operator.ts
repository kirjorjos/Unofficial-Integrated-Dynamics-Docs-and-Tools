import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { CurriedOperator } from "lib/IntegratedDynamicsClasses/operators/CurriedOperator";
import { FlipOperator } from "lib/IntegratedDynamicsClasses/operators/FlipOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { Pipe2Operator } from "lib/IntegratedDynamicsClasses/operators/Pipe2Operator";
import { PipeOperator } from "lib/IntegratedDynamicsClasses/operators/PipeOperator";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";
import { Recipe } from "lib/IntegratedDynamicsClasses/Recipe";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iNull } from "lib/IntegratedDynamicsClasses/typeWrappers/iNull";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Double } from "lib/JavaNumberClasses/Double";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Long } from "lib/JavaNumberClasses/Long";

/**
 * Transforms an AST to an Operator.
 * @param ast The AST to transform.
 * @returns The Operator.
 */
export const ASTtoOperator = (ast: TypeAST.AST): IntegratedValue => {
  switch (ast.type) {
    case "Integer":
      return new Integer(parseInt(ast.value));
    case "Long":
      return new Long(ast.value);
    case "Double":
      return new Double(parseFloat(ast.value));
    case "String":
      return new iString(ast.value);
    case "Boolean":
      return new iBoolean(ast.value);
    case "Null":
      return new iNull();

    case "Block":
      return new Block(new Properties(ast.value));
    case "Item":
      return new Item(new Properties(ast.value));
    case "Fluid":
      return new Fluid(new Properties(ast.value));
    case "Entity":
      return new Entity(new Properties(ast.value));

    case "Ingredients": {
      const items = new iArrayEager(
        (ast.value.items || []).map((i) => ASTtoOperator(i) as Item)
      );
      const fluids = new iArrayEager(
        (ast.value.fluids || []).map((f) => ASTtoOperator(f) as Fluid)
      );
      const energies = new iArrayEager(
        (ast.value.energy || []).map((e) => ASTtoOperator(e) as Long)
      );
      return new Ingredients(items, fluids, energies);
    }
    case "Recipe": {
      const input = ASTtoOperator(ast.value.input) as Ingredients;
      const output = ASTtoOperator(ast.value.output) as Ingredients;
      return new Recipe(input, output, ast.value.inputReuseable);
    }

    case "Operator": {
      const op = operatorRegistry[ast.opName];
      if (!op) throw new Error(`Unknown operator: ${ast.opName}`);
      return new op();
    }

    case "Curry": {
      const base = ASTtoOperator(ast.base) as Operator<
        IntegratedValue,
        IntegratedValue
      >;
      const args = ast.args.map(ASTtoOperator);
      return new CurriedOperator(base, args);
    }

    case "Pipe": {
      const op1 = ASTtoOperator(ast.op1) as Operator<
        IntegratedValue,
        IntegratedValue
      >;
      const op2 = ASTtoOperator(ast.op2) as Operator<
        IntegratedValue,
        IntegratedValue
      >;
      return new PipeOperator(op1, op2);
    }

    case "Pipe2": {
      const op1 = ASTtoOperator(ast.op1) as Operator<
        IntegratedValue,
        IntegratedValue
      >;
      const op2 = ASTtoOperator(ast.op2) as Operator<
        IntegratedValue,
        IntegratedValue
      >;
      const op3 = ASTtoOperator(ast.op3) as Operator<
        IntegratedValue,
        IntegratedValue
      >;
      return new Pipe2Operator(op1, op2, op3);
    }

    case "Flip": {
      const arg = ASTtoOperator(ast.arg) as Operator<
        IntegratedValue,
        IntegratedValue
      >;
      return new FlipOperator(arg);
    }

    case "NBT":
      return new CompoundTag(ast.value as Record<string, any>);

    case "List":
      return new iArrayEager(ast.value.map(ASTtoOperator));

    default:
      throw new Error(`Unsupported AST type: ${(ast as any).type}`);
  }
};

/**
 * Transforms an Operator to an AST.
 * @param val The Operator to transform.
 * @returns The AST.
 */
export const OperatortoAST = (val: IntegratedValue): TypeAST.AST => {
  if (val instanceof Integer) return { type: "Integer", value: val.toString() };
  if (val instanceof Long) return { type: "Long", value: val.toString() };
  if (val instanceof Double) return { type: "Double", value: val.toString() };
  if (val instanceof iString) return { type: "String", value: val.valueOf() };
  if (val instanceof iBoolean) return { type: "Boolean", value: val.valueOf() };
  if (val instanceof iNull) return { type: "Null" };

  if (val instanceof Block)
    return { type: "Block", value: val.getProperties().data };
  if (val instanceof Item)
    return { type: "Item", value: val.getProperties().data };
  if (val instanceof Fluid)
    return { type: "Fluid", value: val.getProperties().data };
  if (val instanceof Entity)
    return { type: "Entity", value: val.getProperties().data };

  if (val instanceof Ingredients) {
    return {
      type: "Ingredients",
      value: {
        items: val
          .getItems()
          .valueOf()
          .map((i) => OperatortoAST(i) as TypeAST.Item),
        fluids: val
          .getFluids()
          .valueOf()
          .map((f) => OperatortoAST(f) as TypeAST.Fluid),
        energy: val
          .getEnergies()
          .valueOf()
          .map((e) => OperatortoAST(e) as TypeAST.Long),
      },
    };
  }

  if (val instanceof Recipe) {
    return {
      type: "Recipe",
      value: {
        input: OperatortoAST(val.getInput()) as TypeAST.Ingredients,
        output: OperatortoAST(val.getOutput()) as TypeAST.Ingredients,
        inputReuseable: val.getInputReuseable(),
      },
    };
  }

  if (val instanceof CurriedOperator) {
    return {
      type: "Curry",
      base: OperatortoAST(val.baseOperator) as TypeAST.Operator,
      args: val.appliedArgs.map(OperatortoAST),
    };
  }

  if (val instanceof PipeOperator) {
    return {
      type: "Pipe",
      op1: OperatortoAST(val.op1) as TypeAST.Operator,
      op2: OperatortoAST(val.op2) as TypeAST.Operator,
    };
  }

  if (val instanceof Pipe2Operator) {
    return {
      type: "Pipe2",
      op1: OperatortoAST(val.op1) as TypeAST.Operator,
      op2: OperatortoAST(val.op2) as TypeAST.Operator,
      op3: OperatortoAST(val.op3) as TypeAST.Operator,
    };
  }

  if (val instanceof FlipOperator) {
    return {
      type: "Flip",
      arg: OperatortoAST(val.op) as TypeAST.Operator,
    };
  }

  if (val instanceof Operator) {
    const internalName = (val.constructor as any).internalName;
    for (const [key, opClass] of Object.entries(operatorRegistry)) {
      if (key === "find") continue;
      if ((opClass as any).internalName === internalName) {
        return { type: "Operator", opName: key as TypeOperatorKey };
      }
    }
    throw new Error(
      `Could not find registry key for operator: ${internalName}`
    );
  }

  if (val instanceof Tag) {
    return { type: "NBT", value: val.toJSON() };
  }

  if (val instanceof iArrayEager) {
    return {
      type: "List",
      value: val.valueOf().map((entry) => OperatortoAST(entry)),
    };
  }

  throw new Error(
    `Cannot transform unknown IntegratedValue type: ${val.constructor.name}`
  );
};
