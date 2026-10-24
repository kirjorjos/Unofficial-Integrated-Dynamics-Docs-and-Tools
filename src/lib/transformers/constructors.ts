import {
  InvalidArityParseError,
  StructuralParseError,
} from "lib/transformers/parseErrors";

const capitalize = (lowerName: string): string =>
  lowerName.charAt(0).toUpperCase() + lowerName.slice(1);

const isListOf = (
  arg: TypeAST.AST,
  expected: TypeAST.AST["type"]
): arg is TypeAST.List =>
  arg.type === "List" && arg.value.every((entry) => entry.type === expected);

export const buildBlockLikeConstructor = (
  lowerName: "block" | "item" | "fluid" | "entity",
  args: TypeAST.AST[]
): TypeAST.AST => {
  const label = capitalize(lowerName);
  if (args.length === 0 || args[0]!.type !== "String") {
    throw new StructuralParseError(
      `${label}(...) expects a quoted id as its first argument`
    );
  }
  const maxArgs = lowerName === "entity" ? 2 : 3;
  if (args.length > maxArgs) {
    throw new StructuralParseError(
      `${label}(...) expects at most ${maxArgs} arguments`
    );
  }

  const id = (args[0] as TypeAST.String).value;
  let size: TypeNumericString | undefined = undefined;
  let props: jsonData | undefined = undefined;

  if (lowerName === "entity") {
    if (args.length === 2) {
      const arg1 = args[1]!;
      if (arg1.type !== "NBT") {
        throw new StructuralParseError(
          "Entity(...) accepts only a quoted id and an optional NBT tag"
        );
      }
      props = arg1.value;
    }
  } else if (args.length > 1) {
    const arg1 = args[1]!;
    if (arg1.type === "Integer") {
      size = arg1.value;
      if (args.length > 2) {
        const arg2 = args[2]!;
        if (arg2.type !== "NBT") {
          throw new StructuralParseError(
            `${label}(...) expects an NBT object as its third argument`
          );
        }
        props = arg2.value;
      }
    } else if (arg1.type === "NBT") {
      if (args.length > 2) {
        throw new StructuralParseError(
          `${label}(...) accepts at most an id, a size and an NBT object`
        );
      }
      props = arg1.value;
    } else {
      throw new StructuralParseError(
        `${label}(...) expects its second argument to be an integer size or an NBT object`
      );
    }
  }

  const value: jsonObject = { id };
  if (size !== undefined) {
    if (lowerName === "block") value["size"] = size;
    if (lowerName === "item") value["size"] = size;
    if (lowerName === "fluid") value["amount"] = size;
  }
  if (props !== undefined) {
    if (lowerName === "block") value["properties"] = props as jsonObject;
    else value["tag"] = props;
  }

  const type = capitalize(lowerName) as "Block" | "Item" | "Fluid" | "Entity";
  return { type, value } as TypeAST.AST;
};

export const buildIngredientsConstructor = (
  args: TypeAST.AST[]
): TypeAST.Ingredients => {
  if (args.length === 0 || !isListOf(args[0]!, "Item")) {
    throw new StructuralParseError(
      "Ingredients(...) expects a list of Item(...) as its first argument"
    );
  }
  if (args.length > 3) {
    throw new StructuralParseError(
      "Ingredients(...) expects at most three arguments: items, fluids and energies"
    );
  }
  if (args.length > 1 && !isListOf(args[1]!, "Fluid")) {
    throw new StructuralParseError(
      "Ingredients(...) expects a list of Fluid(...) as its second argument"
    );
  }
  if (args.length > 2 && !isListOf(args[2]!, "Long")) {
    throw new StructuralParseError(
      "Ingredients(...) expects a list of Long values as its third argument"
    );
  }

  const items = (args[0] as TypeAST.List).value as TypeAST.Item[];
  const fluids = args[1]
    ? ((args[1] as TypeAST.List).value as TypeAST.Fluid[])
    : [];
  const energy = args[2]
    ? ((args[2] as TypeAST.List).value as TypeAST.Long[])
    : [];
  return { type: "Ingredients", value: { items, fluids, energy } };
};

export const buildRecipeConstructor = (args: TypeAST.AST[]): TypeAST.Recipe => {
  if (args.length !== 2) {
    throw new InvalidArityParseError(
      "Recipe(...) expects exactly two arguments: an input and an output Ingredients(...)"
    );
  }
  const [input, output] = args as [TypeAST.AST, TypeAST.AST];
  if (input.type !== "Ingredients") {
    throw new StructuralParseError(
      "Recipe(...) expects an Ingredients(...) as its first argument"
    );
  }
  if (output.type !== "Ingredients") {
    throw new StructuralParseError(
      "Recipe(...) expects an Ingredients(...) as its second argument"
    );
  }
  return {
    type: "Recipe",
    value: {
      input,
      output,
      inputReuseable: { items: [], fluids: [], energies: [] },
    },
  };
};

type Stringify = (node: TypeAST.AST) => string;

export const ingredientsToText = (
  ingredients: TypeAST.Ingredients,
  stringify: Stringify
): string => {
  const items = `[${(ingredients.value.items ?? []).map(stringify).join(", ")}]`;
  const fluids = `[${(ingredients.value.fluids ?? []).map(stringify).join(", ")}]`;
  const energy = `[${(ingredients.value.energy ?? []).map(stringify).join(", ")}]`;
  if (energy !== "[]") return `Ingredients(${items}, ${fluids}, ${energy})`;
  if (fluids !== "[]") return `Ingredients(${items}, ${fluids})`;
  return `Ingredients(${items})`;
};

export const recipeToText = (
  recipe: TypeAST.Recipe,
  stringify: Stringify
): string =>
  `Recipe(${ingredientsToText(recipe.value.input, stringify)}, ${ingredientsToText(
    recipe.value.output,
    stringify
  )})`;
