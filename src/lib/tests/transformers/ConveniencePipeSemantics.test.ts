import {
  CONVENIENCE_SOURCE,
  resolveConvenienceOperator,
} from "lib/transformers/convenienceOperators";
import { ExpandedToAST } from "lib/transformers/Expanded";
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

const recordingOperator = (label: string, arity: number): any => {
  const step = (seen: number[]): any =>
    seen.length === arity
      ? `${label}(${seen.join(",")})`
      : (arg: number) => step([...seen, arg]);
  return step([]);
};

const applyTo = (value: any, args: number[]): any =>
  args.reduce((current, arg) => current(arg), value);

describe("TestConveniencePipeSemantics", () => {
  const scope = buildScope();
  const g = (value: unknown) => `g(${String(value)})`;

  it("testPipe2ExpandsOneLevel", () => {
    const f = recordingOperator("f", 2);
    expect(applyTo(scope.get("pipe_2")(f)(g), [1, 2])).toBe("g(f(1,2))");
  });

  it("testPipe3ExpandsTwoLevels", () => {
    const f = recordingOperator("f", 3);
    expect(applyTo(scope.get("pipe_3")(f)(g), [1, 2, 3])).toBe("g(f(1,2,3))");
  });

  it("testPipe4ExpandsThreeLevels", () => {
    const f = recordingOperator("f", 4);
    expect(applyTo(scope.get("pipe_4")(f)(g), [1, 2, 3, 4])).toBe(
      "g(f(1,2,3,4))"
    );
  });

  it("testGeneratedPipesExpandEveryLevel", () => {
    for (const size of [5, 6, 9]) {
      const entry = resolveConvenienceOperator(`pipe_${size}`)!;
      const generated = buildScope([`${entry.name} = ${entry.expression}`]);
      const args = Array.from({ length: size }, (_, index) => index + 1);
      expect([
        size,
        applyTo(
          generated.get(entry.name)(recordingOperator("f", size))(g),
          args
        ),
      ]).toEqual([size, `g(f(${args.join(",")}))`]);
    }
  });
});
