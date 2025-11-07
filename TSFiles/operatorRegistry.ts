/**
 * TODO: Test that the operators involving regexes work correctly.
 * Test Map and pipe
 */

import { InfiniteList } from "HelperClasses/InfiniteList";
import { Operator } from "IntegratedDynamicsClasses/Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Block } from "IntegratedDynamicsClasses/Block";
import { Item } from "IntegratedDynamicsClasses/Item";
import { TypeMap } from "HelperClasses/TypeMap";
import { Double } from "JavaNumberClasses/Double";
import { Integer } from "JavaNumberClasses/Integer";
import { NBT } from "IntegratedDynamicsClasses/NBT";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { JavaMath } from "HelperClasses/Math";
import { RE2 } from "re2-wasm";
import { Long } from "JavaNumberClasses/Long";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { Recipe } from "IntegratedDynamicsClasses/Recipe";
import { UniquelyNamed } from "IntegratedDynamicsClasses/UniquelyNamed";

let globalMap = new TypeMap();

let operatorRegistry: TypeOperatorRegistry = {
  baseOperators: {
    and: new Operator({
      internalName: "integrateddynamics:logical_and",
      nicknames: ["logicalAnd"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "&&",
      interactName: "booleanAnd",
      function: (bool1: boolean): TypeLambda<boolean, boolean> => {
        return (bool2: boolean): boolean => {
          return bool1 && bool2;
        };
      },
    }),
    or: new Operator({
      internalName: "integrateddynamics:logical_or",
      nicknames: ["logicalOr"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "||",
      interactName: "booleanOr",
      function: (bool1: boolean): TypeLambda<boolean, boolean> => {
        return (bool2: boolean): boolean => {
          return bool1 || bool2;
        };
      },
    }),
    not: new Operator({
      internalName: "integrateddynamics:logical_not",
      nicknames: ["logicalNot"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "!",
      interactName: "booleanNot",
      function: (bool: boolean): boolean => {
        return !bool;
      },
    }),
    nand: new Operator({
      internalName: "integrateddynamics:logical_nand",
      nicknames: ["logicalNand"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "!&&",
      interactName: "booleanNand",
      function: (
        func1: TypeLambda<boolean, boolean>
      ): TypeLambda<TypeLambda<boolean, boolean>, TypeLambda<IntegratedValue, boolean>> => {
        return (
          func2: TypeLambda<boolean, boolean>
        ): TypeLambda<IntegratedValue, boolean> => {
          return (input: IntegratedValue): boolean => {
            return !(func1(input) && func2(input));
          };
        };
      },
    }),
    nor: new Operator({
      internalName: "integrateddynamics:logical_nor",
      nicknames: ["logicalNor"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "!||",
      interactName: "booleanNor",
      function: (
        func1: TypeLambda<boolean, boolean>
      ): TypeLambda<TypeLambda<boolean, boolean>, TypeLambda<IntegratedValue, boolean>> => {
        return (
          func2: TypeLambda<boolean, boolean>
        ): TypeLambda<IntegratedValue, boolean> => {
          return (input: IntegratedValue): boolean => {
            return !(func1(input) || func2(input));
          };
        };
      },
    }),
    add: new Operator({
      internalName: "integrateddynamics:arithmetic_addition",
      nicknames: ["arithmeticAddition"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Number",
            },
          },
        },
        globalMap
      ),
      symbol: "+",
      interactName: "numberAdd",
      function: async (num1: TypeNumber): Promise<TypeLambda<TypeNumber, Promise<TypeNumber>>> => {
        return async (num2: TypeNumber): Promise<TypeNumber> => {
          return JavaMath.add(num1, num2);
        };
      },
    }),
    subtract: new Operator({
      internalName: "integrateddynamics:arithmetic_subtraction",
      nicknames: ["arithmeticSubtraction"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Number",
            },
          },
        },
        globalMap
      ),
      symbol: "-",
      interactName: "numberSubtract",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
        return (num2: TypeNumber): Promise<TypeNumber> => {
          return JavaMath.subtract(num1, num2);
        };
      },
    }),
    multiply: new Operator({
      internalName: "integrateddynamics:arithmetic_multiplication",
      nicknames: ["arithmeticMultiplication"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Number",
            },
          },
        },
        globalMap
      ),
      symbol: "*",
      interactName: "numberMultiply",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
        return (num2: TypeNumber): Promise<TypeNumber> => {
          return JavaMath.multiply(num1, num2);
        };
      },
    }),
    divide: new Operator({
      internalName: "integrateddynamics:arithmetic_division",
      nicknames: ["arithmeticDivision"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Number",
            },
          },
        },
        globalMap
      ),
      symbol: "/",
      interactName: "numberDivide",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
        return (num2: TypeNumber): Promise<TypeNumber> => {
          return JavaMath.divide(num1, num2);
        };
      },
    }),
    max: new Operator({
      internalName: "integrateddynamics:arithmetic_maximum",
      nicknames: ["arithmeticMaximum"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Number",
            },
          },
        },
        globalMap
      ),
      symbol: "max",
      interactName: "numberMax",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
        return (num2: TypeNumber): Promise<TypeNumber> => {
          return JavaMath.max(num1, num2);
        };
      },
    }),
    min: new Operator({
      internalName: "integrateddynamics:arithmetic_minimum",
      nicknames: ["arithmeticMinimum"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Number",
            },
          },
        },
        globalMap
      ),
      symbol: "min",
      interactName: "numberMin",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
        return (num2: TypeNumber): Promise<TypeNumber> => {
          return JavaMath.min(num1, num2);
        };
      },
    }),
    increment: new Operator({
      internalName: "integrateddynamics:arithmetic_increment",
      nicknames: ["arithmeticIncrement"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Number",
          },
        },
        globalMap
      ),
      symbol: "++",
      interactName: "numberIncrement",
      function: async (num1: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.add(num1, new Integer(1));
      },
    }),
    decrement: new Operator({
      internalName: "integrateddynamics:arithmetic_decrement",
      nicknames: ["arithmeticDecrement"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Number",
          },
        },
        globalMap
      ),
      symbol: "--",
      interactName: "numberDecrement",
      function: async (num1: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.subtract(num1, new Integer(1));
      },
    }),
    modulus: new Operator({
      internalName: "integrateddynamics:arithmetic_modulus",
      nicknames: ["arithmeticModulus"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Number",
            },
          },
        },
        globalMap
      ),
      symbol: "%",
      interactName: "numberModulus",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
        return (num2: TypeNumber): Promise<TypeNumber> => {
          return JavaMath.mod(num1, num2);
        };
      },
    }),
    doubleSqrt: new Operator({
      internalName: "integrateddynamics:double_sqrt",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "sqrt",
      interactName: "doubleSqrt",
      function: (double: Double): Double => {
        return double.sqrt();
      },
    }),
    doublePow: new Operator({
      internalName: "integrateddynamics:double_pow",
      nicknames: ["doublePow"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "Function",
            from: {
              type: "Double",
            },
            to: {
              type: "Double",
            },
          },
        },
        globalMap
      ),
      symbol: "pow",
      interactName: "doublePow",
      function: (base: Double): TypeLambda<Double, Double> => {
        return (exponent: Double): Double => {
          return base.pow(exponent);
        };
      },
    }),
    "==": new Operator({
      internalName: "integrateddynamics:relational_equals",
      nicknames: ["relationalEquals"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "==",
      interactName: "anyEquals",
      function: (value1: IntegratedValue): TypeLambda<IntegratedValue, boolean> => {
        return (value2: IntegratedValue): boolean => {
          try {
            return value1.equals(value2);
          } catch (e) {
            return value1 === value2;
          }
        };
      },
    }),
    ">": new Operator({
      internalName: "integrateddynamics:relational_gt",
      nicknames: ["relationalGt"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: ">",
      interactName: "numberGreaterThan",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<boolean>> => {
        return (num2: TypeNumber): Promise<boolean> => {
          return JavaMath.gt(num1, num2);
        };
      },
    }),
    "<": new Operator({
      internalName: "integrateddynamics:relational_lt",
      nicknames: ["relationalLt"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "<",
      interactName: "numberLessThan",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<boolean>> => {
        return (num2: TypeNumber): Promise<boolean> => {
          return JavaMath.lt(num1, num2);
        };
      },
    }),
    "!=": new Operator({
      internalName: "integrateddynamics:relational_notequals",
      nicknames: ["relationalNotequals"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "!=",
      interactName: "anyNotEquals",
      function: (value1: IntegratedValue): TypeLambda<IntegratedValue, boolean> => {
        return (value2: IntegratedValue): boolean => {
          try {
            return !value1.equals(value2);
          } catch (e) {
            return value1 !== value2;
          }
        };
      },
    }),
    ">=": new Operator({
      internalName: "integrateddynamics:relational_ge",
      nicknames: ["relationalGe"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: ">=",
      interactName: "anyGreaterThanOrEquals",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<boolean>> => {
        return (num2: TypeNumber): Promise<boolean> => {
          return JavaMath.gte(num1, num2);
        };
      },
    }),
    "<=": new Operator({
      internalName: "integrateddynamics:relational_le",
      nicknames: ["relationalLe"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "<=",
      interactName: "anyLessThanOrEquals",
      function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<boolean>> => {
        return (num2: TypeNumber): Promise<boolean> => {
          return JavaMath.lte(num1, num2);
        };
      },
    }),
    binaryAnd: new Operator({
      internalName: "integrateddynamics:binary_and",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "&",
      interactName: "integerBinaryAnd",
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return int1.binaryAnd(int2);
        };
      },
    }),
    binaryOr: new Operator({
      internalName: "integrateddynamics:binary_or",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "|",
      interactName: "integerBinaryOr",
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return int1.binaryOr(int2);
        };
      },
    }),
    binaryXor: new Operator({
      internalName: "integrateddynamics:binary_xor",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "^",
      interactName: "integerXor",
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return int1.binaryXor(int2);
        };
      },
    }),
    binaryComplement: new Operator({
      internalName: "integrateddynamics:binary_complement",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "~",
      interactName: "integerComplement",
      function: (int: Integer): Integer => {
        return int.binaryComplement();
      },
    }),
    "<<": new Operator({
      internalName: "integrateddynamics:binary_lshift",
      nicknames: ["binaryLshift"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "<<",
      interactName: "integerLeftShift",
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return int1.leftShift(int2);
        };
      },
    }),
    ">>": new Operator({
      internalName: "integrateddynamics:binary_rshift",
      nicknames: ["binaryRshift"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: ">>",
      interactName: "integerRightShift",
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return int1.rightShift(int2);
        };
      },
    }),
    ">>>": new Operator({
      internalName: "integrateddynamics:binary_rzshift",
      nicknames: ["binaryRzshift"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: ">>>",
      interactName: "integerUnsignedRightShift",
      function: (int1: Integer): TypeLambda<Integer, Integer> => {
        return (int2: Integer): Integer => {
          return new Integer(int1.unsignedRightShift(int2));
        };
      },
    }),
    stringLength: new Operator({
      internalName: "integrateddynamics:string_length",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "len",
      interactName: "stringLength",
      function: (str: string): TypeNumber => {
        return new Integer(str.length);
      },
    }),
    stringConcat: new Operator({
      internalName: "integrateddynamics:string_concat",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "String",
            },
          },
        },
        globalMap
      ),
      symbol: "+",
      interactName: "stringConcat",
      function: (str1: string): TypeLambda<string, string> => {
        return (str2: string): string => {
          return str1.concat(str2);
        };
      },
    }),
    stringContains: new Operator({
      internalName: "integrateddynamics:string_contains",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "contains",
      interactName: "stringContains",
      function: (substring: string): TypeLambda<string, boolean> => {
        return (fullString: string): boolean => {
          return fullString.includes(substring);
        };
      },
    }),
    containsRegex: new Operator({
      internalName: "integrateddynamics:string_contains_regex",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "contains_regex",
      interactName: "stringContainsRegex",
      function: (regexString: string): TypeLambda<string, boolean> => {
        return (fullString: string): boolean => {
          const regex = new RE2(regexString, "u");
          return regex.test(fullString);
        };
      },
    }),
    matchesRegex: new Operator({
      internalName: "integrateddynamics:string_matches_regex",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "matches_regex",
      interactName: "stringMatchesRegex",
      function: (regexString: string): TypeLambda<string, boolean> => {
        return (fullString: string): boolean => {
          if (regexString.startsWith("^")) regexString = regexString.slice(1);
          if (regexString.endsWith("$")) regexString = regexString.slice(0, -1);
          const regex = new RE2(`^(?:${regexString})$`, "u");
          return regex.test(fullString);
        };
      },
    }),
    stringIndexOf: new Operator({
      internalName: "integrateddynamics:string_index_of",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "index_of",
      interactName: "stringIndexOf",
      function: (substring: string): TypeLambda<string, TypeNumber> => {
        return (fullString: string): TypeNumber => {
          return new Integer(fullString.indexOf(substring));
        };
      },
    }),
    indexOfRegex: new Operator({
      internalName: "integrateddynamics:string_index_of_regex",
      nicknames: ["stringIndexOfRegex"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "index_of_regex",
      interactName: "stringIndexOfRegex",
      function: (regexString: string): TypeLambda<string, TypeNumber> => {
        return (fullString: string): TypeNumber => {
          const regex = new RE2(regexString, "u");
          return new Integer(fullString.search(regex));
        };
      },
    }),
    startsWith: new Operator({
      internalName: "integrateddynamics:string_starts_with",
      nicknames: ["stringStartsWith"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "starts_with",
      interactName: "stringStartsWith",
      function: (substring: string): TypeLambda<string, boolean> => {
        return (fullString: string): boolean => {
          return fullString.startsWith(substring);
        };
      },
    }),
    endsWith: new Operator({
      internalName: "integrateddynamics:string_ends_with",
      nicknames: ["stringEndsWith"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "ends_with",
      interactName: "stringEndsWith",
      function: (substring: string): TypeLambda<string, boolean> => {
        return (fullString: string): boolean => {
          return fullString.endsWith(substring);
        };
      },
    }),
    stringSplitOn: new Operator({
      internalName: "integrateddynamics:string_split_on",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "List", listType: { type: "String" } },
          },
        },
        globalMap
      ),
      symbol: "split_on",
      interactName: "stringSplitOn",
      function: (delimiter: string): TypeLambda<string, Array<string>> => {
        return (fullString: string): Array<string> => {
          return fullString.split(delimiter);
        };
      },
    }),
    stringSplitOnRegex: new Operator({
      internalName: "integrateddynamics:string_split_on_regex",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "List", listType: { type: "String" } },
          },
        },
        globalMap
      ),
      symbol: "split_on_regex",
      interactName: "stringSplitOnRegex",
      function: (regexString: string): TypeLambda<string, Array<string>> => {
        return (fullString: string): Array<string> => {
          const regex = new RE2(regexString, "u");
          return regex.split(fullString) as string[];
        };
      },
    }),
    substring: new Operator({
      internalName: "integrateddynamics:string_substring",
      nicknames: ["stringSubstring"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "String",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "substring",
      interactName: "integerSubstring",
      function: (
        start: TypeNumber
      ): TypeLambda<TypeNumber, TypeLambda<string, string>> => {
        return (end: TypeNumber): TypeLambda<string, string> => {
          return (fullString: string): string => {
            return fullString.substring(
              parseInt(start.toDecimal()),
              parseInt(end.toDecimal())
            );
          };
        };
      },
    }),
    stringRegexGroup: new Operator({
      internalName: "integrateddynamics:string_regex_group",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "String",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "regex_group",
      interactName: "stringRegexGroup",
      function: (regexString: string) => {
        return (groupIndex: TypeNumber) => {
          return (fullString: string) => {
            const regex = new RE2(regexString, "u");
            const match = regex.exec(fullString);
            if (
              match &&
              match[parseInt(groupIndex.toDecimal())] !== undefined
            ) {
              return match[parseInt(groupIndex.toDecimal())];
            } else {
              throw new Error(
                `No match found for group index ${groupIndex.toDecimal()} in regex "${regexString}" on string "${fullString}"`
              );
            }
          };
        };
      },
    }),
    stringRegexGroups: new Operator({
      internalName: "integrateddynamics:string_regex_groups",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "List", listType: { type: "String" } },
          },
        },
        globalMap
      ),
      symbol: "regex_groups",
      interactName: "stringRegexGroups",
      function: (regexString: string): TypeLambda<string, Array<string>> => {
        return (fullString: string): Array<string> => {
          const regex = new RE2(regexString, "u");
          const match = regex.exec(fullString);
          if (match) {
            return match as Array<string>;
          } else {
            throw new Error(
              `No match found for group in regex "${regexString}" on string "${fullString}"`
            );
          }
        };
      },
    }),
    stringRegexScan: new Operator({
      internalName: "integrateddynamics:string_regex_scan",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: { type: "List", listType: { type: "String" } },
            },
          },
        },
        globalMap
      ),
      symbol: "regex_scan",
      interactName: "stringRegexScan",
      function: (regexString) => {
        return (groupIndex: TypeNumber): TypeLambda<string, Array<String>> => {
          return (fullString: string): Array<string> => {
            const regex = new RE2(regexString, "gu");
            let results = [];
            let match;
            regex.lastIndex = 0;

            while ((match = regex.exec(fullString)) !== null) {
              const groupValue = match[parseInt(groupIndex.toDecimal())];
              if (groupValue !== undefined && groupValue !== null) {
                results.push(groupValue);
              }
            }

            return results;
          };
        };
      },
    }),
    stringReplace: new Operator({
      internalName: "integrateddynamics:string_replace",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "String",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "replace",
      interactName: "stringReplace",
      function: (
        searchString: string
      ): TypeLambda<string, TypeLambda<string, string>> => {
        return (replacementString: string): TypeLambda<string, string> => {
          return (fullString: string): string => {
            return fullString.replace(searchString, replacementString);
          };
        };
      },
    }),
    stringReplaceRegex: new Operator({
      internalName: "integrateddynamics:string_replace_regex",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "String",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "replace_regex",
      interactName: "stringReplaceRegex",
      function: (regexString) => {
        return (replacementString: string): TypeLambda<string, string> => {
          return (fullString: string): string => {
            const regex = new RE2(regexString, "u");
            return fullString.replace(regex, replacementString);
          };
        };
      },
    }),
    stringJoin: new Operator({
      internalName: "integrateddynamics:string_join",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "String" } },
            to: {
              type: "String",
            },
          },
        },
        globalMap
      ),
      symbol: "join",
      interactName: "stringJoin",
      function: (delimiter: string): TypeLambda<Array<string>, string> => {
        return (stringList: Array<string>): string => {
          if (stringList.some((item) => typeof item !== "string")) {
            throw new Error("stringJoin expects a list of strings");
          }
          return stringList.join(delimiter);
        };
      },
    }),
    name: new Operator({
      internalName: "integrateddynamics:string_name",
      nicknames: ["namedName", "toString"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Named",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "name",
      interactName: "namedName",
      function: (named: TypeRawSignatureAST.RawSignatureNamed): string => {
        return named.toString();
      },
    }),
    uname: new Operator({
      internalName: "integrateddynamics:string_unique_name",
      nicknames: ["uniquelynamedUniquename"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "UniquelyNamed",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "uname",
      interactName: "uniquely_namedUniqueName",
      function: (
        uniquelyNamed: UniquelyNamed
      ): string => {
        return uniquelyNamed.getUniqueName();
      },
    }),
    error: new Operator({
      internalName: "integrateddynamics:string_string_error",
      nicknames: ["string_error"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: { type: "Any", typeID: 1 },
        },
        globalMap
      ),
      symbol: "error",
      interactName: "stringStringError",
      function: (message: string): never => {
        throw new Error(`Error: ${message}`);
      },
    }),
    round: new Operator({
      internalName: "integrateddynamics:number_round",
      nicknames: ["numberRound"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "|| ||",
      interactName: "numberRound",
      function: (number: TypeNumber): Promise<Integer> => {
        return number.round();
      },
    }),
    ceil: new Operator({
      internalName: "integrateddynamics:number_ceil",
      nicknames: ["numberCeil"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "⌈ ⌉",
      interactName: "numberCeil",
      function: (number: TypeNumber): Promise<Integer> => {
        return number.ceil();
      },
    }),
    floor: new Operator({
      internalName: "integrateddynamics:number_floor",
      nicknames: ["numberFloor"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "⌊ ⌋",
      interactName: "numberFloor",
      function: (number: TypeNumber): Promise<Integer> => {
        return number.floor();
      },
    }),
    compact: new Operator({
      internalName: "integrateddynamics:number_compact",
      nicknames: ["numberCompact"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "compact",
      interactName: "numberCompact",
      function: (number: TypeNumber): string => {
        return number.toDecimal().toString();
      },
    }),
    isNull: new Operator({
      internalName: "integrateddynamics:general_isnull",
      nicknames: ["nullableIsnull"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "o",
      interactName: "anyIsNull",
      function: (value: IntegratedValue): boolean => {
        return value === null || value === undefined;
      },
    }),
    isNotNull: new Operator({
      internalName: "integrateddynamics:general_isnotnull",
      nicknames: ["nullableIsnotnull"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "∅",
      interactName: "anyIsNotNull",
      function: (value: IntegratedValue): boolean => {
        return value !== null && value !== undefined;
      },
    }),
    listLength: new Operator({
      internalName: "integrateddynamics:list_length",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "| |",
      interactName: "listLength",
      function: (list) => {
        return list.length;
      },
    }),
    listEmpty: new Operator({
      internalName: "integrateddynamics:list_empty",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "∅",
      interactName: "listIsEmpty",
      function: (list: Array<IntegratedValue>): boolean => {
        return list.length === 0;
      },
    }),
    listNotEmpty: new Operator({
      internalName: "integrateddynamics:list_notempty",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "o",
      interactName: "listIsNotEmpty",
      function: (list: Array<IntegratedValue>): boolean => {
        return list.length > 0;
      },
    }),
    get: new Operator({
      internalName: "integrateddynamics:list_get",
      nicknames: ["listElement"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: { type: "Any", typeID: 1 },
          },
        },
        globalMap
      ),
      symbol: "get",
      interactName: "listGet",
      function: <T>(index: Integer): TypeLambda<Array<T>, Promise<T>> => {
        return async (list: Array<T>): Promise<T> => {
          if (await index.lt(new Integer(0)) || await index.lte(new Integer(list.length))) {
            throw new Error(
              `Index ${index} out of bounds for list of length ${list.length}`
            );
          }
          return list[parseInt(index.toDecimal())] as T;
        };
      },
    }),
    getOrDefault: new Operator({
      internalName: "integrateddynamics:list_get_or_default",
      nicknames: ["listElementDefault", "get_or_default"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 1 },
            },
          },
        },
        globalMap
      ),
      symbol: "get_or_default",
      interactName: "listGetOrDefault",
      function: async <T>(
        list: Array<T>
      ): Promise<TypeLambda<Integer, Promise<TypeLambda<T, Promise<T>>>>> => {
        return async (index: Integer): Promise<TypeLambda<T, Promise<T>>> => {
          return async (defaultValue: T): Promise<T> => {
            if (await JavaMath.lt(index, new Integer(0)) || await JavaMath.gte(index, new Integer(list.length))) {
              return defaultValue;
            }
            return list[parseInt(index.toDecimal())] as T;
          };
        };
      },
    }),
    listContains: new Operator({
      internalName: "integrateddynamics:list_contains",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "contains",
      interactName: "listContains",
      function: <T>(list: Array<T>): TypeLambda<T, boolean> => {
        return (element: T): boolean => {
          return list.includes(element);
        };
      },
    }),
    listContainsPredicate: new Operator({
      internalName: "integrateddynamics:list_contains_p",
      nicknames: ["listContainsP"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Boolean",
              },
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "contains_p",
      interactName: "listContainsPredicate",
      function: <T>(predicate: Predicate): TypeLambda<Array<T>, boolean> => {
        return (list: Array<T>): boolean => {
          return list.some((item) => predicate.apply(item));
        };
      },
    }),
    listCount: new Operator({
      internalName: "integrateddynamics:list_count",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "count",
      interactName: "listCount",
      function: <T>(list: Array<T>): TypeLambda<T, Integer> => {
        return (element: T): Integer => {
          return new Integer(list.filter((item) => item === element).length);
        };
      },
    }),
    listCountPredicate: new Operator({
      internalName: "integrateddynamics:list_count_p",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Boolean",
              },
            },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "count_p",
      interactName: "listCountPredicate",
      function: <T>(list: Array<T>): TypeLambda<TypeLambda<T, boolean>, Integer> => {
        return (predicate: Predicate): Integer => {
          return new Integer(list.filter((item) => predicate.apply(item)).length);
        };
      },
    }),
    append: new Operator({
      internalName: "integrateddynamics:list_append",
      nicknames: ["listAppend"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { "type": "Any", typeID: 1 },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
        },
        globalMap
      ),
      symbol: "append",
      interactName: "listAppend",
      function: <T>(list: Array<T>): TypeLambda<T, Array<T>> => {
        return (element: T): Array<T> => {
          return [...list, element];
        };
      },
    }),
    listConcat: new Operator({
      internalName: "integrateddynamics:list_concat",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
        },
        globalMap
      ),
      symbol: "concat",
      interactName: "listConcat",
      function: <T>(list1: Array<T>): TypeLambda<Array<T>, Array<T>> => {
        return (list2: Array<T>): Array<T> => {
          return [...list1, ...list2];
        };
      },
    }),
    lazybuilt: new Operator({
      internalName: "integrateddynamics:list_lazybuilt",
      nicknames: ["listLazybuilt"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: {
                  type: "List",
                  listType: { type: "Any", typeID: 1 },
                },
              },
            },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
        },
        globalMap
      ),
      symbol: "lazybuilt",
      interactName: "anyLazyBuilt",
      function: <T>(initial: T): TypeLambda<TypeLambda<T, T>, InfiniteList<T>> => {
        return (builder: TypeLambda<T, T>): InfiniteList<T> => {
          return new InfiniteList(initial, builder);
        };
      },
    }),
    head: new Operator({
      internalName: "integrateddynamics:list_head",
      nicknames: ["listHead"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "Any", typeID: 1 },
        },
        globalMap
      ),
      symbol: "head",
      interactName: "listHead",
      function: <T>(list: Array<T>): T => {
        if (list.length === 0) {
          throw new Error("head called on an empty list");
        }
        return list[0] as T;
      },
    }),
    tail: new Operator({
      internalName: "integrateddynamics:list_tail",
      nicknames: ["listTail"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "List", listType: { type: "Any", typeID: 1 } },
        },
        globalMap
      ),
      symbol: "tail",
      interactName: "listTail",
      function: <T>(list: Array<T>): Array<T> => {
        if (list.length === 0) {
          throw new Error("tail called on an empty list");
        }
        return list.slice(1);
      },
    }),
    listUniqPredicate: new Operator({
      internalName: "integrateddynamics:list_uniq_p",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: {
                  type: "Boolean",
                },
              },
            },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
        },
        globalMap
      ),
      symbol: "uniq_p",
      interactName: "listUniquePredicate",
      function: <T>(list: Array<T>): TypeLambda<TypeLambda<T, boolean>, Array<T>> => {
        return (predicate: Predicate): Array<T> => {
          const seen = new Set();
          return list.filter((item) => {
            const key = predicate.apply(item);
            if (seen.has(key)) {
              return false;
            } else {
              seen.add(key);
              return true;
            }
          });
        };
      },
    }),
    listUniq: new Operator({
      internalName: "integrateddynamics:list_uniq",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "List", listType: { type: "Any", typeID: 1 } },
        },
        globalMap
      ),
      symbol: "uniq",
      interactName: "listUnique",
      function: <T>(list: Array<T>): Array<T> => {
        const seen = new Set();
        return list.filter((item) => {
          if (seen.has(item)) {
            return false;
          } else {
            seen.add(item);
            return true;
          }
        });
      },
    }),
    slice: new Operator({
      internalName: "integrateddynamics:list_slice",
      nicknames: ["listSlice"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: { type: "List", listType: { type: "Any", typeID: 1 } },
            },
          },
        },
        globalMap
      ),
      symbol: "slice",
      interactName: "listSlice",
      function: async <T>(list: Array<T>): Promise<TypeLambda<Integer, Promise<TypeLambda<Integer, Promise<Array<T>>>>>> => {
        return async (start: Integer): Promise<TypeLambda<Integer, Promise<Array<T>>>> => {
          return async (end: Integer): Promise<Array<T>> => {
            if (await JavaMath.lt(start, new Integer(0)) || await JavaMath.gt(end, new Integer(list.length)) || await JavaMath.gt(start, end)) {
              throw new Error(
                `Invalid slice range: [${start.toDecimal()}, ${end.toDecimal()}) for list of length ${list.length}`
              );
            }
            return list.slice(parseInt(start.toDecimal()), parseInt(end.toDecimal()));
          };
        };
      },
    }),
    intersection: new Operator({
      internalName: "integrateddynamics:list_intersection",
      nicknames: ["listIntersection"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
        },
        globalMap
      ),
      symbol: "∩",
      interactName: "listIntersection",
      function: <T>(list1: Array<T>): TypeLambda<Array<T>, Array<T>> => {
        return (list2: Array<T>): Array<T> => {
          const set1 = new Set(list1);
          return list2.filter((item) => set1.has(item));
        };
      },
    }),
    equalsSet: new Operator({
      internalName: "integrateddynamics:list_equals_set",
      nicknames: ["listEqualsSet"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "=set=",
      interactName: "listEquals_set",
      function: <T extends IntegratedValue>(list1: Array<T>): TypeLambda<Array<T>, boolean> => {
        return (list2: Array<T>): boolean => {
          const set1 = new Set(list1);
          const set2 = new Set(list2);
          if (set1.size !== set2.size || (set1.size !== (new Set([...set1, ...set2]).size))) return false;
          return true;
        };
      },
    }),
    equalsMultiset: new Operator({
      internalName: "integrateddynamics:list_equals_multiset",
      nicknames: ["listEqualsMultiset"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "=multiset=",
      interactName: "listEquals_multiset",
      function: <T extends { equals: Function | undefined }>(list1: Array<T>): TypeLambda<Array<T>, boolean> => {
        return (list2: Array<T>): boolean => {
          const newList1 = [...list1].sort();
          const newList2 = [...list2].sort();
          if (newList1.length !== newList2.length) {
            return false;
          }
          for (let i = 0; i < newList1.length; i++) {
            if (!newList1[i] || !newList2[i]) {
              return false;
            } else if (
              "equals" in (newList1[i] as T) &&
              typeof (newList1[i] as T).equals === "function"
            ) {
              if (!((newList1[i] as T).equals as Function)(newList2[i])) {
                return false;
              }
            } else if (newList1[i] !== newList2[i]) {
              return false;
            }
          }
          return true;
        };
      },
    }),
    opaque: new Operator({
      internalName: "integrateddynamics:block_opaque",
      nicknames: ["BlockOpaque"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "opaque",
      interactName: "blockIsOpaque",
      function: (block: Block): boolean => {
        return block.isOpaque();
      },
    }),
    blockItem: new Operator({
      internalName: "integrateddynamics:block_itemstack",
      nicknames: [
        "BlockItemstack",
        "block_item",
        "blockItemstack",
        "block_itemstack",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "Item",
          },
        },
        globalMap
      ),
      symbol: "itemstack",
      interactName: "blockItemStack",
      function: (block: Block): Item => {
        return block.getItem();
      },
    }),
    blockMod: new Operator({
      internalName: "integrateddynamics:block_mod",
      nicknames: ["BlockModname", "block_mod", "blockMod", "block_modname"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "mod",
      interactName: "blockMod",
      function: (block: Block): string => {
        return block.getModName();
      },
    }),
    breakSound: new Operator({
      internalName: "integrateddynamics:block_breaksound",
      nicknames: ["BlockBreaksound", "block_break_sound", "blockBreakSound"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "break_sound",
      interactName: "blockBreakSound",
      function: (block: Block): string => {
        return block.getBreakSound();
      },
    }),
    placeSound: new Operator({
      internalName: "integrateddynamics:block_placesound",
      nicknames: ["BlockPlacesound", "blockPlaceSound", "block_place_sound"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "place_sound",
      interactName: "blockPlaceSound",
      function: (block: Block): string => {
        return block.getPlaceSound();
      },
    }),
    stepSound: new Operator({
      internalName: "integrateddynamics:block_stepsound",
      nicknames: ["BlockStepsound", "blockStepSound", "block_step_sound"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "step_sound",
      interactName: "blockStepSound",
      function: (block: Block): string => {
        return block.getStepSound();
      },
    }),
    blockIsShearable: new Operator({
      internalName: "integrateddynamics:block_isshearable",
      nicknames: ["BlockIsshearable", "block_is_shearable", "blockIsShearable"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_shearable",
      interactName: "blockIsShearable",
      function: (block: Block): boolean => {
        return block.isShearable();
      },
    }),
    plantAge: new Operator({
      internalName: "integrateddynamics:block_plantage",
      nicknames: ["BlockPlantage", "block_plant_age", "blockPlantAge"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "plant_age",
      interactName: "blockPlantAge",
      function: (block: Block): Integer => {
        return block.getPlantAge();
      },
    }),
    blockByName: new Operator({
      internalName: "integrateddynamics:block_blockbyname",
      nicknames: ["BlockByName", "block_by_name"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Block",
          },
        },
        globalMap
      ),
      symbol: "block_by_name",
      interactName: "stringBlockByName",
      function: (): never => {
        throw new Error(
          "Block by name is infeasible without a registry. This is a placeholder function."
        );
      },
    }),
    blockProperties: new Operator({
      internalName: "integrateddynamics:block_blockproperties",
      nicknames: ["BlockProperties", "block_properties"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "block_props",
      interactName: "blockProperties",
      function: (block: Block): NBT => {
        return block.getProperties();
      },
    }),
    blockWithProperties: new Operator({
      internalName: "integrateddynamics:block_blockfromproperties",
      nicknames: ["BlockWithProperties", "block_with_properties"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Block",
            },
          },
        },
        globalMap
      ),
      symbol: "block_with_props",
      interactName: "blockWithProperties",
      function: (block: Block) => {
        return (properties: NBT): Block => {
          return new Block(properties, block);
        };
      },
    }),
    blockPossibleProperties: new Operator({
      internalName: "integrateddynamics:block_blockpossibleproperties",
      nicknames: ["BlockPossibleProperties", "block_possible_properties"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "block_all_props",
      interactName: "blockPossibleProperties",
      function: (): never => {
        throw new Error(
          "Block possible properties is infeasible without a registry. This is a placeholder function."
        );
      },
    }),
    blockTag: new Operator({
      internalName: "integrateddynamics:block_tag",
      nicknames: ["BlockTag"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Block",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        globalMap
      ),
      symbol: "block_tag_names",
      interactName: "blockTags",
      function: (block: Block): string[] => {
        return block.getTagNames();
      },
    }),
    blockTagStacks: new Operator({
      internalName: "integrateddynamics:string_blocktag",
      nicknames: ["BlockTagStacks", "block_tag_stacks"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: { type: "List", listType: { type: "Block" } },
        },
        globalMap
      ),
      symbol: "block_tag_values",
      interactName: "stringBlocksByTag",
      function: (): never => {
        throw new Error(
          "Block tag values is infeasible without a registry. This is a placeholder function."
        );
      },
    }),
    size: new Operator({
      internalName: "integrateddynamics:itemstack_size",
      nicknames: ["ItemstackSize", "itemstack_size", "itemstackSize"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "size",
      interactName: "itemstackSize",
      function: (item: Item): Integer => {
        return item.getSize();
      },
    }),
    maxSize: new Operator({
      internalName: "integrateddynamics:itemstack_maxsize",
      nicknames: ["ItemstackMaxsize", "itemstack_max_size", "itemstackMaxSize"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "maxsize",
      interactName: "itemstackMaxSize",
      function: (item: Item): Integer => {
        return item.getMaxSize();
      },
    }),
    isStackable: new Operator({
      internalName: "integrateddynamics:itemstack_stackable",
      nicknames: [
        "ItemstackIsstackable",
        "itemstack_is_stackable",
        "itemstackIsStackable",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "stackable",
      interactName: "itemstackIsStackable",
      function: (item: Item): boolean => {
        return item.isStackable();
      },
    }),
    isDamageable: new Operator({
      internalName: "integrateddynamics:itemstack_damageable",
      nicknames: [
        "ItemstackIsdamageable",
        "itemstack_is_damageable",
        "itemstackIsDamageable",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "damageable",
      interactName: "itemstackIsDamageable",
      function: (item: Item): boolean => {
        return item.isDamageable();
      },
    }),
    damage: new Operator({
      internalName: "integrateddynamics:itemstack_damage",
      nicknames: ["ItemstackDamage", "itemstack_damage", "itemstackDamage"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "damage",
      interactName: "itemstackDamage",
      function: (item: Item): Integer => {
        return item.getDamage();
      },
    }),
    maxDamage: new Operator({
      internalName: "integrateddynamics:itemstack_maxdamage",
      nicknames: [
        "ItemstackMaxdamage",
        "itemstack_max_damage",
        "itemstackMaxDamage",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "max_damage",
      interactName: "itemstackMaxDamage",
      function: (item: Item): Integer => {
        return item.getMaxDamage();
      },
    }),
    enchanted: new Operator({
      internalName: "integrateddynamics:itemstack_enchanted",
      nicknames: [
        "ItemstackIsenchanted",
        "itemstack_is_enchanted",
        "itemstackIsEnchanted",
        "isEnchanted",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "enchanted",
      interactName: "itemstackIsEnchanted",
      function: (item: Item): boolean => {
        return item.isEnchanted();
      },
    }),
    enchantable: new Operator({
      internalName: "integrateddynamics:itemstack_enchantable",
      nicknames: [
        "ItemstackIsenchantable",
        "itemstack_is_enchantable",
        "itemstackIsEnchantable",
        "isEnchantable",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "enchantable",
      interactName: "itemstackIsEnchantable",
      function: (item: Item): boolean => {
        return item.isEnchantable();
      },
    }),
    repairCost: new Operator({
      internalName: "integrateddynamics:itemstack_repaircost",
      nicknames: [
        "ItemstackRepaircost",
        "itemstack_repair_cost",
        "itemstackRepairCost",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "repair_cost",
      interactName: "itemstackRepairCost",
      function: (item: Item): Integer => {
        return item.getRepairCost();
      },
    }),
    rarity: new Operator({
      internalName: "integrateddynamics:itemstack_rarity",
      nicknames: ["ItemstackRarity", "itemstack_rarity", "itemstackRarity"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "rarity",
      interactName: "itemstackRarity",
      function: (item: Item): string => {
        return item.getRarity();
      },
    }),
    strengthVsBlock: new Operator({
      internalName: "integrateddynamics:itemstack_strength",
      nicknames: [
        "ItemstackStrengthVsBlock",
        "itemstack_strength_vs_block",
        "itemstackStrengthVsBlock",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "Double",
            },
          },
        },
        globalMap
      ),
      symbol: "strength",
      interactName: "itemstackStrength",
      function: (item: Item): TypeLambda<Block, void> => {
        return (block: Block): void => {
          return item.getStrengthVsBlock(block);
        };
      },
    }),
    canHarvestBlock: new Operator({
      internalName: "integrateddynamics:itemstack_canharvest",
      nicknames: [
        "ItemstackCanHarvestBlock",
        "itemstack_can_harvest_block",
        "itemstackCanHarvestBlock",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "can_harvest",
      interactName: "itemstackCanHarvest",
      function: (item: Item): TypeLambda<Block, void> => {
        return (): void => {
          return item.canHarvestBlock();
        };
      },
    }),
    itemBlock: new Operator({
      internalName: "integrateddynamics:itemstack_block",
      nicknames: ["ItemstackBlock", "itemstack_block", "itemstackBlock"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Block",
          },
        },
        globalMap
      ),
      symbol: "block",
      interactName: "itemstackBlock",
      function: (item: Item): Block => {
        return new Block(new NBT({}), item.getBlock());
      },
    }),
    isFluidstack: new Operator({
      internalName: "integrateddynamics:itemstack_isfluidstack",
      nicknames: [
        "ItemstackIsfluidstack",
        "itemstack_is_fluidstack",
        "itemstackIsFluidstack",
        "itemHasFluid",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_fluidstack",
      interactName: "itemstackIsFluidStack",
      function: (item: Item): boolean => {
        return item.getFluid() !== null;
      },
    }),
    itemFluid: new Operator({
      internalName: "integrateddynamics:itemstack_fluidstack",
      nicknames: [
        "ItemstackFluidstack",
        "itemstack_fluidstack",
        "itemstackFluidstack",
        "itemFluidstack",
        "item_fluidstack",
        "itemFluid",
        "item_fluid",
        "itemstack_fluid",
        "itemstackFluid",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Fluid",
          },
        },
        globalMap
      ),
      symbol: "fluidstack",
      interactName: "itemstackFluidStack",
      function: (item: Item): Fluid => {
        return item.getFluid();
      },
    }),
    fluidCapacity: new Operator({
      internalName: "integrateddynamics:itemstack_fluidstackcapacity",
      nicknames: [
        "ItemstackFluidstackcapacity",
        "itemstack_fluidstack_capacity",
        "itemstackFluidstackCapacity",
        "item_fluid_capacity",
        "itemFluidCapacity",
        "item_fluidstack_capacity",
        "itemFluidstackCapacity",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "fluidstack_capacity",
      interactName: "itemstackFluidCapacity",
      function: (item: Item): Integer => {
        return item.getFluidCapacity();
      },
    }),
    "=NBT=": new Operator({
      internalName: "integrateddynamics:itemstack_isnbtequal",
      nicknames: [
        "ItemstackIsdataequal",
        "itemstack_is_dataequal",
        "itemstackIsDataequal",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "=NBT=",
      interactName: "itemstackIsNbtEqual",
      function: (item1: Item): TypeLambda<Item, Boolean> => {
        return (item2: Item): boolean => {
          return item1.getNBT().equals(item2.getNBT());
        };
      },
    }),
    "=NoNBT=": new Operator({
      internalName: "integrateddynamics:itemstack_isitemequalnonbt",
      nicknames: [
        "ItemstackIsitemequalnodata",
        "itemstack_is_itemequalnodata",
        "itemstackIsItemequalnodata",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "=NoNBT=",
      interactName: "itemstackIsEqualNonNbt",
      function: (item1: Item): TypeLambda<Item, boolean> => {
        return (item2: Item): boolean => {
          return (
            item1.getUname() === item2.getUname() &&
            item1.getSize() === item2.getSize()
          );
        };
      },
    }),
    rawItemEquals: new Operator({
      internalName: "integrateddynamics:itemstack_israwitemequal",
      nicknames: [
        "ItemstackIsrawitemequal",
        "itemstack_is_rawitemequal",
        "itemstackIsRawitemequal",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "=Raw=",
      interactName: "itemstackIsEqualRaw",
      function: (item1: Item): TypeLambda<Item, boolean> => {
        return (item2: Item) => {
          return item1.getUname() === item2.getUname();
        };
      },
    }),
    itemMod: new Operator({
      internalName: "integrateddynamics:itemstack_mod",
      nicknames: ["ItemstackModname", "item_mod", "itemModname"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "mod",
      interactName: "itemstackMod",
      function: (item: Item): string => {
        return item.getModName();
      },
    }),
    fuelBurnTime: new Operator({
      internalName: "integrateddynamics:itemstack_burntime",
      nicknames: [
        "ItemstackFuelburntime",
        "item_fuel_burn_time",
        "itemFuelBurnTime",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "burn_time",
      interactName: "itemstackBurnTime",
      function: (item: Item): Integer => {
        return item.getFuelBurnTime();
      },
    }),
    isFuel: new Operator({
      internalName: "integrateddynamics:itemstack_canburn",
      nicknames: [
        "ItemstackCanburn",
        "item_can_burn",
        "itemCanBurn",
        "item_is_fuel",
        "itemIsFuel",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "can_burn",
      interactName: "itemstackCanBurn",
      function: (item: Item): boolean => {
        return item.isFuel();
      },
    }),
    itemTagNames: new Operator({
      internalName: "integrateddynamics:itemstack_tag",
      nicknames: [
        "ItemstackTag",
        "itemstack_tag_names",
        "itemstackTagNames",
        "item_tag_names",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        globalMap
      ),
      symbol: "item_tag_names",
      interactName: "itemstackTags",
      function: (item: Item): string[] => {
        return item.getTagNames();
      },
    }),
    itemTagValues: new Operator({
      internalName: "integrateddynamics:string_tag",
      nicknames: [
        "ItemstackTagStacks",
        "itemstack_tag_values",
        "itemstackTagValues",
        "item_tag_values",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        globalMap
      ),
      symbol: "item_tag_values",
      interactName: "stringItemsByTag",
      function: (): never => {
        throw new Error(
          "Item tag values is infeasible without a registry. This is a placeholder function."
        );
      },
    }),
    itemWithSize: new Operator({
      internalName: "integrateddynamics:itemstack_withsize",
      nicknames: [
        "ItemstackWithsize",
        "itemstack_with_size",
        "itemstackWithSize",
        "item_with_size",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Item",
            },
          },
        },
        globalMap
      ),
      symbol: "with_size",
      interactName: "itemstackWithSize",
      function: (item: Item): TypeLambda<Integer, Item> => {
        return (size: Integer): Item => {
          return new Item(new NBT({ size }), item);
        };
      },
    }),
    isFeContainer: new Operator({
      internalName: "integrateddynamics:itemstack_isfecontainer",
      nicknames: [
        "ItemstackIsfecontainer",
        "itemstack_is_fe_container",
        "itemstackIsFecontainer",
        "item_is_fe_container",
        "itemIsFecontainer",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_fe_container",
      interactName: "itemstackIsFeContainer",
      function: (item: Item): boolean => {
        return item.isFeContainer();
      },
    }),
    storedFe: new Operator({
      internalName: "integrateddynamics:itemstack_storedfe",
      nicknames: [
        "ItemstackStoredfe",
        "itemstack_stored_fe",
        "itemstackStoredFe",
        "item_stored_fe",
        "itemStoredFe",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "stored_fe",
      interactName: "itemstackFeStored",
      function: (item: Item): Integer => {
        return item.getFeStored();
      },
    }),
    feCapacity: new Operator({
      internalName: "integrateddynamics:itemstack_fecapacity",
      nicknames: [
        "ItemstackFecapacity",
        "itemstack_fe_capacity",
        "itemstackFeCapacity",
        "item_fe_capacity",
        "itemFeCapacity",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "capacity_fe",
      interactName: "itemstackFeCapacity",
      function: (item: Item): Integer => {
        return item.getFeCapacity();
      },
    }),
    hasInventory: new Operator({
      internalName: "integrateddynamics:itemstack_hasinventory",
      nicknames: [
        "ItemstackHasinventory",
        "itemstack_has_inventory",
        "itemstackHasInventory",
        "item_has_inventory",
        "itemHasInventory",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "has_inventory",
      interactName: "itemstackHasInventory",
      function: (item: Item): boolean => {
        return item.getInventory() !== null;
      },
    }),
    inventorySize: new Operator({
      internalName: "integrateddynamics:itemstack_inventorysize",
      nicknames: [
        "ItemstackInventorysize",
        "itemstack_inventory_size",
        "itemstackInventorySize",
        "item_inventory_size",
        "itemInventorySize",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "inventory_size",
      interactName: "itemstackInventorySize",
      function: (item: Item): Integer => {
        return new Integer(item.getInventory()?.length || 0);
      },
    }),
    itemInventory: new Operator({
      internalName: "integrateddynamics:itemstack_inventory",
      nicknames: [
        "ItemstackInventory",
        "itemstack_inventory",
        "itemstackInventory",
        "item_inventory",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        globalMap
      ),
      symbol: "inventory",
      interactName: "itemstackInventory",
      function: (item: Item): Array<IntegratedValue> => {
        return item.getInventory();
      },
    }),
    itemByName: new Operator({
      internalName: "integrateddynamics:itemstack_itembyname",
      nicknames: [
        "ItemstackByName",
        "itemstack_by_name",
        "itemstackByName",
        "item_by_name",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Item",
          },
        },
        globalMap
      ),
      symbol: "item_by_name",
      interactName: "stringItemByName",
      function: (): never => {
        throw new Error(
          "Item by name is infeasible without a registry. This is a placeholder function."
        );
      },
    }),
    itemListCount: new Operator({
      internalName: "integrateddynamics:itemstack_itemlistcount",
      nicknames: [
        "ItemstackListCount",
        "itemstack_list_count",
        "itemstackListCount",
        "item_list_count",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "List",
            listType: { type: "Item" },
          },
          to: {
            type: "Function",
            from: { type: "Item" },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "item_list_count",
      interactName: "listItemListCount",
      function: (items: Array<Item>): TypeLambda<Item, Integer> => {
        return (item: Item): Integer => {
          return new Integer(items.filter((i) => {
            try {
              return i.equals(item);
            } catch (e) {
              return false;
            }
          }).length);
        };
      },
    }),
    itemNBT: new Operator({
      internalName: "integrateddynamics:itemstack_nbt",
      nicknames: [
        "ItemstackData",
        "itemstack_data",
        "itemstackData",
        "item_data",
        "itemData",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT()",
      interactName: "itemstackNbt",
      function: (item: Item): NBT => {
        return item.getNBT();
      },
    }),
    hasNBT: new Operator({
      internalName: "integrateddynamics:itemstack_hasnbt",
      nicknames: [
        "ItemstackHasdata",
        "itemstack_has_data",
        "itemstackHasData",
        "item_has_data",
        "itemHasData",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "has_nbt",
      interactName: "itemstackHasNbt",
      function: (item: Item): boolean => {
        return item.getNBT() !== null && item.getNBT() !== undefined;
      },
    }),
    itemNBTKeys: new Operator({
      internalName: "integrateddynamics:itemstack_datakeys",
      nicknames: [
        "ItemstackDataKeys",
        "itemstack_data_keys",
        "itemstackDataKeys",
        "item_data_keys",
        "itemDataKeys",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        globalMap
      ),
      symbol: "data_keys",
      interactName: "itemstackDataKeys",
      function: (item: Item): Array<string> => {
        const nbt = item.getNBT();
        if (!nbt) {
          return [];
        }
        return Object.keys(nbt).filter(
          (key) => nbt[key] !== undefined && nbt[key] !== null
        );
      },
    }),
    itemNBTValue: new Operator({
      internalName: "integrateddynamics:itemstack_datavalue",
      nicknames: [
        "ItemstackDataValue",
        "itemstack_data_value",
        "itemstackDataValue",
        "item_data_value",
        "itemDataValue",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "NBT"
            },
          },
        },
        globalMap
      ),
      symbol: "data_value",
      interactName: "itemstackDataValue",
      function: (item: Item): TypeLambda<string, NBT> => {
        return (key: string): NBT => {
          const nbt = item.getNBT();
          if (!nbt || !nbt.hasOwnProperty(key)) {
            return new NBT(null);
          }
          return nbt[key];
        };
      },
    }),
    itemWithNBT: new Operator({
      internalName: "integrateddynamics:itemstack_withdata",
      nicknames: [
        "ItemstackWithData",
        "itemstack_with_data",
        "itemstackWithData",
        "item_with_data",
        "itemWithData",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT"
              },
              to: {
                type: "Item"
              }
            },
          },
        },
        globalMap
      ),
      symbol: "with_data",
      interactName: "itemstackWithData",
      function: (item: Item): TypeLambda<string, TypeLambda<NBT, Item>> => {
        return (key: string): TypeLambda<NBT, Item> => {
          return (value: NBT): Item => {
            const nbt = item.getNBT() || {};
            nbt[key] = value;
            return new Item(new NBT({ nbt }), item);
          };
        };
      },
    }),
    itemTooltip: new Operator({
      internalName: "integrateddynamics:itemstack_tooltip",
      nicknames: [
        "ItemstackTooltip",
        "itemstack_tooltip",
        "itemstackTooltip",
        "item_tooltip",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        globalMap
      ),
      symbol: "tooltip",
      interactName: "itemstackTooltip",
      function: (item: Item): Array<string> => {
        return item.getTooltip();
      },
    }),
    itemEntityTooltip: new Operator({
      internalName: "integrateddynamics:entity_entityitemtooltip",
      nicknames: [
        "ItemstackEntityTooltip",
        "itemstack_entity_tooltip",
        "itemstackEntityTooltip",
        "item_entity_tooltip",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Function",
            from: {
              type: "Item",
            },
            to: { type: "List", listType: { type: "String" } },
          },
        },
        globalMap
      ),
      symbol: "entity_item_tooltip",
      interactName: "entityEntityItemTooltip",
      function: (): TypeLambda<Item, Array<string>> => {
        return (item: Item): Array<string> => {
          console.warn(
            "Entity item tooltip is not fully supported. Returning item tooltip only."
          );
          return item.getTooltip();
        };
      },
    }),
    isMob: new Operator({
      internalName: "integrateddynamics:entity_ismob",
      nicknames: ["EntityIsmob", "entity_is_mob", "entityIsMob"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_mob",
      interactName: "entityIsMob",
      function: (entity: Entity): boolean => {
        return entity.getMob();
      },
    }),
    isAnimal: new Operator({
      internalName: "integrateddynamics:entity_isanimal",
      nicknames: ["EntityIsanimal", "entity_is_animal", "entityIsAnimal"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_animal",
      interactName: "entityIsAnimal",
      function: (entity: Entity): boolean => {
        return entity.isAnimal();
      },
    }),
    isItem: new Operator({
      internalName: "integrateddynamics:entity_isitem",
      nicknames: ["EntityIsitem", "entity_is_item", "entityIsItem"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_item",
      interactName: "entityIsItem",
      function: (entity: Entity): boolean => {
        return entity.isItem();
      },
    }),
    isPlayer: new Operator({
      internalName: "integrateddynamics:entity_isplayer",
      nicknames: ["EntityIsplayer", "entity_is_player", "entityIsPlayer"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_player",
      interactName: "entityIsPlayer",
      function: (entity: Entity): boolean => {
        return entity.isPlayer();
      },
    }),
    isMinecart: new Operator({
      internalName: "integrateddynamics:entity_isminecart",
      nicknames: ["EntityIsminecart", "entity_is_minecart", "entityIsMinecart"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_minecart",
      interactName: "entityIsMinecart",
      function: (entity: Entity): boolean => {
        return entity.isMinecart();
      },
    }),
    entityItem: new Operator({
      internalName: "integrateddynamics:entity_item",
      nicknames: [
        "EntityItemstack",
        "entity_itemstack",
        "entityItemstack",
        "entity_item_stack",
        "entityItemStack",
        "entity_item",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Item",
          },
        },
        globalMap
      ),
      symbol: "item",
      interactName: "entityItem",
      function: (entity: Entity): Item => {
        if (entity.isItem()) {
          return entity.getItem();
        } else {
          throw new Error("Entity is not an item entity.");
        }
      },
    }),
    entityHealth: new Operator({
      internalName: "integrateddynamics:entity_health",
      nicknames: [
        "EntityHealth",
        "entity_health",
        "entity_health_value",
        "entityHealthValue",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "health",
      interactName: "entityHealth",
      function: (entity: Entity): Double => {
        return entity.getHealth();
      },
    }),
    entityWidth: new Operator({
      internalName: "integrateddynamics:entity_width",
      nicknames: ["EntityWidth", "entity_width"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "width",
      interactName: "entityWidth",
      function: (entity: Entity): Double => {
        return entity.getWidth();
      },
    }),
    entityHeight: new Operator({
      internalName: "integrateddynamics:entity_height",
      nicknames: ["EntityHeight", "entity_height"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "height",
      interactName: "entityHeight",
      function: (entity: Entity): Double => {
        return entity.getHeight();
      },
    }),
    isBurning: new Operator({
      internalName: "integrateddynamics:entity_isburning",
      nicknames: ["EntityIsburning", "entity_is_burning", "entityIsBurning"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_burning",
      interactName: "entityEntityIsBurning",
      function: (entity: Entity): boolean => {
        return entity.isBurning();
      },
    }),
    isWet: new Operator({
      internalName: "integrateddynamics:entity_iswet",
      nicknames: ["EntityIswet", "entity_is_wet", "entityIsWet"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_wet",
      interactName: "entityIsWet",
      function: (entity: Entity): boolean => {
        return entity.isWet();
      },
    }),
    isCrouching: new Operator({
      internalName: "integrateddynamics:entity_iscrouching",
      nicknames: [
        "EntityIscrouching",
        "entity_is_crouching",
        "entityIsCrouching",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_crouching",
      interactName: "entityIsCrouching",
      function: (entity: Entity): boolean => {
        return entity.isCrouching();
      },
    }),
    isEating: new Operator({
      internalName: "integrateddynamics:entity_iseating",
      nicknames: ["EntityIseating", "entity_is_eating", "entityIsEating"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_eating",
      interactName: "entityIsEating",
      function: (entity: Entity): boolean => {
        return entity.isEating();
      },
    }),
    entityArmor: new Operator({
      internalName: "integrateddynamics:entity_armorinventory",
      nicknames: [
        "EntityArmorinventory",
        "entity_armor_inventory",
        "entityArmorInventory",
        "entity_armor",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        globalMap
      ),
      symbol: "armor_inventory",
      interactName: "entityArmorInventory",
      function: (entity: Entity): Array<Item> => {
        return entity.getArmorInventory();
      },
    }),
    entityInventoryContents: new Operator({
      internalName: "integrateddynamics:entity_inventory",
      nicknames: [
        "EntityInventory",
        "entity_inventory",
        "entityInventory",
        "entity_inventory_contents",
        "entityInventoryContents",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        globalMap
      ),
      symbol: "inventory",
      interactName: "entityInventory",
      function: (entity: Entity): Array<Item> => {
        return entity.getInventory();
      },
    }),
    entityModName: new Operator({
      internalName: "integrateddynamics:entity_mod",
      nicknames: ["EntityModname", "entity_mod_name", "entityModName"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "mod",
      interactName: "entityMod",
      function: (entity: Entity): string => {
        return entity.getModName();
      },
    }),
    playerTargetBlock: new Operator({
      internalName: "integrateddynamics:entity_targetblock",
      nicknames: ["PlayerTargetblock", "player_target_block"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Block",
          },
        },
        globalMap
      ),
      symbol: "target_block",
      interactName: "entityTargetBlock",
      function: (entity: Entity): Block => {
        return entity.getTargetBlock();
      },
    }),
    playerTargetEntity: new Operator({
      internalName: "integrateddynamics:entity_targetentity",
      nicknames: ["PlayerTargetentity", "player_target_entity"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Entity",
          },
        },
        globalMap
      ),
      symbol: "target_entity",
      interactName: "entityTargetEntity",
      function: (entity: Entity): Entity => {
        return entity.getTargetEntity();
      },
    }),
    playerHasGuiOpen: new Operator({
      internalName: "integrateddynamics:entity_hasguiopen",
      nicknames: ["PlayerHasguiopen", "player_has_gui_open"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "has_gui_open",
      interactName: "entityHasGuiOpen",
      function: (entity: Entity): boolean => {
        return entity.hasGuiOpen();
      },
    }),
    heldItemMain: new Operator({
      internalName: "integrateddynamics:entity_helditem",
      nicknames: [
        "EntityHelditemMain",
        "entity_held_item_main",
        "entityHeldItemMain",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Item",
          },
        },
        globalMap
      ),
      symbol: "held_item_1",
      interactName: "entityHeldItem",
      function: (entity: Entity): Item => {
        return entity.getHeldItemMain();
      },
    }),
    heldItemOff: new Operator({
      internalName: "integrateddynamics:entity_helditemoffhand",
      nicknames: [
        "EntityHelditemOff",
        "entity_held_item_off",
        "entityHeldItemOff",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Item",
          },
        },
        globalMap
      ),
      symbol: "held_item_2",
      interactName: "entityHeldItemOffHand",
      function: (entity: Entity): Item => {
        return entity.getHeldItemOffHand();
      },
    }),
    entitysMounted: new Operator({
      internalName: "integrateddynamics:entity_mounted",
      nicknames: ["EntityMounted", "entitys_mounted"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: { type: "List", listType: { type: "Entity" } },
        },
        globalMap
      ),
      symbol: "mounted",
      interactName: "entityMounted",
      function: (entity: Entity): boolean => {
        return entity.isEntityMounted();
      },
    }),
    itemFrameContents: new Operator({
      internalName: "integrateddynamics:entity_itemframeconte)nts",
      nicknames: [
        "ItemframeContents",
        "itemframe_contents",
        "itemframeContents",
        "item_frame_contents",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Item",
          },
        },
        globalMap
      ),
      symbol: "itemframe_contents",
      interactName: "entityItemFrameContents",
      function: (entity: Entity): Item => {
        if (entity.isItemFrame()) {
          return entity.getItemFrameContents();
        } else {
          throw new Error("Entity is not an item frame.");
        }
      },
    }),
    itemFrameRotation: new Operator({
      internalName: "integrateddynamics:entity_itemframerotation",
      nicknames: [
        "ItemframeRotation",
        "itemframe_rotation",
        "itemframeRotation",
        "item_frame_rotation",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "itemframe_rotation",
      interactName: "entityItemFrameRotation",
      function: (entity: Entity): Integer => {
        if (entity.isItemFrame()) {
          return entity.getItemFrameRotation();
        } else {
          throw new Error("Entity is not an item frame.");
        }
      },
    }),
    entityHurtSound: new Operator({
      internalName: "integrateddynamics:entity_hurtsound",
      nicknames: ["EntityHurtsound", "entity_hurt_sound"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "hurtsound",
      interactName: "entityHurtSound",
      function: (entity: Entity): string => {
        return entity.getHurtSound();
      },
    }),
    entityDeathSound: new Operator({
      internalName: "integrateddynamics:entity_deathsound",
      nicknames: ["EntityDeathsound", "entity_death_sound"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "deathsound",
      interactName: "entityDeathSound",
      function: (entity: Entity): string => {
        return entity.getDeathSound();
      },
    }),
    entityAge: new Operator({
      internalName: "integrateddynamics:entity_age",
      nicknames: ["EntityAge", "entity_age"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "age",
      interactName: "entityAge",
      function: (entity: Entity): Integer => {
        return entity.getAge();
      },
    }),
    isChild: new Operator({
      internalName: "integrateddynamics:entity_ischild",
      nicknames: ["EntityIschild", "entity_is_child", "entityIsChild"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_child",
      interactName: "entityIsChild",
      function: (entity: Entity): boolean => {
        return entity.isChild();
      },
    }),
    canBreed: new Operator({
      internalName: "integrateddynamics:entity_canbreed",
      nicknames: ["EntityCanbreed", "entity_can_breed", "entityCanBreed"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "canbreed",
      interactName: "entityCanBreed",
      function: (entity: Entity): boolean => {
        return entity.canBreed();
      },
    }),
    isInLove: new Operator({
      internalName: "integrateddynamics:entity_isinlove",
      nicknames: ["EntityIsinlove", "entity_is_in_love", "entityIsInLove"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_in_love",
      interactName: "entityIsInLove",
      function: (entity: Entity): boolean => {
        return entity.isInLove();
      },
    }),
    canBreedWith: new Operator({
      internalName: "integrateddynamics:entity_canbreedwith",
      nicknames: [
        "EntityCanbreedwith",
        "entity_can_breed_with",
        "entityCanBreedWith",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "can_breed_with",
      interactName: "entityCanBreedWith",
      function: (entity1: Entity): TypeLambda<Entity, boolean> => {
        return (entity2: Entity): boolean => {
          return entity1.getBreadableList().includes(entity2.getUname());
        }
      },
    }),
    entityIsShearable: new Operator({
      internalName: "integrateddynamics:entity_isshearable",
      nicknames: [
        "EntityIsshearable",
        "entity_is_shearable",
        "entityIsShearable",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "is_shearable",
      interactName: "entityIsShearable",
      function: (entity: Entity): boolean => {
        return entity.isShearable();
      },
    }),
    entityNBT: new Operator({
      internalName: "integrateddynamics:entity_nbt",
      nicknames: ["EntityNbt", "entity_nbt"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT()",
      interactName: "entityNbt",
      function: (entity: Entity): NBT => {
        return entity.getNBT();
      },
    }),
    entityType: new Operator({
      internalName: "integrateddynamics:entity_entitytype",
      nicknames: ["EntityType", "entity_type"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "entity_type",
      interactName: "entityType",
      function: (entity: Entity): string => {
        return entity.getEntityType();
      },
    }),
    entityItemList: new Operator({
      internalName: "integrateddynamics:entity_entityitems",
      nicknames: [
        "EntityItems",
        "entity_items",
        "entityItems",
        "entity_item_list",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        globalMap
      ),
      symbol: "entity_items",
      interactName: "entityItems",
      function: (entity: Entity): Array<Item> => {
        return entity.getItemList();
      },
    }),
    entityFluids: new Operator({
      internalName: "integrateddynamics:entity_entityfluids",
      nicknames: ["EntityFluids", "entity_fluids"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: { type: "List", listType: { type: "Fluid" } },
        },
        globalMap
      ),
      symbol: "entity_fluids",
      interactName: "entityFluids",
      function: (entity: Entity): Array<Fluid> => {
        return entity.getFluids();
      },
    }),
    entityEnergyStored: new Operator({
      internalName: "integrateddynamics:entity_entityenergystored",
      nicknames: ["EntityEnergyStored", "entity_energy_stored"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "entity_stored_fe",
      interactName: "entityEnergy",
      function: (entity: Entity): Integer => {
        return entity.getEnergyStored();
      },
    }),
    entityEnergyCapacity: new Operator({
      internalName: "integrateddynamics:entity_entityenergycapacity",
      nicknames: ["EntityEnergyCapacity", "entity_energy_capacity"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "entity_capacity_fe",
      interactName: "entityEnergyCapacity",
      function: (entity: Entity): Integer => {
        return entity.getEnergyCapacity();
      },
    }),
    fluidAmount: new Operator({
      internalName: "integrateddynamics:fluidstack_amount",
      nicknames: [
        "FluidstackAmount",
        "fluidstackAmount",
        "fluid_stack_amount",
        "fluidStackAmount",
        "fluid_stack_amount",
        "fluid_amount",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "amount",
      interactName: "fluidstackAmount",
      function: (fluid: Fluid): Integer => {
        return fluid.getAmount();
      },
    }),
    fluidBlock: new Operator({
      internalName: "integrateddynamics:fluidstack_block",
      nicknames: [
        "FluidstackBlock",
        "fluidstackBlock",
        "fluid_stack_block",
        "fluidStackBlock",
        "fluid_stack_block",
        "fluid_block",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Block",
          },
        },
        globalMap
      ),
      symbol: "block",
      interactName: "fluidstackBlock",
      function: (fluid: Fluid): Block => {
        return fluid.getBlock();
      },
    }),
    fluidLightLevel: new Operator({
      internalName: "integrateddynamics:fluidstack_light_level",
      nicknames: [
        "FluidstackLightLevel",
        "fluidstackLightLevel",
        "fluid_stack_light_level",
        "fluidStackLightLevel",
        "fluid_stack_light_level",
        "fluid_light_level",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "light_level",
      interactName: "fluidstackLightLevel",
      function: (fluid: Fluid): Integer => {
        return fluid.getLightLevel();
      },
    }),
    fluidDensity: new Operator({
      internalName: "integrateddynamics:fluidstack_density",
      nicknames: [
        "FluidstackDensity",
        "fluidstackDensity",
        "fluid_stack_density",
        "fluidStackDensity",
        "fluid_stack_density",
        "fluid_density",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "density",
      interactName: "fluidstackDensity",
      function: (fluid: Fluid): Integer => {
        return fluid.getDensity();
      },
    }),
    fluidTemperature: new Operator({
      internalName: "integrateddynamics:fluidstack_temperature",
      nicknames: [
        "FluidstackTemperature",
        "fluidstackTemperature",
        "fluid_stack_temperature",
        "fluidStackTemperature",
        "fluid_stack_temperature",
        "fluid_temperature",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "temperature",
      interactName: "fluidstackTemperature",
      function: (fluid: Fluid): Integer => {
        return fluid.getTemperature();
      },
    }),
    fluidViscosity: new Operator({
      internalName: "integrateddynamics:fluidstack_viscosity",
      nicknames: [
        "FluidstackViscosity",
        "fluidstackViscosity",
        "fluid_stack_viscosity",
        "fluidStackViscosity",
        "fluid_stack_viscosity",
        "fluid_viscosity",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "viscosity",
      interactName: "fluidstackViscosity",
      function: (fluid: Fluid): Integer => {
        return fluid.getViscosity();
      },
    }),
    isLighterThanAir: new Operator({
      internalName: "integrateddynamics:fluidstack_lighter_than_air",
      nicknames: [
        "FluidstackIsLighterThanAir",
        "fluidstackIsLighterThanAir",
        "fluid_stack_is_lighter_than_air",
        "fluidStackIsLighterThanAir",
        "fluid_stack_is_lighter_than_air",
        "fluid_is_lighter_than_air",
        "fluidIsLighterThanAir",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "lighter_than_air",
      interactName: "fluidstackIsLighterThanAir",
      function: (fluid: Fluid): boolean => {
        return fluid.getLighterThanAir();
      },
    }),
    fluidRarity: new Operator({
      internalName: "integrateddynamics:fluidstack_rarity",
      nicknames: [
        "FluidstackRarity",
        "fluidstackRarity",
        "fluid_stack_rarity",
        "fluidStackRarity",
        "fluid_stack_rarity",
        "fluid_rarity",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "rarity",
      interactName: "fluidstackRarity",
      function: (fluid: Fluid): string => {
        return fluid.getRarity();
      },
    }),
    fluidSoundBucketEmpty: new Operator({
      internalName: "integrateddynamics:fluidstack_sound_bucket_empty",
      nicknames: [
        "FluidstackSoundBucketEmpty",
        "fluidstackSoundBucketEmpty",
        "fluid_stack_sound_bucket_empty",
        "fluidStackSoundBucketEmpty",
        "fluid_stack_sound_bucket_empty",
        "fluid_sound_bucket_empty",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "sound_bucket_empty",
      interactName: "fluidstackBucketEmptySound",
      function: (fluid: Fluid): string => {
        return fluid.getBucketEmptySound();
      },
    }),
    fluidSoundFluidVaporize: new Operator({
      internalName: "integrateddynamics:fluidstack_sound_fluid_vaporize",
      nicknames: [
        "FluidstackSoundFluidVaporize",
        "fluidstackSoundFluidVaporize",
        "fluid_stack_sound_fluid_vaporize",
        "fluidStackSoundFluidVaporize",
        "fluid_stack_sound_fluid_vaporize",
        "fluid_sound_fluid_vaporize",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "sound_fluid_vaporize",
      interactName: "fluidstackFluidVaporizeSound",
      function: (fluid: Fluid): string => {
        return fluid.getFluidVaporizeSound();
      },
    }),
    fluidSoundBucketFill: new Operator({
      internalName: "integrateddynamics:fluidstack_sound_bucket_fill",
      nicknames: [
        "FluidstackSoundBucketFill",
        "fluidstackSoundBucketFill",
        "fluid_stack_sound_bucket_fill",
        "fluidStackSoundBucketFill",
        "fluid_stack_sound_bucket_fill",
        "fluid_sound_bucket_fill",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "sound_bucket_fill",
      interactName: "fluidstackBucketFillSound",
      function: (fluid: Fluid): string => {
        return fluid.getBucketFillSound();
      },
    }),
    fluidBucket: new Operator({
      internalName: "integrateddynamics:fluidstack_bucket",
      nicknames: [
        "FluidstackBucket",
        "fluidstackBucket",
        "fluid_stack_bucket",
        "fluidStackBucket",
        "fluid_stack_bucket",
        "fluid_bucket",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Item",
          },
        },
        globalMap
      ),
      symbol: "bucket",
      interactName: "fluidstackBucket",
      function: (fluid: Fluid): Item => {
        return fluid.getBucket();
      },
    }),
    rawFluidEquals: new Operator({
      internalName: "integrateddynamics:fluidstack_israwfluidequal",
      nicknames: [
        "FluidstackIsrawfluidequal",
        "fluidstackIsrawfluidequal",
        "fluid_stack_israwfluidequal",
        "fluidStackIsrawfluidequal",
        "fluid_stack_israwfluidequal",
        "fluid_israwfluidequal",
        "isRawFluidEqual",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "=Raw=",
      interactName: "fluidstackIsRawEqual",
      function: (fluid1: Fluid): TypeLambda<Fluid, boolean> => {
        return (fluid2: Fluid): boolean => {
          return (
            fluid1
              .getUname()
              .replace(new RegExp("\\s\\d+$"), "")
              .toLowerCase() ===
            fluid2.getUname().replace(new RegExp("\\s\\d+$"), "").toLowerCase()
          );
        };
      },
    }),
    fluidModName: new Operator({
      internalName: "integrateddynamics:fluidstack_mod",
      nicknames: [
        "FluidstackModname",
        "fluidstackModname",
        "fluid_stack_modname",
        "fluidStackModname",
        "fluid_stack_modname",
        "fluid_mod_name",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "mod",
      interactName: "fluidstackMod",
      function: (fluid: Fluid): string => {
        return fluid.getModName();
      },
    }),
    fluidNBT: new Operator({
      internalName: "integrateddynamics:fluidstack_nbt",
      nicknames: [
        "FluidstackData",
        "fluidstackData",
        "fluid_stack_data",
        "fluidStackData",
        "fluid_stack_data",
        "fluid_data",
        "fluidData",
        "fluid_NBT",
        "fluidStackNBT",
        "fluid_stack_NBT",
        "fluidstack_NBT",
        "fluidstackNBT",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT()",
      interactName: "fluidstackNbt",
      function: (fluid: Fluid): NBT => {
        return fluid.getNBT();
      },
    }),
    fluidWithAmount: new Operator({
      internalName: "integrateddynamics:fluidstack_with_amount",
      nicknames: [
        "FluidstackWithAmount",
        "fluidstackWithAmount",
        "fluid_stack_with_amount",
        "fluidStackWithAmount",
        "fluid_stack_with_amount",
        "fluid_with_amount",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Fluid",
            },
          },
        },
        globalMap
      ),
      symbol: "with_amount",
      interactName: "fluidstackWithAmount",
      function: (fluid: Fluid): TypeLambda<Integer, Fluid> => {
        return (amount: Integer): Fluid => {
          return new Fluid(new NBT({ amount }), fluid);
        };
      },
    }),
    fluidNBTKeys: new Operator({
      internalName: "integrateddynamics:fluidstack_datakeys",
      nicknames: [
        "FluidstackDataKeys",
        "fluidstackDataKeys",
        "fluid_stack_data_keys",
        "fluidStackDataKeys",
        "fluid_stack_data_keys",
        "fluid_data_keys",
        "fluidDataKeys",
        "fluid_NBT_keys",
        "fluidStackNBTKeys",
        "fluid_stack_NBT_keys",
        "fluidstack_NBT_keys",
        "fluidstackNBTKeys",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        globalMap
      ),
      symbol: "data_keys",
      interactName: "fluidstackDataKeys",
      function: (fluid: Fluid): Array<string> => {
        const nbt = fluid.getNBT();
        if (!nbt) {
          return [];
        }
        return Object.keys(nbt).filter(
          (key) => nbt[key] !== undefined && nbt[key] !== null
        );
      },
    }),
    fluidNBTValue: new Operator({
      internalName: "integrateddynamics:fluidstack_datavalue",
      nicknames: [
        "FluidstackDataValue",
        "fluidstackDataValue",
        "fluid_stack_data_value",
        "fluidStackDataValue",
        "fluid_stack_data_value",
        "fluid_data_value",
        "fluidDataValue",
        "fluid_NBT_value",
        "fluidStackNBTValue",
        "fluid_stack_NBT_value",
        "fluidstack_NBT_value",
        "fluidstackNBTValue",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "NBT",
            },
          },
        },
        globalMap
      ),
      symbol: "data_value",
      interactName: "fluidstackDataValue",
      function: (fluid: Fluid): TypeLambda<string, NBT> => {
        return (key: string): NBT => {
          const nbt = fluid.getNBT();
          if (!nbt || !nbt.hasOwnProperty(key)) {
            return new NBT(null);
          }
          return nbt[key];
        };
      },
    }),
    fluidWithNBT: new Operator({
      internalName: "integrateddynamics:itemstack_withdata",
      nicknames: [
        "FluidstackWithData",
        "fluidstackWithData",
        "fluid_stack_with_data",
        "fluidStackWithData",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Function",
            from: {
              type: "String"
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                type: "Fluid",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "with_data",
      interactName: "fluidstackWithData",
      function: (fluid: Fluid): TypeLambda<string, TypeLambda<NBT, Fluid>> => {
        return (key: string): TypeLambda<NBT, Fluid> => {
          return (value: NBT): Fluid => {
            const nbt = fluid.getNBT() || {};
            nbt[key] = value;
            return new Fluid(new NBT({ nbt }), fluid);
          };
        };
      },
    }),
    fluidTag: new Operator({
      internalName: "integrateddynamics:fluidstack_tag",
      nicknames: [
        "FluidstackTag",
        "fluidstackTag",
        "fluidstackTagStacks",
        "fluidstackTagStack",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        globalMap
      ),
      symbol: "fluid_tag_names",
      interactName: "fluidstackTags",
      function: (fluid: Fluid): Array<string> => {
        return fluid.getTagNames();
      },
    }),
    fluidTagStacks: new Operator({
      internalName: "integrateddynamics:string_fluidtag",
      nicknames: [
        "FluidstackTagStacks",
        "fluidStackTagStacks",
        "fluid_stack_tag_stacks",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: { type: "List", listType: { type: "Fluid" } },
        },
        globalMap
      ),
      symbol: "fluid_tag_values",
      interactName: "stringFluidsByTag",
      function: (): never => {
        throw new Error(
          "Fluid tag values is infeasible without a registry. This is a placeholder function."
        );
      },
    }),
    apply: new Operator({
      internalName: "integrateddynamics:operator_apply",
      nicknames: ["operatorApply"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 2 },
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 2 },
          },
        },
        globalMap
      ),
      symbol: "apply",
      interactName: "operatorApply",
      serializer: "integrateddynamics:curry",
      function: (op: Operator) => {
        return (arg: IntegratedValue) => {
          globalMap.unify(
            op.parsedSignature.getInput(0),
            arg
          );
          return op.apply(arg);
        };
      },
    }),
    apply2: new Operator({
      internalName: "integrateddynamics:operator_apply2",
      nicknames: ["operatorApply_2"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 2 },
              to: { type: "Any", typeID: 3 },
            },
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: 2
              },
              to: {
                type: "Any",
                typeID: 3
              },
            },
          },
        },
        globalMap
      ),
      symbol: "apply2",
      interactName: "operatorApply2",
      serializer: "integrateddynamics:curry",
      function: (op: Operator): TypeLambda<IntegratedValue, TypeLambda<IntegratedValue, IntegratedValue>> => {
        return (arg1: IntegratedValue): TypeLambda<IntegratedValue, IntegratedValue> => {
          return (arg2: IntegratedValue): IntegratedValue => {
            globalMap.unify(op.parsedSignature.getInput(0), arg1);
            globalMap.unify(op.parsedSignature.getInput(1), arg2);
            return op.apply(arg1).apply(arg2);
          };
        };
      },
    }),
    apply3: new Operator({
      internalName: "integrateddynamics:operator_apply3",
      nicknames: ["operatorApply_3"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 2 },
              to: {
                type: "Function",
                from: { type: "Any", typeID: 3 },
                to: { type: "Any", typeID: 4 },
              },
            },
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: 2
              },
              to: {
                type: "Function",
                from: {
                  type: "Any",
                  typeID: 3
                },
                to: {
                  type: "Any",
                  typeID: 4
                },
              },
            },
          },
        },
        globalMap
      ),
      symbol: "apply3",
      interactName: "operatorApply3",
      serializer: "integrateddynamics:curry",
      function: (op: Operator): TypeLambda<IntegratedValue, TypeLambda<IntegratedValue, TypeLambda<IntegratedValue, IntegratedValue>>> => {
        return (arg1: IntegratedValue): TypeLambda<IntegratedValue, TypeLambda<IntegratedValue, IntegratedValue>> => {
          return (arg2: IntegratedValue): TypeLambda<IntegratedValue, IntegratedValue> => {
            return (arg3: IntegratedValue): IntegratedValue => {
              op.parsedSignature.typeMap.unify(
                op.parsedSignature.getInput(0),
                arg1
              );
              op.parsedSignature.typeMap.unify(
                op.parsedSignature.getInput(1),
                arg2
              );
              op.parsedSignature.typeMap.unify(
                op.parsedSignature.getInput(2),
                arg3
              );
              return op.apply(arg1).apply(arg2).apply(arg3);
            };
          };
        };
      },
    }),
    applyn: new Operator({
      internalName: "integrateddynamics:operator_apply_n",
      nicknames: ["operatorApplyN"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 2 },
          },
          to: {
            type: "Function",
            from: {
              type: "List",
              listType: {
                type: "Any",
                typeID: 1
              }
            },
            to: { type: "Any", typeID: 3 },
          },
        },
        globalMap
      ),
      symbol: "apply_n",
      interactName: "operatorApply_n",
      serializer: "integrateddynamics:curry",
      function: (op: Operator): TypeLambda<Array<IntegratedValue>, IntegratedValue> => {
        return (args: Array<IntegratedValue>): IntegratedValue => {
          args.forEach((arg, i) => {
            if (arg === undefined || arg === null) {
              throw new Error(
                "applyn requires all arguments to be defined and non-null."
              );
            }
            op.parsedSignature.typeMap.unify(
              op.parsedSignature.getInput(i),
              arg
            );
            op = op.apply(arg);
          });
          return op;
        };
      },
    }),
    apply0: new Operator({
      internalName: "integrateddynamics:operator_apply0",
      nicknames: ["operatorApply_0"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: { type: "Any", typeID: 1 },
        },
        globalMap
      ),
      symbol: "apply0",
      interactName: "operatorApply0",
      serializer: "integrateddynamics:curry",
      function: (op: Operator): TypeLambda<undefined, IntegratedValue> => {
        return () => {
          return op.apply(undefined);
        };
      },
    }),
    map: new Operator({
      internalName: "integrateddynamics:operator_map",
      nicknames: ["operatorMap"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 2 },
          },
          to: {
            type: "Function",
            from: {
              type: "List",
              listType: { type: "Any", typeID: 1}
            },
            to: {
              type: "List",
              listType: { type: "Any", typeID: 2}
            },
          },
        },
        globalMap
      ),
      symbol: "map",
      interactName: "operatorMap",
      function: (op: Operator): TypeLambda<Array<IntegratedValue>, Array<IntegratedValue>> => {
        return (list: Array<IntegratedValue>): Array<IntegratedValue> => {
          return list.map((item) => op.apply(item));
        };
      },
    }),
    filter: new Operator({
      internalName: "integrateddynamics:operator_filter",
      nicknames: ["operatorFilter"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
          to: {
            type: "Function",
            from: {
              type: "List",
              listType: {
                type: "Any",
                typeID: 1
              }
            },
            to: {
              type: "List",
              listType: {
                type: "Any",
                typeID: 1
              }
            },
          },
        },
        globalMap
      ),
      symbol: "filter",
      interactName: "operatorFilter",
      function: (predicate: Predicate): TypeLambda<Array<IntegratedValue>, Array<IntegratedValue>> => {
        return (list: Array<IntegratedValue>): Array<IntegratedValue> => {
          return list.filter((item) => predicate.apply(item));
        };
      },
    }),
    conjunction: new Operator({
      internalName: "integrateddynamics:operator_conjunction",
      nicknames: ["operatorConjunction"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
          to: {
            type: "Function",
            from: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Boolean",
              },
            },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Boolean",
              },
            },
          },
        },
        globalMap
      ),
      symbol: ".&&.",
      interactName: "operatorConjunction",
      function: (predicate1: Predicate): TypeLambda<Predicate, TypeLambda<IntegratedValue, boolean>> => {
        return (predicate2: Predicate): TypeLambda<IntegratedValue, boolean> => {
          return (input: IntegratedValue): boolean => {
            return (predicate1.apply(input) && predicate2.apply(input));
          };
        };
      },
    }),
    disjunction: new Operator({
      internalName: "integrateddynamics:operator_disjunction",
      nicknames: ["operatorDisjunction"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
          to: {
            type: "Function",
            from: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Boolean",
              },
            },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Boolean",
              },
            },
          },
        },
        globalMap
      ),
      symbol: ".||.",
      interactName: "operatorDisjunction",
      function: (predicate1: Predicate): TypeLambda<Predicate, TypeLambda<IntegratedValue, boolean>> => {
        return (predicate2: Predicate): TypeLambda<IntegratedValue, boolean> => {
          return (input: IntegratedValue): boolean => {
            return predicate1.apply(input) || predicate2.apply(input);
          };
        };
      },
    }),
    negation: new Operator({
      internalName: "integrateddynamics:operator_negation",
      nicknames: ["operatorNegation"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "!.",
      interactName: "operatorNegation",
      function: (predicate: Predicate): TypeLambda<IntegratedValue, boolean> => {
        return (input: IntegratedValue): boolean => {
          return !predicate.apply(input);
        };
      },
    }),
    pipe: new Operator({
      internalName: "integrateddynamics:operator_pipe",
      nicknames: ["operatorPipe"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 2 },
          },
          to: {
            type: "Function",
            from: {
              type: "Function",
              from: { type: "Any", typeID: 2 },
              to: { type: "Any", typeID: 3 },
            },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 3 },
            },
          },
        },
        globalMap
      ),
      symbol: ".",
      interactName: "operatorPipe",
      serializer: "integrateddynamics:combined.pipe",
      function: (f: Operator): TypeLambda<Operator, TypeLambda<IntegratedValue, IntegratedValue>> => {
        return (g: Operator): TypeLambda<IntegratedValue, IntegratedValue> => {
          f.parsedSignature.pipe(g.parsedSignature);
          return (x: IntegratedValue): IntegratedValue => {
            return g.apply(f.apply(x));
          };
        };
      },
    }),
    "pipe.2": new Operator({
      internalName: "integrateddynamics:operator_pipe2",
      nicknames: ["operatorPipe2", "pipe2"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 2 },
          },
          to: {
            type: "Function",
            from: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 3 },
            },
            to: {
              type: "Function",
              from: {
                type: "Function",
                from: { type: "Any", typeID: 2 },
                to: {
                  type: "Function",
                  from: { type: "Any", typeID: 3 },
                  to: { type: "Any", typeID: 4 },
                },
              },
              to: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 4 },
              },
            },
          },
        },
        globalMap
      ),
      symbol: ".2",
      interactName: "operatorPipe2",
      serializer: "integrateddynamics:combined.pipe",
      function: (f: Operator): TypeLambda<Operator, TypeLambda<Operator, TypeLambda<IntegratedValue, IntegratedValue>>> => {
        return (g: Operator): TypeLambda<Operator, TypeLambda<IntegratedValue, IntegratedValue>> => {
          return (h: Operator): TypeLambda<IntegratedValue, IntegratedValue> => {
            f.parsedSignature.typeMap.unify(
              f.parsedSignature.getOutput(),
              h.parsedSignature.getInput(0)
            );
            g.parsedSignature.typeMap.unify(
              g.parsedSignature.getOutput(),
              h.parsedSignature.getInput(1)
            );

            return (x: IntegratedValue): IntegratedValue => {
              return h.apply(f.apply(x)).apply(g.apply(x));
            };
          };
        };
      },
    }),
    flip: new Operator({
      internalName: "integrateddynamics:operator_flip",
      nicknames: ["operatorFlip"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 2 },
              to: { type: "Any", typeID: 3 },
            },
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 2 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 3 },
            },
          },
        },
        globalMap
      ),
      symbol: "flip",
      interactName: "operatorFlip",
      serializer: "integrateddynamics:combined.flip",
      function: (op: Operator): TypeLambda<IntegratedValue, TypeLambda<IntegratedValue, IntegratedValue>> => {
        return (arg1: IntegratedValue): TypeLambda<IntegratedValue, IntegratedValue> => {
          return (arg2: IntegratedValue): IntegratedValue => {
            return op.apply(arg2).apply(arg1);
          };
        };
      },
    }),
    reduce: new Operator({
      internalName: "integrateddynamics:operator_reduce",
      nicknames: ["operatorReduce"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 1 },
            },
          },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 1 },
            },
          },
        },
        globalMap
      ),
      symbol: "reduce",
      interactName: "operatorReduce",
      function: <T>(op: Operator): TypeLambda<Array<T>, TypeLambda<T, T>> => {
        return (list: Array<T>): TypeLambda<T, T> => {
          return (startingValue: T): T => {
            let result = startingValue;
            for (let item of list) {
              result = op.apply(result).apply(item);
            }
            return result;
          };
        };
      },
    }),
    reduce1: new Operator({
      internalName: "integrateddynamics:operator_reduce1",
      nicknames: ["operatorReduce1"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 1 },
            },
          },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: { type: "Any", typeID: 1 },
          },
        },
        globalMap
      ),
      symbol: "reduce1",
      interactName: "operatorReduce1",
      function: <T>(op: Operator): TypeLambda<Array<T>, T> => {
        return (list: Array<T>): T => {
          list = [...list];
          let result = list.shift();
          for (let item of list) {
            result = op.apply(result).apply(item);
          }
          return result as T;
        };
      },
    }),
    opByName: new Operator({
      internalName: "integrateddynamics:operator_by_name",
      nicknames: ["operatorByName"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 2 },
          },
        },
        globalMap
      ),
      symbol: "op_by_name",
      interactName: "stringOperatorByName",
      function: (name: TypeOperatorInternalName): Operator => {
        return operatorRegistry.baseOperators["find"](
          (op: Operator) => op.internalName === name
        );
      },
    }),
    NBTSize: new Operator({
      internalName: "integrateddynamics:nbt_compound_size",
      nicknames: ["nbtCompoundSize"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "NBT{}.size",
      interactName: "nbtSize",
      function: (nbt: NBT): Integer => {
        return new Integer(Object.keys(nbt).length);
      },
    }),
    NBTKeys: new Operator({
      internalName: "integrateddynamics:nbt_compound_keys",
      nicknames: ["nbtCompoundKeys"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        globalMap
      ),
      symbol: "NBT{}.keys",
      interactName: "nbtKeys",
      function: (nbt: NBT): Array<string> => {
        return Object.keys(nbt);
      },
    }),
    NBTHasKey: new Operator({
      internalName: "integrateddynamics:nbt_compound_haskey",
      nicknames: ["nbtCompoundHaskey"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.has_key",
      interactName: "nbtHasKey",
      function: (nbt: NBT): TypeLambda<string, boolean> => {
        return (key: string): boolean => {
          return nbt.hasOwnProperty(key);
        };
      },
    }),
    NBTValueType: new Operator({
      internalName: "integrateddynamics:nbt_compound_type",
      nicknames: ["nbtCompoundValueType"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "String",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.type",
      interactName: "nbtType",
      function: (nbt: NBT): TypeLambda<string, string> => {
        return (key: string): string => {
          if (!nbt.hasOwnProperty(key)) {
            throw new Error(`${key} does not exist in ${JSON.stringify(nbt)}`);
          }
          return nbt.getRawValue(key).getType();
        };
      },
    }),
    compoundValueAny: new Operator({
      internalName: "integrateddynamics:nbt_compound_value_tag",
      nicknames: ["nbtCompoundValueTag"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "NBT",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_tag",
      interactName: "nbtGetTag",
      function: (nbt: NBT): TypeLambda<string, NBT> => {
        return (key: string): NBT => {
          return nbt.getRawValue(key);
        };
      },
    }),
    compoundValueBoolean: new Operator({
      internalName: "integrateddynamics:nbt_compound_value_boolean",
      nicknames: ["nbtCompoundValueBoolean"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_boolean",
      interactName: "nbtGetBoolean",
      function: (nbt: NBT): TypeLambda<string, boolean> => {
        return (key: string): boolean => {
          return nbt.getRawValue(key).getRawValue();
        };
      },
    }),
    compoundValueInteger: new Operator({
      internalName: "integrateddynamics:nbt_compound_value_integer",
      nicknames: ["nbtCompoundValueInteger"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_integer",
      interactName: "nbtGetInteger",
      function: (nbt: NBT): TypeLambda<string, Integer> => {
        return (key: string): Integer => {
          let value = nbt.getRawValue(key);
          if (value.getType() === "Integer") {
            return value.getRawValue();
          }
          throw new Error(`${key} is not an integer in ${JSON.stringify(nbt.toJSON())}`);
        };
      },
    }),
    compoundValueLong: new Operator({
      internalName: "integrateddynamics:nbt_compound_value_long",
      nicknames: ["nbtCompoundValueLong"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Long",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_long",
      interactName: "nbtGetLong",
      function: (nbt: NBT): TypeLambda<string, Long> => {
        return (key: string): Long => {
          let value = nbt.getRawValue(key);
          if (value.getType() === "Long") {
            return value.getRawValue();
          }
          throw new Error(`${key} is not a long in ${JSON.stringify(nbt.toJSON())}`);
        };
      },
    }),
    compoundValueDouble: new Operator({
      internalName: "integrateddynamics:nbt_compound_value_double",
      nicknames: ["nbtCompoundValueDouble"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Double",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_double",
      interactName: "nbtGetDouble",
      function: (nbt: NBT): TypeLambda<string, Double> => {
        return (key: string): Double => {
          let value = nbt.getRawValue(key);
          if (value.getType() === "Double") {
            return value.getRawValue();
          }
          throw new Error(`${key} is not a double in ${JSON.stringify(nbt.toJSON())}`);
        };
      },
    }),
    compoundValueString: new Operator({
      internalName: "integrateddynamics:nbt_compound_value_string",
      nicknames: ["nbtCompoundValueString"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "String",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_string",
      interactName: "nbtGetString",
      function: (nbt: NBT): TypeLambda<string, string> => {
        return (key: string): string => {
          return nbt.getRawValue(key);
        };
      },
    }),
    compoundValueNBT: new Operator({
      internalName: "integrateddynamics:nbt_compound_value_compound",
      nicknames: ["nbtCompoundValueCompound"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "NBT",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_compound",
      interactName: "nbtGetCompound",
      function: (nbt: NBT): TypeLambda<string, NBT> => {
        return (string: string): NBT => {
          return nbt.getRawValue(string);
        };
      },
    }),
    compoundValueListNBT: new Operator({
      internalName: "integrateddynamics:nbt_compound_value_list_tag",
      nicknames: ["nbtCompoundValueListTag", "nbtCompoundValueList"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "List", listType: { type: "NBT" } },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_list_tag",
      interactName: "nbtGetListTag",
      function: (nbt: NBT): TypeLambda<string, Array<NBT>> => {
        return (key: string): Array<NBT> => {
          let value = nbt.getRawValue();
          let list = value.getRawValue();
          if (value.getType() != "Array<NBT>")
            throw new Error(
              `${key} is not a list of NBT in ${JSON.stringify(nbt.toJSON())}`
            );
          return list;
        };
      },
    }),
    compoundValueListByte: new Operator({
      internalName: "integrateddynamics:nbt_compound_value_list_byte",
      nicknames: ["nbtCompoundValueListByte"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "List", listType: { type: "Integer" } },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_list_byte",
      interactName: "nbtGetListByte",
      function: (nbt: NBT) => {
        return (key: string): Integer => {
          let value = nbt.getRawValue(key);
          let list = value.getRawValue();
          if (nbt.getType(key) != "Byte")
            throw new Error(
              `${key} is not a list of byte in ${JSON.stringify(nbt.toJSON())}`
            );
          return list;
        };
      },
    }),
    compoundValueListInteger: new Operator({
      internalName: "integrateddynamics:nbt_compound_value_list_int",
      nicknames: ["nbtCompoundValueListInt"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "List", listType: { type: "Integer" } },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_list_int",
      interactName: "nbtGetListInt",
      function: (nbt: NBT): TypeLambda<string, Array<Integer>> => {
        return (key: string): Array<Integer> => {
          let value = nbt.getRawValue(key);
          let list = value.getRawValue();
          if (value.getType(key) != "Array<Integer>")
            throw new Error(
              `${key} is not a list of int in ${JSON.stringify(nbt.toJSON())}`
            );
          return list;
        };
      },
    }),
    compoundValueListLong: new Operator({
      internalName: "integrateddynamics:nbt_compound_value_list_long",
      nicknames: ["nbtCompoundValueListLong"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "List", listType: { type: "Long" } },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.get_list_long",
      interactName: "nbtGetListLong",
      function: (nbt: NBT): TypeLambda<string, Long> => {
        return (key: string): Long => {
          let value = nbt.getRawValue(key);
          let list = value.list;
          if (value.ListType != "long")
            throw new Error(
              `${key} is not a list of long in ${JSON.stringify(nbt.toJSON())}`
            );
          return list;
        };
      },
    }),
    NBTWithout: new Operator({
      internalName: "integrateddynamics:nbt_compound_without",
      nicknames: ["nbtCompoundWithout"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "NBT",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.without",
      interactName: "nbtWithout",
      function: (nbt: NBT): TypeLambda<string, NBT> => {
        return (key: string): NBT => {
          return nbt.remove(key);
        };
      },
    }),
    NBTWithBoolean: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_boolean",
      nicknames: ["nbtCompoundWithBoolean"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "Boolean",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_boolean",
      interactName: "nbtWithBoolean",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<boolean, NBT>> => {
        return (key: string): TypeLambda<boolean, NBT> => {
          return (value: boolean): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTWithShort: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_short",
      nicknames: ["nbtCompoundWithShort"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_short",
      interactName: "nbtWithShort",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<Integer, NBT>> => {
        return (key: string): TypeLambda<Integer, NBT> => {
          return (value: Integer): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTWithInteger: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_integer",
      nicknames: ["nbtCompoundWithInteger"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_integer",
      interactName: "nbtWithInteger",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<Integer, NBT>> => {
        return (key: string): TypeLambda<Integer, NBT> => {
          return (value: Integer): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTWithLong: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_long",
      nicknames: ["nbtCompoundWithLong"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "Long",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_long",
      interactName: "nbtWithLong",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<Long, NBT>> => {
        return (key: string): TypeLambda<Long, NBT> => {
          return (value: Long): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTWithDouble: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_double",
      nicknames: ["nbtCompoundWithDouble"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "Double",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_double",
      interactName: "nbtWithDouble",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<Double, NBT>> => {
        return (key: string): TypeLambda<Double, NBT> => {
          return (value: Double): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTWithFloat: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_float",
      nicknames: ["nbtCompoundWithFloat"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "Double",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_float",
      interactName: "nbtWithFloat",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<Double, NBT>> => {
        return (key: string): TypeLambda<Double, NBT> => {
          return (value: Double): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTWithString: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_string",
      nicknames: ["nbtCompoundWithString"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_string",
      interactName: "nbtWithString",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<string, NBT>> => {
        return (key: string): TypeLambda<string, NBT> => {
          return (value: string): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTWithNBT: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_tag",
      nicknames: ["nbtCompoundWithCompound"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_tag",
      interactName: "nbtWithTag",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<NBT, NBT>> => {
        return (key: string): TypeLambda<NBT, NBT> => {
          return (value: NBT): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTWithNBTList: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_list_tag",
      nicknames: ["nbtCompoundWithListTag"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "NBT" } },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_tag_list",
      interactName: "nbtWithTagList",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<Array<NBT>, NBT>> => {
        return (key: string): TypeLambda<Array<NBT>, NBT> => {
          return (value: Array<NBT>): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTWithByteList: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_list_byte",
      nicknames: ["nbtCompoundWithListByte"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Integer" } },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_byte_list",
      interactName: "nbtWithByteList",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<Array<Integer>, NBT>> => {
        return (key: string): TypeLambda<Array<Integer>, NBT> => {
          return (value: Array<Integer>): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTWithIntegerList: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_list_int",
      nicknames: ["nbtCompoundWithListInt"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Integer" } },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_int_list",
      interactName: "nbtWithIntList",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<Array<Integer>, NBT>> => {
        return (key: string): TypeLambda<Array<Integer>, NBT> => {
          return (value: Array<Integer>): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTWithLongList: new Operator({
      internalName: "integrateddynamics:nbt_compound_with_list_long",
      nicknames: ["nbtCompoundWithListLong"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Long" } },
              to: {
                type: "NBT",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.with_list_long",
      interactName: "nbtWithListLong",
      function: (nbt: NBT): TypeLambda<string, TypeLambda<Array<Long>, NBT>> => {
        return (key: string): TypeLambda<Array<Long>, NBT> => {
          return (value: Array<Long>): NBT => {
            return nbt.setValue(key, value);
          }
        }
      }
    }),
    NBTSubset: new Operator({
      internalName: "integrateddynamics:nbt_compound_subset",
      nicknames: ["nbtCompoundSubset"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.⊆",
      interactName: "nbtIsSubset",
      function: (subSet: NBT): TypeLambda<NBT, boolean> => {
        return (superSet: NBT): boolean => {
          return superSet.compoundSubset(subSet);
        }
      }
    }),
    NBTUnion: new Operator({
      internalName: "integrateddynamics:nbt_compound_union",
      nicknames: ["nbtCompoundUnion"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "NBT",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.∪",
      interactName: "nbtUnion",
      function: (nbt1: NBT): TypeLambda<NBT, NBT> => {
        return (nbt2: NBT): NBT => {
          return nbt1.compoundUnion(nbt2);
        }
      }
    }),
    NBTIntersection: new Operator({
      internalName: "integrateddynamics:nbt_compound_intersection",
      nicknames: ["nbtCompoundIntersection"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "NBT",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.∩",
      interactName: "nbtIntersection",
      function: (nbt1: NBT) => {
        return (nbt2: NBT) => {
          return nbt1.compoundIntersection(nbt2);
        }
      }
    }),
    NBTMinus: new Operator({
      internalName: "integrateddynamics:nbt_compound_minus",
      nicknames: ["nbtCompoundMinus"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "NBT",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT{}.∖",
      interactName: "nbtMinus",
      function: (nbt1: NBT) => {
        return (nbt2: NBT) => {
          return nbt1.compoundMinus(nbt2);
        }
      }
    }),
    nbtAsBoolean: new Operator({
      internalName: "integrateddynamics:nbt_as_boolean",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "NBT.as_boolean",
      interactName: "nbtAsBoolean",
      function: (nbt: NBT): boolean => {
        if (nbt.getType() === "boolean") {
          return nbt.getRawvalue();
        } else {
          return false;
        }
      }
    }),
    nbtAsByte: new Operator({
      internalName: "integrateddynamics:nbt_as_byte",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "NBT.as_byte",
      interactName: "nbtAsByte",
      function: (nbt: NBT): Integer => {
        if (nbt.getType() === "Integer") {
          return nbt.getRawValue();
        } else {
          return new Integer(0);
        }
      }
    }),
    nbtAsShort: new Operator({
      internalName: "integrateddynamics:nbt_as_short",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "NBT.as_short",
      interactName: "nbtAsShort",
      function: (nbt: NBT): Integer => {
        if (nbt.getType() === "Integer") {
          return nbt.getRawValue();
        } else {
          return new Integer(0);
        }
      }
    }),
    nbtAsInt: new Operator({
      internalName: "integrateddynamics:nbt_as_int",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "NBT.as_int",
      interactName: "nbtAsInt",
      function: (nbt: NBT): Integer => {
        if (nbt.getType() === "Integer") {
          return nbt.getRawValue();
        } else {
          return new Integer(0);
        }
      }
    }),
    nbtAsLong: new Operator({
      internalName: "integrateddynamics:nbt_as_long",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Long",
          },
        },
        globalMap
      ),
      symbol: "NBT.as_long",
      interactName: "nbtAsLong",
      function: (nbt: NBT): Long => {
        if (nbt.getType() === "Long") {
          return nbt.getRawValue();
        } else {
          return new Long(0);
        }
      }
    }),
    nbtAsDouble: new Operator({
      internalName: "integrateddynamics:nbt_as_double",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "NBT.as_double",
      interactName: "nbtAsDouble",
      function: (nbt: NBT): Double => {
        if (nbt.getType() === "Double") {
          return nbt.getRawValue();
        } else {
          return new Double(0);
        }
      }
    }),
    nbtAsFloat: new Operator({
      internalName: "integrateddynamics:nbt_as_float",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "NBT.as_float",
      interactName: "nbtAsFloat",
      function: (nbt: NBT): Double => {
        if (nbt.getType() === "Double") {
          return nbt.getRawValue();
        } else {
          return new Double(0);
        }
      }
    }),
    nbtAsString: new Operator({
      internalName: "integrateddynamics:nbt_as_string",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "NBT.as_string",
      interactName: "nbtAsString",
      function: (nbt: NBT): string => {
        if (nbt.getType() === "string") {
          return nbt.getRawValue();
        } else {
          return "";
        }
      }
    }),
    nbtAsTagList: new Operator({
      internalName: "integrateddynamics:nbt_as_tag_list",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: { type: "List", listType: { type: "NBT" } },
        },
        globalMap
      ),
      symbol: "NBT.as_tag_list",
      interactName: "nbtAsTagList",
      function: (nbt: NBT): Array<NBT> => {
        if (nbt.getType() === "Array<NBT>") {
          return nbt.getRawValue();
        } else {
          return new Array<NBT>();
        }
      }
    }),
    nbtAsByteList: new Operator({
      internalName: "integrateddynamics:nbt_as_byte_list",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: { type: "List", listType: { type: "Integer" } },
        },
        globalMap
      ),
      symbol: "NBT.as_byte_list",
      interactName: "nbtAsByteList",
      function: (nbt: NBT): Array<Integer> => {
        if (nbt.getType() === "Array<Integer>") {
          return nbt.getRawValue();
        } else {
          return new Array<Integer>();
        }
      }
    }),
    nbtAsIntList: new Operator({
      internalName: "integrateddynamics:nbt_as_int_list",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: { type: "List", listType: { type: "Integer" } },
        },

        globalMap
      ),
      symbol: "NBT.as_int_list",
      interactName: "nbtAsIntList",
      function: (nbt: NBT): Array<Integer> => {
        if (nbt.getType() === "Array<Integer>") {
          return nbt.getRawValue();
        } else {
          return new Array<Integer>();
        }
      }
    }),
    nbtAsLongList: new Operator({
      internalName: "integrateddynamics:nbt_as_long_list",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: { type: "List", listType: { type: "Long" } },
        },
        globalMap
      ),
      symbol: "NBT.as_long_list",
      interactName: "nbtAsLongList",
      function: (nbt: NBT): Array<Long> => {
        if (nbt.getType() === "Array<Long>") {
          return nbt.getRawValue();
        } else {
          return new Array<Long>();
        }
      }
    }),
    nbtFromBoolean: new Operator({
      internalName: "integrateddynamics:nbt_from_boolean",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_boolean",
      interactName: "booleanAsNbt",
      function: (bool: boolean): NBT => {
        return new NBT(bool);
      }
    }),
    nbtFromShort: new Operator({
      internalName: "integrateddynamics:nbt_from_short",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_short",
      interactName: "shortAsNbt",
      function: (short: Integer): NBT => {
        return new NBT(short);
      }
    }),
    nbtFromByte: new Operator({
      internalName: "integrateddynamics:nbt_from_byte",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_byte",
      interactName: "byteAsNbt",
      function: (byte: Integer): NBT => {
        return new NBT(byte);
      }
    }),
    nbtFromInt: new Operator({
      internalName: "integrateddynamics:nbt_from_int",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_int",
      interactName: "integerAsNbt",
      function: (int: Integer): NBT => {
        return new NBT(int);
      }
    }),
    nbtFromLong: new Operator({
      internalName: "integrateddynamics:nbt_from_long",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Long",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_long",
      interactName: "longAsNbt",
      function: (long: Long): NBT => {
        return new NBT(long);
      }
    }),
    nbtFromDouble: new Operator({
      internalName: "integrateddynamics:nbt_from_double",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "NBT",
          },
        },

        globalMap
      ),
      symbol: "NBT.from_double",
      interactName: "doubleAsNbt",
      function: (double: Double): NBT => {
        return new NBT(double);
      }
    }),
    nbtFromFloat: new Operator({
      internalName: "integrateddynamics:nbt_from_float",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_float",
      interactName: "floatAsNbt",
      function: (float: Double): NBT => {
        return new NBT(float);
      }
    }),
    nbtFromString: new Operator({
      internalName: "integrateddynamics:nbt_from_string",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_string",
      interactName: "stringAsNbt",
      function: (str: string): NBT => {
        return new NBT(str);
      }
    }),
    nbtFromTagList: new Operator({
      internalName: "integrateddynamics:nbt_from_tag_list",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "NBT" } },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_tag_list",
      interactName: "tagListAsNbt",
      function: (tagList: Array<NBT>): NBT => {
        return new NBT(tagList);
      }
    }),
    nbtFromByteList: new Operator({
      internalName: "integrateddynamics:nbt_from_byte_list",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Integer" } },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_byte_list",
      interactName: "byteListAsNbt",
      function: (byteList: Array<Integer>): NBT => {
        return new NBT(byteList);
      }
    }),
    nbtFromIntList: new Operator({
      internalName: "integrateddynamics:nbt_from_int_list",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Integer" } },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_int_list",
      interactName: "intListAsNbt",
      function: (intList: Array<Integer>): NBT => {
        return new NBT(intList);
      }
    }),
    nbtFromLongList: new Operator({
      internalName: "integrateddynamics:nbt_from_long_list",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Long" } },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "NBT.from_long_list",
      interactName: "longListAsNbt",
      function: (longList: Array<Long>): NBT => {
        return new NBT(longList);
      }
    }),
    nbtPathMatchFirst: new Operator({
      internalName: "integrateddynamics:nbt_path_match_first",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "NBT",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT.path_match_first",
      interactName: "stringNbtPathMatchFirst",
      function: (path: string): TypeLambda<NBT, NBT> => {
        return (nbt: NBT): NBT => {
          return nbt.matchFirstPath(path);
        }
      }
    }),
    nbtPathMatchAll: new Operator({
      internalName: "integrateddynamics:nbt_path_match_all",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: { type: "List", listType: { type: "NBT" } },
          },
        },
        globalMap
      ),
      symbol: "NBT.path_match_all",
      interactName: "stringNbtPathMatchAll",
      function: (path: string): TypeLambda<NBT, Array<NBT>> => {
        return (nbt: NBT): Array<NBT> => {
          return nbt.matchFirstAll(path);
        }
      }
    }),
    NBTPathTest: new Operator({
      internalName: "integrateddynamics:nbt_path_test",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "NBT.path_test",
      interactName: "stringNbtPathTest",
      function: (path: string): TypeLambda<NBT, boolean> => {
        return (nbt: NBT): boolean => {
          return nbt.testPath(path);
        }
      }
    }),
    ingredientsItems: new Operator({
      internalName: "integrateddynamics:ingredients_items",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        globalMap
      ),
      symbol: "Ingr.items",
      interactName: "ingredientsItems",
      function: (ingredients: Ingredients): Array<Item> => {
        return ingredients.getItems();
      }
    }),
    ingredientsFluids: new Operator({
      internalName: "integrateddynamics:ingredients_fluids",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: { type: "List", listType: { type: "Fluid" } },
        },
        globalMap
      ),
      symbol: "Ingr.fluids",
      interactName: "ingredientsFluids",
      function: (ingredients: Ingredients): Array<Fluid> => {
        return ingredients.getFluids();
      }
    }),
    ingredientsEnergies: new Operator({
      internalName: "integrateddynamics:ingredients_energies",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: { type: "List", listType: { type: "Long" } },
        },
        globalMap
      ),
      symbol: "Ingr.energies",
      interactName: "ingredientsEnergies",
      function: (ingredients: Ingredients): Array<Long> => {
        return ingredients.getEnergies();
      }
    }),
    ingredientsWithItem: new Operator({
      internalName: "integrateddynamics:ingredients_with_item",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Item",
              },
              to: {
                type: "Ingredients",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "Ingr.with_item",
      interactName: "ingredientsWithItem",
      function: (ingredients: Ingredients): TypeLambda<Integer, TypeLambda<Item, Ingredients>> => {
        return (index: Integer): TypeLambda<Item, Ingredients> => {
          return (item: Item): Ingredients => {
            return ingredients.setItem(item, index);
          }
        }
      }
    }),
    ingredientsWithFluid: new Operator({
      internalName: "integrateddynamics:ingredients_with_fluid",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Fluid",
              },
              to: {
                type: "Ingredients",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "Ingr.with_fluid",
      interactName: "ingredientsWithFluid",
      function: (ingredients: Ingredients): TypeLambda<Integer, TypeLambda<Fluid, Ingredients>> => {
        return (index: Integer): TypeLambda<Fluid, Ingredients> => {
          return (fluid: Fluid): Ingredients => {
            return ingredients.setFluid(fluid, index);
          }
        }
      }
    }),
    ingredientsWithEnergy: new Operator({
      internalName: "integrateddynamics:ingredients_with_energy",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Long",
              },
              to: {
                type: "Ingredients",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "Ingr.with_energy",
      interactName: "ingredientsWithEnergy",
      function: (ingredients: Ingredients): TypeLambda<Integer, TypeLambda<Long, Ingredients>> => {
        return (index: Integer): TypeLambda<Long, Ingredients> => {
          return (energy: Long): Ingredients => {
            return ingredients.setEnergy(energy, index);
          }
        }
      }
    }),
    ingredientsWithItems: new Operator({
      internalName: "integrateddynamics:ingredients_with_items",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Item" } },
            to: {
              type: "Ingredients",
            },
          },
        },
        globalMap
      ),
      symbol: "Ingr.with_items",
      interactName: "ingredientsWithItems",
      function: (ingredients: Ingredients): TypeLambda<Array<Item>, Ingredients> => {
        return (itemList: Array<Item>): Ingredients => {
          return ingredients.appendItems(itemList);
        }
      }
    }),
    ingredientsWithFluids: new Operator({
      internalName: "integrateddynamics:ingredients_with_fluids",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Fluid" } },
            to: {
              type: "Ingredients",
            },
          },
        },
        globalMap
      ),
      symbol: "Ingr.with_fluids",
      interactName: "ingredientsWithFluids",
      function: (ingredients: Ingredients): TypeLambda<Array<Fluid>, Ingredients> => {
        return (fluidList: Array<Fluid>): Ingredients => {
          return ingredients.appendFluids(fluidList);
        }
      }
    }),
    ingredientsWithEnergies: new Operator({
      internalName: "integrateddynamics:ingredients_with_energies",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Long" } },
            to: {
              type: "Ingredients",
            },
          },
        },
        globalMap
      ),
      symbol: "Ingr.with_energies",
      interactName: "ingredientsWithEnergies",
      function: (ingredients: Ingredients): TypeLambda<Array<Long>, Ingredients> => {
        return (energyList: Array<Long>): Ingredients => {
          return ingredients.appendEnergies(energyList);
        }
      }
    }),
    recipeInput: new Operator({
      internalName: "integrateddynamics:recipe_input",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Recipe",
          },
          to: {
            type: "Ingredients",
          },
        },
        globalMap
      ),
      symbol: "recipe_in",
      interactName: "recipeInput",
      function: (recipe: Recipe): Ingredients => {
        return recipe.getInput();
      }
    }),
    recipeOutput: new Operator({
      internalName: "integrateddynamics:recipe_output",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Recipe",
          },
          to: {
            type: "Ingredients",
          },
        },
        globalMap
      ),
      symbol: "recipe_out",
      interactName: "recipeOutput",
      function: (recipe: Recipe): Ingredients => {
        return recipe.getOutput();
      }
    }),
    recipeWithInput: new Operator({
      internalName: "integrateddynamics:recipe_with_input",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Recipe",
          },
          to: {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: {
              type: "Recipe",
            },
          },
        },
        globalMap
      ),
      symbol: "Recipe.with_in",
      interactName: "recipeWithInput",
      function: (recipe: Recipe): TypeLambda<Ingredients, Recipe> => {
        return (ingredients: Ingredients): Recipe => {
          return recipe.setInput(ingredients);
        }
      }
    }),
    recipeWithOutput: new Operator({
      internalName: "integrateddynamics:recipe_with_output",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Recipe",
          },
          to: {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: {
              type: "Recipe",
            },
          },
        },
        globalMap
      ),
      symbol: "Recipe.with_out",
      interactName: "recipeWithOutput",
      function: (recipe: Recipe): TypeLambda<Ingredients, Recipe> => {
        return (ingredients: Ingredients): Recipe => {
          return recipe.setOutput(ingredients);
        }
      }
    }),
    recipeWithInputOutput: new Operator({
      internalName: "integrateddynamics:recipe_with_input_output",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: {
              type: "Recipe",
            },
          },
        },
        globalMap
      ),
      symbol: "Recipe.with_io",
      interactName: "ingredientsWithInputOutput",
      function: (input: Ingredients): TypeLambda<Ingredients, Recipe> => {
        return (output: Ingredients): Recipe => {
          return new Recipe(input, output);
        }
      }
    }),
    parseBoolean: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.boolean",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "parse_boolean",
      interactName: "stringParseAsBoolean",
      function: (value: string): boolean => {
        const matchArr = new RE2("(F(alse)?|[+-]?(0x|#)?0+|)", "i").match(value) ?? [];
        return !!matchArr[0];
      }
    }),
    parseDouble: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "parse_double",
      interactName: "stringParseAsDouble",
      function: (data: IntegratedValue): Double => {
        try {
          return new Double(data);
        } catch(e) {
          return new Double(0);
        }
      }
    }),
    parseInteger: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.integer",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "parse_integer",
      interactName: "stringParseAsInteger",
      function: (data: IntegratedValue): Integer => {
        try {
          return new Integer(data);
        } catch(e) {
          return new Integer(0);
        }
      }
    }),
    parseLong: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.long",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Long",
          },
        },
        globalMap
      ),
      symbol: "parse_long",
      interactName: "stringParseAsLong",
      function: (data: IntegratedValue): Long => {
        try {
          return new Long(data);
        } catch(e) {
          return new Long(0);
        }
      }
    }),
    parseNBT: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.nbt",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "NBT",
          },
        },
        globalMap
      ),
      symbol: "parse_nbt",
      interactName: "stringParseAsNbt",
      function: (data: IntegratedValue): NBT => {
        try {
          return new NBT(data);
        } catch(e) {
          return new NBT(0);
        }
      }
    }),
    choice: new Operator({
      internalName: "integrateddynamics:general_choice",
      nicknames: ["generalChoice"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Boolean",
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1,
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: 1,
              },
              to: {
                type: "Any",
                typeID: 1,
              },
            },
          },
        },
        globalMap
      ),
      symbol: "?",
      interactName: "booleanChoice",
      function: <T>(bool: boolean): TypeLambda<T, TypeLambda<T, T>> => {
        return (trueValue: T): TypeLambda<T, T> => {
          return (falseValue: T): T => {
            return bool ? trueValue : falseValue;
          }
        }
      }
    }),
    generalIdentity: new Operator({
      internalName: "integrateddynamics:general_identity",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Any",
            typeID: 1,
          },
        },
        globalMap
      ),
      symbol: "id",
      interactName: "anyIdentity",
      function: (value: IntegratedValue): IntegratedValue => {
        return value;
      }
    }),
    generalConstant: new Operator({
      internalName: "integrateddynamics:general_constant",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 2,
            },
            to: {
              type: "Any",
              typeID: 1,
            },
          },
        },
        globalMap
      ),
      symbol: "K",
      interactName: "anyConstant",
      function: (value: IntegratedValue): TypeLambda<void, IntegratedValue> => {
        return () => {
          return value;
        }
      }
    }),
    integerToDouble: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_double",
      nicknames: ["intToDouble", "integerDouble"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "()",
      interactName: "integerIntegerToDouble",
      function: (int: Integer): Promise<Double> => {
        return int.toDouble();
      }
    }),
    integerToLong: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_long",
      nicknames: ["intToLong", "integerLong"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: {
            type: "Long",
          },
        },
        globalMap
      ),
      symbol: "()",
      interactName: "integerIntegerToLong",
      function: (int: Integer): Promise<Long> => {
        return int.toLong();
      }
    }),
    doubleToInteger: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_integer",
      nicknames: ["doubleToInt", "doubleInteger"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "()",
      interactName: "doubleDoubleToInteger",
      function: (double: Double): Promise<Integer> => {
        return double.toInteger();
      }
    }),
    doubleToLong: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_long",
      nicknames: ["doubleToLong"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Double",
          },
          to: {
            type: "Long",
          },
        },
        globalMap
      ),
      symbol: "()",
      interactName: "doubleDoubleToLong",
      function: (double: Double): Promise<Long> => {
        return double.toLong();
      }
    }),
    longToInteger: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_integer",
      nicknames: ["longToInt", "longInteger"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Long",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "()",
      interactName: "longLongToInteger",
      function: (long: Long): Promise<Integer> => {
        return long.toInteger();
      }
    }),
    longToDouble: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_double",
      nicknames: ["longToDouble", "longDouble"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Long",
          },
          to: {
            type: "Double",
          },
        },
        globalMap
      ),
      symbol: "()",
      interactName: "longLongToDouble",
      function: (long: Long): Promise<Double> => {
        return long.toDouble();
      }
    }),
  },
  typeSerializers: {
    int: {
      valueType: "integrateddynamics:integer",
      nbtType: "int",
    },
    integer: {
      valueType: "integrateddynamics:integer",
      nbtType: "int",
    },
    long: {
      valueType: "integrateddynamics:long",
      nbtType: "long",
    },
    double: {
      valueType: "integrateddynamics:double",
      nbtType: "double",
    },
    boolean: {
      valueType: "integrateddynamics:boolean",
      nbtType: "boolean",
    },
    string: {
      valueType: "integrateddynamics:string",
      nbtType: "string",
    },
  },
} as const;

export { operatorRegistry };