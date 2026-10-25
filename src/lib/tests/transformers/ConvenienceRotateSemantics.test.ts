import {
  CONVENIENCE_BY_NAME,
  CONVENIENCE_NAMES,
  CONVENIENCE_OPERATORS,
  CONVENIENCE_SOURCE,
  generateRotateExpression,
  parseRotateName,
} from "lib/transformers/convenienceOperators";
import { ASTToExpanded, ExpandedToAST } from "lib/transformers/Expanded";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";

const pipe = (f: any) => (g: any) => (x: any) => g(f(x));
const flip = (f: any) => (a: any) => (b: any) => f(b)(a);
const apply = (f: any) => (x: any) => f(x);
const apply2 = (f: any) => (a: any) => (b: any) => f(a)(b);
const apply3 = (f: any) => (a: any) => (b: any) => (c: any) => f(a)(b)(c);
const identity = (x: any) => x;

const models: Record<string, any> = {
  "integrateddynamics:operator_pipe": pipe,
  "integrateddynamics:operator_flip": flip,
  "integrateddynamics:operator_apply": apply,
  "integrateddynamics:operator_apply2": apply2,
  "integrateddynamics:operator_apply3": apply3,
  "integrateddynamics:general_identity": identity,
};

const recordingOperator = (arity: number) => {
  const step = (index: number, seen: number[]): any =>
    index > arity
      ? seen.join("")
      : (arg: number) => step(index + 1, [...seen, arg]);
  return step(1, []);
};

const buildScope = (extraSource: string[] = []): Map<string, any> => {
  const scope = new Map<string, any>();

  const evaluate = (node: any): any => {
    switch (node.type) {
      case "Operator": {
        const internalName = (operatorRegistry as any)[node.opName]
          ?.internalName;
        const model = models[internalName];
        if (!model) throw new Error(`no model for ${internalName}`);
        return model;
      }
      case "Curry": {
        let value = evaluate(node.base);
        for (const arg of node.args) value = value(evaluate(arg));
        return value;
      }
      case "Pipe":
        return pipe(evaluate(node.op1))(evaluate(node.op2));
      case "Flip":
        return flip(evaluate(node.arg));
      case "Variable": {
        if (!scope.has(node.name)) {
          throw new Error(`unresolved table reference ${node.name}`);
        }
        return scope.get(node.name);
      }
      default:
        throw new Error(`unhandled node type ${node.type}`);
    }
  };

  const ast = ExpandedToAST(
    [CONVENIENCE_SOURCE, ...extraSource].join("\n"),
    0,
    {}
  ) as TypeAST.NetworkCards;
  for (const definition of ast.definitions) {
    scope.set(definition.name, evaluate(definition.node));
  }
  return scope;
};

const applyRotationTo = (
  scope: Map<string, any>,
  name: string,
  arity: number
): string => {
  let value = scope.get(name)(recordingOperator(arity));
  for (let i = 1; i <= arity; i++) {
    value = typeof value === "function" ? value(i) : value;
  }
  return String(value);
};

const rotateEntries = CONVENIENCE_OPERATORS.filter(({ name }) =>
  /^rotate_\d+(_\d+)+$/.test(name)
);

describe("TestConvenienceRotateSemantics", () => {
  const scope = buildScope();

  it.each(rotateEntries.map(({ name }) => [name] as const))(
    "testRotatesArguments%s",
    (name) => {
      const parts = name.split("_").slice(1);
      const arity = parts.length;
      const expected = [
        ...parts,
        ..."1234".split("").filter((p) => !parts.includes(p)),
      ]
        .slice(0, arity)
        .join("");
      expect(applyRotationTo(scope, name, arity)).toBe(expected);
    }
  );

  it("testEveryTetraPermutationIsPresent", () => {
    const tetra = rotateEntries
      .map(({ name }) => name)
      .filter((name) => name.split("_").length === 5);
    expect(tetra).toHaveLength(23);
    expect(new Set(tetra).size).toBe(23);
  });

  it("testHelperAlgorithmMatchesPublicRotates", () => {
    const swapOne = CONVENIENCE_BY_NAME.get("swap_1");
    const swapThree = CONVENIENCE_BY_NAME.get("swap_3");
    expect(swapOne?.expression).toBe("flip");
    expect(swapThree?.expression).toBe("apply(flipPipe, swap_2)");
  });

  it("testGeneratedRotationsFollowTheirNames", () => {
    const permutations = (size: number): number[][] => {
      if (size === 0) return [[]];
      return permutations(size - 1).flatMap((shorter) =>
        Array.from({ length: size }, (_, at) => [
          ...shorter.slice(0, at),
          size,
          ...shorter.slice(at),
        ])
      );
    };

    const orders = [
      ...[2, 3, 4, 5].flatMap(permutations),
      [1, 2, 3, 4, 6, 5],
      [2, 3, 4, 5, 6, 1],
      [6, 5, 4, 3, 2, 1],
      [10, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ];

    const generatedOrders = orders.filter(
      (order) => !CONVENIENCE_BY_NAME.has(`rotate_${order.join("_")}`)
    );
    const generated = buildScope(
      generatedOrders.map(
        (order) =>
          `rotate_${order.join("_")} = ${generateRotateExpression(order)}`
      )
    );

    for (const order of generatedOrders) {
      const name = `rotate_${order.join("_")}`;
      const size = order.length;
      expect([name, applyRotationTo(generated, name, size)]).toEqual([
        name,
        order.join(""),
      ]);

      expect([name, applyRotationTo(generated, name, size + 1)]).toEqual([
        name,
        `${order.join("")}${size + 1}`,
      ]);
    }
  });

  it("testListedRotatesAgreeWithTheirDigits", () => {
    const listed = CONVENIENCE_NAMES.filter(
      (name) => parseRotateName(name) !== null
    );
    const scope = buildScope(
      listed.map((name) => {
        const order = parseRotateName(name)!;
        return `generated_${name} = ${generateRotateExpression(order)}`;
      })
    );

    for (const name of listed) {
      const size = parseRotateName(name)!.length;
      for (const arity of [size, size + 1]) {
        expect([name, arity, applyRotationTo(scope, name, arity)]).toEqual([
          name,
          arity,
          applyRotationTo(scope, `generated_${name}`, arity),
        ]);
      }
    }
  });

  it("testGeneratedRotationsParseAndRender", () => {
    const orders = [
      [2, 1],
      [1, 3, 2],
      [1, 2, 4, 3],
      [1, 2, 3, 5, 4],
      [1, 2, 3, 4, 6, 5],
      [2, 3, 4, 5, 6, 1],
      [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    ];
    const source = orders
      .map(
        (order) =>
          `rotate_${order.join("_")} = ${generateRotateExpression(order)}`
      )
      .join("\n");
    const rendered = ASTToExpanded(
      ExpandedToAST([CONVENIENCE_SOURCE, source].join("\n"), 0, {})
    );
    for (const order of orders) {
      expect(rendered).toContain(`rotate_${order.join("_")} ::`);
    }
  });

  it("testFlipperIsFlip", () => {
    expect(applyRotationTo(scope, "flipper", 3)).toBe("213");
    expect(applyRotationTo(scope, "flipper", 4)).toBe("2134");
  });

  it("testCollapsedSpellingsMatchSeparatedOnes", () => {
    const pairs: [string, string][] = [
      ["rotate_21", "rotate_2_1"],
      ["rotate_132", "rotate_1_3_2"],
      ["rotate_231", "rotate_2_3_1"],
      ["rotate_312", "rotate_3_1_2"],
      ["rotate_321", "rotate_3_2_1"],
    ];
    for (const [collapsed, separated] of pairs) {
      for (const arity of [3, 4]) {
        expect([
          collapsed,
          arity,
          applyRotationTo(scope, collapsed, arity),
        ]).toEqual([
          collapsed,
          arity,
          applyRotationTo(scope, separated, arity),
        ]);
      }
    }
  });
});
