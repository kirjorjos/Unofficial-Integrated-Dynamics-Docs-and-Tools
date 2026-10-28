import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { ValueHelpers } from "lib/IntegratedDynamicsClasses/ValueHelpers";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { operatorNameValue } from "lib/transformers/astGiveCommands";
import { ASTtoOperator } from "lib/transformers/Operator";
import { lowerLambdasInAst } from "lib/transformers/lambdaLowering";
import {
  parseSnbtInput,
  type ParseInputOptions,
} from "lib/transformers/inputParser";
import { StructuralParseError } from "lib/transformers/parseErrors";
import { TagToSNBT, type SNBTSerializeOptions } from "lib/transformers/SNBT";
import {
  isSourceNode,
  sourceToNetworkCards,
} from "lib/transformers/sourceNodes";

const VARIABLE_ITEM_ID = "integrateddynamics:variable";
const VALUE_TYPE_OPERATOR = "integrateddynamics:operator";

const isCardRef = (
  node: TypeAST.AST
): node is TypeAST.Variable & { id: string } =>
  node.type === "Variable" && node.id !== undefined && /^\d+$/.test(node.id);

export const snbtInputToAST = (
  text: string,
  options: ParseInputOptions = {}
): TypeAST.AST => {
  const parsed = parseSnbtInput(text, options);
  const definitions: TypeAST.NetworkCards["definitions"] = [];

  for (const card of parsed.cards) {
    if (card.ast === undefined) continue;
    definitions.push({
      name: card.id ?? String(definitions.length),
      node: card.ast,
    });
  }

  if (definitions.length === 0) {
    throw new StructuralParseError(
      "No decodable variable cards were found in the input"
    );
  }
  if (definitions.length === 1 && parsed.cards.length === 1) {
    return definitions[0]!.node;
  }
  return { type: "NetworkCards", definitions };
};

const cardTagFromAST = (id: string, node: TypeAST.AST): CompoundTag => {
  const name = id === "" ? "0" : id;

  if (
    node.type === "Curry" &&
    node.base.type === "Operator" &&
    node.args.every(isCardRef)
  ) {
    return new CompoundTag({
      _id: new IntTag(new Integer(name)),
      _type: VALUE_TYPE_OPERATOR,
      operatorName: operatorNameValue(node.base),
      variableIds: new IntArrayTag(
        new iArrayEager(
          node.args.map((arg) => new Integer((arg as TypeAST.Variable).id!))
        )
      ),
    });
  }

  const value = ASTtoOperator(node);
  return new CompoundTag({
    _id: new IntTag(new Integer(name)),
    _type: "integrateddynamics:valuetype",
    typeName: new StringTag(new iString(ValueHelpers.getTypeName(value))),
    value:
      node.type === "Operator"
        ? operatorNameValue(node)
        : ValueHelpers.serializeRaw(value),
  });
};

export const ASTToSnbt = (
  inputAst: TypeAST.AST,
  options: SNBTSerializeOptions = {}
): string => {
  const ast = lowerLambdasInAst(inputAst);
  const root = isSourceNode(ast) ? sourceToNetworkCards(ast) : ast;
  const definitions =
    root.type === "NetworkCards"
      ? root.definitions
      : [{ name: "", node: root }];

  return definitions
    .map(
      (def) =>
        `/give @p ${VARIABLE_ITEM_ID}${TagToSNBT(
          cardTagFromAST(def.name, def.node),
          options
        )}`
    )
    .join("\n");
};
