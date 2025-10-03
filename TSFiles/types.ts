import { operatorRegistry } from "./operatorRegistry";
import { Operator } from "./IntegratedDynamicsClasses/Operator";
import { Double } from "./JavaNumberClasses/Double";
import { Integer } from "./JavaNumberClasses/Integer";
import { Long } from "./JavaNumberClasses/Long";

export type TypeFunction = {
  kind: "Function";
  from: TypeAny | TypeConcrete | TypeGeneric | TypeFunction | TypeList;
  to: TypeAny | TypeConcrete | TypeGeneric | TypeFunction | TypeList;
};
export type TypeAny = { kind: "Any"; typeID: string; argName?: string };
export type TypeConcrete = {
  name: "Integer" | "Long" | "Double" | "Boolean" | "String" | "Number";
  kind: "Concrete";
};
export type TypeGeneric = {
  name: string;
  kind: "Generic";
  of: TypeConcrete | TypeAny | TypeList;
  argName?: string;
};
export type TypeOperator = { kind: "Operator"; args: TypeFunction[] };
export type TypeList = {
  kind: "Concrete";
  name: "List";
  params:
    | TypeAny[]
    | TypeConcrete[]
    | TypeGeneric[]
    | TypeFunction[]
    | TypeList[];
};
export type TypeTypeMap = { [typeID: string]: string };
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
