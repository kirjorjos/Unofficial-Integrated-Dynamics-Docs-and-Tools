import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { ASTToCodeLine, CodeLineToAST } from "lib/transformers/CodeLine";
import { ASTToCondensed, CondensedToAST } from "lib/transformers/Condensed";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import {
  getOpName,
  getNicknameRegex,
} from "lib/HelperClasses/UtilityFunctions";

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

  private getLabelForID(typeID: number): string {
    if (!this.typeIDToLabel.has(typeID)) {
      this.typeIDToLabel.set(typeID, getLabel(this.counter++));
    }
    return this.typeIDToLabel.get(typeID)!;
  }

  format(sig: ParsedSignature, isReturnType = false): string {
    const node = sig.getAst() as TypeRawSignatureAST.RawSignatureNode;

    if (node.type === "Operator") {
      const inner = this.format(new ParsedSignature(node.obscured, false));
      return `Operator<${inner}>`;
    }

    const label = this.getLabelForID(
      (node as TypeRawSignatureAST.RawSignatureAny).typeID
    );

    if (node.type === "Function") {
      const from = sig.getInput();
      const to = sig.getOutput();
      const fromStr = this.format(from);
      const toStr = this.format(to, true);
      const res = `${label}<${fromStr} -> ${toStr}>`;
      return isReturnType ? `(${res})` : res;
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
    return new ParsedSignature({ type: "Operator", obscured: ast }, true);
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

const computeSignature = (
  node: TypeAST.AST,
  scope?: Map<TypeAST.AST, ParsedSignature>
): ParsedSignature => {
  if (scope && scope.has(node)) return scope.get(node)!;

  let signature: ParsedSignature;
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
      signature = new ParsedSignature({ type: node.type }, false);
      break;
    }
    case "List": {
      if (node.value.length === 0) {
        signature = new ParsedSignature(
          {
            type: "List",
            listType: { type: "Any", typeID: ParsedSignature.getNewTypeID() },
          },
          false
        );
        break;
      }

      const elementSignature = computeSignature(node.value[0]!, scope).getAst();
      signature = new ParsedSignature(
        {
          type: "List",
          listType: elementSignature,
        },
        false
      );
      break;
    }
    case "Operator": {
      const internalKey = operatorRegistry.operatorByNickname(node.opName);
      if (!internalKey) throw new Error(`Unknown operator: ${node.opName}`);
      const opClass = operatorRegistry[internalKey];
      const op = new opClass();
      signature = wrapInOperator(op.getSignatureNode());
      break;
    }
    case "Curry": {
      let currentSig = computeSignature(node.base, scope);
      for (const arg of node.args) {
        currentSig = unwrapOperator(currentSig)
          .apply(computeSignature(arg, scope))
          .rewrite();
      }
      signature =
        currentSig.getRootType() === "Function"
          ? wrapInOperator(currentSig)
          : currentSig;
      break;
    }
    case "Pipe": {
      const sig1 = unwrapOperator(computeSignature(node.op1, scope));
      const sig2 = unwrapOperator(computeSignature(node.op2, scope));
      signature = wrapInOperator(sig1.pipe(sig2).rewrite());
      break;
    }
    case "Pipe2": {
      const sig1 = unwrapOperator(computeSignature(node.op1, scope));
      const sig2 = unwrapOperator(computeSignature(node.op2, scope));
      const sig3 = unwrapOperator(computeSignature(node.op3, scope));
      signature = wrapInOperator(sig1.pipe2(sig2, sig3).rewrite());
      break;
    }
    case "Flip": {
      const innerSignature = unwrapOperator(computeSignature(node.arg, scope));
      signature = wrapInOperator(innerSignature.flip().rewrite());
      break;
    }
    case "Variable": {
      signature = new ParsedSignature(
        { type: "Any", typeID: ParsedSignature.getNewTypeID() },
        false
      );
      break;
    }
  }

  if (scope) scope.set(node, signature);
  return signature;
};

const collectVariables = (
  node: TypeAST.AST,
  collected: Set<TypeAST.AST>,
  seen: Set<TypeAST.AST>
) => {
  if (seen.has(node)) return;
  seen.add(node);

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
    case "List":
      for (const value of node.value) collectVariables(value, collected, seen);
      break;
  }

  if (node.varName) {
    collected.add(node);
  }
};

let varCounter = 0;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const getInternalName = (node: TypeAST.AST): string | undefined => {
  if (node.type === "Operator") {
    const internalKey = operatorRegistry.operatorByNickname(node.opName);
    if (internalKey) {
      return operatorRegistry[internalKey].internalName;
    }
  }
  return undefined;
};

const isPipeNode = (node: TypeAST.AST): boolean => {
  if (node.type === "Pipe") return true;
  const internalName = getInternalName(node);
  if (internalName === "integrateddynamics:operator_pipe") return true;
  if (node.type === "Operator") {
    const n = node.opName;
    return n === "OPERATOR_PIPE";
  }
  return false;
};

const isApplyNode = (node: TypeAST.AST): boolean => {
  const internalName = getInternalName(node);
  if (
    internalName === "integrateddynamics:operator_apply" ||
    internalName === "integrateddynamics:operator_apply_2" ||
    internalName === "integrateddynamics:operator_apply_3"
  )
    return true;
  if (node.type === "Operator") {
    const n = node.opName;
    return (
      n === "OPERATOR_APPLY" ||
      n === "OPERATOR_APPLY_2" ||
      n === "OPERATOR_APPLY_3"
    );
  }
  return false;
};

const isSelfNicknameShadow = (varName: string, node: TypeAST.AST): boolean => {
  const nicknameInternalKey = operatorRegistry.operatorByNickname(varName);
  if (!nicknameInternalKey) return false;

  if (node.type !== "Operator") return false;

  return node.opName === nicknameInternalKey;
};

const getVarName = (node: TypeAST.AST): string => {
  if (node.varName) return node.varName;

  const sanitize = (s: string) => s.replace(/[^A-Za-z0-9\\._&|{}]/g, "");

  switch (node.type) {
    case "Integer":
    case "Long":
    case "Double":
      return node.value.toString().replace(/^-/, "neg");
    case "String":
      return sanitize(node.value.slice(0, 10));
    case "Boolean":
      return node.value ? "true" : "false";
    case "Null":
      return "null";
    case "Variable":
      return node.name;
    case "Operator": {
      const formal = getOpName(node.opName);
      return formal.charAt(0).toLowerCase() + formal.slice(1);
    }
    case "Curry": {
      let base = node.base;
      let args = node.args;

      if (isApplyNode(base) && args.length >= 1) {
        return getVarName({
          type: "Curry",
          base: args[0] as TypeAST.Operator,
          args: args.slice(1),
        });
      }

      const opInternalName = getInternalName(base);

      if (
        opInternalName === "integrateddynamics:operator_apply_n" &&
        args.length >= 2
      ) {
        const fName = getVarName(args[0]!);
        const listName = getVarName(args[1]!);
        let res = `${fName}By_n${capitalize(listName)}`;
        for (let i = 2; i < args.length; i++) {
          res = `{${res}}by${capitalize(getVarName(args[i]!))}`;
        }
        return res;
      }

      if (isPipeNode(base) && args.length === 1) {
        return `by${capitalize(getVarName(args[0]!))}`;
      }
      if (base.type === "Flip" && !base.varName) {
        if (isPipeNode(base.arg) && args.length === 1) {
          return `on${capitalize(getVarName(args[0]!))}`;
        }
      }

      let name: string;
      let connector = "By";

      if (base.type === "Flip" && !base.varName) {
        name = getVarName(base.arg);
        connector = "On";
      } else {
        name = getVarName(base);
        connector = name.endsWith("On") ? "On" : "By";
      }

      if (args.length === 0) return name;

      let res: string;
      if (base.varName) {
        res = `{${base.varName}}${connector.toLowerCase()}${capitalize(
          getVarName(args[0]!)
        )}`;
      } else if (base.type === "Curry") {
        res = `{${getVarName(base)}}${connector.toLowerCase()}${capitalize(
          getVarName(args[0]!)
        )}`;
      } else {
        res = `${name}${connector}${capitalize(getVarName(args[0]!))}`;
      }

      for (let i = 1; i < args.length; i++) {
        res = `{${res}}by${capitalize(getVarName(args[i]!))}`;
      }
      return res;
    }
    case "Pipe": {
      const fName = getVarName(node.op1);
      const gName = getVarName(node.op2);
      return `${gName}With${capitalize(fName)}`;
    }
    case "Pipe2": {
      const fName = getVarName(node.op1);
      const gName = getVarName(node.op2);
      const hName = getVarName(node.op3);
      return `${hName}With${capitalize(fName)}And${capitalize(gName)}`;
    }
    case "Flip":
      return `${getVarName(node.arg)}On`;
    case "List":
      return "list";
  }

  return `v${++varCounter}`;
};

const decomposeAST = (node: TypeAST.AST): TypeAST.AST => {
  if (node.type === "Curry") {
    const base = decomposeAST(node.base) as TypeAST.Operator;
    const args = node.args.map(decomposeAST);

    if (base.type === "Operator" && args.length === 0) {
      return base;
    }

    if (!base.varName && base.type !== "Operator") {
      base.varName = getVarName(base);
    }

    const opInternalName = getInternalName(base);
    const isApplyN = opInternalName === "integrateddynamics:operator_apply_n";

    let current: TypeAST.Operator = base;
    let i = 0;
    while (i < args.length) {
      let take = 1;
      if (isApplyN && i === 0 && args.length >= 2) {
        take = 2;
      }
      const chunk = args.slice(i, i + take);
      const isLast = i + take === args.length;

      const chunkNode: TypeAST.Curried = {
        type: "Curry",
        base: current,
        args: chunk,
      };

      const newNode: TypeAST.Curried = {
        ...chunkNode,
        varName: isLast
          ? node.varName || getVarName(chunkNode)
          : getVarName(chunkNode),
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

  const initialVars = new Set<TypeAST.AST>();
  collectVariables(ast, initialVars, new Set());
  initialVars.add(ast);

  const finalVars = new Set<TypeAST.AST>();
  const finalSeen = new Set<TypeAST.AST>();

  const processAndCollect = (node: TypeAST.AST) => {
    const decomposed = decomposeAST(node);
    collectVariables(decomposed, finalVars, finalSeen);
    finalVars.add(decomposed);
    finalSeen.add(decomposed);
  };

  for (const v of initialVars) {
    processAndCollect(v);
  }

  const finalVarsArray = Array.from(finalVars);
  const output: string[] = [];
  const formatter = new SignatureFormatter();
  const signatureCache = new Map<TypeAST.AST, ParsedSignature>();

  for (let i = 0; i < finalVarsArray.length; i++) {
    const v = finalVarsArray[i]!;
    if (
      v.varName &&
      output.some((line) => line.startsWith(`${v.varName} = `))
    ) {
      continue;
    }
    const name = v.varName || getVarName(v);
    const sig = computeSignature(v, signatureCache);
    const sigStr = formatter.format(sig);

    const oldVarName = v.varName;
    delete v.varName;
    const exprStr = style === "CodeLine" ? ASTToCodeLine(v) : ASTToCondensed(v);
    if (oldVarName) v.varName = oldVarName;

    const assignment = `${name} = ${exprStr}`;
    if (output.includes(assignment)) continue;

    output.push(`${name} :: ${sigStr}`);
    output.push(assignment);
    if (i < finalVarsArray.length - 1) {
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

      if (!getNicknameRegex().test(varName)) {
        throw new Error(`Invalid variable name: "${varName}"`);
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

    if (
      varName &&
      operatorRegistry.operatorByNickname(varName) &&
      !isSelfNicknameShadow(varName, lineAST)
    ) {
      throw new Error(
        `Variable name "${varName}" overshadows an operator nickname`
      );
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
