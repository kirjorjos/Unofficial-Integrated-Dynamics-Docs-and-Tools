import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { astChildren, mapAst, visitAst } from "lib/transformers/astTraversal";
import { StructuralParseError } from "lib/transformers/parseErrors";
import { assertVariableShape } from "lib/transformers/variableRef";

const ID_OP = (opName: string): TypeAST.BaseOperator => ({
  type: "Operator",
  opName: opName as TypeOperatorKey,
});
const APPLY_OP = ID_OP("OPERATOR_APPLY");
const CONST_OP = ID_OP("GENERAL_CONSTANT");
const IDEN_OP = ID_OP("GENERAL_IDENTITY");
const FLIP_OP = ID_OP("OPERATOR_FLIP");
const PIPE_OP = ID_OP("OPERATOR_PIPE");
const PIPE2_OP = ID_OP("OPERATOR_PIPE2");

const isWrapperNode = (
  node: TypeAST.AST
): node is
  | TypeAST.Materialize
  | TypeAST.Dynamic
  | TypeAST.Static
  | TypeAST.Display
  | TypeAST.Card =>
  node.type === "Materialize" ||
  node.type === "Dynamic" ||
  node.type === "Static" ||
  node.type === "Display" ||
  node.type === "Card";

const isBlockedInsideLambda = (node: TypeAST.AST): boolean =>
  node.type === "NetworkCards" ||
  node.type === "VarStore" ||
  node.type === "DisplayPanel" ||
  node.type === "Writer" ||
  node.type === "Exporter" ||
  node.type === "Importer";

const containsParam = (index: number, body: TypeAST.AST): boolean => {
  let found = false;
  visitAst(body, (node) => {
    if (
      !found &&
      node.type === "Param" &&
      node.index === index &&
      (node.binderDepth ?? 0) === 0
    ) {
      found = true;
    }
  });
  return found;
};

const condense = (body: TypeAST.AST): TypeAST.AST => {
  if (body.type === "Pipe") {
    if (
      body.op1.type === "Operator" &&
      body.op1.opName === "GENERAL_IDENTITY"
    ) {
      return condense(body.op2);
    }
    if (
      body.op2.type === "Operator" &&
      body.op2.opName === "GENERAL_IDENTITY"
    ) {
      return condense(body.op1);
    }
    if (body.op2.type === "Operator" && body.op2.opName === "LOGICAL_NOT") {
      return condense({
        type: "Curry",
        base: ID_OP("OPERATOR_NEGATION"),
        args: [body.op1],
      });
    }
    const op1 = condense(body.op1);
    const op2 = condense(body.op2);
    if (op1 === body.op1 && op2 === body.op2) return body;
    return condense({
      ...body,
      op1: op1 as TypeAST.Operator,
      op2: op2 as TypeAST.Operator,
    });
  }
  if (body.type === "Curry") {
    if (body.base.type === "Curry") {
      return condense({
        ...body,
        base: body.base.base,
        args: [...body.base.args, ...body.args],
      });
    }
    const base = condense(body.base);
    const args = body.args.map(condense);
    if (base === body.base && args.every((arg, i) => arg === body.args[i])) {
      return body;
    }
    return condense({ ...body, base: base as TypeAST.Operator, args });
  }
  if (body.type === "Pipe2") {
    if (body.op3.type === "Operator" && body.op3.opName === "LOGICAL_AND") {
      return condense({
        type: "Curry",
        base: ID_OP("OPERATOR_CONJUNCTION"),
        args: [body.op1, body.op2],
      });
    }
    if (body.op3.type === "Operator" && body.op3.opName === "LOGICAL_OR") {
      return condense({
        type: "Curry",
        base: ID_OP("OPERATOR_DISJUNCTION"),
        args: [body.op1, body.op2],
      });
    }
    const op1 = condense(body.op1);
    const op2 = condense(body.op2);
    const op3 = condense(body.op3);
    if (op1 === body.op1 && op2 === body.op2 && op3 === body.op3) {
      return body;
    }
    return condense({
      ...body,
      op1: op1 as TypeAST.Operator,
      op2: op2 as TypeAST.Operator,
      op3: op3 as TypeAST.Operator,
    });
  }
  if (body.type === "Flip" && body.arg.type === "Operator") {
    const originalOp = new operatorRegistry[body.arg.opName]();
    if (originalOp instanceof BaseOperator && originalOp.flipTarget) {
      return { type: "Operator", opName: originalOp.flipTarget };
    }
    const arg = condense(body.arg);
    if (arg === body.arg) return body;
    return condense({ ...body, arg: arg as TypeAST.Operator });
  }
  return body;
};

interface LoweringContext {
  blockers: string[];
}

const abstractParam = (
  index: number,
  body: TypeAST.AST,
  ctx: LoweringContext
): TypeAST.AST => {
  if (body.type === "Curry" && body.base.type === "Curry") {
    return abstractParam(
      index,
      {
        type: "Curry",
        base: body.base.base,
        args: [...body.base.args, ...body.args],
      },
      ctx
    );
  }

  if (!containsParam(index, body)) {
    return condense({ type: "Curry", base: CONST_OP, args: [body] });
  }

  if (isWrapperNode(body)) {
    return abstractParam(index, body.value, ctx);
  }
  if (body.type === "Param") {
    return IDEN_OP;
  }
  if (body.type === "Pipe") {
    return abstractParam(
      index,
      { type: "Curry", base: PIPE_OP, args: [body.op1, body.op2] },
      ctx
    );
  }
  if (body.type === "Pipe2") {
    return abstractParam(
      index,
      { type: "Curry", base: PIPE2_OP, args: [body.op1, body.op2, body.op3] },
      ctx
    );
  }
  if (body.type === "Flip") {
    return condense({
      type: "Pipe",
      op1: abstractParam(index, body.arg, ctx) as TypeAST.Operator,
      op2: FLIP_OP,
    });
  }
  if (body.type === "Curry") {
    const fun = body.base;
    if (containsParam(index, fun)) {
      return abstractParam(
        index,
        { type: "Curry", base: APPLY_OP, args: [fun, ...body.args] },
        ctx
      );
    }
    if (body.args.length === 0) {
      return condense({ type: "Curry", base: CONST_OP, args: [fun] });
    }
    if (body.args.length === 1) {
      return condense({
        type: "Pipe",
        op1: abstractParam(index, body.args[0]!, ctx) as TypeAST.Operator,
        op2: fun,
      });
    }
    if (body.args.length === 2) {
      const arg1 = body.args[0]!;
      const arg2 = body.args[1]!;
      const arg1Contains = containsParam(index, arg1);
      const arg2Contains = containsParam(index, arg2);
      if (arg1Contains && arg2Contains) {
        return condense({
          type: "Pipe2",
          op1: abstractParam(index, arg1, ctx) as TypeAST.Operator,
          op2: abstractParam(index, arg2, ctx) as TypeAST.Operator,
          op3: fun,
        });
      } else if (arg2Contains) {
        return condense({
          type: "Pipe",
          op1: abstractParam(index, arg2, ctx) as TypeAST.Operator,
          op2: { type: "Curry", base: fun, args: [arg1] },
        });
      }
      return condense({
        type: "Pipe",
        op1: abstractParam(index, arg1, ctx) as TypeAST.Operator,
        op2: { type: "Curry", base: { type: "Flip", arg: fun }, args: [arg2] },
      });
    }

    const firstArgs = body.args.slice(0, -2);
    const secondLastArg = body.args[body.args.length - 2]!;
    const lastArg = body.args[body.args.length - 1]!;

    if (firstArgs.some((arg) => containsParam(index, arg))) {
      return abstractParam(
        index,
        {
          type: "Curry",
          base: APPLY_OP,
          args: [
            abstractParam(
              index,
              { type: "Curry", base: fun, args: [...firstArgs, secondLastArg] },
              ctx
            ),
            lastArg,
          ],
        },
        ctx
      );
    }

    const secondLastContains = containsParam(index, secondLastArg);
    const lastContains = containsParam(index, lastArg);

    if (secondLastContains && lastContains) {
      return condense({
        type: "Pipe2",
        op1: abstractParam(index, secondLastArg, ctx) as TypeAST.Operator,
        op2: abstractParam(index, lastArg, ctx) as TypeAST.Operator,
        op3: { type: "Curry", base: fun, args: firstArgs },
      });
    } else if (lastContains) {
      return condense({
        type: "Pipe",
        op1: abstractParam(index, lastArg, ctx) as TypeAST.Operator,
        op2: { type: "Curry", base: fun, args: [...firstArgs, secondLastArg] },
      });
    }
    return condense({
      type: "Pipe",
      op1: abstractParam(index, secondLastArg, ctx) as TypeAST.Operator,
      op2: {
        type: "Curry",
        base: {
          type: "Flip",
          arg: { type: "Curry", base: fun, args: firstArgs },
        },
        args: [lastArg],
      },
    });
  }

  ctx.blockers.push(
    `cannot lower a lambda parameter through a ${body.type} node`
  );
  return body;
};

const decrementBinderDepths = (node: TypeAST.AST): TypeAST.AST => {
  if (node.type === "Param") {
    const current = node.binderDepth ?? 0;
    return current > 0 ? { ...node, binderDepth: current - 1 } : node;
  }
  return mapAst(node, (child) => decrementBinderDepths(child));
};

const lowerChild = (child: TypeAST.AST, ctx: LoweringContext): TypeAST.AST =>
  child.type === "Lambda"
    ? decrementBinderDepths(lowerLambdaInternal(child, ctx))
    : lowerNodeChildren(child, ctx);

const lowerNodeChildren = (
  node: TypeAST.AST,
  ctx: LoweringContext
): TypeAST.AST => {
  if (node.type === "Lambda") return lowerLambdaInternal(node, ctx);
  return mapAst(node, (child) => lowerChild(child, ctx));
};

const lowerLambdaInternal = (
  lambda: TypeAST.Lambda,
  ctx: LoweringContext
): TypeAST.AST => {
  const seen = new Set<string>();
  for (const param of lambda.params) {
    if (seen.has(param.name)) {
      ctx.blockers.push(
        `lambda parameter "${param.name}" is declared more than once`
      );
    }
    seen.add(param.name);
  }

  let result = lowerChild(lambda.body, ctx);
  for (let i = lambda.params.length - 1; i >= 0; i--) {
    result = abstractParam(i, result, ctx);
  }
  return result;
};

const validateNodes = (node: TypeAST.AST, ctx: LoweringContext): void => {
  const binderStack: TypeAST.LambdaParam[][] = [];
  const visit = (current: TypeAST.AST): void => {
    if (binderStack.length > 0 && isBlockedInsideLambda(current)) {
      ctx.blockers.push(`a ${current.type} node cannot appear inside a lambda`);
      return;
    }
    if (current.type === "Variable") {
      try {
        assertVariableShape(current);
      } catch (error) {
        ctx.blockers.push(
          error instanceof Error ? error.message : String(error)
        );
      }
    }
    if (current.type === "Lambda") {
      binderStack.push(current.params);
      visit(current.body);
      binderStack.pop();
      return;
    }
    if (current.type === "Param") {
      const depth = current.binderDepth ?? 0;
      if (depth >= binderStack.length) {
        ctx.blockers.push(
          `parameter #${current.index + 1} has no enclosing lambda for binder depth ${depth}`
        );
        return;
      }
      const binder = binderStack[binderStack.length - 1 - depth]!;
      if (current.index < 0 || current.index >= binder.length) {
        ctx.blockers.push(
          `parameter index ${current.index} is out of range for the enclosing lambda`
        );
        return;
      }
      if (
        current.name !== undefined &&
        current.name !== binder[current.index]!.name
      ) {
        ctx.blockers.push(
          `parameter #${current.index + 1} is named "${current.name}" but its binder calls it "${binder[current.index]!.name}"`
        );
      }
      return;
    }
    for (const child of astChildren(current)) visit(child);
  };
  visit(node);
};

const assertNoLambdaLeft = (ready: TypeAST.AST): void => {
  visitAst(ready, (node) => {
    if (node.type === "Lambda") {
      throw new StructuralParseError(
        "A lambda could not be lowered and has no card representation"
      );
    }
    if (node.type === "Param") {
      throw new StructuralParseError(
        "A lambda parameter was used outside of its lambda"
      );
    }
  });
};

export const lowerLambda = (lambda: TypeAST.Lambda): TypeAST.AST => {
  const ctx: LoweringContext = { blockers: [] };
  validateNodes(lambda, ctx);
  const result = lowerLambdaInternal(lambda, ctx);
  if (ctx.blockers.length > 0) {
    throw new StructuralParseError(
      `Could not lower the lambda:\n- ${ctx.blockers.join("\n- ")}`
    );
  }
  assertNoLambdaLeft(result);
  return result;
};

export const lowerLambdasInAst = (ast: TypeAST.AST): TypeAST.AST => {
  let hasLambda = false;
  visitAst(ast, (node) => {
    if (node.type === "Lambda") hasLambda = true;
  });
  if (!hasLambda) return ast;

  const ctx: LoweringContext = { blockers: [] };
  validateNodes(ast, ctx);
  const result = lowerNodeChildren(ast, ctx);
  if (ctx.blockers.length > 0) {
    throw new StructuralParseError(
      `Could not lower the lambda:\n- ${ctx.blockers.join("\n- ")}`
    );
  }
  assertNoLambdaLeft(result);
  return result;
};

export const assertValidParamReferences = (ast: TypeAST.AST): void => {
  const blocker = (message: string): never => {
    throw new StructuralParseError(message);
  };
  const binderStack: TypeAST.LambdaParam[][] = [];
  const visit = (node: TypeAST.AST): void => {
    if (node.type === "Lambda") {
      binderStack.push(node.params);
      visit(node.body);
      binderStack.pop();
      return;
    }
    if (node.type === "Param") {
      const depth = node.binderDepth ?? 0;
      if (depth >= binderStack.length) {
        blocker(
          `Parameter #${node.index + 1} has no enclosing lambda for binder depth ${depth}`
        );
      }
      const binder = binderStack[binderStack.length - 1 - depth]!;
      if (node.index < 0 || node.index >= binder.length) {
        blocker(
          `Parameter index ${node.index} is out of range for the enclosing lambda`
        );
      }
      if (node.name !== undefined && node.name !== binder[node.index]!.name) {
        blocker(
          `Parameter #${node.index + 1} is named "${node.name}" but its binder calls it "${binder[node.index]!.name}"`
        );
      }
      return;
    }
    for (const child of astChildren(node)) visit(child);
  };
  visit(ast);
};

export const astContainsLambda = (ast: TypeAST.AST): boolean => {
  let found = false;
  visitAst(ast, (node) => {
    if (node.type === "Lambda") found = true;
  });
  return found;
};
