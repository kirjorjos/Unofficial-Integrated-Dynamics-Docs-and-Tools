namespace TypeAST {
  type Integer = {
    type: "Integer";
    value: TypeNumericString;
    varName?: string;
  };
  type Long = { type: "Long"; value: TypeNumericString; varName?: string };
  type Double = { type: "Double"; value: TypeNumericString; varName?: string };
  type String = { type: "String"; value: string; varName?: string };
  type Boolean = { type: "Boolean"; value: boolean; varName?: string };
  type Null = { type: "Null"; varName?: string };

  type Block = { type: "Block"; value: jsonObject; varName?: string };
  type Item = { type: "Item"; value: jsonObject; varName?: string };
  type Fluid = { type: "Fluid"; value: jsonObject; varName?: string };
  type Entity = { type: "Entity"; value: jsonObject; varName?: string };

  type Ingredients = {
    type: "Ingredients";
    value: {
      items?: Item[];
      fluids?: Fluid[];
      energy?: Long[];
    };
    varName?: string;
  };

  type Recipe = {
    type: "Recipe";
    value: {
      input: Ingredients;
      output: Ingredients;
      inputReuseable: {
        items: number[];
        fluids: number[];
        energies: number[];
      };
    };
    varName?: string;
  };

  type Nbt = { type: "NBT"; value: jsonData; varName?: string };

  type BaseOperator = {
    type: "Operator";
    opName: TypeOperatorKey;
    varName?: string;
  };

  type Flip = {
    type: "Flip";
    arg: Operator;
    varName?: string;
  };

  type Pipe = {
    type: "Pipe";
    op1: Operator;
    op2: Operator;
    varName?: string;
  };

  type Pipe2 = {
    type: "Pipe2";
    op1: Operator;
    op2: Operator;
    op3: Operator;
    varName?: string;
  };

  type Curried = {
    type: "Curry";
    base: Operator;
    args: AST[];
    varName?: string;
  };

  type Identifier = Block | Item | Fluid | Entity | Ingredients | Recipe | Nbt;

  type Constant =
    | Integer
    | Long
    | Double
    | String
    | Boolean
    | Null
    | Identifier;

  type Operator = BaseOperator | Flip | Pipe | Pipe2 | Curried;

  type AST = Constant | Operator;
}
