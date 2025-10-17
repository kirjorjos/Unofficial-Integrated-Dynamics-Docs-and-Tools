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
          | "Named"
          | "Entity";
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

export namespace TypeSNBTValue {
  export type GenericNBT =
    | { string: GenericNBT }
    | GenericNBT[]
    | PrimitiveValue;

  export type ProxyValueType =
    | "integrateddynamics:operator"
    | "integrateddynamics:integer"
    | "integrateddynamics:list";

  export type ObjectValue =
    | Serialized
    | Operator
    | Item
    | Fluid
    | Ingredients
    | Recipe;

  export interface Item {
    id: string;
    Count: number;
    tag?: GenericNBT;
  }

  export interface Fluid {
    FluidName: string;
    Amount: number;
    tag?: GenericNBT;
  }

  export interface Ingredients {
    "minecraft:fluidstack"?: Fluid[];
    "minecraft:itemstack"?: Item[];
    //energy
  }

  export interface Recipe {
    input: {
      "minecraft:itemstack"?: {
        val: { prototype: Item; condition: number }[];
        type: Byte;
      }[];
      "minecraft:fluidstack"?: {
        val: { prototype: Fluid; condition: number }[];
        type: Byte;
      }[];
      //energy
    };
    output: {
      "minecraft:itemstack"?: Item[];
      "minecraft:fluidstack"?: Fluid[];
      //energy
    };
    inputReusable: {
      "minecraft:itemstack"?: Byte[];
      "minecraft:fluidstack"?: Byte[];
      //energy
    };
  }

  export type Value = PrimitiveValue | ObjectValue;

  export interface PrimitiveValue {
    value: string | Byte | number | Long | Double;
  }

  export type Byte = `${TypeNumericString}b`;

  export type Long = `${TypeNumericString}L`;
  export type Double = `${TypeNumericString}d`;

  export type Serialized = Curried | Piped | Pip2ed | Flipped | Proxied;

  export interface Curried {
    serializer: "integrateddynamics:curry";
    value: {
      baseOperator: Operator;
      values: Value[];
    };
  }

  export interface Piped {
    serializer: "integrateddynamics:combined.pipe";
    value: {
      operators: [OperatorWrapper, OperatorWrapper];
    };
  }

  export interface Pip2ed {
    serializer: "integrateddynamics:combined.pipe2";
    value: {
      operators: [OperatorWrapper, OperatorWrapper, OperatorWrapper];
    };
  }

  export interface Flipped {
    serializer: "integrateddynamics:combined.flip";
    value: {
      operators: [OperatorWrapper];
    };
  }

  export interface Proxied {
    value: {
      proxyName: "integrateddynamics:lazybuilt";
      serialized: SerializedProxy;
    };
  }

  export interface OperatorWrapper {
    v: Operator;
  }

  export type Operator = TypeOperatorInternalName | Serialized;

  export interface SerializedProxy {
    value: Value;
    operator: Serialized;
    valueType: ProxyValueType;
  }

  export interface Root {
    _id: number;
    _type: "integrateddynamics:valuetype";
    typeName: string;
    value: Value;
  }
}

export namespace TypeAST {
  export type Integer = { type: "Integer"; value: TypeNumericString };
  export type Long = { type: "Long"; value: TypeNumericString };
  export type Double = { type: "Double"; value: TypeNumericString };
  export type String = { type: "String"; value: string };
  export type Boolean = { type: "Boolean"; value: boolean };

  export type Operator = {
    type: "Operator";
    value: TypeOperatorKey;
    args?: AST[];
  };

  export type Flip = { seralizer: "flip"; args: [AST] };

  export type Pipe = { seralizer: "pipe"; args: [AST, AST] };
  export type Pipe2 = { seralizer: "pipe2"; args: [AST, AST, AST] };

  export type Curried = { serializer: "curry"; args: AST[] };

  export type Constant = Integer | Long | Double | String | Boolean | Operator;

  export type AST = Flip | Pipe | Pipe2 | Curried | Constant | Operator;
}

export type IntegratedValue = (TypeRawSignatureAST.RawSignatureNode & { value?: IntegratedValue }) | Operator | boolean | string

export type Predicate = Operator & {
  fn: (...args: any[]) => boolean;
};