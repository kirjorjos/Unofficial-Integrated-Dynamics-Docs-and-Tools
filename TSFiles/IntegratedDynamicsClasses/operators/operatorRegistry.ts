/**
 * TODO: Test that the operators involving regexes work correctly.
 * Test Map and pipe
 */

import { InfiniteList } from "HelperClasses/InfiniteList";
import { Block } from "IntegratedDynamicsClasses/Block";
import { Item } from "IntegratedDynamicsClasses/Item";
import { TypeMap } from "HelperClasses/TypeMap";
import { Double } from "JavaNumberClasses/Double";
import { Integer } from "JavaNumberClasses/Integer";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { JavaMath } from "HelperClasses/Math";
import { RE2 } from "re2-wasm";
import { Long } from "JavaNumberClasses/Long";
import { Ingredients } from "IntegratedDynamicsClasses/Ingredients";
import { Recipe } from "IntegratedDynamicsClasses/Recipe";
import { UniquelyNamed } from "IntegratedDynamicsClasses/UniquelyNamed";
import { Properties } from "IntegratedDynamicsClasses/Properties";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { NullTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { LongTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { ByteTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { DoubleTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { NbtPath } from "IntegratedDynamicsClasses/NBTFunctions/NbtPath";
import { Operator } from "./Operator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "./BaseOperator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { ShortTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag";
import { FloatTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag";

let globalMap = new TypeMap();

let operatorRegistryRawData = {
  LOGICAL_AND: {
    internalName: "integrateddynamics:logical_and",
    nicknames: ["and", "logicalAnd"],
    parsedSignature: {
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
    symbol: "&&",
    interactName: "booleanAnd",
    function: (bool1: iBoolean): TypeLambda<iBoolean, iBoolean> => {
      return (bool2: iBoolean): iBoolean => {
        return bool1 && bool2;
      };
    },
  },
  LOGICAL_OR: {
    internalName: "integrateddynamics:logical_or",
    nicknames: ["or", "logicalOr"],
    parsedSignature: {
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
    symbol: "||",
    interactName: "booleanOr",
    function: (bool1: iBoolean): TypeLambda<iBoolean, iBoolean> => {
      return (bool2: iBoolean): iBoolean => {
        return bool1 || bool2;
      };
    },
  },
  LOGICAL_NOT: {
    internalName: "integrateddynamics:logical_not",
    nicknames: ["not", "logicalNot"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Boolean",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "!",
    interactName: "booleanNot",
    function: (bool: iBoolean): iBoolean => {
      return new iBoolean(!bool.valueOf());
    },
  },
  LOGICAL_NAND: {
    internalName: "integrateddynamics:logical_nand",
    nicknames: ["nand", "logicalNand"],
    parsedSignature: {
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
    symbol: "!&&",
    interactName: "booleanNand",
    function: (
      func1: TypeLambda<iBoolean, iBoolean>
    ): TypeLambda<
      TypeLambda<iBoolean, iBoolean>,
      TypeLambda<iBoolean, iBoolean>
    > => {
      return (
        func2: TypeLambda<iBoolean, iBoolean>
      ): TypeLambda<iBoolean, iBoolean> => {
        return (input: iBoolean): iBoolean => {
          return new iBoolean(!(func1(input).valueOf() && func2(input)));
        };
      };
    },
  },
  LOGICAL_NOR: {
    internalName: "integrateddynamics:logical_nor",
    nicknames: ["nor", "logicalNor"],
    parsedSignature: {
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
    symbol: "!||",
    interactName: "booleanNor",
    function: (
      func1: TypeLambda<iBoolean, iBoolean>
    ): TypeLambda<
      TypeLambda<iBoolean, iBoolean>,
      TypeLambda<iBoolean, iBoolean>
    > => {
      return (
        func2: TypeLambda<iBoolean, iBoolean>
      ): TypeLambda<iBoolean, iBoolean> => {
        return (input: iBoolean): iBoolean => {
          return new iBoolean(!(func1(input) || func2(input)));
        };
      };
    },
  },
  ARITHMETIC_ADDITION: {
    internalName: "integrateddynamics:arithmetic_addition",
    nicknames: ["add", "arithmeticAddition"],
    parsedSignature: {
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
    symbol: "+",
    interactName: "numberAdd",
    function: async (
      num1: TypeNumber
    ): Promise<TypeLambda<TypeNumber, Promise<TypeNumber>>> => {
      return async (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.add(num1, num2);
      };
    },
  },
  ARITHMETIC_SUBTRACTION: {
    internalName: "integrateddynamics:arithmetic_subtraction",
    nicknames: ["subtract", "arithmeticSubtraction"],
    parsedSignature: {
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
    symbol: "-",
    interactName: "numberSubtract",
    function: (
      num1: TypeNumber
    ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
      return (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.subtract(num1, num2);
      };
    },
  },
  ARITHMETIC_MULTIPLICATION: {
    internalName: "integrateddynamics:arithmetic_multiplication",
    nicknames: ["multiply", "arithmeticMultiplication"],
    parsedSignature: {
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
    symbol: "*",
    interactName: "numberMultiply",
    function: (
      num1: TypeNumber
    ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
      return (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.multiply(num1, num2);
      };
    },
  },
  ARITHMETIC_DIVISION: {
    internalName: "integrateddynamics:arithmetic_division",
    nicknames: ["divide", "arithmeticDivision"],
    parsedSignature: {
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
    symbol: "/",
    interactName: "numberDivide",
    function: (
      num1: TypeNumber
    ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
      return (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.divide(num1, num2);
      };
    },
  },
  ARITHMETIC_MAXIMUM: {
    internalName: "integrateddynamics:arithmetic_maximum",
    nicknames: ["max", "arithmeticMaximum"],
    parsedSignature: {
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
    symbol: "max",
    interactName: "numberMax",
    function: (
      num1: TypeNumber
    ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
      return (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.max(num1, num2);
      };
    },
  },
  ARITHMETIC_MINIMUM: {
    internalName: "integrateddynamics:arithmetic_minimum",
    nicknames: ["min", "arithmeticMinimum"],
    parsedSignature: {
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
    symbol: "min",
    interactName: "numberMin",
    function: (
      num1: TypeNumber
    ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
      return (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.min(num1, num2);
      };
    },
  },
  ARITHMETIC_INCREMENT: {
    internalName: "integrateddynamics:arithmetic_increment",
    nicknames: ["increment", "arithmeticIncrement"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Number",
      },
    },
    symbol: "++",
    interactName: "numberIncrement",
    function: async (num1: TypeNumber): Promise<TypeNumber> => {
      return JavaMath.add(num1, new Integer(1));
    },
  },
  decrement: {
    internalName: "integrateddynamics:arithmetic_decrement",
    nicknames: ["arithmeticDecrement"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Number",
      },
    },
    symbol: "--",
    interactName: "numberDecrement",
    function: async (num1: TypeNumber): Promise<TypeNumber> => {
      return JavaMath.subtract(num1, new Integer(1));
    },
  },
  ARITHMETIC_MODULUS: {
    internalName: "integrateddynamics:arithmetic_modulus",
    nicknames: ["modulus", "arithmeticModulus"],
    parsedSignature: {
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
    symbol: "%",
    interactName: "numberModulus",
    function: (
      num1: TypeNumber
    ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
      return (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.mod(num1, num2);
      };
    },
  },
  DOUBLE_SQRT: {
    internalName: "integrateddynamics:double_sqrt",
    nicknames: ["doubleSqrt"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Double",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "sqrt",
    interactName: "doubleSqrt",
    function: (double: Double): Double => {
      return double.sqrt();
    },
  },
  DOUBLE_POW: {
    internalName: "integrateddynamics:double_pow",
    nicknames: ["doublePow", "doublePow"],
    parsedSignature: {
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
    symbol: "pow",
    interactName: "doublePow",
    function: (base: Double): TypeLambda<Double, Double> => {
      return (exponent: Double): Double => {
        return base.pow(exponent);
      };
    },
  },
  RELATIONAL_EQUALS: {
    internalName: "integrateddynamics:relational_equals",
    nicknames: ["==", "relationalEquals"],
    parsedSignature: {
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
    symbol: "==",
    interactName: "anyEquals",
    function: (
      value1: IntegratedValue
    ): TypeLambda<IntegratedValue, iBoolean> => {
      return (value2: IntegratedValue): iBoolean => {
        return value1.equals(value2);
      };
    },
  },
  ">": {
    internalName: "integrateddynamics:relational_gt",
    nicknames: ["relationalGt"],
    parsedSignature: {
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
    symbol: ">",
    interactName: "numberGreaterThan",
    function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<iBoolean>> => {
      return async (num2: TypeNumber): Promise<iBoolean> => {
        return new iBoolean(await JavaMath.gt(num1, num2));
      };
    },
  },
  "<": {
    internalName: "integrateddynamics:relational_lt",
    nicknames: ["relationalLt"],
    parsedSignature: {
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
    symbol: "<",
    interactName: "numberLessThan",
    function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<iBoolean>> => {
      return async (num2: TypeNumber): Promise<iBoolean> => {
        return new iBoolean(await JavaMath.lt(num1, num2));
      };
    },
  },
  "!=": {
    internalName: "integrateddynamics:relational_notequals",
    nicknames: ["relationalNotequals"],
    parsedSignature: {
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
    symbol: "!=",
    interactName: "anyNotEquals",
    function: (
      value1: IntegratedValue
    ): TypeLambda<IntegratedValue, iBoolean> => {
      return (value2: IntegratedValue): iBoolean => {
        return new iBoolean(!value1.equals(value2));
      };
    },
  },
  ">=": {
    internalName: "integrateddynamics:relational_ge",
    nicknames: ["relationalGe"],
    parsedSignature: {
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
    symbol: ">=",
    interactName: "anyGreaterThanOrEquals",
    function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<iBoolean>> => {
      return async (num2: TypeNumber): Promise<iBoolean> => {
        return new iBoolean(await JavaMath.gte(num1, num2));
      };
    },
  },
  "<=": {
    internalName: "integrateddynamics:relational_le",
    nicknames: ["relationalLe"],
    parsedSignature: {
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
    symbol: "<=",
    interactName: "anyLessThanOrEquals",
    function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<iBoolean>> => {
      return async (num2: TypeNumber): Promise<iBoolean> => {
        return new iBoolean(await JavaMath.lte(num1, num2));
      };
    },
  },
  BINARY_AND: {
    internalName: "integrateddynamics:binary_and",
    nicknames: ["binaryAnd"],
    parsedSignature: {
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
    symbol: "&",
    interactName: "integerBinaryAnd",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return int1.binaryAnd(int2);
      };
    },
  },
  BINARY_OR: {
    nicknames: ["binaryOr"],
    parsedSignature: {
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
    symbol: "|",
    interactName: "integerBinaryOr",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return int1.binaryOr(int2);
      };
    },
  },
  BINARY_XOR: {
    internalName: "integrateddynamics:binary_xor",
    nicknames: ["binaryXor"],
    parsedSignature: {
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
    symbol: "^",
    interactName: "integerXor",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return int1.binaryXor(int2);
      };
    },
  },
  BINARY_COMPLEMENT: {
    internalName: "integrateddynamics:binary_complement",
    nicknames: ["binaryComplement"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "~",
    interactName: "integerComplement",
    function: (int: Integer): Integer => {
      return int.binaryComplement();
    },
  },
  BINARY_LSHIFT: {
    internalName: "integrateddynamics:binary_lshift",
    nicknames: ["<<", "binaryLshift"],
    parsedSignature: {
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
    symbol: "<<",
    interactName: "integerLeftShift",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return int1.leftShift(int2);
      };
    },
  },
  BINARY_RSHIFT: {
    internalName: "integrateddynamics:binary_rshift",
    nicknames: [">>", "binaryRshift"],
    parsedSignature: {
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
    symbol: ">>",
    interactName: "integerRightShift",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return int1.rightShift(int2);
      };
    },
  },
  BINARY_RZSHIFT: {
    internalName: "integrateddynamics:binary_rzshift",
    nicknames: [">>>", "binaryRzshift"],
    parsedSignature: {
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
    symbol: ">>>",
    interactName: "integerUnsignedRightShift",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return new Integer(int1.unsignedRightShift(int2));
      };
    },
  },
  STRING_LENGTH: {
    internalName: "integrateddynamics:string_length",
    nicknames: ["stringLength"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "len",
    interactName: "stringLength",
    function: (str: string): TypeNumber => {
      return new Integer(str.length);
    },
  },
  STRING_CONCAT: {
    internalName: "integrateddynamics:string_concat",
    nicknames: ["stringConcat"],
    parsedSignature: {
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
    symbol: "+",
    interactName: "stringConcat",
    function: (str1: string): TypeLambda<string, string> => {
      return (str2: string): string => {
        return str1.concat(str2);
      };
    },
  },
  STRING_CONTAINS: {
    internalName: "integrateddynamics:string_contains",
    nicknames: ["stringContains"],
    parsedSignature: {
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
    symbol: "contains",
    interactName: "stringContains",
    function: (substring: string): TypeLambda<string, iBoolean> => {
      return (fullString: string): iBoolean => {
        return new iBoolean(fullString.includes(substring));
      };
    },
  },
  STRING_CONTAINS_REGEX: {
    internalName: "integrateddynamics:string_contains_regex",
    nicknames: ["containsRegex"],
    parsedSignature: {
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
    symbol: "contains_regex",
    interactName: "stringContainsRegex",
    function: (regexString: string): TypeLambda<string, iBoolean> => {
      return (fullString: string): iBoolean => {
        const regex = new RE2(regexString, "u");
        return new iBoolean(regex.test(fullString));
      };
    },
  },
  STRING_MATCHES_REGEX: {
    internalName: "integrateddynamics:string_matches_regex",
    nicknames: ["matchesRegex"],
    parsedSignature: {
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
    symbol: "matches_regex",
    interactName: "stringMatchesRegex",
    function: (regexString: string): TypeLambda<string, iBoolean> => {
      return (fullString: string): iBoolean => {
        if (regexString.startsWith("^")) regexString = regexString.slice(1);
        if (regexString.endsWith("$")) regexString = regexString.slice(0, -1);
        const regex = new RE2(`^(?:${regexString})$`, "u");
        return new iBoolean(regex.test(fullString));
      };
    },
  },
  STRING_INDEX_OF: {
    internalName: "integrateddynamics:string_index_of",
    nicknames: ["stringIndexOf"],
    parsedSignature: {
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
    symbol: "index_of",
    interactName: "stringIndexOf",
    function: (substring: string): TypeLambda<string, TypeNumber> => {
      return (fullString: string): TypeNumber => {
        return new Integer(fullString.indexOf(substring));
      };
    },
  },
  STRING_INDEX_OF_REGEX: {
    internalName: "integrateddynamics:string_index_of_regex",
    nicknames: ["indexOfRegex", "stringIndexOfRegex"],
    parsedSignature: {
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
    symbol: "index_of_regex",
    interactName: "stringIndexOfRegex",
    function: (regexString: string): TypeLambda<string, TypeNumber> => {
      return (fullString: string): TypeNumber => {
        const regex = new RE2(regexString, "u");
        return new Integer(fullString.search(regex));
      };
    },
  },
  STRING_STARTS_WITH: {
    internalName: "integrateddynamics:string_starts_with",
    nicknames: ["startsWith", "stringStartsWith"],
    parsedSignature: {
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
    symbol: "starts_with",
    interactName: "stringStartsWith",
    function: (substring: string): TypeLambda<string, iBoolean> => {
      return (fullString: string): iBoolean => {
        return new iBoolean(fullString.startsWith(substring));
      };
    },
  },
  STRING_ENDS_WITH: {
    internalName: "integrateddynamics:string_ends_with",
    nicknames: ["endsWith", "stringEndsWith"],
    parsedSignature: {
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
    symbol: "ends_with",
    interactName: "stringEndsWith",
    function: (substring: string): TypeLambda<string, iBoolean> => {
      return (fullString: string): iBoolean => {
        return new iBoolean(fullString.endsWith(substring));
      };
    },
  },
  STRING_SPLIT_ON: {
    internalName: "integrateddynamics:string_split_on",
    nicknames: ["stringSplitOn"],
    parsedSignature: {
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
    symbol: "split_on",
    interactName: "stringSplitOn",
    function: (delimiter: string): TypeLambda<string, Array<string>> => {
      return (fullString: string): Array<string> => {
        return fullString.split(delimiter);
      };
    },
  },
  STRING_SPLIT_ON_REGEX: {
    internalName: "integrateddynamics:string_split_on_regex",
    nicknames: ["stringSplitOnRegex"],
    parsedSignature: {
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
    symbol: "split_on_regex",
    interactName: "stringSplitOnRegex",
    function: (regexString: string): TypeLambda<string, Array<string>> => {
      return (fullString: string): Array<string> => {
        const regex = new RE2(regexString, "u");
        return regex.split(fullString) as string[];
      };
    },
  },
  STRING_SUBSTRING: {
    internalName: "integrateddynamics:string_substring",
    nicknames: ["substring", "stringSubstring"],
    parsedSignature: {
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
  },
  STRING_REGEX_GROUP: {
    internalName: "integrateddynamics:string_regex_group",
    nicknames: ["stringRegexGroup"],
    parsedSignature: {
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
    symbol: "regex_group",
    interactName: "stringRegexGroup",
    function: (regexString: string) => {
      return (groupIndex: TypeNumber) => {
        return (fullString: string) => {
          const regex = new RE2(regexString, "u");
          const match = regex.exec(fullString);
          if (match && match[parseInt(groupIndex.toDecimal())] !== undefined) {
            return match[parseInt(groupIndex.toDecimal())];
          } else {
            throw new Error(
              `No match found for group index ${groupIndex.toDecimal()} in regex "${regexString}" on string "${fullString}"`
            );
          }
        };
      };
    },
  },
  STRING_REGEX_GROUPS: {
    internalName: "integrateddynamics:string_regex_groups",
    nicknames: ["stringRegexGroups", "stringRegexGroups"],
    parsedSignature: {
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
  },
  STRING_REGEX_SCAN: {
    internalName: "integrateddynamics:string_regex_scan",
    nicknames: ["stringRegexScan"],
    parsedSignature: {
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
    symbol: "regex_scan",
    interactName: "stringRegexScan",
    function: (regexString: string) => {
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
  },
  STRING_REPLACE: {
    internalName: "integrateddynamics:string_replace",
    nicknames: ["stringReplace"],
    parsedSignature: {
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
  },
  STRING_REPLACE_REGEX: {
    internalName: "integrateddynamics:string_replace_regex",
    nicknames: ["stringReplaceRegex"],
    parsedSignature: {
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
    symbol: "replace_regex",
    interactName: "stringReplaceRegex",
    function: (regexString: string) => {
      return (replacementString: string): TypeLambda<string, string> => {
        return (fullString: string): string => {
          const regex = new RE2(regexString, "u");
          return fullString.replace(regex, replacementString);
        };
      };
    },
  },
  STRING_JOIN: {
    internalName: "integrateddynamics:string_join",
    nicknames: ["stringJoin"],
    parsedSignature: {
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
  },
  NAMED_NAME: {
    internalName: "integrateddynamics:string_name",
    nicknames: ["name", "namedName", "toString"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Named",
      },
      to: {
        type: "String",
      },
    },
    symbol: "name",
    interactName: "namedName",
    function: (named: TypeRawSignatureAST.RawSignatureNamed): string => {
      return named.toString();
    },
  },
  UNIQUELY_NAMED_UNIQUE_NAME: {
    internalName: "integrateddynamics:string_unique_name",
    nicknames: ["uname", "uniquelynamedUniquename"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "UniquelyNamed",
      },
      to: {
        type: "String",
      },
    },
    symbol: "uname",
    interactName: "uniquely_namedUniqueName",
    function: (uniquelyNamed: UniquelyNamed): string => {
      return uniquelyNamed.getUniqueName();
    },
  },
  STRING_ERROR: {
    internalName: "integrateddynamics:string_string_error",
    nicknames: ["error", "string_error"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: { type: "Any", typeID: 1 },
    },
    symbol: "error",
    interactName: "stringStringError",
    function: (message: string): never => {
      throw new Error(`Error: ${message}`);
    },
  },
  NUMBER_ROUND: {
    internalName: "integrateddynamics:number_round",
    nicknames: ["round", "numberRound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "|| ||",
    interactName: "numberRound",
    function: (number: TypeNumber): Promise<Integer> => {
      return number.round();
    },
  },
  NUMBER_CEIL: {
    internalName: "integrateddynamics:number_ceil",
    nicknames: ["ceil", "numberCeil"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "⌈ ⌉",
    interactName: "numberCeil",
    function: (number: TypeNumber): Promise<Integer> => {
      return number.ceil();
    },
  },
  NUMBER_FLOOR: {
    internalName: "integrateddynamics:number_floor",
    nicknames: ["floor", "numberFloor"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "⌊ ⌋",
    interactName: "numberFloor",
    function: (number: TypeNumber): Promise<Integer> => {
      return number.floor();
    },
  },
  NUMBER_COMPACT: {
    internalName: "integrateddynamics:number_compact",
    nicknames: ["compact", "numberCompact"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "String",
      },
    },
    symbol: "compact",
    interactName: "numberCompact",
    function: (number: TypeNumber): string => {
      return number.toDecimal().toString();
    },
  },
  NULLABLE_ISNULL: {
    internalName: "integrateddynamics:general_isnull",
    nicknames: ["isNull", "nullableIsnull", "GENERAL_IS_NULL"],
    parsedSignature: {
      type: "Function",
      from: { type: "Any", typeID: 1 },
      to: {
        type: "Boolean",
      },
    },
    symbol: "o",
    interactName: "anyIsNull",
    function: (value: IntegratedValue): iBoolean => {
      return new iBoolean(value === null || value === undefined);
    },
  },
  NULLABLE_ISNOTNULL: {
    internalName: "integrateddynamics:general_isnotnull",
    nicknames: ["isNotNull", "nullableIsnotnull"],
    parsedSignature: {
      type: "Function",
      from: { type: "Any", typeID: 1 },
      to: {
        type: "Boolean",
      },
    },
    symbol: "∅",
    interactName: "anyIsNotNull",
    function: (value: IntegratedValue): iBoolean => {
      return new iBoolean(value !== null && value !== undefined);
    },
  },
  LIST_LENGTH: {
    internalName: "integrateddynamics:list_length",
    nicknames: ["listLength"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Integer",
      },
    },
    symbol: "| |",
    interactName: "listLength",
    function: (list: Array<IntegratedValue>) => {
      return list.length;
    },
  },
  LIST_EMPTY: {
    internalName: "integrateddynamics:list_empty",
    nicknames: ["listEmpty"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Boolean",
      },
    },
    symbol: "∅",
    interactName: "listIsEmpty",
    function: (list: Array<IntegratedValue>): iBoolean => {
      return new iBoolean(list.length === 0);
    },
  },
  LIST_NOT_EMPTY: {
    internalName: "integrateddynamics:list_notempty",
    nicknames: ["listNotEmpty"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Boolean",
      },
    },
    symbol: "o",
    interactName: "listIsNotEmpty",
    function: (list: Array<IntegratedValue>): iBoolean => {
      return new iBoolean(list.length > 0);
    },
  },
  LIST_ELEMENT: {
    internalName: "integrateddynamics:list_get",
    nicknames: ["listElement", "get"],
    parsedSignature: {
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
    symbol: "get",
    interactName: "listGet",
    function: <T>(index: Integer): TypeLambda<Array<T>, Promise<T>> => {
      return async (list: Array<T>): Promise<T> => {
        if (
          (await index.lt(new Integer(0))) ||
          (await index.lte(new Integer(list.length)))
        ) {
          throw new Error(
            `Index ${index} out of bounds for list of length ${list.length}`
          );
        }
        return list[parseInt(index.toDecimal())] as T;
      };
    },
  },
  LIST_ELEMENT_DEFAULT: {
    internalName: "integrateddynamics:list_get_or_default",
    nicknames: ["listElementDefault", "get_or_default", "getOrDefault"],
    parsedSignature: {
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
    symbol: "get_or_default",
    interactName: "listGetOrDefault",
    function: async <T>(
      list: Array<T>
    ): Promise<TypeLambda<Integer, Promise<TypeLambda<T, Promise<T>>>>> => {
      return async (index: Integer): Promise<TypeLambda<T, Promise<T>>> => {
        return async (defaultValue: T): Promise<T> => {
          if (
            (await JavaMath.lt(index, new Integer(0))) ||
            (await JavaMath.gte(index, new Integer(list.length)))
          ) {
            return defaultValue;
          }
          return list[parseInt(index.toDecimal())] as T;
        };
      };
    },
  },
  LIST_CONTAINS: {
    internalName: "integrateddynamics:list_contains",
    nicknames: ["listContains"],
    parsedSignature: {
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
    symbol: "contains",
    interactName: "listContains",
    function: <T>(list: Array<T>): TypeLambda<T, iBoolean> => {
      return (element: T): iBoolean => {
        return new iBoolean(list.includes(element));
      };
    },
  },
  LIST_CONTAINS_PREDICATE: {
    internalName: "integrateddynamics:list_contains_p",
    nicknames: ["listContainsP", "listContainsPredicate"],
    parsedSignature: {
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
    symbol: "contains_p",
    interactName: "listContainsPredicate",
    function: (predicate: Predicate): TypeLambda<Array<IntegratedValue>, iBoolean> => {
      return (list: Array<IntegratedValue>): iBoolean => {
        return new iBoolean(list.some((item) => predicate.apply(item).valueOf()));
      };
    },
  },
  LIST_COUNT: {
    internalName: "integrateddynamics:list_count",
    nicknames: ["listCount"],
    parsedSignature: {
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
    symbol: "count",
    interactName: "listCount",
    function: <T>(list: Array<T>): TypeLambda<T, Integer> => {
      return (element: T): Integer => {
        return new Integer(list.filter((item) => item === element).length);
      };
    },
  },
  LIST_COUNT_PREDICATE: {
    internalName: "integrateddynamics:list_count_p",
    nicknames: ["listCountPredicate"],
    parsedSignature: {
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
    symbol: "count_p",
    interactName: "listCountPredicate",
    function: (
      list: Array<IntegratedValue>
    ): TypeLambda<TypeLambda<IntegratedValue, iBoolean>, Integer> => {
      return (predicate: Predicate): Integer => {
        return new Integer(list.filter((item) => predicate.apply(item)).length);
      };
    },
  },
  LIST_APPEND: {
    internalName: "integrateddynamics:list_append",
    nicknames: ["listAppend", "append"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: { type: "List", listType: { type: "Any", typeID: 1 } },
      },
    },
    symbol: "append",
    interactName: "listAppend",
    function: <T>(list: Array<T>): TypeLambda<T, Array<T>> => {
      return (element: T): Array<T> => {
        return [...list, element];
      };
    },
  },
  LIST_CONCAT: {
    internalName: "integrateddynamics:list_concat",
    nicknames: ["listConcat"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: { type: "List", listType: { type: "Any", typeID: 1 } },
      },
    },
    symbol: "concat",
    interactName: "listConcat",
    function: <T>(list1: Array<T>): TypeLambda<Array<T>, Array<T>> => {
      return (list2: Array<T>): Array<T> => {
        return [...list1, ...list2];
      };
    },
  },
  LIST_LAZYBUILT: {
    internalName: "integrateddynamics:list_lazybuilt",
    nicknames: ["listLazybuilt", "lazybuilt"],
    parsedSignature: {
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
    symbol: "lazybuilt",
    interactName: "anyLazyBuilt",
    function: <T>(
      initial: T
    ): TypeLambda<TypeLambda<T, T>, InfiniteList<T>> => {
      return (builder: TypeLambda<T, T>): InfiniteList<T> => {
        return new InfiniteList(initial, builder);
      };
    },
  },
  LIST_HEAD: {
    internalName: "integrateddynamics:list_head",
    nicknames: ["listHead", "head"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: { type: "Any", typeID: 1 },
    },
    symbol: "head",
    interactName: "listHead",
    function: <T>(list: Array<T>): T => {
      if (list.length === 0) {
        throw new Error("head called on an empty list");
      }
      return list[0] as T;
    },
  },
  LIST_TAIL: {
    internalName: "integrateddynamics:list_tail",
    nicknames: ["listTail", "tail"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: { type: "List", listType: { type: "Any", typeID: 1 } },
    },
    symbol: "tail",
    interactName: "listTail",
    function: <T>(list: Array<T>): Array<T> => {
      if (list.length === 0) {
        throw new Error("tail called on an empty list");
      }
      return list.slice(1);
    },
  },
  LIST_UNIQ_PREDICATE: {
    internalName: "integrateddynamics:list_uniq_p",
    nicknames: ["listUniqPredicate"],
    parsedSignature: {
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
    symbol: "uniq_p",
    interactName: "listUniquePredicate",
    function: (
      list: Array<IntegratedValue>
    ): TypeLambda<TypeLambda<IntegratedValue, iBoolean>, Array<IntegratedValue>> => {
      return (predicate: Predicate): Array<IntegratedValue> => {
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
  },
  LIST_UNIQ: {
    internalName: "integrateddynamics:list_uniq",
    nicknames: ["listUniq"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: { type: "List", listType: { type: "Any", typeID: 1 } },
    },
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
  },
  LIST_SLICE: {
    internalName: "integrateddynamics:list_slice",
    nicknames: ["listSlice", "slice"],
    parsedSignature: {
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
    symbol: "slice",
    interactName: "listSlice",
    function: async <T>(
      list: Array<T>
    ): Promise<
      TypeLambda<Integer, Promise<TypeLambda<Integer, Promise<Array<T>>>>>
    > => {
      return async (
        start: Integer
      ): Promise<TypeLambda<Integer, Promise<Array<T>>>> => {
        return async (end: Integer): Promise<Array<T>> => {
          if (
            (await JavaMath.lt(start, new Integer(0))) ||
            (await JavaMath.gt(end, new Integer(list.length))) ||
            (await JavaMath.gt(start, end))
          ) {
            throw new Error(
              `Invalid slice range: [${start.toDecimal()}, ${end.toDecimal()}) for list of length ${list.length}`
            );
          }
          return list.slice(
            parseInt(start.toDecimal()),
            parseInt(end.toDecimal())
          );
        };
      };
    },
  },
  LIST_INTERSECTION: {
    internalName: "integrateddynamics:list_intersection",
    nicknames: ["listIntersection", "intersection"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: { type: "List", listType: { type: "Any", typeID: 1 } },
      },
    },
    symbol: "∩",
    interactName: "listIntersection",
    function: <T>(list1: Array<T>): TypeLambda<Array<T>, Array<T>> => {
      return (list2: Array<T>): Array<T> => {
        const set1 = new Set(list1);
        return list2.filter((item) => set1.has(item));
      };
    },
  },
  LIST_EQUALS_SET: {
    internalName: "integrateddynamics:list_equals_set",
    nicknames: ["listEqualsSet", "equalsSet"],
    parsedSignature: {
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
    symbol: "=set=",
    interactName: "listEquals_set",
    function: <T extends IntegratedValue>(
      list1: Array<T>
    ): TypeLambda<Array<T>, iBoolean> => {
      return (list2: Array<T>): iBoolean => {
        const set1 = new Set(list1);
        const set2 = new Set(list2);
        if (
          set1.size !== set2.size ||
          set1.size !== new Set([...set1, ...set2]).size
        )
          return new iBoolean(false);
        return new iBoolean(true);
      };
    },
  },
  LIST_EQUALS_MULTISET: {
    internalName: "integrateddynamics:list_equals_multiset",
    nicknames: ["listEqualsMultiset", "equalsMultiset"],
    parsedSignature: {
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
    symbol: "=multiset=",
    interactName: "listEquals_multiset",
    function: <T extends { equals: Function | undefined }>(
      list1: Array<T>
    ): TypeLambda<Array<T>, iBoolean> => {
      return (list2: Array<T>): iBoolean => {
        const newList1 = [...list1].sort();
        const newList2 = [...list2].sort();
        if (newList1.length !== newList2.length) {
          return new iBoolean(false);
        }
        for (let i = 0; i < newList1.length; i++) {
          if (!newList1[i] || !newList2[i]) {
            return new iBoolean(false);
          } else if (
            "equals" in (newList1[i] as T) &&
            typeof (newList1[i] as T).equals === "function"
          ) {
            if (!((newList1[i] as T).equals as Function)(newList2[i])) {
              return new iBoolean(false);
            }
          } else if (newList1[i] !== newList2[i]) {
            return new iBoolean(false);
          }
        }
        return new iBoolean(true);
      };
    },
  },  OBJECT_BLOCK_OPAQUE: {
    internalName: "integrateddynamics:block_opaque",
    nicknames: ["BlockOpaque", "opaque"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "opaque",
    interactName: "blockIsOpaque",
    function: (block: Block): iBoolean => {
      return block.isOpaque();
    },
  },
  OBJECT_BLOCK_ITEMSTACK: {
    internalName: "integrateddynamics:block_itemstack",
    nicknames: [
      "BlockItemstack",
      "block_item",
      "blockItemstack",
      "block_itemstack",
      "blockItem"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "itemstack",
    interactName: "blockItemStack",
    function: (block: Block): Item => {
      return block.getItem();
    },
  },
  OBJECT_BLOCK_MODNAME: {
    internalName: "integrateddynamics:block_mod",
    nicknames: ["BlockModname", "block_mod", "blockMod", "block_modname", "blockMod"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "String",
      },
    },
    symbol: "mod",
    interactName: "blockMod",
    function: (block: Block): string => {
      return block.getModName();
    },
  },
  OBJECT_BLOCK_BREAKSOUND: {
    internalName: "integrateddynamics:block_breaksound",
    nicknames: ["BlockBreaksound", "block_break_sound", "blockBreakSound", "breakSound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "String",
      },
    },
    symbol: "break_sound",
    interactName: "blockBreakSound",
    function: (block: Block): string => {
      return block.getBreakSound();
    },
  },
  OBJECT_BLOCK_PLACESOUND: {
    internalName: "integrateddynamics:block_placesound",
    nicknames: ["BlockPlacesound", "blockPlaceSound", "block_place_sound", "placeSound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "String",
      },
    },
    symbol: "place_sound",
    interactName: "blockPlaceSound",
    function: (block: Block): string => {
      return block.getPlaceSound();
    },
  },
  OBJECT_BLOCK_STEPSOUND: {
    internalName: "integrateddynamics:block_stepsound",
    nicknames: ["BlockStepsound", "blockStepSound", "block_step_sound", "stepSound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "String",
      },
    },
    symbol: "step_sound",
    interactName: "blockStepSound",
    function: (block: Block): string => {
      return block.getStepSound();
    },
  },
  OBJECT_BLOCK_ISSHEARABLE: {
    internalName: "integrateddynamics:block_isshearable",
    nicknames: ["BlockIsshearable", "block_is_shearable", "blockIsShearable", "blockIsShearable"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_shearable",
    interactName: "blockIsShearable",
    function: (block: Block): iBoolean => {
      return block.isShearable();
    },
  },
  OBJECT_BLOCK_PLANTAGE: {
    internalName: "integrateddynamics:block_plantage",
    nicknames: ["BlockPlantage", "block_plant_age", "blockPlantAge", "plantAge"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "plant_age",
    interactName: "blockPlantAge",
    function: (block: Block): Integer => {
      return block.getPlantAge();
    },
  },
  OBJECT_BLOCK_BY_NAME: {
    internalName: "integrateddynamics:block_blockbyname",
    nicknames: ["BlockByName", "block_by_name", "blockByName"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Block",
      },
    },
    symbol: "block_by_name",
    interactName: "stringBlockByName",
    function: (): never => {
      throw new Error(
        "Block by name is infeasible without a registry. This is a placeholder function."
      );
    },
  },
  OBJECT_BLOCK_PROPERTIES: {
    internalName: "integrateddynamics:block_blockproperties",
    nicknames: ["BlockProperties", "block_properties", "blockProperties"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "block_props",
    interactName: "blockProperties",
    function: (block: Block): Properties => {
      return block.getProperties();
    },
  },
  OBJECT_BLOCK_WITH_PROPERTIES: {
    internalName: "integrateddynamics:block_blockfromproperties",
    nicknames: ["BlockWithProperties", "block_with_properties", "blockWithProperties"],
    parsedSignature: {
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
    symbol: "block_with_props",
    interactName: "blockWithProperties",
    function: (block: Block) => {
      return (properties: Properties): Block => {
        return new Block(properties, block);
      };
    },
  },
  OBJECT_BLOCK_POSSIBLE_PROPERTIES: {
    internalName: "integrateddynamics:block_blockpossibleproperties",
    nicknames: ["BlockPossibleProperties", "block_possible_properties", "blockPossibleProperties"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "block_all_props",
    interactName: "blockPossibleProperties",
    function: (): never => {
      throw new Error(
        "Block possible properties is infeasible without a registry. This is a placeholder function."
      );
    },
  },
  OBJECT_BLOCK_TAG: {
    internalName: "integrateddynamics:block_tag",
    nicknames: ["BlockTag", "blockTag"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "block_tag_names",
    interactName: "blockTags",
    function: (block: Block): string[] => {
      return block.getTagNames();
    },
  },
  OBJECT_BLOCK_TAG_STACKS: {
    internalName: "integrateddynamics:string_blocktag",
    nicknames: ["BlockTagStacks", "block_tag_stacks", "blockTagStacks"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: { type: "List", listType: { type: "Block" } },
    },
    symbol: "block_tag_values",
    interactName: "stringBlocksByTag",
    function: (): never => {
      throw new Error(
        "Block tag values is infeasible without a registry. This is a placeholder function."
      );
    },
  },
  OBJECT_ITEMSTACK_SIZE: {
    internalName: "integrateddynamics:itemstack_size",
    nicknames: ["ItemstackSize", "itemstack_size", "itemstackSize", "size"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "size",
    interactName: "itemstackSize",
    function: (item: Item): Integer => {
      return item.getSize();
    },
  },
  OBJECT_ITEMSTACK_MAXSIZE: {
    internalName: "integrateddynamics:itemstack_maxsize",
    nicknames: ["ItemstackMaxsize", "itemstack_max_size", "itemstackMaxSize", "maxSize"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "maxsize",
    interactName: "itemstackMaxSize",
    function: (item: Item): Integer => {
      return item.getMaxSize();
    },
  },
  OBJECT_ITEMSTACK_ISSTACKABLE: {
    internalName: "integrateddynamics:itemstack_stackable",
    nicknames: [
      "ItemstackIsstackable",
      "itemstack_is_stackable",
      "itemstackIsStackable",
      "isStackable"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "stackable",
    interactName: "itemstackIsStackable",
    function: (item: Item): iBoolean => {
      return item.isStackable();
    },
  },
  OBJECT_ITEMSTACK_ISDAMAGEABLE: {
    internalName: "integrateddynamics:itemstack_damageable",
    nicknames: [
      "ItemstackIsdamageable",
      "itemstack_is_damageable",
      "itemstackIsDamageable",
      "isDamageable"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "damageable",
    interactName: "itemstackIsDamageable",
    function: (item: Item): iBoolean => {
      return item.isDamageable();
    },
  },
  OBJECT_ITEMSTACK_DAMAGE: {
    internalName: "integrateddynamics:itemstack_damage",
    nicknames: ["ItemstackDamage", "itemstack_damage", "itemstackDamage", "damage"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "damage",
    interactName: "itemstackDamage",
    function: (item: Item): Integer => {
      return item.getDamage();
    },
  },
  OBJECT_ITEMSTACK_MAXDAMAGE: {
    internalName: "integrateddynamics:itemstack_maxdamage",
    nicknames: [
      "ItemstackMaxdamage",
      "itemstack_max_damage",
      "itemstackMaxDamage",
      "maxDamage"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "max_damage",
    interactName: "itemstackMaxDamage",
    function: (item: Item): Integer => {
      return item.getMaxDamage();
    },
  },
  OBJECT_ITEMSTACK_ISENCHANTED: {
    internalName: "integrateddynamics:itemstack_enchanted",
    nicknames: [
      "ItemstackIsenchanted",
      "itemstack_is_enchanted",
      "itemstackIsEnchanted",
      "isEnchanted",
      "enchanted"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "enchanted",
    interactName: "itemstackIsEnchanted",
    function: (item: Item): iBoolean => {
      return item.isEnchanted();
    },
  },
  OBJECT_ITEMSTACK_ISENCHANTABLE: {
    internalName: "integrateddynamics:itemstack_enchantable",
    nicknames: [
      "ItemstackIsenchantable",
      "itemstack_is_enchantable",
      "itemstackIsEnchantable",
      "enchantable"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "enchantable",
    interactName: "itemstackIsEnchantable",
    function: (item: Item): iBoolean => {
      return item.isEnchantable();
    },
  },
  OBJECT_ITEMSTACK_REPAIRCOST: {
    internalName: "integrateddynamics:itemstack_repaircost",
    nicknames: [
      "ItemstackRepaircost",
      "itemstack_repair_cost",
      "itemstackRepairCost",
      "repairCost"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "repair_cost",
    interactName: "itemstackRepairCost",
    function: (item: Item): Integer => {
      return item.getRepairCost();
    },
  },
  OBJECT_ITEMSTACK_RARITY: {
    internalName: "integrateddynamics:itemstack_rarity",
    nicknames: ["ItemstackRarity", "itemstack_rarity", "itemstackRarity", "rarity"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "String",
      },
    },
    symbol: "rarity",
    interactName: "itemstackRarity",
    function: (item: Item): string => {
      return item.getRarity();
    },
  },
  OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK: {
    internalName: "integrateddynamics:itemstack_strength",
    nicknames: [
      "ItemstackStrengthVsBlock",
      "itemstack_strength_vs_block",
      "itemstackStrengthVsBlock",
      "strengthVsBlock"
    ],
    parsedSignature: {
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
    symbol: "strength",
    interactName: "itemstackStrength",
    function: (item: Item): TypeLambda<Block, Promise<void>> => {
      return (block: Block): Promise<void> => {
        return item.getStrengthVsBlock(block);
      };
    },
  },
  OBJECT_ITEMSTACK_CANHARVESTBLOCK: {
    internalName: "integrateddynamics:itemstack_canharvest",
    nicknames: [
      "ItemstackCanHarvestBlock",
      "itemstack_can_harvest_block",
      "itemstackCanHarvestBlock",
      "canHarvestBlock"
    ],
    parsedSignature: {
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
    symbol: "can_harvest",
    interactName: "itemstackCanHarvest",
    function: (item: Item): TypeLambda<Block, void> => {
      return (block: Block): void => {
        return item.canHarvestBlock(block);
      };
    },
  },
  OBJECT_ITEMSTACK_BLOCK: {
    internalName: "integrateddynamics:itemstack_block",
    nicknames: ["ItemstackBlock", "itemstack_block", "itemstackBlock", "itemBlock"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Block",
      },
    },
    symbol: "block",
    interactName: "itemstackBlock",
    function: (item: Item): Block => {
      return new Block(new Properties({}), item.getBlock());
    },
  },
  OBJECT_ITEMSTACK_ISFLUIDSTACK: {
    internalName: "integrateddynamics:itemstack_isfluidstack",
    nicknames: [
      "ItemstackIsfluidstack",
      "itemstack_is_fluidstack",
      "itemstackIsFluidstack",
      "itemHasFluid",
      "isFluidstack"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_fluidstack",
    interactName: "itemstackIsFluidStack",
    function: (item: Item): iBoolean => {
      return new iBoolean(item.getFluid() !== null);
    },
  },
  itemFluid: {
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
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Fluid",
      },
    },
    symbol: "fluidstack",
    interactName: "itemstackFluidStack",
    function: (item: Item): Fluid => {
      return item.getFluid();
    },
  },
  fluidCapacity: {
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
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "fluidstack_capacity",
    interactName: "itemstackFluidCapacity",
    function: (item: Item): Integer => {
      return item.getFluidCapacity();
    },
  },
  "=NBT=": {
    internalName: "integrateddynamics:itemstack_isnbtequal",
    nicknames: [
      "ItemstackIsdataequal",
      "itemstack_is_dataequal",
      "itemstackIsDataequal",
    ],
    parsedSignature: {
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
    symbol: "=NBT=",
    interactName: "itemstackIsNbtEqual",
    function: (item1: Item): TypeLambda<Item, Boolean> => {
      return (item2: Item): iBoolean => {
        return item1.getNBT().equals(item2.getNBT());
      };
    },
  },
  "=NoNBT=": {
    internalName: "integrateddynamics:itemstack_isitemequalnonbt",
    nicknames: [
      "ItemstackIsitemequalnodata",
      "itemstack_is_itemequalnodata",
      "itemstackIsItemequalnodata",
    ],
    parsedSignature: {
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
    symbol: "=NoNBT=",
    interactName: "itemstackIsEqualNonNbt",
    function: (item1: Item): TypeLambda<Item, iBoolean> => {
      return (item2: Item): iBoolean => {
        return new iBoolean(
          item1.getUniqueName() === item2.getUniqueName() &&
          item1.getSize() === item2.getSize()
        );
      };
    },
  },
  rawItemEquals: {
    internalName: "integrateddynamics:itemstack_israwitemequal",
    nicknames: [
      "ItemstackIsrawitemequal",
      "itemstack_is_rawitemequal",
      "itemstackIsRawitemequal",
    ],
    parsedSignature: {
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
    symbol: "=Raw=",
    interactName: "itemstackIsEqualRaw",
    function: (item1: Item): TypeLambda<Item, iBoolean> => {
      return (item2: Item): iBoolean => {
        return new iBoolean(item1.getUniqueName() === item2.getUniqueName());
      };
    },
  },
  OBJECT_ITEMSTACK_MODNAME: {
    internalName: "integrateddynamics:itemstack_mod",
    nicknames: ["ItemstackModname", "item_mod", "itemModname", "itemMod"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "String",
      },
    },
    symbol: "mod",
    interactName: "itemstackMod",
    function: (item: Item): string => {
      return item.getModName();
    },
  },
  OBJECT_ITEMSTACK_FUELBURNTIME: {
    internalName: "integrateddynamics:itemstack_burntime",
    nicknames: [
      "ItemstackFuelburntime",
      "item_fuel_burn_time",
      "itemFuelBurnTime",
      "fuelBurnTime"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "burn_time",
    interactName: "itemstackBurnTime",
    function: (item: Item): Integer => {
      return item.getFuelBurnTime();
    },
  },
  ITEMSTACK_CANBURN: {
    internalName: "integrateddynamics:itemstack_canburn",
    nicknames: [
      "ItemstackCanburn",
      "item_can_burn",
      "itemCanBurn",
      "item_is_fuel",
      "itemIsFuel",
      "isFuel",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "can_burn",
    interactName: "itemstackCanBurn",
    function: (item: Item): iBoolean => {
      return item.isFuel();
    },
  },
  ITEMSTACK_TAG: {
    internalName: "integrateddynamics:itemstack_tag",
    nicknames: [
      "ItemstackTag",
      "itemstack_tag_names",
      "itemstackTagNames",
      "item_tag_names",
      "itemTagNames",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "item_tag_names",
    interactName: "itemstackTags",
    function: (item: Item): string[] => {
      return item.getTagNames();
    },
  },
  STRING_TAG: {
    internalName: "integrateddynamics:string_tag",
    nicknames: [
      "ItemstackTagStacks",
      "itemstack_tag_values",
      "itemstackTagValues",
      "item_tag_values",
      "itemTagValues",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: { type: "List", listType: { type: "Item" } },
    },
    symbol: "item_tag_values",
    interactName: "stringItemsByTag",
    function: (): never => {
      throw new Error(
        "Item tag values is infeasible without a registry. This is a placeholder function."
      );
    },
  },
  OBJECT_ITEMSTACK_TAG_STACKS: {
    internalName: "integrateddynamics:itemstack_tags",
    nicknames: [
      "ItemstackTags",
      "itemstack_tag_names",
      "itemstackTagNames",
      "itemTagsName",
      "itemTagNames"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "List",
        listType: {
          type: "String",
        },
      },
    },
    symbol: "item_tag_val",
    interactName: "itemstackTagVal",
    function: (item: Item): Array<string> => {
      return item.getTagNames();
    },
  },
  OBJECT_ITEMSTACK_WITHSIZE: {
    internalName: "integrateddynamics:itemstack_withsize",
    nicknames: [
      "ItemstackWithSize",
      "itemstack_with_size",
      "itemstackWithSize",
      "itemWithSize"
    ],
    parsedSignature: {
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
    symbol: "with_size",
    interactName: "itemstackWithSize",
    function: (item: Item): TypeLambda<Integer, Item> => {
      return (size: Integer): Item => {
        return new Item(new Properties({size}), item);
      };
    },
  },
  ITEMSTACK_ISFECONTAINER: {
    internalName: "integrateddynamics:itemstack_isfecontainer",
    nicknames: [
      "ItemstackIsfecontainer",
      "itemstack_is_fe_container",
      "itemstackIsFecontainer",
      "item_is_fe_container",
      "itemIsFecontainer",
      "isFeContainer"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_fe_container",
    interactName: "itemstackIsFeContainer",
    function: (item: Item): iBoolean => {
      return item.isFeContainer();
    },
  },
  OBJECT_ITEMSTACK_STORED_FE: {
    internalName: "integrateddynamics:itemstack_storedfe",
    nicknames: [
      "ItemstackStoredfe",
      "itemstack_stored_fe",
      "itemstackStoredFe",
      "item_stored_fe",
      "itemStoredFe",
      "storedFe"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "stored_fe",
    interactName: "itemstackFeStored",
    function: (item: Item): Integer => {
      return item.getFeStored();
    },
  },
  OBJECT_ITEMSTACK_FE_CAPACITY: {
    internalName: "integrateddynamics:itemstack_fecapacity",
    nicknames: [
      "ItemstackFecapacity",
      "itemstack_fe_capacity",
      "itemstackFECapacity",
      "feCapacity"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "fe_capacity",
    interactName: "itemstackFECapacity",
    function: (item: Item): Integer => {
      return item.getFeCapacity();
    },
  },
  OBJECT_ITEMSTACK_HASINVENTORY: {
    internalName: "integrateddynamics:itemstack_hasinventory",
    nicknames: [
      "ItemstackHasinventory",
      "itemstack_has_inventory",
      "itemstackHasInventory",
      "hasInventory"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "has_inventory",
    interactName: "itemstackHasInventory",
    function: (item: Item): iBoolean => {
      return new iBoolean(item.getInventory().length != 0);
    },
  },
  inventorySize: {
    internalName: "integrateddynamics:itemstack_inventorysize",
    nicknames: [
      "ItemstackInventorysize",
      "itemstack_inventory_size",
      "itemstackInventorySize",
      "item_inventory_size",
      "itemInventorySize",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "inventory_size",
    interactName: "itemstackInventorySize",
    function: (item: Item): Integer => {
      return new Integer(item.getInventory()?.length || 0);
    },
  },
  OBJECT_ITEMSTACK_INVENTORY: {
    internalName: "integrateddynamics:itemstack_inventory",
    nicknames: [
      "ItemstackInventory",
      "itemstack_inventory",
      "itemstackInventory",
      "item_inventory",
      "itemInventory"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: { type: "List", listType: { type: "Item" } },
    },
    symbol: "inventory",
    interactName: "itemstackInventory",
    function: (item: Item): Array<IntegratedValue> => {
      return item.getInventory();
    },
  },
  ITEMSTACK_ITEMBYNAME: {
    internalName: "integrateddynamics:itemstack_itembyname",
    nicknames: [
      "ItemstackByName",
      "itemstack_by_name",
      "itemstackByName",
      "item_by_name",
      "itemByName",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "item_by_name",
    interactName: "stringItemByName",
    function: (): never => {
      throw new Error(
        "Item by name is infeasible without a registry. This is a placeholder function."
      );
    },
  },
  ITEMSTACK_ITEMLISTCOUNT: {
    internalName: "integrateddynamics:itemstack_itemlistcount",
    nicknames: [
      "ItemstackListCount",
      "itemstack_list_count",
      "itemstackListCount",
      "item_list_count",
      "itemListCount",
    ],
    parsedSignature: {
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
    symbol: "item_list_count",
    interactName: "listItemListCount",
    function: (items: Array<Item>): TypeLambda<Item, Integer> => {
      return (item: Item): Integer => {
        return new Integer(
          items.filter((i) => {
            try {
              return i.equals(item);
            } catch (e) {
              return false;
            }
          }).length
        );
      };
    },
  },
  OBJECT_ITEMSTACK_NBT: {
    internalName: "integrateddynamics:itemstack_nbt",
    nicknames: [
      "ItemstackNbt",
      "itemstack_nbt",
      "itemstackNBT",
      "itemNBT"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "nbt",
    interactName: "itemStackNBT",
    function: (item: Item): Tag<IntegratedValue> => {
      return item.getNBT();
    },
  },
  OBJECT_ITEMSTACK_HASNBT: {
    internalName: "integrateddynamics:itemstack_hasnbt",
    nicknames: [
      "ItemstackHasnbt",
      "itemstack_has_nbt",
      "itemstackHasNBT",
      "hasNBT"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "has_nbt",
    interactName: "itemStackHasNBT",
    function: (item: Item): iBoolean => {
      return new iBoolean(item.getNBT().getType() != Tag.TAG_NULL);
    },
  },
  OBJECT_ITEMSTACK_DATA_KEYS: {
    internalName: "integrateddynamics:itemstack_datakeys",
    nicknames: [
      "ItemstackDatakeys",
      "itemstack_data_keys",
      "itemstackDataKeys",
      "itemNBTKeys"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "data_keys",
    interactName: "itemStackDataKeys",
    function: (item: Item): Array<iString> => {
      return item.getNBT().getAllKeys();
    },
  },
  ITEMSTACK_DATAVALUE: {
    internalName: "integrateddynamics:itemstack_datavalue",
    nicknames: [
      "ItemstackDataValue",
      "itemstack_data_value",
      "itemstackDataValue",
      "item_data_value",
      "itemDataValue",
      "itemNBTValue"
    ],
    parsedSignature: {
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
    symbol: "data_value",
    interactName: "itemstackDataValue",
    function: (item: Item): TypeLambda<iString, Tag<IntegratedValue>> => {
      return (key: iString): Tag<IntegratedValue> => {
        const nbt = item.getNBT();
        if (!nbt || !nbt.has(key)) {
          return new NullTag();
        }
        return nbt.get(key);
      };
    },
  },
  ITEMSTACK_WITHDATA: {
    internalName: "integrateddynamics:itemstack_withdata",
    nicknames: [
      "ItemstackWithData",
      "itemstack_with_data",
      "itemstackWithData",
      "item_with_data",
      "itemWithData",
      "itemWithNBT",
    ],
    parsedSignature: {
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
            type: "NBT",
          },
          to: {
            type: "Item",
          },
        },
      },
    },
    symbol: "with_data",
    interactName: "itemstackWithData",
    function: (
      item: Item
    ): TypeLambda<string, TypeLambda<CompoundTag, Item>> => {
      return (key: string): TypeLambda<CompoundTag, Item> => {
        return (value: CompoundTag): Item => {
          let nbt = item.getNBT() || {};
          nbt = nbt.set(key, value);
          return new Item(new Properties({ nbt }), item);
        };
      };
    },
  },
  ITEMSTACK_TOOLTIP: {
    internalName: "integrateddynamics:itemstack_tooltip",
    nicknames: [
      "ItemstackTooltip",
      "itemstack_tooltip",
      "itemstackTooltip",
      "item_tooltip",
      "itemTooltip",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "tooltip",
    interactName: "itemstackTooltip",
    function: (item: Item): Array<string> => {
      return item.getTooltip();
    },
  },
  OBJECT_ENTITY_ENTITYITEMTOOLTIP: {
    internalName: "integrateddynamics:entity_entityitemtooltip",
    nicknames: [
      "ItemstackEntityTooltip",
      "itemstack_entity_tooltip",
      "itemstackEntityTooltip",
      "item_entity_tooltip",
      "itemEntityTooltip"
    ],
    parsedSignature: {
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
    symbol: "entity_item_tooltip",
    interactName: "entityEntityItemTooltip",
    function: (entity: Entity): TypeLambda<Item, Array<string>> => {
      return (item: Item): Array<string> => {
        if (entity.isPlayer()) {
          return item.getTooltip(entity);
        }
        console.warn(
          "Entity item tooltip is not fully supported for non-player entities. Returning item tooltip only."
        );
        return item.getTooltip();
      };
    },
  },
  OBJECT_ENTITY_ISMOB: {
    internalName: "integrateddynamics:entity_ismob",
    nicknames: [
      "EntityIsmob",
      "entity_is_mob",
      "entityIsMob",
      "isMob"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_mob",
    interactName: "entityIsMob",
    function: (entity: Entity): iBoolean => {
      return entity.isMob();
    },
  },
  isAnimal: {
    internalName: "integrateddynamics:entity_isanimal",
    nicknames: ["EntityIsanimal", "entity_is_animal", "entityIsAnimal"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_animal",
    interactName: "entityIsAnimal",
    function: (entity: Entity): iBoolean => {
      return entity.isAnimal();
    },
  },
  OBJECT_ENTITY_ISITEM: {
    internalName: "integrateddynamics:entity_isitem",
    nicknames: [
      "EntityIsitem",
      "entity_is_item",
      "entityIsItem",
      "isItem"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_item",
    interactName: "entityIsItem",
    function: (entity: Entity): iBoolean => {
      return entity.isItem();
    },
  },
  OBJECT_ENTITY_ISPLAYER: {
    internalName: "integrateddynamics:entity_isplayer",
    nicknames: [
      "EntityIsplayer",
      "entity_is_player",
      "entityIsPlayer",
      "isPlayer"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_player",
    interactName: "entityIsPlayer",
    function: (entity: Entity): iBoolean => {
      return entity.isPlayer();
    },
  },
  ENTITY_ISMINECART: {
    internalName: "integrateddynamics:entity_isminecart",
    nicknames: ["EntityIsminecart", "entity_is_minecart", "entityIsMinecart", "isMinecart"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_minecart",
    interactName: "entityIsMinecart",
    function: (entity: Entity): iBoolean => {
      return entity.isMinecart();
    },
  },
  ENTITY_ITEM: {
    internalName: "integrateddynamics:entity_item",
    nicknames: [
      "EntityItemstack",
      "entity_itemstack",
      "entityItemstack",
      "entity_item_stack",
      "entityItemStack",
      "entity_item",
      "entityItem",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "item",
    interactName: "entityItem",
    function: (entity: Entity): Item => {
      if (entity.isItem()) {
        return entity.getItem();
      } else {
        throw new Error("Entity is not an item entity.");
      }
    },
  },
  ENTITY_HEALTH: {
    internalName: "integrateddynamics:entity_health",
    nicknames: [
      "EntityHealth",
      "entity_health",
      "entity_health_value",
      "entityHealthValue",
      "entityHealth"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "health",
    interactName: "entityHealth",
    function: (entity: Entity): Double => {
      return entity.getHealth();
    },
  },
  ENTITY_WIDTH: {
    internalName: "integrateddynamics:entity_width",
    nicknames: ["EntityWidth", "entity_width", "entityWidth"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "width",
    interactName: "entityWidth",
    function: (entity: Entity): Double => {
      return entity.getWidth();
    },
  },
  OBJECT_ENTITY_WIDTH: {
    internalName: "integrateddynamics:entity_width",
    nicknames: [
      "EntityWidth",
      "entity_width",
      "entityWidth",
      "entityWidth"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Float",
      },
    },
    symbol: "width",
    interactName: "entityWidth",
    function: (entity: Entity): Double => {
      return entity.getWidth();
    },
  },
  OBJECT_ENTITY_HEIGHT: {
    internalName: "integrateddynamics:entity_height",
    nicknames: [
      "EntityHeight",
      "entity_height",
      "entityHeight",
      "entityHeight"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Float",
      },
    },
    symbol: "height",
    interactName: "entityHeight",
    function: (entity: Entity): Double => {
      return entity.getHeight();
    },
  },
  OBJECT_ENTITY_ISBURNING: {
    internalName: "integrateddynamics:entity_isburning",
    nicknames: [
      "EntityIsburning",
      "entity_is_burning",
      "entityIsBurning",
      "isBurning"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_burning",
    interactName: "entityIsBurning",
    function: (entity: Entity): iBoolean => {
      return entity.isBurning();
    },
  },
  OBJECT_ENTITY_ISWET: {
    internalName: "integrateddynamics:entity_iswet",
    nicknames: [
      "EntityIswet",
      "entity_is_wet",
      "entityIsWet",
      "isWet"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_wet",
    interactName: "entityIsWet",
    function: (entity: Entity): iBoolean => {
      return entity.isWet();
    },
  },
  OBJECT_ENTITY_ISCROUCHING: {
    internalName: "integrateddynamics:entity_iscrouching",
    nicknames: [
      "EntityIscrouching",
      "entity_is_crouching",
      "entityIsCrouching",
      "isCrouching"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_crouching",
    interactName: "entityIsCrouching",
    function: (entity: Entity): iBoolean => {
      return entity.isCrouching();
    },
  },
  OBJECT_ENTITY_ISEATING: {
    internalName: "integrateddynamics:entity_iseating",
    nicknames: [
      "EntityIseating",
      "entity_is_eating",
      "entityIsEating",
      "isEating"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_eating",
    interactName: "entityIsEating",
    function: (entity: Entity): iBoolean => {
      return entity.isEating();
    },
  },
  ENTITY_ARMORINVENTORY: {
    internalName: "integrateddynamics:entity_armorinventory",
    nicknames: [
      "EntityArmorinventory",
      "entity_armor_inventory",
      "entityArmorInventory",
      "entity_armor",
      "entityArmor"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: { type: "List", listType: { type: "Item" } },
    },
    symbol: "armor_inventory",
    interactName: "entityArmorInventory",
    function: (entity: Entity): Array<Item> => {
      return entity.getArmorInventory();
    },
  },
  OBJECT_ENTITY_INVENTORY: {
    internalName: "integrateddynamics:entity_inventory",
    nicknames: [
      "EntityInventoryContents",
      "entity_inventory_contents",
      "entityInventoryContents",
      "entityInventoryContents"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: { type: "List", listType: { type: "ItemStack" } },
    },
    symbol: "entity_inventory",
    interactName: "entityInventory",
    function: (entity: Entity): Array<Item> => {
      return entity.getInventory();
    },
  },
  OBJECT_ENTITY_MODNAME: {
    internalName: "integrateddynamics:entity_mod",
    nicknames: [
      "EntityMod",
      "entity_mod",
      "entityMod",
      "entityModName"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "String",
      },
    },
    symbol: "entity_mod",
    interactName: "entityMod",
    function: (entity: Entity): iString => {
      return new iString(entity.getModName());
    },
  },
  OBJECT_PLAYER_TARGETBLOCK: {
    internalName: "integrateddynamics:entity_targetblock",
    nicknames: [
      "PlayerTargetblock",
      "player_target_block",
      "playerTargetBlock"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Block",
      },
    },
    symbol: "target_block",
    interactName: "entityTargetBlock",
    function: (entity: Entity): Block => {
      return entity.getTargetBlock();
    },
  },
  OBJECT_PLAYER_TARGETENTITY: {
    internalName: "integrateddynamics:entity_targetentity",
    nicknames: [
      "EntityTargetentity",
      "entity_target_entity",
      "entityTargetEntity",
      "playerTargetEntity"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Entity",
      },
    },
    symbol: "target_entity",
    interactName: "entityTargetEntity",
    function: (entity: Entity): Entity => {
      return entity.getTargetEntity();
    },
  },
  ENTITY_HASGUIOPEN: {
    internalName: "integrateddynamics:entity_hasguiopen",
    nicknames: ["PlayerHasguiopen", "player_has_gui_open", "playerHasGuiOpen"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "has_gui_open",
    interactName: "entityHasGuiOpen",
    function: (entity: Entity): iBoolean => {
      return entity.hasGuiOpen();
    },
  },
  ENTITY_HELDITEM: {
    internalName: "integrateddynamics:entity_helditem",
    nicknames: [
      "EntityHelditemMain",
      "entity_held_item_main",
      "entityHeldItemMain",
      "heldItemMain",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "held_item_1",
    interactName: "entityHeldItem",
    function: (entity: Entity): Item => {
      return entity.getHeldItemMain();
    },
  },
  ENTITY_HELDITEMOFFHAND: {
    internalName: "integrateddynamics:entity_helditemoffhand",
    nicknames: [
      "EntityHelditemOff",
      "entity_held_item_off",
      "entityHeldItemOff",
      "heldItemOff",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "held_item_2",
    interactName: "entityHeldItemOffHand",
    function: (entity: Entity): Item => {
      return entity.getHeldItemOffHand();
    },
  },
  OBJECT_ENTITY_MOUNTED: {
    internalName: "integrateddynamics:entity_mounted",
    nicknames: ["EntityMounted", "entitys_mounted", "entitysMounted"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: { type: "List", listType: { type: "Entity" } },
    },
    symbol: "mounted",
    interactName: "entityMounted",
    function: (entity: Entity): iBoolean => {
      return entity.isEntityMounted();
    },
  },
  OBJECT_ITEMFRAME_CONTENTS: {
    internalName: "integrateddynamics:entity_itemframecontents",
    nicknames: [
      "ItemframeContents",
      "itemframe_contents",
      "itemframeContents",
      "item_frame_contents",
      "itemFrameContents",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "itemframe_contents",
    interactName: "entityItemFrameContents",
    function: (entity: Entity): Item => {
      if (entity.isItemFrame()) {
        return entity.getItemFrameContents();
      } else {
        throw new Error("Entity is not an item frame.");
      }
    },
  },
  OBJECT_ITEMFRAME_ROTATION: {
    internalName: "integrateddynamics:entity_itemframerotation",
    nicknames: [
      "ItemframeRotation",
      "itemframe_rotation",
      "itemframeRotation",
      "item_frame_rotation",
      "itemFrameRotation",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "itemframe_rotation",
    interactName: "entityItemFrameRotation",
    function: (entity: Entity): Integer => {
      if (entity.isItemFrame()) {
        return entity.getItemFrameRotation();
      } else {
        throw new Error("Entity is not an item frame.");
      }
    },
  },
  OBJECT_ENTITY_HURTSOUND: {
    internalName: "integrateddynamics:entity_hurtsound",
    nicknames: ["EntityHurtsound", "entity_hurt_sound", "entityHurtSound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "String",
      },
    },
    symbol: "hurtsound",
    interactName: "entityHurtSound",
    function: (entity: Entity): string => {
      return entity.getHurtSound();
    },
  },
  OBJECT_ENTITY_DEATHSOUND: {
    internalName: "integrateddynamics:entity_deathsound",
    nicknames: ["entityDeathSound", "EntityDeathsound", "entity_death_sound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "String",
      },
    },
    symbol: "deathsound",
    interactName: "entityDeathSound",
    function: (entity: Entity): string => {
      return entity.getDeathSound();
    },
  },
  OBJECT_ENTITY_AGE: {
    internalName: "integrateddynamics:entity_age",
    nicknames: ["EntityAge", "entity_age", "entityAge"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "age",
    interactName: "entityAge",
    function: (entity: Entity): Integer => {
      return entity.getAge();
    },
  },
  OBJECT_ENTITY_ISCHILD: {
    internalName: "integrateddynamics:entity_ischild",
    nicknames: ["isChild", "EntityIschild", "entity_is_child", "entityIsChild"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_child",
    interactName: "entityIsChild",
    function: (entity: Entity): iBoolean => {
      return entity.isChild();
    },
  },
  OBJECT_ENTITY_CANBREED: {
    internalName: "integrateddynamics:entity_canbreed",
    nicknames: ["EntityCanbreed", "entity_can_breed", "entityCanBreed", "canBreed"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "canbreed",
    interactName: "entityCanBreed",
    function: (entity: Entity): iBoolean => {
      return entity.canBreed();
    },
  },
  OBJECT_ENTITY_ISINLOVE: {
    internalName: "integrateddynamics:entity_isinlove",
    nicknames: [
      "EntityIsinlove", 
      "entity_is_in_love", 
      "entityIsInLove",
      "isInLove"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_in_love",
    interactName: "entityIsInLove",
    function: (entity: Entity): iBoolean => {
      return entity.isInLove();
    },
  },
  OBJECT_ENTITY_CANBREEDWITH: {
    internalName: "integrateddynamics:entity_canbreedwith",
    nicknames: [
      "EntityCanbreedwith",
      "entity_can_breed_with",
      "entityCanBreedWith",
      "canBreedWith",
    ],
    parsedSignature: {
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
    symbol: "can_breed_with",
    interactName: "entityCanBreedWith",
    function: (entity1: Entity): TypeLambda<Entity, iBoolean> => {
      return (entity2: Entity): iBoolean => {
        return new iBoolean(entity1.getBreadableList().includes(entity2.getUniqueName()));
      };
    },
  },
  OBJECT_ENTITY_ISSHEARABLE: {
    internalName: "integrateddynamics:entity_isshearable",
    nicknames: [
      "EntityIsshearable",
      "entity_is_shearable",
      "entityIsShearable",
      "entityIsShearable",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_shearable",
    interactName: "entityIsShearable",
    function: (entity: Entity): iBoolean => {
      return entity.isShearable();
    },
  },
  OBJECT_ENTITY_NBT: {
    internalName: "integrateddynamics:entity_nbt",
    nicknames: ["EntityNbt", "entity_nbt", "canBreed", "entityNBT"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT()",
    interactName: "entityNbt",
    function: (entity: Entity): CompoundTag => {
      return entity.getNBT();
    },
  },
  OBJECT_ENTITY_TYPE: {
    internalName: "integrateddynamics:entity_entitytype",
    nicknames: [
      "EntityType", 
      "entity_type",
      "entityType",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "String",
      },
    },
    symbol: "entity_type",
    interactName: "entityType",
    function: (entity: Entity): string => {
      return entity.getEntityType();
    },
  },
  OBJECT_ENTITY_ITEMS: {
    internalName: "integrateddynamics:entity_entityitems",
    nicknames: [
      "EntityItems",
      "entity_items",
      "entityItems",
      "entity_item_list",
      "entityItemList",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: { type: "List", listType: { type: "Item" } },
    },
    symbol: "entity_items",
    interactName: "entityItems",
    function: (entity: Entity): Array<Item> => {
      return entity.getItemList();
    },
  },
  OBJECT_ENTITY_FLUIDS: {
    internalName: "integrateddynamics:entity_entityfluids",
    nicknames: ["EntityFluids", "entity_fluids", "entityFluids"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: { type: "List", listType: { type: "Fluid" } },
    },
    symbol: "entity_fluids",
    interactName: "entityFluids",
    function: (entity: Entity): Array<Fluid> => {
      return entity.getFluids();
    },
  },
  OBJECT_ENTITY_ENERGY_STORED: {
    internalName: "integrateddynamics:entity_entityenergystored",
    nicknames: ["EntityEnergyStored", "entity_energy_stored", "entityEnergyStored"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "entity_stored_fe",
    interactName: "entityEnergy",
    function: (entity: Entity): Integer => {
      return entity.getEnergyStored();
    },
  },
  OBJECT_ENTITY_ENERGY_CAPACITY: {
    internalName: "integrateddynamics:entity_entityenergycapacity",
    nicknames: ["EntityEnergyCapacity", "entity_energy_capacity", "entityEnergyCapacity"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "entity_capacity_fe",
    interactName: "entityEnergyCapacity",
    function: (entity: Entity): Integer => {
      return entity.getEnergyCapacity();
    },
  },
  OBJECT_FLUIDSTACK_AMOUNT: {
    internalName: "integrateddynamics:fluidstack_amount",
    nicknames: [
      "FluidstackAmount",
      "fluidstackAmount",
      "fluid_stack_amount",
      "fluidStackAmount",
      "fluid_stack_amount",
      "fluid_amount",
        "fluidAmount",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "amount",
    interactName: "fluidstackAmount",
    function: (fluid: Fluid): Integer => {
      return fluid.getAmount();
    },
  },
  OBJECT_FLUIDSTACK_BLOCK: {
    internalName: "integrateddynamics:fluidstack_block",
    nicknames: [
      "FluidstackBlock",
      "fluidstackBlock",
      "fluid_stack_block",
      "fluidStackBlock",
      "fluid_stack_block",
      "fluid_block",
        "fluidBlock",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Block",
      },
    },
    symbol: "block",
    interactName: "fluidstackBlock",
    function: (fluid: Fluid): Block => {
      return fluid.getBlock();
    },
  },
  OBJECT_FLUIDSTACK_LIGHT_LEVEL: {
    internalName: "integrateddynamics:fluidstack_light_level",
    nicknames: [
      "FluidstackLightLevel",
      "fluidstackLightLevel",
      "fluid_stack_light_level",
      "fluidStackLightLevel",
      "fluid_stack_light_level",
      "fluid_light_level",
        "fluidLightLevel",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "light_level",
    interactName: "fluidstackLightLevel",
    function: (fluid: Fluid): Integer => {
      return fluid.getLightLevel();
    },
  },
  OBJECT_FLUIDSTACK_DENSITY: {
    internalName: "integrateddynamics:fluidstack_density",
    nicknames: [
      "FluidstackDensity",
      "fluidstackDensity",
      "fluid_stack_density",
      "fluidStackDensity",
      "fluid_stack_density",
      "fluid_density",
        "fluidDensity",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "density",
    interactName: "fluidstackDensity",
    function: (fluid: Fluid): Integer => {
      return fluid.getDensity();
    },
  },
  OBJECT_FLUIDSTACK_TEMPERATURE: {
    internalName: "integrateddynamics:fluidstack_temperature",
    nicknames: [
      "FluidstackTemperature",
      "fluidstackTemperature",
      "fluid_stack_temperature",
      "fluidStackTemperature",
      "fluid_stack_temperature",
      "fluid_temperature",
        "fluidTemperature",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "temperature",
    interactName: "fluidstackTemperature",
    function: (fluid: Fluid): Integer => {
      return fluid.getTemperature();
    },
  },
  OBJECT_FLUIDSTACK_VISCOSITY: {
    internalName: "integrateddynamics:fluidstack_viscosity",
    nicknames: [
      "FluidstackViscosity",
      "fluidstackViscosity",
      "fluid_stack_viscosity",
      "fluidStackViscosity",
      "fluid_stack_viscosity",
      "fluid_viscosity",
        "fluidViscosity",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "viscosity",
    interactName: "fluidstackViscosity",
    function: (fluid: Fluid): Integer => {
      return fluid.getViscosity();
    },
  },
  OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR: {
    internalName: "integrateddynamics:fluidstack_lighter_than_air",
    nicknames: [
      "FluidstackIsLighterThanAir",
      "fluidstackIsLighterThanAir",
      "fluid_stack_is_lighter_than_air",
      "fluidStackIsLighterThanAir",
      "fluid_stack_is_lighter_than_air",
      "fluid_is_lighter_than_air",
      "fluidIsLighterThanAir",
        "isLighterThanAir",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "lighter_than_air",
    interactName: "fluidstackIsLighterThanAir",
    function: (fluid: Fluid): iBoolean => {
      return fluid.isLighterThanAir();
    },
  },
  OBJECT_FLUIDSTACK_RARITY: {
    internalName: "integrateddynamics:fluidstack_rarity",
    nicknames: [
      "FluidstackRarity",
      "fluidstackRarity",
      "fluid_stack_rarity",
      "fluidStackRarity",
      "fluid_stack_rarity",
      "fluid_rarity",
        "fluidRarity",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "String",
      },
    },
    symbol: "rarity",
    interactName: "fluidstackRarity",
    function: (fluid: Fluid): string => {
      return fluid.getRarity();
    },
  },
  OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY: {
    internalName: "integrateddynamics:fluidstack_sound_bucket_empty",
    nicknames: [
      "FluidstackSoundBucketEmpty",
      "fluidstackSoundBucketEmpty",
      "fluid_stack_sound_bucket_empty",
      "fluidStackSoundBucketEmpty",
      "fluid_stack_sound_bucket_empty",
      "fluid_sound_bucket_empty",
        "fluidSoundBucketEmpty",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "String",
      },
    },
    symbol: "sound_bucket_empty",
    interactName: "fluidstackBucketEmptySound",
    function: (fluid: Fluid): string => {
      return fluid.getBucketEmptySound();
    },
  },
  OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE: {
    internalName: "integrateddynamics:fluidstack_sound_fluid_vaporize",
    nicknames: [
      "FluidstackSoundFluidVaporize",
      "fluidstackSoundFluidVaporize",
      "fluid_stack_sound_fluid_vaporize",
      "fluidStackSoundFluidVaporize",
      "fluid_stack_sound_fluid_vaporize",
      "fluid_sound_fluid_vaporize",
        "fluidSoundFluidVaporize",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "String",
      },
    },
    symbol: "sound_fluid_vaporize",
    interactName: "fluidstackFluidVaporizeSound",
    function: (fluid: Fluid): string => {
      return fluid.getFluidVaporizeSound();
    },
  },
  OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL: {
    internalName: "integrateddynamics:fluidstack_sound_bucket_fill",
    nicknames: [
      "FluidstackSoundBucketFill",
      "fluidstackSoundBucketFill",
      "fluid_stack_sound_bucket_fill",
      "fluidStackSoundBucketFill",
      "fluid_stack_sound_bucket_fill",
      "fluid_sound_bucket_fill",
        "fluidSoundBucketFill",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "String",
      },
    },
    symbol: "sound_bucket_fill",
    interactName: "fluidstackBucketFillSound",
    function: (fluid: Fluid): string => {
      return fluid.getBucketFillSound();
    },
  },
  OBJECT_FLUIDSTACK_BUCKET: {
    internalName: "integrateddynamics:fluidstack_bucket",
    nicknames: [
      "FluidstackBucket",
      "fluidstackBucket",
      "fluid_stack_bucket",
      "fluidStackBucket",
      "fluid_stack_bucket",
      "fluid_bucket",
        "fluidBucket",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "bucket",
    interactName: "fluidstackBucket",
    function: (fluid: Fluid): Item => {
      return fluid.getBucket();
    },
  },
  OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL: {
    internalName: "integrateddynamics:fluidstack_israwfluidequal",
    nicknames: [
      "FluidstackIsrawfluidequal",
      "fluidstackIsrawfluidequal",
      "fluid_stack_israwfluidequal",
      "fluidStackIsrawfluidequal",
      "fluid_stack_israwfluidequal",
      "fluid_israwfluidequal",
      "isRawFluidEqual",
        "rawFluidEquals",
    ],
    parsedSignature: {
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
    symbol: "=Raw=",
    interactName: "fluidstackIsRawEqual",
    function: (fluid1: Fluid): TypeLambda<Fluid, iBoolean> => {
      return (fluid2: Fluid): iBoolean => {
        return new iBoolean(
          fluid1
            .getUname()
            .replace(new RegExp("\\s\\d+$"), "")
            .toLowerCase() ===
          fluid2.getUname().replace(new RegExp("\\s\\d+$"), "").toLowerCase()
        );
      };
    },
  },
  OBJECT_FLUIDSTACK_MODNAME: {
    internalName: "integrateddynamics:fluidstack_mod",
    nicknames: [
      "FluidstackModname",
      "fluidstackModname",
      "fluid_stack_modname",
      "fluidStackModname",
      "fluid_stack_modname",
      "fluid_mod_name",
        "fluidModName",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "String",
      },
    },
    symbol: "mod",
    interactName: "fluidstackMod",
    function: (fluid: Fluid): string => {
      return fluid.getModName();
    },
  },
  OBJECT_FLUIDSTACK_DATA: {
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
        "fluidNBT",
        "fluidNBTKeys",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT()",
    interactName: "fluidstackNbt",
    function: (fluid: Fluid): CompoundTag => {
      return fluid.getNBT();
    },
  },
  OBJECT_FLUIDSTACK_WITH_AMOUNT: {
    internalName: "integrateddynamics:fluidstack_with_amount",
    nicknames: [
      "FluidstackWithAmount",
      "fluidstackWithAmount",
      "fluid_stack_with_amount",
      "fluidStackWithAmount",
      "fluid_stack_with_amount",
      "fluid_with_amount",
        "fluidWithAmount",
    ],
    parsedSignature: {
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
    symbol: "with_amount",
    interactName: "fluidstackWithAmount",
    function: (fluid: Fluid): TypeLambda<Integer, Fluid> => {
      return (amount: Integer): Fluid => {
        return new Fluid(new Properties({ amount }), fluid);
      };
    },
  },
  OBJECT_FLUIDSTACK_DATAKEYS: {
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
        "fluidNBTKeys",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "data_keys",
    interactName: "fluidstackDataKeys",
    function: (fluid: Fluid): Array<iString> => {
      const nbt = fluid.getNBT();
      if (!nbt) {
        return [];
      }
      return Object.keys(nbt).map(e => new iString(e)).filter((key) => nbt.has(key));
    },
  },
  OBJECT_FLUIDSTACK_DATA_VALUE: {
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
        "fluidNBTValue",
    ],
    parsedSignature: {
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
    symbol: "data_value",
    interactName: "fluidstackDataValue",
    function: (fluid: Fluid): TypeLambda<iString, Tag<IntegratedValue>> => {
      return (key: iString): Tag<IntegratedValue> => {
        const nbt = fluid.getNBT();
        if (!nbt || !nbt.has(key)) {
          return new NullTag();
        }
        return nbt.get(key);
      };
    },
  },
  OBJECT_FLUIDSTACK_WITH_DATA: {
    internalName: "integrateddynamics:fluidstack_withdata",
    nicknames: [
      "FluidstackWithData",
      "fluidstackWithData",
      "fluid_stack_with_data",
      "fluidStackWithData",
        "fluidWithNBT",
    ],
    parsedSignature: {
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
    symbol: "with_data",
    interactName: "fluidstackWithData",
    function: (
      fluid: Fluid
    ): TypeLambda<string, TypeLambda<CompoundTag, Fluid>> => {
      return (key: string): TypeLambda<CompoundTag, Fluid> => {
        return (value: CompoundTag): Fluid => {
          let nbt = fluid.getNBT() || {};
          nbt = nbt.set(key, value);
          return new Fluid(new Properties({ nbt }), fluid);
        };
      };
    },
  },
  OBJECT_FLUIDSTACK_BY_NAME: {
    internalName: "integrateddynamics:fluidstack_by_name",
    nicknames: [
      "FluidstackByName",
      "fluidstack_by_name",
      "fluidstackByName",
      "fluid_by_name",
        "fluidByName",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Fluid",
      },
    },
    symbol: "fluid_by_name",
    interactName: "stringFluidByName",
    function: (): never => {
      throw new Error(
        "Fluid by name is infeasible without a registry. This is a placeholder function."
      );
    },
  },
  OBJECT_FLUIDSTACK_TAG: {
    internalName: "integrateddynamics:fluidstack_tag",
    nicknames: [
      "FluidstackTag",
      "fluidstackTag",
      "fluidstackTagStacks",
      "fluidstackTagStack",
        "fluidTag",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "fluid_tag_names",
    interactName: "fluidstackTags",
    function: (fluid: Fluid): Array<string> => {
      return fluid.getTagNames();
    },
  },
  OBJECT_FLUIDSTACK_TAG_STACKS: {
    internalName: "integrateddynamics:string_fluidtag",
    nicknames: [
      "FluidstackTagStacks",
      "fluidStackTagStacks",
      "fluid_stack_tag_stacks",
        "fluidTagStacks",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: { type: "List", listType: { type: "Fluid" } },
    },
    symbol: "fluid_tag_values",
    interactName: "stringFluidsByTag",
    function: (): never => {
      throw new Error(
        "Fluid tag values is infeasible without a registry. This is a placeholder function."
      );
    },
  },
  OPERATOR_APPLY: {
    internalName: "integrateddynamics:operator_apply",
    nicknames: ["operatorApply", "apply", "opByName"],
    parsedSignature: {
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
    symbol: "apply",
    interactName: "operatorApply",
    serializer: "integrateddynamics:curry",
    function: (op: Operator<IntegratedValue, IntegratedValue>) => {
      return (arg: IntegratedValue) => {
        globalMap.unify(op.parsedSignature.getInput(0), arg);
        return op.apply(arg);
      };
    },
  },
  OPERATOR_APPLY_2: {
    internalName: "integrateddynamics:operator_apply2",
    nicknames: ["operatorApply_2", "apply2", "opByName"],
    parsedSignature: {
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
            typeID: 3,
          },
        },
      },
    },
    symbol: "apply2",
    interactName: "operatorApply2",
    serializer: "integrateddynamics:curry",
    function: (
      op: Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
    ): TypeLambda<
      IntegratedValue,
      TypeLambda<IntegratedValue, IntegratedValue>
    > => {
      return (
        arg1: IntegratedValue
      ): TypeLambda<IntegratedValue, IntegratedValue> => {
        return (arg2: IntegratedValue): IntegratedValue => {
          globalMap.unify(op.parsedSignature.getInput(0), arg1);
          globalMap.unify(op.parsedSignature.getInput(1), arg2);
          return op.apply(arg1).apply(arg2);
        };
      };
    },
  },
  OPERATOR_APPLY_3: {
    internalName: "integrateddynamics:operator_apply3",
    nicknames: ["operatorApply_3", "apply3", "opByName"],
    parsedSignature: {
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
          typeID: 1,
        },
        to: {
          type: "Function",
          from: {
            type: "Any",
            typeID: 2,
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 3,
            },
            to: {
              type: "Any",
              typeID: 4,
            },
          },
        },
      },
    },
    symbol: "apply3",
    interactName: "operatorApply3",
    serializer: "integrateddynamics:curry",
    function: (
      op: Operator<IntegratedValue, Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>>
    ): TypeLambda<
      IntegratedValue,
      TypeLambda<IntegratedValue, TypeLambda<IntegratedValue, IntegratedValue>>
    > => {
      return (
        arg1: IntegratedValue
      ): TypeLambda<
        IntegratedValue,
        TypeLambda<IntegratedValue, IntegratedValue>
      > => {
        return (
          arg2: IntegratedValue
        ): TypeLambda<IntegratedValue, IntegratedValue> => {
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
  },
  OPERATOR_APPLY_N: {
    internalName: "integrateddynamics:operator_apply_n",
    nicknames: ["operatorApplyN", "applyn", "applyN", "opByName"],
    parsedSignature: {
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
            typeID: 1,
          },
        },
        to: { type: "Any", typeID: 3 },
      },
    },
    symbol: "apply_n",
    interactName: "operatorApply_n",
    serializer: "integrateddynamics:curry",
    function: (
      op: Operator<IntegratedValue, IntegratedValue>
    ): TypeLambda<Array<IntegratedValue>, IntegratedValue> => {
      return (args: Array<IntegratedValue>): IntegratedValue => {
        args.forEach((arg, i) => {
          if (arg === undefined || arg === null) {
            throw new Error(
              "applyn requires all arguments to be defined and non-null."
            );
          }
          const result = op.apply(arg);
          if (!(result instanceof Operator)) throw new Error(`apply_n got too big a list`);
          op.parsedSignature.typeMap.unify(op.parsedSignature.getInput(i), arg);
          op = result;
        });
        return op;
      };
    },
  },
  OPERATOR_APPLY_0: {
    internalName: "integrateddynamics:operator_apply0",
    nicknames: ["operatorApply_0", "apply0", "opByName"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Any",
        typeID: 1,
      },
      to: { type: "Any", typeID: 1 },
    },
    symbol: "apply0",
    interactName: "operatorApply0",
    serializer: "integrateddynamics:curry",
    function: (_op: Operator<IntegratedValue, IntegratedValue>): TypeLambda<undefined, IntegratedValue> => {
      return () => {
        throw new Error(`apply0 doesn't make sense to implement`);
      };
    },
  },
  OPERATOR_MAP: {
    internalName: "integrateddynamics:operator_map",
    nicknames: ["operatorMap", "map"],
    parsedSignature: {
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
          listType: { type: "Any", typeID: 1 },
        },
        to: {
          type: "List",
          listType: { type: "Any", typeID: 2 },
        },
      },
    },
    symbol: "map",
    interactName: "operatorMap",
    function: (
      op: Operator<IntegratedValue, IntegratedValue>
    ): TypeLambda<Array<IntegratedValue>, Array<IntegratedValue>> => {
      return (list: Array<IntegratedValue>): Array<IntegratedValue> => {
        return list.map((item) => op.apply(item));
      };
    },
  },
  OPERATOR_FILTER: {
    internalName: "integrateddynamics:operator_filter",
    nicknames: ["operatorFilter", "filter"],
    parsedSignature: {
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
            typeID: 1,
          },
        },
        to: {
          type: "List",
          listType: {
            type: "Any",
            typeID: 1,
          },
        },
      },
    },
    symbol: "filter",
    interactName: "operatorFilter",
    function: (
      predicate: Predicate
    ): TypeLambda<Array<IntegratedValue>, Array<IntegratedValue>> => {
      return (list: Array<IntegratedValue>): Array<IntegratedValue> => {
        return list.filter((item) => predicate.apply(item));
      };
    },
  },
  OPERATOR_CONJUNCTION: {
    internalName: "integrateddynamics:operator_conjunction",
    nicknames: ["operatorConjunction", "conjunction"],
    parsedSignature: {
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
    symbol: ".&&.",
    interactName: "operatorConjunction",
    function: (
      predicate1: Predicate
    ): TypeLambda<Predicate, TypeLambda<IntegratedValue, iBoolean>> => {
      return (predicate2: Predicate): TypeLambda<IntegratedValue, iBoolean> => {
        return (input: IntegratedValue): iBoolean => {
          return predicate1.apply(input) && predicate2.apply(input);
        };
      };
    },
  },
  OPERATOR_DISJUNCTION: {
    internalName: "integrateddynamics:operator_disjunction",
    nicknames: ["operatorDisjunction", "disjunction"],
    parsedSignature: {
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
    symbol: ".||.",
    interactName: "operatorDisjunction",
    function: (
      predicate1: Predicate
    ): TypeLambda<Predicate, TypeLambda<IntegratedValue, iBoolean>> => {
      return (predicate2: Predicate): TypeLambda<IntegratedValue, iBoolean> => {
        return (input: IntegratedValue): iBoolean => {
          return predicate1.apply(input) || predicate2.apply(input);
        };
      };
    },
  },
  OPERATOR_NEGATION: {
    internalName: "integrateddynamics:operator_negation",
    nicknames: ["operatorNegation", "negation"],
    parsedSignature: {
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
    symbol: "!.",
    interactName: "operatorNegation",
    function: (predicate: Predicate): TypeLambda<IntegratedValue, iBoolean> => {
      return (input: IntegratedValue): iBoolean => {
        return new iBoolean(!predicate.apply(input).valueOf());
      };
    },
  },
  OPERATOR_PIPE: {
    internalName: "integrateddynamics:operator_pipe",
    nicknames: ["operatorPipe", "pipe"],
    parsedSignature: {
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
    symbol: ".",
    interactName: "operatorPipe",
    serializer: "integrateddynamics:combined.pipe",
    function: (
      f: Operator<IntegratedValue, IntegratedValue>
    ): TypeLambda<Operator<IntegratedValue, IntegratedValue>, TypeLambda<IntegratedValue, IntegratedValue>> => {
      return (g: Operator<IntegratedValue, IntegratedValue>): TypeLambda<IntegratedValue, IntegratedValue> => {
        f.parsedSignature.pipe(g.parsedSignature);
        return (x: IntegratedValue): IntegratedValue => {
          return g.apply(f.apply(x));
        };
      };
    },
  },
  OPERATOR_PIPE2: {
    internalName: "integrateddynamics:operator_pipe2",
    nicknames: ["operatorPipe2", "pipe.2", "pipe2"],
    parsedSignature: {
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
    symbol: ".2",
    interactName: "operatorPipe2",
    serializer: "integrateddynamics:combined.pipe",
    function: (
      f: Operator<IntegratedValue, IntegratedValue>
    ): TypeLambda<
      Operator<IntegratedValue, IntegratedValue>,
      TypeLambda<Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>, TypeLambda<IntegratedValue, IntegratedValue>>
    > => {
      return (
        g: Operator<IntegratedValue, IntegratedValue>
      ): TypeLambda<Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>, TypeLambda<IntegratedValue, IntegratedValue>> => {
        return (h: Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>): TypeLambda<IntegratedValue, IntegratedValue> => {
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
  },
  OPERATOR_FLIP: {
    internalName: "integrateddynamics:operator_flip",
    nicknames: ["operatorFlip", "flip"],
    parsedSignature: {
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
    symbol: "flip",
    interactName: "operatorFlip",
    serializer: "integrateddynamics:combined.flip",
    function: (
      op: Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
    ): TypeLambda<
      IntegratedValue,
      TypeLambda<IntegratedValue, IntegratedValue>
    > => {
      return (
        arg1: IntegratedValue
      ): TypeLambda<IntegratedValue, IntegratedValue> => {
        return (arg2: IntegratedValue): IntegratedValue => {
          return op.apply(arg2).apply(arg1);
        };
      };
    },
  },
  OPERATOR_REDUCE: {
    internalName: "integrateddynamics:operator_reduce",
    nicknames: ["operatorReduce", "reduce"],
    parsedSignature: {
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
    symbol: "reduce",
    interactName: "operatorReduce",
    function: (op: Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>): TypeLambda<Array<IntegratedValue>, TypeLambda<IntegratedValue, IntegratedValue>> => {
      return (list: Array<IntegratedValue>): TypeLambda<IntegratedValue, IntegratedValue> => {
        return (startingValue: IntegratedValue): IntegratedValue => {
          let result = startingValue;
          for (let item of list) {
            result = op.apply(result).apply(item);
          }
          return result;
        };
      };
    },
  },
  OPERATOR_REDUCE1: {
    internalName: "integrateddynamics:operator_reduce1",
    nicknames: ["operatorReduce1", "reduce1"],
    parsedSignature: {
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
    symbol: "reduce1",
    interactName: "operatorReduce1",
    function: (op: Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>): TypeLambda<Array<IntegratedValue>, IntegratedValue> => {
      return (list: Array<IntegratedValue>): IntegratedValue => {
        list = [...list];
        let result = list.shift()!;
        for (let item of list) {
          result = op.apply(result).apply(item);
        }
        return result;
      };
    },
  },
  OPERATOR_BY_NAME: {
    internalName: "integrateddynamics:operator_by_name",
    nicknames: ["operatorByName", "opByName"],
    parsedSignature: {
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
    symbol: "op_by_name",
    interactName: "stringOperatorByName",
    function: (name: TypeOperatorInternalName): Operator<IntegratedValue, IntegratedValue> => {
      return operatorRegistry.find((op: BaseOperator<IntegratedValue, IntegratedValue>) => op.internalName === name);
    },
  },
  NBT_COMPOUND_SIZE: {
    internalName: "integrateddynamics:nbt_compound_size",
    nicknames: ["nbtCompoundSize", "NBTSize"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "NBT{}.size",
    interactName: "nbtSize",
    function: (nbt: CompoundTag): Integer => {
      return new Integer(nbt.getAllKeys().length);
    },
  },
  NBT_COMPOUND_KEYS: {
    internalName: "integrateddynamics:nbt_compound_keys",
    nicknames: ["nbtCompoundKeys", "NBTKeys"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "NBT{}.keys",
    interactName: "nbtKeys",
    function: (nbt: CompoundTag): Array<iString> => {
      return nbt.getAllKeys();
    },
  },
  NBT_COMPOUND_HASKEY: {
    internalName: "integrateddynamics:nbt_compound_haskey",
    nicknames: ["nbtCompoundHaskey", "NBTHasKey"],
    parsedSignature: {
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
    symbol: "NBT{}.has_key",
    interactName: "nbtHasKey",
    function: (nbt: CompoundTag): TypeLambda<iString, iBoolean> => {
      return (key: iString): iBoolean => {
        return new iBoolean(nbt.has(key));
      };
    },
  },
  NBT_COMPOUND_VALUE_TYPE: {
    internalName: "integrateddynamics:nbt_compound_type",
    nicknames: ["nbtCompoundValueType", "NBTValueType"],
    parsedSignature: {
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
    symbol: "NBT{}.type",
    interactName: "nbtType",
    function: (nbt: CompoundTag): TypeLambda<iString, iString> => {
      return (key: iString): iString => {
        if (!nbt.has(key)) {
          throw new Error(`${key} does not exist in ${JSON.stringify(nbt)}`);
        }
        return nbt.get(key).getTypeAsString();
      };
    },
  },
  NBT_COMPOUND_VALUE_TAG: {
    internalName: "integrateddynamics:nbt_compound_value_tag",
    nicknames: ["nbtCompoundValueTag", "compoundValueAny"],
    parsedSignature: {
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
    symbol: "NBT{}.get_tag",
    interactName: "nbtGetTag",
    function: (nbt: CompoundTag): TypeLambda<iString, Tag<IntegratedValue>> => {
      return (key: iString): Tag<IntegratedValue> => {
        return nbt.get(key);
      };
    },
  },
  NBT_COMPOUND_VALUE_BOOLEAN: {
    internalName: "integrateddynamics:nbt_compound_value_iBoolean",
    nicknames: ["nbtCompoundValueBoolean", "compoundValueBoolean"],
    parsedSignature: {
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
    symbol: "NBT{}.get_iBoolean",
    interactName: "nbtGetBoolean",
    function: (nbt: CompoundTag): TypeLambda<iString, iBoolean> => {
      return (key: iString): iBoolean => {
        const result = nbt.get(key).valueOf();
        if (!(result instanceof iBoolean)) return new iBoolean(false);
        return result;
      };
    },
  },
  NBT_COMPOUND_VALUE_INTEGER: {
    internalName: "integrateddynamics:nbt_compound_value_integer",
    nicknames: ["nbtCompoundValueInteger", "compoundValueInteger"],
    parsedSignature: {
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
    symbol: "NBT{}.get_integer",
    interactName: "nbtGetInteger",
    function: (nbt: CompoundTag): TypeLambda<iString, Integer> => {
      return (key: iString): Integer => {
        let value = nbt.get(key);
        if (value.getType() != Tag.TAG_INT)
          throw new Error(
            `${key} is not an integer in ${JSON.stringify(nbt.toJSON())}`
          );
        return (value as IntTag).valueOf();
      };
    },
  },
  NBT_COMPOUND_VALUE_LONG: {
    internalName: "integrateddynamics:nbt_compound_value_long",
    nicknames: ["nbtCompoundValueLong", "compoundValueLong"],
    parsedSignature: {
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
    symbol: "NBT{}.get_long",
    interactName: "nbtGetLong",
    function: (nbt: CompoundTag): TypeLambda<iString, Long> => {
      return (key: iString): Long => {
        let value = nbt.get(key);
        if (value.getType() === Tag.TAG_LONG) {
          return value.valueOf() as Long;
        }
        throw new Error(
          `${key} is not a long in ${JSON.stringify(nbt.toJSON())}`
        );
      };
    },
  },
  NBT_COMPOUND_VALUE_DOUBLE: {
    internalName: "integrateddynamics:nbt_compound_value_double",
    nicknames: ["nbtCompoundValueDouble", "compoundValueDouble"],
    parsedSignature: {
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
    symbol: "NBT{}.get_double",
    interactName: "nbtGetDouble",
    function: (nbt: CompoundTag): TypeLambda<iString, Double> => {
      return (key: iString): Double => {
        let value = nbt.get(key);
        if (value.getType() === Tag.TAG_DOUBLE) {
          return value.valueOf() as Double;
        }
        throw new Error(
          `${key} is not a double in ${JSON.stringify(nbt.toJSON())}`
        );
      };
    },
  },
  NBT_COMPOUND_VALUE_STRING: {
    internalName: "integrateddynamics:nbt_compound_value_string",
    nicknames: ["nbtCompoundValueString", "compoundValueString"],
    parsedSignature: {
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
    symbol: "NBT{}.get_string",
    interactName: "nbtGetString",
    function: (nbt: CompoundTag): TypeLambda<iString, iString> => {
      return (key: iString): iString => {
        let value = nbt.get(key);
        if (value.getType() === Tag.TAG_STRING) {
          return (value as StringTag).valueOf() as iString;
        }
        throw new Error(
          `${key} is not a string in ${JSON.stringify(nbt.toJSON())}`
        );
      };
    },
  },
  NBT_COMPOUND_VALUE_COMPOUND: {
    internalName: "integrateddynamics:nbt_compound_value_compound",
    nicknames: ["nbtCompoundValueCompound", "compoundValueNBT"],
    parsedSignature: {
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
    symbol: "NBT{}.get_compound",
    interactName: "nbtGetCompound",
    function: (nbt: CompoundTag): TypeLambda<iString, Tag<IntegratedValue>> => {
      return (key: iString): Tag<IntegratedValue> => {
        let value = nbt.get(key);
        if (value.getType() === Tag.TAG_COMPOUND) {
          return value;
        }
        throw new Error(
          `${key} is not a Compound in ${JSON.stringify(nbt.toJSON())}`
        );
      };
    },
  },
  NBT_COMPOUND_VALUE_LIST_TAG: {
    internalName: "integrateddynamics:nbt_compound_value_list_tag",
    nicknames: ["nbtCompoundValueListTag", "nbtCompoundValueList", "compoundValueListNBT"],
    parsedSignature: {
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
    symbol: "NBT{}.get_list_tag",
    interactName: "nbtGetListTag",
    function: (
      nbt: CompoundTag
    ): TypeLambda<iString, Tag<IntegratedValue>[]> => {
      return (key: iString): Tag<IntegratedValue>[] => {
        if (!nbt.has(key))
          throw new Error(
            `${key} is not a list of NBT in ${JSON.stringify(nbt.toJSON())}`
          );
        let listTag = nbt.get(key);
        if (listTag.getType() != Tag.TAG_LIST)
          throw new Error(
            `${key} is not a list of NBT in ${JSON.stringify(nbt.toJSON())}`
          );
        return (listTag as ListTag).getArray();
      };
    },
  },
  NBT_COMPOUND_VALUE_LIST_BYTE: {
    internalName: "integrateddynamics:nbt_compound_value_list_byte",
    nicknames: ["nbtCompoundValueListByte", "compoundValueListByte"],
    parsedSignature: {
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
    symbol: "NBT{}.get_list_byte",
    interactName: "nbtGetListByte",
    function: (nbt: CompoundTag) => {
      return (key: iString): Integer[] => {
        let value = nbt.get(key) as ListTag;
        if (value.getType() !== Tag.TAG_LIST) return [new Integer(0)]
        let list = value.valueOf() as ByteTag[];
        return list.map((e: ByteTag) => e.valueOf());
      };
    },
  },
  NBT_COMPOUND_VALUE_LIST_INT: {
    internalName: "integrateddynamics:nbt_compound_value_list_int",
    nicknames: ["nbtCompoundValueListInt", "compoundValueListInteger"],
    parsedSignature: {
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
    symbol: "NBT{}.get_list_int",
    interactName: "nbtGetListInt",
    function: (nbt: CompoundTag): TypeLambda<iString, Array<Integer>> => {
      return (key: iString): Array<Integer> => {
        let value = nbt.get(key);
        if (value.getType() != Tag.TAG_LIST)
          throw new Error(
            `${key} is not a list of int in ${JSON.stringify(nbt.toJSON())}`
          );
        let list = (value as ListTag).getArray();
        return list.map((e) => {
          if (e.getType() != Tag.TAG_INT)
            throw new Error(
              `${key} is not a list of int in ${JSON.stringify(nbt.toJSON())}`
            );
          return (e as IntTag).valueOf();
        });
      };
    },
  },
  NBT_COMPOUND_VALUE_LIST_LONG: {
    internalName: "integrateddynamics:nbt_compound_value_list_long",
    nicknames: ["nbtCompoundValueListLong", "compoundValueListLong"],
    parsedSignature: {
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
    symbol: "NBT{}.get_list_long",
    interactName: "nbtGetListLong",
    function: (nbt: CompoundTag): TypeLambda<iString, Long[]> => {
      return (key: iString): Long[] => {
        let value = nbt.get(key);
        if (value.getType() != Tag.TAG_LIST)
          throw new Error(
            `${key} is not a list of long in ${JSON.stringify(nbt.toJSON())}`
          );
        let list = (value as ListTag).getArray();
        return list.map((e) => {
          if (e.getType() != Tag.TAG_LONG)
            throw new Error(
              `${key} is not a list of long in ${JSON.stringify(nbt.toJSON())}`
            );
          return (e as LongTag).valueOf();
        });
      };
    },
  },
  NBT_COMPOUND_WITHOUT: {
    internalName: "integrateddynamics:nbt_compound_without",
    nicknames: ["nbtCompoundWithout", "NBTWithout"],
    parsedSignature: {
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
    symbol: "NBT{}.without",
    interactName: "nbtWithout",
    function: (nbt: CompoundTag): TypeLambda<string, CompoundTag> => {
      return (key: string): CompoundTag => {
        return nbt.without(key);
      };
    },
  },
  NBT_COMPOUND_WITH_BOOLEAN: {
    internalName: "integrateddynamics:nbt_compound_with_iBoolean",
    nicknames: ["nbtCompoundWithBoolean", "NBTWithBoolean"],
    parsedSignature: {
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
    symbol: "NBT{}.with_iBoolean",
    interactName: "nbtWithBoolean",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<iBoolean, CompoundTag>> => {
      return (key: string): TypeLambda<iBoolean, CompoundTag> => {
        return (value: iBoolean): CompoundTag => {
          return nbt.set(key, new ByteTag(new Integer(+value)));
        };
      };
    },
  },
  NBT_COMPOUND_WITH_SHORT: {
    internalName: "integrateddynamics:nbt_compound_with_short",
    nicknames: ["nbtCompoundWithShort", "NBTWithShort"],
    parsedSignature: {
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
    symbol: "NBT{}.with_short",
    interactName: "nbtWithShort",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<Integer, CompoundTag>> => {
      return (key: string): TypeLambda<Integer, CompoundTag> => {
        return (value: Integer): CompoundTag => {
          return nbt.set(key, new ShortTag(value));
        };
      };
    },
  },
  NBT_COMPOUND_WITH_INTEGER: {
    internalName: "integrateddynamics:nbt_compound_with_integer",
    nicknames: ["nbtCompoundWithInteger", "NBTWithInteger"],
    parsedSignature: {
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
    symbol: "NBT{}.with_integer",
    interactName: "nbtWithInteger",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<Integer, CompoundTag>> => {
      return (key: string): TypeLambda<Integer, CompoundTag> => {
        return (value: Integer): CompoundTag => {
          return nbt.set(key, new IntTag(value));
        };
      };
    },
  },
  NBT_COMPOUND_WITH_LONG: {
    internalName: "integrateddynamics:nbt_compound_with_long",
    nicknames: ["nbtCompoundWithLong", "NBTWithLong"],
    parsedSignature: {
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
    symbol: "NBT{}.with_long",
    interactName: "nbtWithLong",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<Long, CompoundTag>> => {
      return (key: string): TypeLambda<Long, CompoundTag> => {
        return (value: Long): CompoundTag => {
          return nbt.set(key, new LongTag(value));
        };
      };
    },
  },
  NBT_COMPOUND_WITH_DOUBLE: {
    internalName: "integrateddynamics:nbt_compound_with_double",
    nicknames: ["nbtCompoundWithDouble", "NBTWithDouble"],
    parsedSignature: {
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
    symbol: "NBT{}.with_double",
    interactName: "nbtWithDouble",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<Double, CompoundTag>> => {
      return (key: string): TypeLambda<Double, CompoundTag> => {
        return (value: Double): CompoundTag => {
          return nbt.set(key, new DoubleTag(value));
        };
      };
    },
  },
  NBT_COMPOUND_WITH_FLOAT: {
    internalName: "integrateddynamics:nbt_compound_with_float",
    nicknames: ["nbtCompoundWithFloat", "NBTWithFloat"],
    parsedSignature: {
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
    symbol: "NBT{}.with_float",
    interactName: "nbtWithFloat",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<Double, CompoundTag>> => {
      return (key: string): TypeLambda<Double, CompoundTag> => {
        return (value: Double): CompoundTag => {
          return nbt.set(key, new FloatTag(value));
        };
      };
    },
  },
  NBT_COMPOUND_WITH_STRING: {
    internalName: "integrateddynamics:nbt_compound_with_string",
    nicknames: ["nbtCompoundWithString", "NBTWithString"],
    parsedSignature: {
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
    symbol: "NBT{}.with_string",
    interactName: "nbtWithString",
    function: (
      nbt: CompoundTag
    ): TypeLambda<iString, TypeLambda<iString, CompoundTag>> => {
      return (key: iString): TypeLambda<iString, CompoundTag> => {
        return (value: iString): CompoundTag => {
          return nbt.set(key.valueOf(), new StringTag(value));
        };
      };
    },
  },
  NBT_COMPOUND_WITH_COMPOUND: {
    internalName: "integrateddynamics:nbt_compound_with_tag",
    nicknames: ["nbtCompoundWithCompound", "NBTWithNBT"],
    parsedSignature: {
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
    symbol: "NBT{}.with_tag",
    interactName: "nbtWithTag",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<CompoundTag, CompoundTag>> => {
      return (key: string): TypeLambda<CompoundTag, CompoundTag> => {
        return (value: CompoundTag): CompoundTag => {
          return nbt.set(key, value);
        };
      };
    },
  },
  NBT_COMPOUND_WITH_LIST_TAG: {
    internalName: "integrateddynamics:nbt_compound_with_list_tag",
    nicknames: ["nbtCompoundWithListTag", "NBTWithNBTList"],
    parsedSignature: {
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
    symbol: "NBT{}.with_tag_list",
    interactName: "nbtWithTagList",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<ListTag, CompoundTag>> => {
      return (key: string): TypeLambda<ListTag, CompoundTag> => {
        return (value: ListTag): CompoundTag => {
          return nbt.set(key, value);
        };
      };
    },
  },
  NBT_COMPOUND_WITH_LIST_BYTE: {
    internalName: "integrateddynamics:nbt_compound_with_list_byte",
    nicknames: ["nbtCompoundWithListByte", "NBTWithByteList"],
    parsedSignature: {
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
    symbol: "NBT{}.with_byte_list",
    interactName: "nbtWithByteList",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<ListTag, CompoundTag>> => {
      return (key: string): TypeLambda<ListTag, CompoundTag> => {
        return (value: ListTag): CompoundTag => {
          return nbt.set(key, value);
        };
      };
    },
  },
  NBT_COMPOUND_WITH_LIST_INT: {
    internalName: "integrateddynamics:nbt_compound_with_list_int",
    nicknames: ["nbtCompoundWithListInt", "NBTWithIntegerList"],
    parsedSignature: {
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
    symbol: "NBT{}.with_int_list",
    interactName: "nbtWithIntList",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<ListTag, CompoundTag>> => {
      return (key: string): TypeLambda<ListTag, CompoundTag> => {
        return (value: ListTag): CompoundTag => {
          return nbt.set(key, value);
        };
      };
    },
  },
  NBT_COMPOUND_WITH_LIST_LONG: {
    internalName: "integrateddynamics:nbt_compound_with_list_long",
    nicknames: ["nbtCompoundWithListLong", "NBTWithLongList"],
    parsedSignature: {
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
    symbol: "NBT{}.with_list_long",
    interactName: "nbtWithListLong",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<ListTag, CompoundTag>> => {
      return (key: string): TypeLambda<ListTag, CompoundTag> => {
        return (value: ListTag): CompoundTag => {
          return nbt.set(key, value);
        };
      };
    },
  },
  NBT_COMPOUND_SUBSET: {
    internalName: "integrateddynamics:nbt_compound_subset",
    nicknames: ["nbtCompoundSubset", "NBTSubset"],
    parsedSignature: {
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
    symbol: "NBT{}.⊆",
    interactName: "nbtIsSubset",
    function: (subSet: CompoundTag): TypeLambda<CompoundTag, iBoolean> => {
      return (superSet: CompoundTag): iBoolean => {
        return new iBoolean(superSet.compoundSubset(subSet));
      };
    },
  },
  NBT_COMPOUND_UNION: {
    internalName: "integrateddynamics:nbt_compound_union",
    nicknames: ["nbtCompoundUnion", "NBTUnion"],
    parsedSignature: {
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
    symbol: "NBT{}.∪",
    interactName: "nbtUnion",
    function: (nbt1: CompoundTag): TypeLambda<CompoundTag, CompoundTag> => {
      return (nbt2: CompoundTag): CompoundTag => {
        return nbt1.compoundUnion(nbt2);
      };
    },
  },
  NBT_COMPOUND_INTERSECTION: {
    internalName: "integrateddynamics:nbt_compound_intersection",
    nicknames: ["nbtCompoundIntersection", "NBTIntersection"],
    parsedSignature: {
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
    symbol: "NBT{}.∩",
    interactName: "nbtIntersection",
    function: (nbt1: CompoundTag) => {
      return (nbt2: CompoundTag) => {
        return nbt1.compoundIntersection(nbt2);
      };
    },
  },
  NBT_COMPOUND_MINUS: {
    internalName: "integrateddynamics:nbt_compound_minus",
    nicknames: ["nbtCompoundMinus", "NBTMinus"],
    parsedSignature: {
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
    symbol: "NBT{}.∖",
    interactName: "nbtMinus",
    function: (nbt1: CompoundTag) => {
      return (nbt2: CompoundTag) => {
        return nbt1.compoundMinus(nbt2);
      };
    },
  },
  NBT_AS_BOOLEAN: {
    internalName: "integrateddynamics:nbt_as_iBoolean",
    nicknames: ["nbtAsBoolean"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "NBT.as_iBoolean",
    interactName: "nbtAsBoolean",
    function: (nbt: ByteTag): iBoolean => {
      if (nbt.getType() === Tag.TAG_BYTE) {
        return new iBoolean(!!parseInt(nbt.valueOf().toDecimal()));
      } else {
        return new iBoolean(false);
      }
    },
  },
  NBT_AS_BYTE: {
    internalName: "integrateddynamics:nbt_as_byte",
    nicknames: ["nbtAsByte"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "NBT.as_byte",
    interactName: "nbtAsByte",
    function: (nbt: IntTag): Integer => {
      if (nbt.getType() === Tag.TAG_INT) {
        return nbt.valueOf();
      } else {
        return new Integer(0);
      }
    },
  },
  NBT_AS_SHORT: {
    internalName: "integrateddynamics:nbt_as_short",
    nicknames: ["nbtAsShort"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "NBT.as_short",
    interactName: "nbtAsShort",
    function: (nbt: IntTag): Integer => {
      if (nbt.getType() === Tag.TAG_INT) {
        return nbt.valueOf();
      } else {
        return new Integer(0);
      }
    },
  },
  NBT_AS_INT: {
    internalName: "integrateddynamics:nbt_as_int",
    nicknames: ["nbtAsInt"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "NBT.as_int",
    interactName: "nbtAsInt",
    function: (nbt: IntTag): Integer => {
      if (nbt.getType() === Tag.TAG_INT) {
        return nbt.valueOf();
      } else {
        return new Integer(0);
      }
    },
  },
  NBT_AS_LONG: {
    internalName: "integrateddynamics:nbt_as_long",
    nicknames: ["nbtAsLong"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Long",
      },
    },
    symbol: "NBT.as_long",
    interactName: "nbtAsLong",
    function: (nbt: LongTag): Long => {
      if (nbt.getType() === Tag.TAG_LONG) {
        return nbt.valueOf();
      } else {
        return new Long(0);
      }
    },
  },
  NBT_AS_DOUBLE: {
    internalName: "integrateddynamics:nbt_as_double",
    nicknames: ["nbtAsDouble"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "NBT.as_double",
    interactName: "nbtAsDouble",
    function: (nbt: DoubleTag): Double => {
      if (nbt.getType() === Tag.TAG_DOUBLE) {
        return nbt.valueOf();
      } else {
        return new Double(0);
      }
    },
  },
  NBT_AS_FLOAT: {
    internalName: "integrateddynamics:nbt_as_float",
    nicknames: ["nbtAsFloat"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "NBT.as_float",
    interactName: "nbtAsFloat",
    function: (nbt: DoubleTag): Double => {
      if (nbt.getType() === Tag.TAG_DOUBLE) {
        return nbt.valueOf();
      } else {
        return new Double(0);
      }
    },
  },
  NBT_AS_STRING: {
    internalName: "integrateddynamics:nbt_as_string",
    nicknames: ["nbtAsString"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "String",
      },
    },
    symbol: "NBT.as_string",
    interactName: "nbtAsString",
    function: (nbt: StringTag): iString => {
      if (nbt.getType() === Tag.TAG_STRING) {
        return nbt.valueOf();
      } else {
        return new iString("");
      }
    },
  },
  NBT_AS_TAG_LIST: {
    internalName: "integrateddynamics:nbt_as_tag_list",
    nicknames: ["nbtAsTagList"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: { type: "List", listType: { type: "NBT" } },
    },
    symbol: "NBT.as_tag_list",
    interactName: "nbtAsTagList",
    function: (nbt: ListTag): Array<Tag<IntegratedValue>> => {
      if (nbt.getType() === Tag.TAG_LIST) {
        return nbt.valueOf();
      } else {
        return new Array<Tag<any>>();
      }
    },
  },
  NBT_AS_BYTE_LIST: {
    internalName: "integrateddynamics:nbt_as_byte_list",
    nicknames: ["nbtAsByteList"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: { type: "List", listType: { type: "Integer" } },
    },
    symbol: "NBT.as_byte_list",
    interactName: "nbtAsByteList",
    function: (nbt: ListTag): Array<Integer> => {
      if (nbt.getType() === Tag.TAG_LIST) {
        const list = nbt.valueOf();
        if (!list.every((e) => e.getType() == Tag.TAG_INT))
          return new Array<Integer>();
        return list.map((e) => e.valueOf() as Integer);
      } else {
        return new Array<Integer>();
      }
    },
  },
  NBT_AS_INT_LIST: {
    internalName: "integrateddynamics:nbt_as_int_list",
    nicknames: ["nbtAsIntList"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: { type: "List", listType: { type: "Integer" } },
    },
    symbol: "NBT.as_int_list",
    interactName: "nbtAsIntList",
    function: (nbt: ListTag): Array<Integer> => {
      if (nbt.getType() === Tag.TAG_LIST) {
        const list = nbt.valueOf();
        if (!list.every((e) => e.getType() == Tag.TAG_INT))
          return new Array<Integer>();
        return list.map((e) => e.valueOf() as Integer);
      } else {
        return new Array<Integer>();
      }
    },
  },
  NBT_AS_LONG_LIST: {
    internalName: "integrateddynamics:nbt_as_long_list",
    nicknames: ["nbtAsLongList"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: { type: "List", listType: { type: "Long" } },
    },
    symbol: "NBT.as_long_list",
    interactName: "nbtAsLongList",
    function: (nbt: ListTag): Array<Long> => {
      if (nbt.getType() === Tag.TAG_LIST) {
        const list = nbt.valueOf();
        if (!list.every((e) => e.getType() == Tag.TAG_LONG))
          return new Array<Long>();
        return list.map((e) => e.valueOf() as Long);
      } else {
        return new Array<Long>();
      }
    },
  },
  NBT_FROM_BOOLEAN: {
    internalName: "integrateddynamics:nbt_from_iBoolean",
    nicknames: ["nbtFromBoolean"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Boolean",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_iBoolean",
    interactName: "booleanAsNbt",
    function: (bool: iBoolean): ByteTag => {
      return new ByteTag(new Integer(+bool));
    },
  },
  NBT_FROM_SHORT: {
    internalName: "integrateddynamics:nbt_from_short",
    nicknames: ["nbtFromShort"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_short",
    interactName: "shortAsNbt",
    function: (short: Integer): IntTag => {
      return new IntTag(short);
    },
  },
  NBT_FROM_BYTE: {
    internalName: "integrateddynamics:nbt_from_byte",
    nicknames: ["nbtFromByte"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_byte",
    interactName: "byteAsNbt",
    function: (byte: Integer): IntTag => {
      return new IntTag(byte);
    },
  },
  NBT_FROM_INT: {
    internalName: "integrateddynamics:nbt_from_int",
    nicknames: ["nbtFromInt"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_int",
    interactName: "integerAsNbt",
    function: (int: Integer): IntTag => {
      return new IntTag(int);
    },
  },
  NBT_FROM_LONG: {
    internalName: "integrateddynamics:nbt_from_long",
    nicknames: ["nbtFromLong"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Long",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_long",
    interactName: "longAsNbt",
    function: (long: Long): LongTag => {
      return new LongTag(long);
    },
  },
  NBT_FROM_DOUBLE: {
    internalName: "integrateddynamics:nbt_from_double",
    nicknames: ["nbtFromDouble"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Double",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_double",
    interactName: "doubleAsNbt",
    function: (double: Double): DoubleTag => {
      return new DoubleTag(double);
    },
  },
  NBT_FROM_FLOAT: {
    internalName: "integrateddynamics:nbt_from_float",
    nicknames: ["nbtFromFloat"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Double",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_float",
    interactName: "floatAsNbt",
    function: (float: Double): DoubleTag => {
      return new DoubleTag(float);
    },
  },
  NBT_FROM_STRING: {
    internalName: "integrateddynamics:nbt_from_string",
    nicknames: ["nbtFromString"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_string",
    interactName: "stringAsNbt",
    function: (str: iString): StringTag => {
      return new StringTag(str);
    },
  },
  NBT_FROM_TAG_LIST: {
    internalName: "integrateddynamics:nbt_from_tag_list",
    nicknames: ["nbtFromTagList"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "NBT" } },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_tag_list",
    interactName: "tagListAsNbt",
    function: (tagList: Array<CompoundTag>): ListTag => {
      return new ListTag(tagList);
    },
  },
  NBT_FROM_BYTE_LIST: {
    internalName: "integrateddynamics:nbt_from_byte_list",
    nicknames: ["nbtFromByteList"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Integer" } },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_byte_list",
    interactName: "byteListAsNbt",
    function: (byteList: Array<Integer>): ListTag => {
      return new ListTag(byteList.map((e) => new IntTag(e)));
    },
  },
  NBT_FROM_INT_LIST: {
    internalName: "integrateddynamics:nbt_from_int_list",
    nicknames: ["nbtFromIntList"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Integer" } },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_int_list",
    interactName: "intListAsNbt",
    function: (intList: Array<Integer>): ListTag => {
      return new ListTag(intList.map((e) => new IntTag(e)));
    },
  },
  NBT_FROM_LONG_LIST: {
    internalName: "integrateddynamics:nbt_from_long_list",
    nicknames: ["nbtFromLongList"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Long" } },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_long_list",
    interactName: "longListAsNbt",
    function: (longList: Array<Long>): ListTag => {
      return new ListTag(longList.map((e) => new LongTag(e)));
    },
  },
  NBT_PATH_MATCH_FIRST: {
    internalName: "integrateddynamics:nbt_path_match_first",
    nicknames: ["nbtPathMatchFirst"],
    parsedSignature: {
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
    symbol: "NBT.path_match_first",
    interactName: "stringNbtPathMatchFirst",
    function: (path: string): TypeLambda<CompoundTag, Tag<IntegratedValue>> => {
      return (nbt: CompoundTag): Tag<IntegratedValue> => {
        let expression = NbtPath.parse(path);
        if (!expression) throw new Error(`Invalid path: ${path}`);
        return expression.match(nbt).getMatches()[0] ?? new NullTag();
      };
    },
  },
  NBT_PATH_MATCH_ALL: {
    internalName: "integrateddynamics:nbt_path_match_all",
    nicknames: ["nbtPathMatchAll"],
    parsedSignature: {
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
    symbol: "NBT.path_match_all",
    interactName: "stringNbtPathMatchAll",
    function: (
      path: string
    ): TypeLambda<CompoundTag, Array<Tag<IntegratedValue>>> => {
      return (nbt: CompoundTag): Array<Tag<IntegratedValue>> => {
        let expression = NbtPath.parse(path);
        if (!expression) throw new Error(`Invalid path: ${path}`);
        return expression.match(nbt).getMatches();
      };
    },
  },
  NBT_PATH_TEST: {
    internalName: "integrateddynamics:nbt_path_test",
    nicknames: ["NBTPathTest"],
    parsedSignature: {
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
    symbol: "NBT.path_test",
    interactName: "stringNbtPathTest",
    function: (path: string): TypeLambda<CompoundTag, iBoolean> => {
      return (nbt: CompoundTag): iBoolean => {
        let expression = NbtPath.parse(path);
        if (!expression) throw new Error(`Invalid path: ${path}`);
        return new iBoolean(expression.test(nbt));
      };
    },
  },
  INGREDIENTS_ITEMS: {
    internalName: "integrateddynamics:ingredients_items",
    nicknames: ["ingredientsItems"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Ingredients",
      },
      to: { type: "List", listType: { type: "Item" } },
    },
    symbol: "Ingr.items",
    interactName: "ingredientsItems",
    function: (ingredients: Ingredients): Array<Item> => {
      return ingredients.getItems();
    },
  },
  INGREDIENTS_FLUIDS: {
    internalName: "integrateddynamics:ingredients_fluids",
    nicknames: ["ingredientsFluids"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Ingredients",
      },
      to: { type: "List", listType: { type: "Fluid" } },
    },
    symbol: "Ingr.fluids",
    interactName: "ingredientsFluids",
    function: (ingredients: Ingredients): Array<Fluid> => {
      return ingredients.getFluids();
    },
  },
  INGREDIENTS_ENERGIES: {
    internalName: "integrateddynamics:ingredients_energies",
    nicknames: ["ingredientsEnergies"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Ingredients",
      },
      to: { type: "List", listType: { type: "Long" } },
    },
    symbol: "Ingr.energies",
    interactName: "ingredientsEnergies",
    function: (ingredients: Ingredients): Array<Long> => {
      return ingredients.getEnergies();
    },
  },
  INGREDIENTS_WITH_ITEM: {
    internalName: "integrateddynamics:ingredients_with_item",
    nicknames: ["ingredientsWithItem"],
    parsedSignature: {
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
    symbol: "Ingr.with_item",
    interactName: "ingredientsWithItem",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Integer, TypeLambda<Item, Ingredients>> => {
      return (index: Integer): TypeLambda<Item, Ingredients> => {
        return (item: Item): Ingredients => {
          return ingredients.setItem(item, index);
        };
      };
    },
  },
  INGREDIENTS_WITH_FLUID: {
    internalName: "integrateddynamics:ingredients_with_fluid",
    nicknames: ["ingredientsWithFluid"],
    parsedSignature: {
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
    symbol: "Ingr.with_fluid",
    interactName: "ingredientsWithFluid",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Integer, TypeLambda<Fluid, Ingredients>> => {
      return (index: Integer): TypeLambda<Fluid, Ingredients> => {
        return (fluid: Fluid): Ingredients => {
          return ingredients.setFluid(fluid, index);
        };
      };
    },
  },
  INGREDIENTS_WITH_ENERGY: {
    internalName: "integrateddynamics:ingredients_with_energy",
    nicknames: ["ingredientsWithEnergy"],
    parsedSignature: {
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
    symbol: "Ingr.with_energy",
    interactName: "ingredientsWithEnergy",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Integer, TypeLambda<Long, Ingredients>> => {
      return (index: Integer): TypeLambda<Long, Ingredients> => {
        return (energy: Long): Ingredients => {
          return ingredients.setEnergy(energy, index);
        };
      };
    },
  },
  INGREDIENTS_WITH_ITEMS: {
    internalName: "integrateddynamics:ingredients_with_items",
    nicknames: ["ingredientsWithItems"],
    parsedSignature: {
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
    symbol: "Ingr.with_items",
    interactName: "ingredientsWithItems",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Array<Item>, Ingredients> => {
      return (itemList: Array<Item>): Ingredients => {
        return ingredients.appendItems(itemList);
      };
    },
  },
  INGREDIENTS_WITH_FLUIDS: {
    internalName: "integrateddynamics:ingredients_with_fluids",
    nicknames: ["ingredientsWithFluids"],
    parsedSignature: {
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
    symbol: "Ingr.with_fluids",
    interactName: "ingredientsWithFluids",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Array<Fluid>, Ingredients> => {
      return (fluidList: Array<Fluid>): Ingredients => {
        return ingredients.appendFluids(fluidList);
      };
    },
  },
  INGREDIENTS_WITH_ENERGIES: {
    internalName: "integrateddynamics:ingredients_with_energies",
    nicknames: ["ingredientsWithEnergies"],
    parsedSignature: {
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
    symbol: "Ingr.with_energies",
    interactName: "ingredientsWithEnergies",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Array<Long>, Ingredients> => {
      return (energyList: Array<Long>): Ingredients => {
        return ingredients.appendEnergies(energyList);
      };
    },
  },
  RECIPE_INPUT: {
    internalName: "integrateddynamics:recipe_input",
    nicknames: ["recipeInput", "recipeWithInput"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Recipe",
      },
      to: {
        type: "Ingredients",
      },
    },
    symbol: "recipe_in",
    interactName: "recipeInput",
    function: (recipe: Recipe): Ingredients => {
      return recipe.getInput();
    },
  },
  RECIPE_OUTPUT: {
    internalName: "integrateddynamics:recipe_output",
    nicknames: ["recipeOutput"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Recipe",
      },
      to: {
        type: "Ingredients",
      },
    },
    symbol: "recipe_out",
    interactName: "recipeOutput",
    function: (recipe: Recipe): Ingredients => {
      return recipe.getOutput();
    },
  },
  RECIPE_WITH_INPUT: {
    internalName: "integrateddynamics:recipe_with_input",
    nicknames: [, "recipeWithInput"],
    parsedSignature: {
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
    symbol: "Recipe.with_in",
    interactName: "recipeWithInput",
    function: (recipe: Recipe): TypeLambda<Ingredients, Recipe> => {
      return (ingredients: Ingredients): Recipe => {
        return recipe.setInput(ingredients);
      };
    },
  },
  RECIPE_WITH_OUTPUT: {
    internalName: "integrateddynamics:recipe_with_output",
    nicknames: ["recipeWithOutput"],
    parsedSignature: {
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
    symbol: "Recipe.with_out",
    interactName: "recipeWithOutput",
    function: (recipe: Recipe): TypeLambda<Ingredients, Recipe> => {
      return (ingredients: Ingredients): Recipe => {
        return recipe.setOutput(ingredients);
      };
    },
  },
  RECIPE_WITH_INPUT_OUTPUT: {
    internalName: "integrateddynamics:recipe_with_input_output",
    nicknames: ["recipeWithInputOutput"],
    parsedSignature: {
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
    symbol: "Recipe.with_io",
    interactName: "ingredientsWithInputOutput",
    function: (input: Ingredients): TypeLambda<Ingredients, Recipe> => {
      return (output: Ingredients): Recipe => {
        return new Recipe(input, output);
      };
    },
  },
  PARSE_BOOLEAN: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.iBoolean",
    nicknames: ["parseBoolean"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "parse_iBoolean",
    interactName: "stringParseAsBoolean",
    function: (value: string): iBoolean => {
      const matchArr =
        new RE2("(F(alse)?|[+-]?(0x|#)?0+|)", "i").match(value) ?? [];
      return new iBoolean(!!matchArr[0]);
    },
  },
  PARSE_DOUBLE: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double",
    nicknames: ["parseDouble"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Any",
        typeID: 1,
      },
      to: {
        type: "Double",
      },
    },
    symbol: "parse_double",
    interactName: "stringParseAsDouble",
    function: (data: IntegratedValue): Double => {
      try {
        return new Double(data as Double); // fine to cast as constructor throws error
      } catch (e) {
        return new Double(0);
      }
    },
  },
  PARSE_INTEGER: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.integer",
    nicknames: ["parseInteger"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Any",
        typeID: 1,
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "parse_integer",
    interactName: "stringParseAsInteger",
    function: (data: IntegratedValue): Integer => {
      try {
        return new Integer(data as Integer);
      } catch (e) {
        return new Integer(0);
      }
    },
  },
  PARSE_LONG: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.long",
    nicknames: ["parseLong"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Any",
        typeID: 1,
      },
      to: {
        type: "Long",
      },
    },
    symbol: "parse_long",
    interactName: "stringParseAsLong",
    function: (data: IntegratedValue): Long => {
      try {
        return new Long(data as Long);
      } catch (e) {
        return new Long(0);
      }
    },
  },
  PARSE_NBT: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.nbt",
    nicknames: ["parseNBT"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "parse_nbt",
    interactName: "stringParseAsNbt",
    function: (data: string): CompoundTag => {
      return CompoundTag.fromJSON(data);
    },
  },
  GENERAL_CHOICE: {
    internalName: "integrateddynamics:general_choice",
    nicknames: ["generalChoice", "choice"],
    parsedSignature: {
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
    symbol: "?",
    interactName: "booleanChoice",
    function: <T>(bool: iBoolean): TypeLambda<T, TypeLambda<T, T>> => {
      return (trueValue: T): TypeLambda<T, T> => {
        return (falseValue: T): T => {
          return bool ? trueValue : falseValue;
        };
      };
    },
  },
  GENERAL_IDENTITY: {
    internalName: "integrateddynamics:general_identity",
    nicknames: ["generalIdentity"],
    parsedSignature: {
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
    symbol: "id",
    interactName: "anyIdentity",
    function: (value: IntegratedValue): IntegratedValue => {
      return value;
    },
  },
  GENERAL_CONSTANT: {
    internalName: "integrateddynamics:general_constant",
    nicknames: ["generalConstant"],
    parsedSignature: {
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
    symbol: "K",
    interactName: "anyConstant",
    function: (value: IntegratedValue): TypeLambda<void, IntegratedValue> => {
      return () => {
        return value;
      };
    },
  },
  INTEGER_TO_DOUBLE: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_double",
    nicknames: ["intToDouble", "integerDouble", "integerToDouble"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "()",
    interactName: "integerIntegerToDouble",
    function: (int: Integer): Promise<Double> => {
      return int.toDouble();
    },
  },
  INTEGER_TO_LONG: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_long",
    nicknames: ["intToLong", "integerLong", "integerToLong"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "Long",
      },
    },
    symbol: "()",
    interactName: "integerIntegerToLong",
    function: (int: Integer): Promise<Long> => {
      return int.toLong();
    },
  },
  DOUBLE_TO_INTEGER: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_integer",
    nicknames: ["doubleToInt", "doubleInteger", "doubleToInteger"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Double",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "()",
    interactName: "doubleDoubleToInteger",
    function: (double: Double): Promise<Integer> => {
      return double.toInteger();
    },
  },
  DOUBLE_TO_LONG: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_long",
    nicknames: ["doubleToLong", "doubleToLong"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Double",
      },
      to: {
        type: "Long",
      },
    },
    symbol: "()",
    interactName: "doubleDoubleToLong",
    function: (double: Double): Promise<Long> => {
      return double.toLong();
    },
  },
  LONG_TO_INTEGER: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_integer",
    nicknames: ["longToInt", "longInteger", "longToInteger"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Long",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "()",
    interactName: "longLongToInteger",
    function: (long: Long): Promise<Integer> => {
      return long.toInteger();
    },
  },
  LONG_TO_DOUBLE: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_double",
    nicknames: ["longToDouble", "longDouble", "longToDouble"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Long",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "()",
    interactName: "longLongToDouble",
    function: (long: Long): Promise<Double> => {
      return long.toDouble();
    },
  },
} as const;

const operatorRegistry = new OperatorRegistry();
for (const [k, v] of Object.entries(operatorRegistryRawData)) {
  operatorRegistry.register(k, v, globalMap);
}
export { operatorRegistry };
