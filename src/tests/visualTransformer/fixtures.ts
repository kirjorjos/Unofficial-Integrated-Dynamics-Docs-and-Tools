import { CodeLineToAST } from "lib/transformers/CodeLine";
import { resetExpandedVarCounter } from "lib/transformers/Expanded";
import { globalMap } from "lib/HelperClasses/TypeMap";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { generateVisualSteps } from "pages-lib/visualTransformerLogic";

export const beforeEachVisualTransformer = (): void => {
  globalMap.clear();
  ParsedSignature.resetTypeIDCounter();
  resetExpandedVarCounter();
};

export const makeAst = {
  arithmetic: (): TypeAST.AST => CodeLineToAST("apply add 1 2"),
  chained: (): TypeAST.AST => CodeLineToAST("apply multiply (apply add 1 2) 3"),
  partial: (): TypeAST.AST => CodeLineToAST("apply add 1"),
  flip: (): TypeAST.AST => CodeLineToAST("flip numberAdd"),
  invalidFlip: (): TypeAST.AST => CodeLineToAST("flip numberIncrement"),
  pipe: (): TypeAST.AST => CodeLineToAST("pipe numberIncrement numberMultiply"),
  pipe2: (): TypeAST.AST =>
    CodeLineToAST("pipe2 numberIncrement numberIncrement numberAdd"),
  list: (): TypeAST.AST => CodeLineToAST("[1, 2, 3]"),
  divzero: (): TypeAST.AST => CodeLineToAST("apply divide 10 0"),
  typeMismatch: (): TypeAST.AST => CodeLineToAST("apply add true 2"),
  stringConcat: (): TypeAST.AST => CodeLineToAST('apply stringConcat "a" "b"'),
  conjunction: (): TypeAST.AST =>
    CodeLineToAST("apply operatorConjunction true true"),
  stringVal: (): TypeAST.AST => CodeLineToAST('"hello"'),
  boolVal: (): TypeAST.AST => CodeLineToAST("true"),
  operatorNode: (): TypeAST.AST => CodeLineToAST("numberIncrement"),
};

export const steps = (
  ast: TypeAST.AST,
  startVariableId = 0,
  mode?: "value" | "pattern"
): ReturnType<typeof generateVisualSteps> =>
  generateVisualSteps(ast, startVariableId, mode);
