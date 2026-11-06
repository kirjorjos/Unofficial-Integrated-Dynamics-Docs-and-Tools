import { astChildren } from "lib/transformers/astTraversal";
import { StructuralParseError } from "lib/transformers/parseErrors";

export const isDelayPromise = (
  node: TypeAST.AST
): node is TypeAST.Variable & { promise: true } =>
  node.type === "Variable" && node.promise === true && node.label !== undefined;

export const collectDelayPromiseNames = (
  text: string,
  known: (name: string) => boolean
): string[] => {
  const names: string[] = [];
  for (const match of text.matchAll(/\bdelay\s*\(/gi)) {
    const start = (match.index ?? 0) + match[0].length;
    let depth = 1;
    let argument = "";
    for (let index = start; index < text.length; index++) {
      const char = text[index]!;
      if (char === "(") {
        depth++;
        argument += char;
        continue;
      }
      if (char === ")") {
        depth--;
        if (depth === 0) break;
        argument += char;
        continue;
      }
      if (char === "," && depth === 1) break;
      argument += char;
    }
    const candidate = argument.trim();
    if (
      /^[A-Za-z_][A-Za-z0-9_.]*$/.test(candidate) &&
      !known(candidate) &&
      !names.includes(candidate)
    ) {
      names.push(candidate);
    }
  }
  return names;
};

export const isCalculationValueRef = (
  node: TypeAST.AST
): node is TypeAST.Variable & { promise: true } =>
  node.type === "Variable" &&
  node.promise === true &&
  node.label !== undefined &&
  /^#\d+$/.test(node.label);

export const collectCalculationValueRefs = (
  node: TypeAST.AST,
  found: number[] = [],
  seen: Set<TypeAST.AST> = new Set()
): number[] => {
  if (isCalculationValueRef(node)) {
    const index = Number(node.label!.slice(1));
    if (!found.includes(index)) found.push(index);
    return found;
  }
  if (seen.has(node)) return found;
  seen.add(node);
  for (const child of astChildren(node)) {
    collectCalculationValueRefs(child, found, seen);
  }
  return found;
};

export const calculationValueRefNode = (label: string): TypeAST.Variable =>
  ({ type: "Variable", label, promise: true }) as TypeAST.Variable;

export const collectDelayPromiseNamesInAst = (
  node: TypeAST.AST,
  found: string[] = [],
  seen: Set<TypeAST.AST> = new Set()
): string[] => {
  if (isCalculationValueRef(node)) return found;
  if (isDelayPromise(node)) {
    if (node.label !== undefined && !found.includes(node.label)) {
      found.push(node.label);
    }
    return found;
  }
  if (seen.has(node)) return found;
  seen.add(node);
  for (const child of astChildren(node)) {
    collectDelayPromiseNamesInAst(child, found, seen);
  }
  return found;
};

export const collectPromiseRefs = (
  node: TypeAST.AST,
  found: string[] = [],
  seen: Set<TypeAST.AST> = new Set()
): string[] => {
  if (node.type === "Variable" && node.promise === true) {
    if (node.label !== undefined && !found.includes(node.label)) {
      found.push(node.label);
    }
    return found;
  }
  if (seen.has(node)) return found;
  seen.add(node);
  for (const child of astChildren(node)) {
    collectPromiseRefs(child, found, seen);
  }
  return found;
};

export const brokenDelayPromise = (name: string): string =>
  `Delay(...) promises "${name}", but the input never defines it`;

export const brokenPromise = (name: string): string =>
  `"${name}" is promised, but the input never defines it`;

export const directSelfReferenceMessage = (name: string): string =>
  `Delay "${name}" cannot take its own value directly; read it through a card instead, such as getOrDefault(${name}, ...)`;

export const delayPromiseNode = (name: string): TypeAST.Variable =>
  ({ type: "Variable", label: name, promise: true }) as TypeAST.Variable;

export const resolveAliasTarget = (
  node: TypeAST.AST,
  byName: Map<string, TypeAST.AST>,
  seen: Set<string> = new Set()
): TypeAST.AST => {
  let current = node;
  while (current.type === "Variable" && current.label !== undefined) {
    const label = current.label;
    if (seen.has(label)) return current;
    const next = byName.get(label);
    if (next === undefined || next === current) return current;
    seen.add(label);
    current = next;
  }
  return current;
};

export interface PromiseDefinition {
  name: string;
  node: TypeAST.AST;
  segmentIndex?: number;
}

export const validatePromises = (definitions: PromiseDefinition[]): void => {
  const byName = new Map<string, TypeAST.AST>();
  const namesByNode = new Map<TypeAST.AST, string[]>();
  for (const definition of definitions) {
    const names: string[] = [];
    if (definition.name !== "") names.push(definition.name);
    if (definition.segmentIndex !== undefined) {
      names.push(`#${definition.segmentIndex}`);
    }
    for (const name of names) {
      byName.set(name, definition.node);
      const known = namesByNode.get(definition.node) ?? [];
      if (!known.includes(name)) known.push(name);
      namesByNode.set(definition.node, known);
    }
  }

  for (const definition of definitions) {
    for (const ref of collectPromiseRefs(definition.node)) {
      if (!byName.has(ref)) throw new StructuralParseError(brokenPromise(ref));
    }
  }

  for (const [node, names] of namesByNode) {
    if (node.type !== "Delay") continue;
    const target = resolveAliasTarget(node.value, byName);
    if (target === node) {
      throw new StructuralParseError(directSelfReferenceMessage(names[0]!));
    }
  }
};
