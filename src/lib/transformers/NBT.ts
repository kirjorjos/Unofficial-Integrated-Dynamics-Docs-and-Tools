import { ASTtoOperator, OperatortoAST } from "lib/transformers/Operator";
import { ValueHelpers } from "lib/IntegratedDynamicsClasses/ValueHelpers";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import {
  SNBTToTag,
  TagToSNBT,
  type SNBTSerializeOptions,
} from "lib/transformers/SNBT";

export const ASTtoNBT = (ast: TypeAST.AST): Tag<IntegratedValue> => {
  const operator = ASTtoOperator(ast);
  return ValueHelpers.serializeRaw(operator);
};

export const NBTtoAST = (
  nbt: Tag<IntegratedValue>,
  typeName: string = "integrateddynamics:operator"
): TypeAST.AST => {
  const operator = ValueHelpers.deserializeRaw(typeName, nbt);
  return OperatortoAST(operator);
};

export const SNBTToAST = (text: string, typeName?: string): TypeAST.AST =>
  NBTtoAST(SNBTToTag(text), typeName);

export const ASTtoSNBT = (
  ast: TypeAST.AST,
  options: SNBTSerializeOptions = {}
): string => TagToSNBT(ASTtoNBT(ast), options);
