import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { ASTToCodeLine, CodeLineToAST } from "./CodeLine";
import { ASTToCondensed, CondensedToAST } from "./Condensed";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "IntegratedDynamicsClasses/operators/BaseOperator";

const getLabel = (index: number): string => {
  let label = "";
  let i = index;
  while (i >= 0) {
    label = String.fromCharCode(97 + (i % 26)) + label;
    i = Math.floor(i / 26) - 1;
  }
  return label;
};

class SignatureFormatter {
  private typeIDToLabel = new Map<number, string>();
  private counter = 0;

  private getNextLabel(): string {
    return getLabel(this.counter++);
  }

  format(sig: ParsedSignature, rootLabel?: string): string {
    const node = sig.getAst();

    if (node.type === "Operator") {
      const inner = this.format(new ParsedSignature(node.obscured, false));
      return `Operator<${inner}>`;
    }

    let label: string;
    if (node.type === "Any") {
      if (!this.typeIDToLabel.has(node.typeID)) {
        this.typeIDToLabel.set(node.typeID, this.getNextLabel());
      }
      label = this.typeIDToLabel.get(node.typeID)!;
    } else {
      label = rootLabel || this.getNextLabel();
    }

    if (node.type === "Function") {
      const from = sig.getInput();
      const to = sig.getOutput();
      const fromStr = this.format(from);
      const toStr = this.format(to);
      const isToFunction = to.getRootType() === "Function";
      return `${label}<${fromStr} -> ${isToFunction ? `(${toStr})` : toStr}>`;
    }

    if (node.type === "Any") {
      return `${label}<Any<typeID${node.typeID}>>`;
    }

    if (node.type === "List") {
      const inner = this.format(new ParsedSignature(node.listType, false));
      return `${label}<List<${inner}>>`;
    }

    return `${label}<${node.type}>`;
  }
}

const wrapInOperator = (sig: ParsedSignature): ParsedSignature => {
  const ast = sig.getAst();
  if (ast.type === "Function") {
    return new ParsedSignature({ type: "Operator", obscured: ast }, false);
  }
  return sig;
};

const unwrapOperator = (sig: ParsedSignature): ParsedSignature => {
  const ast = sig.getAst();
  if (ast.type === "Operator") {
    return new ParsedSignature(ast.obscured, false);
  }
  return sig;
};

const computeSignature = (node: TypeAST.AST): ParsedSignature => {
  switch (node.type) {
    case "Integer":
    case "Long":
    case "Double":
    case "String":
    case "Boolean":
    case "Null":
    case "NBT":
    case "Block":
    case "Item":
    case "Fluid":
    case "Entity":
    case "Ingredients":
    case "Recipe": {
      return new ParsedSignature({ type: node.type }, false);
    }
    case "Operator": {
      const internalKey = operatorRegistry.operatorByNickname(node.opName);
      if (!internalKey) throw new Error(`Unknown operator: ${node.opName}`);
      const opClass = operatorRegistry[internalKey];
      const op = new opClass();
      return wrapInOperator(op.getSignatureNode());
    }
    case "Curry": {
      let sig = computeSignature(node.base);
      for (const arg of node.args) {
        const funcSig = unwrapOperator(sig);
        sig = funcSig.apply(computeSignature(arg)).rewrite();
      }
      return sig.getRootType() === "Function" ? wrapInOperator(sig) : sig;
    }
    case "Pipe": {
      const sig1 = unwrapOperator(computeSignature(node.op1));
      const sig2 = unwrapOperator(computeSignature(node.op2));
      return wrapInOperator(sig1.pipe(sig2).rewrite());
    }
    case "Pipe2": {
      const sig1 = unwrapOperator(computeSignature(node.op1));
      const sig2 = unwrapOperator(computeSignature(node.op2));
      const sig3 = unwrapOperator(computeSignature(node.op3));
      return wrapInOperator(sig1.pipe2(sig2, sig3).rewrite());
    }
    case "Flip": {
      const sig = unwrapOperator(computeSignature(node.arg));
      return wrapInOperator(sig.flip().rewrite());
    }
  }
};

const collectVariables = (
  node: TypeAST.AST,
  collected: TypeAST.AST[],
  seen: Set<TypeAST.AST>
) => {
  if (seen.has(node)) return;
  switch (node.type) {
    case "Curry":
      collectVariables(node.base, collected, seen);
      for (const arg of node.args) collectVariables(arg, collected, seen);
      break;
    case "Pipe":
      collectVariables(node.op1, collected, seen);
      collectVariables(node.op2, collected, seen);
      break;
    case "Pipe2":
      collectVariables(node.op1, collected, seen);
      collectVariables(node.op2, collected, seen);
      collectVariables(node.op3, collected, seen);
      break;
    case "Flip":
      collectVariables(node.arg, collected, seen);
      break;
  }

  if (node.varName && !collected.includes(node)) {
    collected.push(node);
    seen.add(node);
  }
};

let varCounter = 0;
const getNextVarName = () => `varName${++varCounter}`;

const getCallArity = (node: TypeAST.Operator): number => {
  if (node.type === "Operator") {
    const opClass = operatorRegistry[node.opName];
    let op: BaseOperator<IntegratedValue, IntegratedValue> | void = undefined;
    if (opClass) {
      try {
        op = new opClass();
      } catch (e) {}
    }
    if (!op) op = operatorRegistry.find(node.opName);
    if (op) {
      if (op.serializer === "integrateddynamics:curry") return 0;
      return op.getSignatureNode().getArity();
    }
    return 0;
  }
  return 0;
};

const decomposeAST = (node: TypeAST.AST): TypeAST.AST => {
  if (node.type === "Curry") {
    const base = decomposeAST(node.base) as TypeAST.Operator;
    const args = node.args.map(decomposeAST);

    const arity = getCallArity(base);
    const isBaseCall = base.type === "Operator" && args.length === arity;

    if (
      base.type === "Operator" &&
      args.length <= 3 &&
      (isBaseCall || args.length <= 1)
    ) {
      return { ...node, base, args };
    }

    if (!base.varName) {
      base.varName = getNextVarName();
    }

    let current: TypeAST.Operator = base;
    let i = 0;
    while (i < args.length) {
      const take = Math.min(args.length - i, 3);
      const chunk = args.slice(i, i + take);
      const isLast = i + take === args.length;

      const newNode: TypeAST.Curried = {
        type: "Curry",
        base: current,
        args: chunk,
        varName: isLast ? node.varName : getNextVarName(),
      };
      current = newNode;
      i += take;
    }
    return current;
  }
  if (node.type === "Pipe") {
    return {
      ...node,
      op1: decomposeAST(node.op1) as TypeAST.Operator,
      op2: decomposeAST(node.op2) as TypeAST.Operator,
    };
  }
  if (node.type === "Pipe2") {
    return {
      ...node,
      op1: decomposeAST(node.op1) as TypeAST.Operator,
      op2: decomposeAST(node.op2) as TypeAST.Operator,
      op3: decomposeAST(node.op3) as TypeAST.Operator,
    };
  }
  if (node.type === "Flip") {
    return { ...node, arg: decomposeAST(node.arg) as TypeAST.Operator };
  }
  return node;
};

export const ASTToExpanded = (
  ast: TypeAST.AST,
  style: "CodeLine" | "Condensed" = "Condensed"
): string => {
  varCounter = 0;

  const initialVars: TypeAST.AST[] = [];
  collectVariables(ast, initialVars, new Set());
  if (!initialVars.includes(ast)) initialVars.push(ast);

  const finalVars: TypeAST.AST[] = [];
  const finalSeen = new Set<TypeAST.AST>();

  const processAndCollect = (node: TypeAST.AST) => {
    const decomposed = decomposeAST(node);
    collectVariables(decomposed, finalVars, finalSeen);
    if (!finalSeen.has(decomposed)) {
      finalVars.push(decomposed);
      finalSeen.add(decomposed);
    }
  };

  for (const v of initialVars) {
    processAndCollect(v);
  }

  const output: string[] = [];
  const formatter = new SignatureFormatter();

  for (let i = 0; i < finalVars.length; i++) {
    const v = finalVars[i]!;
    const name =
      v.varName || (i === finalVars.length - 1 ? "final" : getNextVarName());
    const sig = computeSignature(v);
    const sigStr = formatter.format(sig, name);

    const oldVarName = v.varName;
    delete v.varName;
    const exprStr =
      style === "CodeLine" ? ASTToCodeLine(v, true) : ASTToCondensed(v, true);
    if (oldVarName) v.varName = oldVarName;

    output.push(`${name} :: ${sigStr}`);
    output.push(`${name} = ${exprStr}`);
    if (i < finalVars.length - 1) {
      output.push("");
    }
  }

  return output.join("\n");
};

export const ExpandedToAST = (expanded: string): TypeAST.AST => {
  const rawLines = expanded.split("\n");
  const processedLines: string[] = [];

  for (const line of rawLines) {
    let inString = false;
    let escaped = false;
    let cleanLine = "";
    let isSig = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i]!;
      if (escaped) {
        cleanLine += char;
        escaped = false;
        continue;
      }
      if (char === "\\") {
        cleanLine += char;
        escaped = true;
        continue;
      }
      if (char === '"') {
        inString = !inString;
        cleanLine += char;
        continue;
      }

      if (!inString) {
        if (char === "-" && line[i + 1] === "-") {
          break; // Ignore comment
        }
        if (char === ":" && line[i + 1] === ":") {
          isSig = true;
          break; // Ignore signature line
        }
      }
      cleanLine += char;
    }

    if (!isSig && cleanLine.trim()) {
      processedLines.push(cleanLine.trim());
    }
  }

  if (processedLines.length === 0) throw new Error("Empty expanded input");

  const scope = new Map<string, TypeAST.AST>();
  let finalAST: TypeAST.AST | null = null;

  for (let i = 0; i < processedLines.length; i++) {
    const line = processedLines[i]!;

    let eqIdx = -1;
    let inString = false;
    let inNBT = 0;
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '"') inString = !inString;
      if (!inString) {
        if (line[j] === "{") inNBT++;
        if (line[j] === "}") inNBT--;
        if (inNBT === 0 && line[j] === "=" && line[j + 1] !== ">") {
          if (j === 0 || line[j - 1] !== "=") {
            eqIdx = j;
            break;
          }
        }
      }
    }

    let varName: string | null = null;
    let exprStr: string;

    if (eqIdx !== -1) {
      varName = line.substring(0, eqIdx).trim();
      exprStr = line.substring(eqIdx + 1).trim();

      if (!BaseOperator.nicknameRegex.test(varName)) {
        throw new Error(`Invalid variable name: "${varName}"`);
      }
      if (operatorRegistry.operatorByNickname(varName)) {
        throw new Error(
          `Variable name "${varName}" overshadows an operator nickname`
        );
      }
    } else {
      if (i === 0)
        throw new Error(
          "Line 1 of Expanded format must be an assignment (varName = expression)"
        );
      exprStr = line;
    }

    if (varName && exprStr.startsWith(`${varName} = `)) {
      exprStr = exprStr.substring(varName.length + 3).trim();
    }

    let lineAST: TypeAST.AST;
    try {
      lineAST = CondensedToAST(exprStr, scope);
    } catch (e) {
      try {
        lineAST = CodeLineToAST(exprStr, scope);
      } catch (e2) {
        throw new Error(
          `Failed to parse line ${
            i + 1
          }: "${exprStr}"\nCondensed error: ${e}\nCodeLine error: ${e2}`
        );
      }
    }

    if (varName) {
      lineAST.varName = varName;
      scope.set(varName, lineAST);
    }
    finalAST = lineAST;
  }

  if (!finalAST) throw new Error("Could not determine final AST");
  return finalAST;
};
