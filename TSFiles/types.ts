import { operatorRegistry } from "./operatorRegistry";
import { Operator } from "./IntegratedDynamicsClasses/Operator";
import { Double } from "./JavaNumberClasses/Double";
import { Integer } from "./JavaNumberClasses/Integer";
import { Long } from "./JavaNumberClasses/Long";

export type TypeTypeMap = {
  [typeID: number]: TypeRawSignatureAST.RawSignatureDefiniteValue;
};
export type TypeLambda<P, R> = (...args: [P]) => R;
export type TypeNumericString = `${number}` | `-${number}`;
export type TypeOperatorKey = keyof (typeof operatorRegistry)["baseOperators"];
export type TypeOperatorNicknames =
  (typeof operatorRegistry)["baseOperators"][TypeOperatorKey]["nicknames"][number];
export type TypeOperatorInternalName =
  (typeof operatorRegistry)["baseOperators"][TypeOperatorKey]["internalName"];
export type TypeBit = 0 | 1;
export type TypeInt4 = [TypeBit, TypeBit, TypeBit, TypeBit];
export type TypeInt8 = [...TypeInt4, ...TypeInt4];
export type TypeInt16 = [...TypeInt8, ...TypeInt8];
export type TypeInt32 = [...TypeInt16, ...TypeInt16];
export type TypeInt64 = [...TypeInt32, ...TypeInt32];
export type TypeNumber = Integer | Long | Double;

export namespace TypeRawSignatureAST {
  export type RawSignatureNode = RawSignatureDefiniteValue | RawSignatureAny;

  export type RawSignatureFunction = {
    type: "Function";
    from: RawSignatureNode;
    to: RawSignatureNode;
  };

  export type RawSignatureList = {
    type: "List";
    listType: RawSignatureDefiniteValue | RawSignatureAny;
  };

  export type RawSignatureAny = {
    type: "Any";
    typeID: number;
  };

  export type RawSignatureDefiniteValue =
    | {
        type:
          | "Integer"
          | "Long"
          | "Double"
          | "Number"
          | "Boolean"
          | "String"
          | "Number"
          | "Item"
          | "Block"
          | "Fluid"
          | "NBT"
          | "Ingredients"
          | "UniquelyNamed"
          | "Named";
      }
    | RawSignatureList
    | RawSignatureFunction
    | RawSignatureRecipe
    | RawSignatureUniquelyNamed
    | RawSignatureNamed;

  export type RawSignatureUniquelyNamed = {
    type: "UniquelyNamed";
  };

  export type RawSignatureNamed = {
    type: "Named";
  };

  export type RawSignatureRecipe = {
    type: "Recipe";
    input: { type: "Ingredients" };
    output: { type: "Ingredients" };
  };
}

export interface TypeOperatorRegistry {
  baseOperators: {
    [k: string]: Operator;
  };
  typeSerializers: {
    [k: string]: { valueType: string; nbtType: string };
  };
}

export namespace SNBTTypes {
  export type int = number & { __int: void };

  export interface OperatorWrapper<T = Operator> {
    v: T;
  }

  export interface CombinedPipe {
    serializer: "integrateddynamics:combined.pipe";
    value: {
      operators: OperatorWrapper<Operator>[];
    };
  }

  export interface CombinedFlip {
    serializer: "integrateddynamics:combined.flip";
    value: {
      operators: OperatorWrapper<Operator>[];
    };
  }

  export interface Curry {
    serializer: "integrateddynamics:curry";
    value: {
      baseOperator: OperatorWrapper<Operator>;
      values: {
        value: Operator;
        valueType: string;
      }[];
    };
  }

  export type Operator =
    | CombinedPipe
    | CombinedFlip
    | Curry
    | TypeOperatorInternalName;

  export interface RootSNBT {
    _id: int;
    _type: "integrateddynamics:valuetype";
    typeName: string;
    value: Operator;
  }
}
