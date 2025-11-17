namespace TypeSNBTValue {
  type GenericNBT = { string: GenericNBT } | GenericNBT[] | PrimitiveValue;

  type ProxyValueType =
    | "integrateddynamics:operator"
    | "integrateddynamics:integer"
    | "integrateddynamics:list";

  type ObjectValue =
    | Serialized
    | Operator
    | Item
    | Fluid
    | Ingredients
    | Recipe;

  interface Item {
    id: string;
    Count: number;
    tag?: GenericNBT;
  }

  interface Fluid {
    FluidName: string;
    Amount: number;
    tag?: GenericNBT;
  }

  interface Ingredients {
    "minecraft:fluidstack"?: Fluid[];
    "minecraft:itemstack"?: Item[];
    //energy
  }

  interface Recipe {
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

  type Value = PrimitiveValue | ObjectValue;

  interface PrimitiveValue {
    value: string | Byte | number | Long | Double;
  }

  type Byte = `${TypeNumericString}b`;

  type Long = `${TypeNumericString}L`;
  type Double = `${TypeNumericString}d`;

  type Serialized = Curried | Piped | Pip2ed | Flipped | Proxied;

  interface Curried {
    serializer: "integrateddynamics:curry";
    value: {
      baseOperator: Operator;
      values: Value[];
    };
  }

  interface Piped {
    serializer: "integrateddynamics:combined.pipe";
    value: {
      operators: [OperatorWrapper, OperatorWrapper];
    };
  }

  interface Pip2ed {
    serializer: "integrateddynamics:combined.pipe2";
    value: {
      operators: [OperatorWrapper, OperatorWrapper, OperatorWrapper];
    };
  }

  interface Flipped {
    serializer: "integrateddynamics:combined.flip";
    value: {
      operators: [OperatorWrapper];
    };
  }

  interface Proxied {
    value: {
      proxyName: "integrateddynamics:lazybuilt";
      serialized: SerializedProxy;
    };
  }

  interface OperatorWrapper {
    v: Operator;
  }

  type Operator = TypeOperatorInternalName | Serialized;

  interface SerializedProxy {
    value: Value;
    operator: Serialized;
    valueType: ProxyValueType;
  }

  interface Root {
    _id: number;
    _type: "integrateddynamics:valuetype";
    typeName: string;
    value: Value;
  }
}
