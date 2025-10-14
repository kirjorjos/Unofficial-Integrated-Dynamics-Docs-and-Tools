/**
 * TODO: Test that the operators involving regexes work correctly.
 * Test Map and pipe
 */

import { InfiniteList } from "./HelperClasses/InfiniteList";
import { Operator } from "./IntegratedDynamicsClasses/Operator";
import { ParsedSignature } from "./IntegratedDynamicsClasses/ParsedSignature";
import { Block } from "./IntegratedDynamicsClasses/Block";
import { TypeMap } from "./IntegratedDynamicsClasses/TypeMap";
import { Double } from "./JavaNumberClasses/Double";
import { Integer } from "./JavaNumberClasses/Integer";
import { NumberBase } from "./HelperClasses/NumberBase";
import {
  TypeLambda,
  TypeNumber,
  TypeNumericString,
  TypeOperatorRegistry,
  TypeRawSignatureAST,
} from "./types";

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
      ): TypeLambda<TypeLambda<boolean, boolean>, TypeLambda<any, boolean>> => {
        return (
          func2: TypeLambda<boolean, boolean>
        ): TypeLambda<any, boolean> => {
          return (input: any): boolean => {
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
      ): TypeLambda<TypeLambda<boolean, boolean>, TypeLambda<any, boolean>> => {
        return (
          func2: TypeLambda<boolean, boolean>
        ): TypeLambda<any, boolean> => {
          return (input: any): boolean => {
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          return NumberBase.add(num1, num2);
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          return NumberBase.subtract(num1, num2);
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          return NumberBase.multiply(num1, num2);
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          return NumberBase.divide(num1, num2);
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          return NumberBase.max(num1, num2);
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          return NumberBase.min(num1, num2);
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
      function: (num1: TypeNumber): TypeNumber => {
        return NumberBase.add(num1, new Integer("1"));
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
      function: (num1: TypeNumber): TypeNumber => {
        return NumberBase.subtract(num1, new Integer("1"));
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (num2: TypeNumber): TypeNumber => {
          return NumberBase.mod(num1, num2);
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
      function: (double: TypeNumber): TypeNumber => {
        return Double.sqrt(double);
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
      function: (base: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (exponent: TypeNumber): TypeNumber => {
          return Double.pow(base, exponent);
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
      function: (value1: any): TypeLambda<any, boolean> => {
        return (value2: any): boolean => {
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, boolean> => {
        return (num2: TypeNumber): boolean => {
          return NumberBase.gt(num1, num2);
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, boolean> => {
        return (num2: TypeNumber): boolean => {
          return NumberBase.lt(num1, num2);
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
      function: (value1: any): TypeLambda<any, boolean> => {
        return (value2: any): boolean => {
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, boolean> => {
        return (num2: TypeNumber): boolean => {
          return NumberBase.gte(num1, num2);
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
      function: (num1: TypeNumber): TypeLambda<TypeNumber, boolean> => {
        return (num2: TypeNumber): boolean => {
          return NumberBase.lte(num1, num2);
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
      function: (int1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (int2: TypeNumber): TypeNumber => {
          return Integer.binaryAnd(int1, int2);
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
      function: (int1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (int2: TypeNumber): TypeNumber => {
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
      function: (int1: TypeNumber): TypeLambda<TypeNumber, TypeNumber> => {
        return (int2: TypeNumber): TypeNumber => {
          return int1.xor(int2);
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
        return int.complement();
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
          return int1.unsignedRightShift(int2);
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
        return new Integer(`${str.length}`);
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
          return new Integer(`${fullString.indexOf(substring)}`);
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
          return new Integer(`${fullString.search(regex)}`);
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
          return fullString.split(regex);
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
            return match;
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
        uniquelyNamed: TypeRawSignatureAST.RawSignatureUniquelyNamed
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
      function: (number: TypeNumber): TypeNumber => {
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
      function: (number: TypeNumber): TypeNumber => {
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
      function: (number: TypeNumber): TypeNumber => {
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
      function: (value: any): boolean => {
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
      function: (value: any): boolean => {
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
      function: (list: Array<any>): boolean => {
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
      function: (list: Array<any>): boolean => {
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
      function: <T>(index: TypeNumber): TypeLambda<Array<T>, T> => {
        return (list: Array<T>): T => {
          if (index.toDecimal() < 0 || index.toDecimal() >= list.length) {
            throw new Error(
              `Index ${index} out of bounds for list of length ${list.length}`
            );
          }
          return list[index.toDecimal()];
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
      function: <T>(
        list: Array<T>
      ): TypeLambda<TypeNumber, TypeLambda<T, T>> => {
        return (index: TypeNumber): TypeLambda<T, T> => {
          return (defaultValue: T): T => {
            if (NumberBase.lt(index, new Integer("0")) || NumberBase.gte(index, new Integer(list.length.toString() as TypeNumericString)) {
              return defaultValue;
            }
            return list[index.toDecimal()];
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
      function: <T>(predicate: TypeLambda<any, boolean>): TypeLambda<Array<T>, boolean> => {
        return (list: Array<T>): boolean => {
          return list.some((item) => predicate(item));
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
          return new Integer(list.filter((item) => item === element).length.toString() as TypeNumericString);
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
        return (predicate: TypeLambda<T, boolean>): Integer => {
          return new Integer(list.filter((item) => predicate(item)).length.toString() as TypeNumericString);
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
        return list[0];
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
        return (predicate: TypeLambda<T, boolean>): Array<T> => {
          const seen = new Set();
          return list.filter((item) => {
            const key = predicate(item);
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
      function: <T>(list: Array<T>): TypeLambda<TypeNumber, TypeLambda<TypeNumber, Array<T>>> => {
        return (start: TypeNumber): TypeLambda<TypeNumber, Array<T>> => {
          return (end: TypeNumber): Array<T> => {
            if (NumberBase.lt(start, new Integer(0.["toString"]() as TypeNumericString)) || NumberBase.gt(end, new Integer(list.length.toString() as TypeNumericString)) || NumberBase.gt(start, end)) {
              throw new Error(
                `Invalid slice range: [${start.toDecimal()}, ${end.toDecimal()}) for list of length ${list.length}`
              );
            }
            return list.slice(start.toDecimal(), end.toDecimal());
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
      function: <T>(list1: Array<T>): TypeLambda<Array<T>, boolean> => {
        return (list2: Array<T>): boolean => {
          const set1 = new Set(list1);
          const set2 = new Set(list2);
          return set1.equals(set2);
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
      function: <T>(list1: Array<T>): TypeLambda<Array<T>, boolean> => {
        return (list2: Array<T>): boolean => {
          const newList1 = [...list1].sort();
          const newList2 = [...list2].sort();
          if (newList1.length !== newList2.length) {
            return false;
          }
          for (let i = 0; i < newList1.length; i++) {
            if (
              Object.keys(newList1[i]).includes("equals") &&
              typeof newList1[i].equals === "function"
            ) {
              if (!newList1[i].equals(newList2[i])) {
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
      function: (block) => {
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
      function: (block) => {
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
      function: (block) => {
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
      function: (block) => {
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
      function: (block) => {
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
      function: (name) => {
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
      function: (block) => {
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
      function: (block) => {
        return (properties) => {
          return new Block({ properties }, block);
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
      function: (block) => {
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
      function: (block) => {
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
      function: (tag) => {
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
      function: (item) => {
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
      function: (item) => {
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
      function: (item) => {
        return item.getStackable();
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
      function: (item) => {
        return item.getDamageable();
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
      function: (item) => {
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
      function: (item) => {
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
      function: (item) => {
        return item.getEnchanted();
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
      function: (item) => {
        return item.getEnchantable();
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
      function: (item) => {
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
      function: (item) => {
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
      function: (item) => {
        return (block) => {
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
      function: (item) => {
        return (block) => {
          return item.canHarvestBlock(block);
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
      function: (item) => {
        return new Block({}, item);
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
      function: (item) => {
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
      function: (item) => {
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
      function: (item) => {
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
      function: (item1) => {
        return (item2) => {
          return (
            JSON.stringify(item1.getNBT()) === JSON.stringify(item2.getNBT())
          );
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
      function: (item1) => {
        return (item2) => {
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
      function: (item1) => {
        return (item2) => {
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
      function: (item) => {
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
      function: (item) => {
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
      function: (item) => {
        return item.getFuel();
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
      function: (item) => {
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
      function: (tag) => {
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
      function: (item) => {
        return (size) => {
          return new Item({ size }, item);
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
      function: (item) => {
        return item.getFeContainer();
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
      function: (item) => {
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
      function: (item) => {
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
      function: (item) => {
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
      function: (item) => {
        return item.getInventory().length || 0;
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
      function: (item) => {
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
      function: (name) => {
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
      function: (items) => {
        return (item) => {
          return items.filter((i) => {
            try {
              return i.equals(item);
            } catch (e) {
              return false;
            }
          }).length;
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
      function: (item) => {
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
      function: (item) => {
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
      function: (item) => {
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
              type: "NBT",
            },
            to: {
              type: "Any",
              typeID: 1,
            },
          },
        },

        globalMap
      ),
      symbol: "data_value",
      interactName: "itemstackDataValue",
      function: (item) => {
        return (key) => {
          const nbt = item.getNBT();
          if (!nbt || !nbt.hasOwnProperty(key)) {
            return null;
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
              type: "NBT",
            },
          },
        },

        globalMap
      ),
      symbol: "with_data",
      interactName: "itemstackWithData",
      function: (item) => {
        return (key) => {
          return (value) => {
            const nbt = item.getNBT() || {};
            nbt[key] = value;
            return new item({ nbt }, item);
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
      function: (item) => {
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
      function: (entity) => {
        return (item) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity1, entity2) => {
        return entity1.breadableList.includes(entity2);
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (entity) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid1) => {
        return (fluid2) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
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
      function: (fluid) => {
        return (amount) => {
          return new Fluid({ amount }, fluid);
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
      function: (fluid) => {
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
      function: (fluid) => {
        return (key) => {
          const nbt = fluid.getNBT();
          if (!nbt || !nbt.hasOwnProperty(key)) {
            return null;
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
          kind: "Operator",
          args: {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                kind: "Concrete",
                name: "Fluid",
              },
            },
          },
        },
        globalMap
      ),
      symbol: "with_data",
      interactName: "fluidstackWithData",
      function: (fluid) => {
        return (key) => {
          return (value) => {
            const nbt = fluid.getNBT() || {};
            nbt[key] = value;
            return new item({ nbt }, fluid);
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
      function: (fluid) => {
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
      function: (tag) => {
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
            from: {
              kind: "Generic",
            },
            to: {
              kind: "Generic",
            },
          },
        },

        globalMap
      ),
      symbol: "apply",
      interactName: "operatorApply",
      serializer: "integrateddynamics:curry",
      function: (op) => {
        return (arg) => {
          op.parsedSignature.typeMap.unify(
            op.parsedSignature.getInput(0),
            a?.parsedSignature ? a.parsedSignature.getOutput() : a
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
              kind: "Generic",
            },
            to: {
              type: "Function",
              from: {
                kind: "Generic",
              },
              to: {
                kind: "Generic",
              },
            },
          },
        },

        globalMap
      ),
      symbol: "apply2",
      interactName: "operatorApply2",
      serializer: "integrateddynamics:curry",
      function: (op) => {
        return (arg1) => {
          return (arg2) => {
            op.parsedSignature.typeMap.unify(op.parsedSignature.getInput(0), a);
            op.parsedSignature.typeMap.unify(op.parsedSignature.getInput(1), b);

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
              kind: "Generic",
            },
            to: {
              type: "Function",
              from: {
                kind: "Generic",
              },
              to: {
                type: "Function",
                from: {
                  kind: "Generic",
                },
                to: {
                  kind: "Generic",
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
      function: (op) => {
        return (arg1) => {
          return (arg2) => {
            return (arg3) => {
              op.parsedSignature.typeMap.unify(
                op.parsedSignature.getInput(0),
                a
              );
              op.parsedSignature.typeMap.unify(
                op.parsedSignature.getInput(1),
                b
              );
              op.parsedSignature.typeMap.unify(
                op.parsedSignature.getInput(2),
                c
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
              kind: "Concrete",
              name: "List",
              params: [
                {
                  kind: "Generic",
                },
              ],
            },
            to: { type: "Any", typeID: 3 },
          },
        },

        globalMap
      ),
      symbol: "apply_n",
      interactName: "operatorApply_n",
      serializer: "integrateddynamics:curry",
      function: (op) => {
        return (args) => {
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
          kind: "Generic",
          of: {
            kind: "Operator",
            args: [{ type: "Any", typeID: 1 }],
          },
        },
        { type: "Any", typeID: 1 },

        globalMap
      ),
      symbol: "apply0",
      interactName: "operatorApply0",
      serializer: "integrateddynamics:curry",
      function: (op) => {
        return () => {
          return op.apply();
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
              kind: "Concrete",
              name: "List",
              params: [
                {
                  kind: "Generic",
                },
              ],
            },
            to: {
              kind: "Concrete",
              name: "List",
              params: [
                {
                  kind: "Generic",
                },
              ],
            },
          },
        },

        globalMap
      ),
      symbol: "map",
      interactName: "operatorMap",
      function: (op) => {
        return (list) => {
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
              kind: "Concrete",
              name: "List",
              params: [
                {
                  kind: "Generic",
                },
              ],
            },
            to: {
              kind: "Concrete",
              name: "List",
              params: [
                {
                  kind: "Generic",
                },
              ],
            },
          },
        },

        globalMap
      ),
      symbol: "filter",
      interactName: "operatorFilter",
      function: (predicate) => {
        return (list) => {
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
      function: (predicate1) => {
        return (predicate2) => {
          return (input) => {
            return predicate1.apply(input) && predicate2.apply(input);
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
      function: (predicate1) => {
        return (predicate2) => {
          return (input) => {
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
      function: (predicate) => {
        return (input) => {
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
      function: (f) => {
        return (g) => {
          f.parsedSignature.pipe(g.parsedSignature);
          return (x) => {
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
      function: (f) => {
        return (g) => {
          return (h) => {
            f.parsedSignature.typeMap.unify(
              f.parsedSignature.getOutput(),
              h.parsedSignature.getInput(0)
            );
            g.parsedSignature.typeMap.unify(
              g.parsedSignature.getOutput(),
              h.parsedSignature.getInput(1)
            );

            return (x) => {
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
      function: (op) => {
        return (arg1) => {
          return (arg2) => {
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
      function: (op) => {
        return (list) => {
          return (startingValue) => {
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
      function: (op) => {
        return (list) => {
          list = [...list];
          let result = list.shift();
          for (let item of list) {
            result = op.apply(result).apply(item);
          }
          return result;
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
      function: (name) => {
        return operatorRegistry.baseOperators.find(
          (op) => op.internalName === name
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
      function: (nbt) => {
        return Object.keys(nbt).length;
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
      function: (nbt) => {
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
      function: (nbt) => {
        return (key) => {
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
      function: (nbt) => {
        return (key) => {
          if (!nbt.hasOwnProperty(key)) {
            throw new Error(`${key} does not exist in ${JSON.stringify(nbt)}`);
          }
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
      function: (nbt) => {
        return (key) => {
          return nbt[key];
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
      function: (nbt) => {
        return (key) => {
          return nbt[key];
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
      function: (nbt) => {
        return (key) => {
          let value = nbt[key];
          if (value.type === "integer") {
            return Integer(value.value);
          }
          throw new Error(`${key} is not an integer in ${nbt.stringify()}`);
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
      function: (nbt) => {
        return (key) => {
          let value = nbt[key];
          if (value.type === "long") {
            return new Long(value.value);
          }
          throw new Error(`${key} is not a long in ${nbt.stringify(nbt)}`);
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
      function: (nbt) => {
        return (key) => {
          let value = nbt[key];
          if (value.type === "double") {
            return Double(value.value);
          }
          throw new Error(`${key} is not a double in ${nbt.stringify()}`);
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
      function: (nbt) => {
        return (key) => {
          return nbt[key];
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
      function: (nbt) => {
        return (key) => {
          return new NBT(nbt[key]);
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
      function: (nbt) => {
        return (key) => {
          let value = nbt[key];
          let list = value.list;
          if (value.ListType != "nbt")
            throw new Error(
              `${key} is not a list of NBT in ${nbt.stringify()}`
            );
          return list.map((v) => new NBT(v));
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
      function: (nbt) => {
        return (key) => {
          let value = nbt[key];
          let list = value.list;
          if (value.ListType != "byte")
            throw new Error(
              `${key} is not a list of byte in ${nbt.stringify()}`
            );
          return list.map((v) => Integer(v));
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
      function: (nbt) => {
        return (key) => {
          let value = nbt[key];
          let list = value.list;
          if (value.ListType != "int")
            throw new Error(
              `${key} is not a list of int in ${nbt.stringify()}`
            );
          return list.map((v) => Integer(v));
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
      function: (nbt) => {
        return (key) => {
          let value = nbt[key];
          let list = value.list;
          if (value.ListType != "long")
            throw new Error(
              `${key} is not a list of long in ${nbt.stringify()}`
            );
          return list.map((v) => new Long(v));
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
      function: (nbt) => {
        return (key) => {
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
    }),
    nbtFromBoolean: new Operator({
      internalName: "integrateddynamics:nbt_from_boolean",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            kind: "Concrete",
            name: "CHANGE ME",
          },
        },

        globalMap
      ),
      symbol: "NBT.from_boolean",
      interactName: "booleanAsNbt",
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
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Item" } },
              to: {
                type: "Ingredients",
              },
            },
          },
        },

        globalMap
      ),
      symbol: "Ingr.with_items",
      interactName: "ingredientsWithItems",
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
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Fluid" } },
              to: {
                type: "Ingredients",
              },
            },
          },
        },

        globalMap
      ),
      symbol: "Ingr.with_fluids",
      interactName: "ingredientsWithFluids",
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
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Long" } },
              to: {
                type: "Ingredients",
              },
            },
          },
        },

        globalMap
      ),
      symbol: "Ingr.with_energies",
      interactName: "ingredientsWithEnergies",
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
    }),
    parseBoolean: new Operator({
      internalName:
        "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.boolean",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: "$type1",
          },
          to: {
            type: "Boolean",
          },
        },

        globalMap
      ),
      symbol: "parse_boolean",
      interactName: "stringParseAsBoolean",
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
            typeID: "$type1",
          },
          to: {
            type: "Double",
          },
        },

        globalMap
      ),
      symbol: "parse_double",
      interactName: "stringParseAsDouble",
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
            typeID: "$type1",
          },
          to: {
            type: "Integer",
          },
        },

        globalMap
      ),
      symbol: "parse_integer",
      interactName: "stringParseAsInteger",
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
            typeID: "$type1",
          },
          to: {
            type: "Long",
          },
        },

        globalMap
      ),
      symbol: "parse_long",
      interactName: "stringParseAsLong",
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
            typeID: "$type1",
          },
          to: {
            type: "NBT",
          },
        },

        globalMap
      ),
      symbol: "parse_nbt",
      interactName: "stringParseAsNbt",
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
              typeID: "$type1",
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: "$type1",
              },
              to: {
                type: "Any",
                typeID: "$type1",
              },
            },
          },
        },

        globalMap
      ),
      symbol: "?",
      interactName: "booleanChoice",
    }),
    generalIdentity: new Operator({
      internalName: "integrateddynamics:general_identity",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: "$type1",
          },
          to: {
            type: "Any",
            typeID: "$type1",
          },
        },

        globalMap
      ),
      symbol: "id",
      interactName: "anyIdentity",
    }),
    generalConstant: new Operator({
      internalName: "integrateddynamics:general_constant",
      nicknames: [],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Any",
            typeID: "$type1",
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: "$type2",
            },
            to: {
              type: "Any",
              typeID: "$type1",
            },
          },
        },

        globalMap
      ),
      symbol: "K",
      interactName: "anyConstant",
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
