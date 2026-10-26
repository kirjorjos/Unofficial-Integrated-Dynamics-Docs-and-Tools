export interface ConvenienceOperator {
  name: string;
  expression: string;
  helper?: boolean;
}

export const CONVENIENCE_OPERATORS: readonly ConvenienceOperator[] = [
  { name: "flipPipe", expression: "flip(pipe)", helper: true },
  { name: "flipper", expression: "pipe(apply2, flip)", helper: true },
  { name: "expOpRes", expression: "apply(flipPipe, apply)", helper: true },
  { name: "expOpRes_2", expression: "apply(flipPipe, apply2)", helper: true },
  { name: "expOpRes_3", expression: "apply(flipPipe, apply3)", helper: true },
  { name: "temp1", expression: "pipe(flipPipe, flipPipe)", helper: true },
  { name: "temp2", expression: "flip(temp1)", helper: true },
  {
    name: "temp3",
    expression: "apply2(temp2, temp2, expOpRes)",
    helper: true,
  },
  { name: "pipe_2", expression: "apply(expOpRes, temp3)" },
  { name: "flipPipe_2", expression: "flip(pipe_2)", helper: true },
  {
    name: "pipe_3",
    expression: "pipe_2(flip(pipe(flipPipe_2, flipPipe)), expOpRes_2)",
  },
  { name: "flipPipe_3", expression: "flip(pipe_3)", helper: true },
  {
    name: "pipe_4",
    expression: "pipe_2(flip(pipe(flipPipe_3, flipPipe)), expOpRes_3)",
  },
  { name: "swap_1", expression: "flip", helper: true },
  { name: "swap_2", expression: "apply(flipPipe, flip)", helper: true },
  { name: "swap_3", expression: "apply(flipPipe, swap_2)", helper: true },
  { name: "rotate_1_2_4_3", expression: "swap_3" },
  { name: "rotate_1_3_2_4", expression: "swap_2" },
  { name: "rotate_1_3_4_2", expression: "pipe(swap_3, swap_2)" },
  { name: "rotate_1_4_2_3", expression: "pipe(swap_2, swap_3)" },
  { name: "rotate_1_4_3_2", expression: "pipe(swap_2, pipe(swap_3, swap_2))" },
  { name: "rotate_2_1_3_4", expression: "swap_1" },
  { name: "rotate_2_1_4_3", expression: "pipe(swap_1, swap_3)" },
  { name: "rotate_2_3_1_4", expression: "pipe(swap_2, swap_1)" },
  {
    name: "rotate_2_3_4_1",
    expression: "pipe(swap_3, pipe(swap_2, swap_1))",
  },
  {
    name: "rotate_2_4_1_3",
    expression: "pipe(swap_2, pipe(swap_1, swap_3))",
  },
  {
    name: "rotate_2_4_3_1",
    expression: "pipe(swap_2, pipe(swap_3, pipe(swap_2, swap_1)))",
  },
  { name: "rotate_3_1_2_4", expression: "pipe(swap_1, swap_2)" },
  {
    name: "rotate_3_1_4_2",
    expression: "pipe(swap_1, pipe(swap_3, swap_2))",
  },
  {
    name: "rotate_3_2_1_4",
    expression: "pipe(swap_1, pipe(swap_2, swap_1))",
  },
  {
    name: "rotate_3_2_4_1",
    expression: "pipe(swap_1, pipe(swap_3, pipe(swap_2, swap_1)))",
  },
  {
    name: "rotate_3_4_1_2",
    expression: "pipe(swap_2, pipe(swap_1, pipe(swap_3, swap_2)))",
  },
  {
    name: "rotate_3_4_2_1",
    expression:
      "pipe(swap_2, pipe(swap_1, pipe(swap_3, pipe(swap_2, swap_1))))",
  },
  {
    name: "rotate_4_1_2_3",
    expression: "pipe(swap_1, pipe(swap_2, swap_3))",
  },
  {
    name: "rotate_4_1_3_2",
    expression: "pipe(swap_1, pipe(swap_2, pipe(swap_3, swap_2)))",
  },
  {
    name: "rotate_4_2_1_3",
    expression: "pipe(swap_1, pipe(swap_2, pipe(swap_1, swap_3)))",
  },
  {
    name: "rotate_4_2_3_1",
    expression:
      "pipe(swap_1, pipe(swap_2, pipe(swap_3, pipe(swap_2, swap_1))))",
  },
  {
    name: "rotate_4_3_1_2",
    expression:
      "pipe(swap_1, pipe(swap_2, pipe(swap_1, pipe(swap_3, swap_2))))",
  },
  {
    name: "rotate_4_3_2_1",
    expression:
      "pipe(swap_1, pipe(swap_2, pipe(swap_1, pipe(swap_3, pipe(swap_2, swap_1)))))",
  },
  { name: "rotate_1", expression: "identity" },
  { name: "rotate_2_1", expression: "rotate_2_1_3_4" },
  { name: "rotate_2_1_3", expression: "rotate_2_1_3_4" },
  { name: "rotate_1_3_2", expression: "rotate_1_3_2_4" },
  { name: "rotate_3_1_2", expression: "rotate_3_1_2_4" },
  { name: "rotate_2_3_1", expression: "rotate_2_3_1_4" },
  { name: "rotate_3_2_1", expression: "rotate_3_2_1_4" },
  { name: "rotate_21", expression: "flip" },
  { name: "rotate_132", expression: "apply(flipPipe, flipper)" },
  { name: "rotate_231", expression: "rotate_2_3_1" },
  { name: "rotate_312", expression: "pipe(flip, apply(flipPipe, flipper))" },
  { name: "rotate_321", expression: "pipe(rotate_312, flip)" },
];

export const CONVENIENCE_NAMES: readonly string[] =
  CONVENIENCE_OPERATORS.filter(({ helper }) => !helper).map(({ name }) => name);

export const CONVENIENCE_BY_NAME: ReadonlyMap<string, ConvenienceOperator> =
  new Map(CONVENIENCE_OPERATORS.map((entry) => [entry.name, entry]));

export const CONVENIENCE_SOURCE = CONVENIENCE_OPERATORS.map(
  ({ name, expression }) => `${name} = ${expression}`
).join("\n");

const ROTATE_NAME = /^(?:rotate|r)(?:_?\d+)+$/;
const PIPE_NAME = /^pipe_([1-9]\d*)$/;
const generatedOperators = new Map<string, ConvenienceOperator | null>();

export const parseRotateName = (name: string): number[] | null => {
  if (!ROTATE_NAME.test(name)) return null;
  const body = name.replace(/^(?:rotate|r)_?/, "");
  const segments = body.includes("_") ? body.split("_") : body.split("");
  if (
    segments.length === 0 ||
    segments.some((segment) => !/^[1-9]\d*$/.test(segment))
  ) {
    return null;
  }
  const digits = segments.map(Number);
  const unique = new Set(digits).size === digits.length;
  const inRange = digits.every(
    (position) => position >= 1 && position <= digits.length
  );
  return unique && inRange ? digits : null;
};

export const parsePipeName = (name: string): number | null => {
  const match = PIPE_NAME.exec(name);
  if (!match) return null;
  const size = Number(match[1]);
  return Number.isSafeInteger(size) && size >= 3 ? size : null;
};

const swapExpression = (position: number): string =>
  position <= 3
    ? `swap_${position}`
    : `apply(flipPipe, ${swapExpression(position - 1)})`;

const transpositionsFor = (order: readonly number[]): number[] => {
  const size = order.length;
  const inverse = new Array<number>(size);
  order.forEach((value, index) => {
    inverse[value - 1] = index + 1;
  });

  const swaps: number[] = [];
  for (let pass = 0; pass < size; pass++) {
    for (let index = 0; index + 1 < size; index++) {
      if (inverse[index]! > inverse[index + 1]!) {
        const first = inverse[index]!;
        inverse[index] = inverse[index + 1]!;
        inverse[index + 1] = first;
        swaps.push(index + 1);
      }
    }
  }
  return swaps.reverse();
};

export const generateRotateExpression = (order: readonly number[]): string => {
  const swaps = transpositionsFor(order);
  if (swaps.length === 0) return "identity";
  return swaps
    .map(swapExpression)
    .reduceRight((inner, swap) => `pipe(${swap}, ${inner})`);
};

export const generatePipeExpression = (size: number): string =>
  `pipe_2(flip(pipe(flip(pipe_${size - 1}), flipPipe)), expOpRes_${Math.min(size - 1, 3)})`;

const generateConvenienceOperator = (
  name: string
): ConvenienceOperator | null => {
  const order = parseRotateName(name);
  if (order) return { name, expression: generateRotateExpression(order) };
  const size = parsePipeName(name);
  return size === null
    ? null
    : { name, expression: generatePipeExpression(size) };
};

export const resolveConvenienceOperator = (
  name: string
): ConvenienceOperator | undefined => {
  const listed = CONVENIENCE_BY_NAME.get(name);
  if (listed) return listed;
  const cached = generatedOperators.get(name);
  if (cached !== undefined) return cached ?? undefined;

  const generated = generateConvenienceOperator(name);
  generatedOperators.set(name, generated);
  return generated ?? undefined;
};

export const isConvenienceName = (name: string): boolean => {
  const entry = resolveConvenienceOperator(name);
  return entry !== undefined && entry.helper !== true;
};

const convenienceExpressions = new WeakSet<object>();

export const markConvenienceExpression = <T extends object>(ast: T): T => {
  convenienceExpressions.add(ast);
  return ast;
};

export const isConvenienceExpression = (node: object): boolean =>
  convenienceExpressions.has(node);
