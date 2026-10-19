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
  type List = { type: "List"; value: AST[]; varName?: string };

  type Reader = {
    type: "Reader";
    value: {
      reader: string;
      partId?: string;
      aspect: string;
      settings?: Record<string, number | boolean | string>;
      simulatedOutput?: AST;
    };
    varName?: string;
  };

  type Dynamic = { type: "Dynamic"; value: AST; varName?: string };

  type Static = { type: "Static"; value: AST; varName?: string };

  type Materialize = { type: "Materialize"; value: AST; varName?: string };

  type Display = { type: "Display"; value: AST; varName?: string };

  type Card = { type: "Card"; value: AST; varName?: string };

  type Wrapper = Materialize | Dynamic | Static | Display | Card;

  type PartSettings = Record<string, jsonData>;

  type VarStore = {
    type: "VarStore";
    value: { id?: string; cards: AST[] };
    varName?: string;
  };

  type DisplayPanel = {
    type: "DisplayPanel";
    value: { id?: string; inventory: AST[]; settings?: PartSettings };
    varName?: string;
  };

  type Writer = {
    type: "Writer";
    value: {
      partType: string;
      id?: string;
      inventory: AST[];
      settings?: PartSettings;
    };
    varName?: string;
  };

  type Exporter = {
    type: "Exporter";
    value: {
      partType: string;
      id?: string;
      inventory: AST[];
      settings?: PartSettings;
    };
    varName?: string;
  };

  type Importer = {
    type: "Importer";
    value: {
      partType: string;
      id?: string;
      inventory: AST[];
      settings?: PartSettings;
    };
    varName?: string;
  };

  type Source = VarStore | DisplayPanel | Writer | Exporter | Importer;

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

  type Identifier =
    | Block
    | Item
    | Fluid
    | Entity
    | Ingredients
    | Recipe
    | Nbt
    | Reader
    | Source;

  type Variable = { type: "Variable"; name: string; varName?: string };

  type NetworkCards = {
    type: "NetworkCards";
    definitions: {
      name: string;
      node: AST;
      segmentIndex?: number;
      comment?: string[];
    }[];
    varName?: string;
  };

  type Constant =
    | Integer
    | Long
    | Double
    | String
    | Boolean
    | Null
    | List
    | Identifier
    | Variable;

  type Operator = BaseOperator | Flip | Pipe | Pipe2 | Curried;

  type AST = Constant | Operator | NetworkCards | Wrapper;
}
