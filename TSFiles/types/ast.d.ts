namespace TypeAST {
  type Integer = { type: "Integer"; value: TypeNumericString };
  type Long = { type: "Long"; value: TypeNumericString };
  type Double = { type: "Double"; value: TypeNumericString };
  type String = { type: "String"; value: string };
  type Boolean = { type: "Boolean"; value: boolean };

  type Operator = {
    type: "Operator";
    value: TypeOperatorKey;
    args?: AST[];
  };

  type Flip = { seralizer: "flip"; args: [AST] };

  type Pipe = { seralizer: "pipe"; args: [AST, AST] };
  type Pipe2 = { seralizer: "pipe2"; args: [AST, AST, AST] };

  type Curried = { serializer: "curry"; args: AST[] };

  type Constant = Integer | Long | Double | String | Boolean | Operator;

  type AST = Flip | Pipe | Pipe2 | Curried | Constant | Operator;
}