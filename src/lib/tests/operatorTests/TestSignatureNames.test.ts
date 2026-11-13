import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";

type SignatureAstNode = {
  type: string;
  from?: SignatureAstNode;
  to?: SignatureAstNode;
  obscured?: SignatureAstNode;
  listType?: SignatureAstNode;
};

type OperatorConstructor = {
  new (normalizeSignature?: boolean): {
    getParsedSignature(): { getArity(): number; getAst(): SignatureAstNode };
  };
  internalName: string;
  signatureNames: string[];
};

type OperatorUnderTest = {
  key: string;
  arity: number;
  names: string[];
  operatorSlotLabels: number[];
  error?: string;
};

const collectOperatorSlotLabels = (
  node: SignatureAstNode,
  labels: number[] = []
): number[] => {
  switch (node.type) {
    case "Function":
      if (node.from) collectOperatorSlotLabels(node.from, labels);
      if (node.to) collectOperatorSlotLabels(node.to, labels);
      return labels;
    case "Operator":
      labels.push(labels.length + 1);
      if (node.obscured) collectOperatorSlotLabels(node.obscured, labels);
      return labels;
    case "List":
      if (node.listType) collectOperatorSlotLabels(node.listType, labels);
      return labels;
    default:
      return labels;
  }
};

const operators: OperatorUnderTest[] = Object.entries(operatorRegistry)
  .filter(
    ([, value]) =>
      typeof value === "function" &&
      "internalName" in (value as unknown as Record<string, unknown>)
  )
  .map(([key, value]) => {
    const opClass = value as unknown as OperatorConstructor;
    try {
      const operator = new opClass(false);
      const signature = operator.getParsedSignature();
      return {
        key,
        arity: signature.getArity(),
        names: [...(opClass.signatureNames ?? [])],
        operatorSlotLabels: collectOperatorSlotLabels(signature.getAst()),
      };
    } catch (error) {
      return {
        key,
        arity: -1,
        names: [],
        operatorSlotLabels: [],
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });

describe("TestSignatureNames", () => {
  it("testConstructsEveryRegisteredOperator", () => {
    const failures = operators
      .filter((operator) => operator.error !== undefined)
      .map((operator) => `${operator.key}: ${operator.error}`);
    expect(failures).toEqual([]);
  });

  it("testDeclaresOneSignatureNamePerSlot", () => {
    expect(operators.length).toBeGreaterThan(300);

    const failures = operators
      .filter(
        (operator) =>
          operator.error === undefined &&
          operator.names.length !== operator.arity + 1
      )
      .map(
        (operator) =>
          `${operator.key}: ${operator.names.length} name(s) for arity ${operator.arity}`
      );
    expect(failures).toEqual([]);
  });

  it("testNamesAreUniqueTrimmedAndNonEmpty", () => {
    const failures: string[] = [];

    for (const { key, names, error } of operators) {
      if (error !== undefined) continue;

      const duplicates = [
        ...new Set(names.filter((n, i) => names.indexOf(n) !== i)),
      ];
      if (duplicates.length > 0) {
        failures.push(`${key}: duplicate name(s) ${duplicates.join(", ")}`);
      }

      for (const name of names) {
        if (name.trim().length === 0) {
          failures.push(`${key}: blank name`);
        } else if (name !== name.trim()) {
          failures.push(`${key}: untrimmed name "${name}"`);
        }
      }
    }

    expect(failures).toEqual([]);
  });

  it("testOperatorSlotsAreNamedInSignatureOrder", () => {
    const failures: string[] = [];

    for (const { key, names, operatorSlotLabels, error } of operators) {
      if (error !== undefined) continue;

      operatorSlotLabels.forEach((label, index) => {
        if (label !== index + 1) {
          failures.push(
            `${key}: Operator slot labels are not contiguous at position ${index}`
          );
        }

        const name = names[label - 1];
        if (typeof name !== "string" || name.trim().length === 0) {
          failures.push(`${key}: Operator slot ${label} has no signature name`);
        }
      });
    }

    expect(failures).toEqual([]);
  });
});
