namespace TypeAST {
  type Integer = { type: "Integer"; value: TypeNumericString };
  type Long = { type: "Long"; value: TypeNumericString };
  type Double = { type: "Double"; value: TypeNumericString };
  type String = { type: "String"; value: string };
  type Boolean = { type: "Boolean"; value: boolean };
  type Null = { type: "Null" };

  type Block = { type: "Block"; value: jsonObject };
  type Item = { type: "Item"; value: jsonObject };
  type Fluid = { type: "Fluid"; value: jsonObject };
  type Entity = { type: "Entity"; value: jsonObject };

  type Ingredients = {
    type: "Ingredients";
    value: {
      items?: Item[];
      fluids?: Fluid[];
      energy?: Long[];
    };
  };

  type Recipe = {
    type: "Recipe";
    value: {
      in: Ingredients;
      out: Ingredients;
    };
  };

  type Nbt = { type: "NBT"; value: jsonData };

  type BaseOperator = {
    type: "Operator";
    opName: TypeOperatorKey;
  };

  type Flip = {
    type: "Flip";
    arg: AST;
  };

  type Pipe = {
    type: "Pipe";
    op1: AST;
    op2: AST;
  };

  type Pipe2 = {
    type: "Pipe2";
    op1: AST;
    op2: AST;
    op3: AST;
  };

  type Curried = {
    type: "Curry";
    base: AST;
    args: AST[];
  };

  type Constant =
    | Integer
    | Long
    | Double
    | String
    | Boolean
    | Null
    | Block
    | Item
    | Fluid
    | Entity
    | Ingredients
    | Recipe
    | Nbt;

  type AST = Constant | BaseOperator | Flip | Pipe | Pipe2 | Curried;
}
