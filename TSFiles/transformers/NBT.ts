import { ASTtoOperator, OperatortoAST } from "./Operator";
import { ValueHelpers } from "IntegratedDynamicsClasses/ValueHelpers";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

/**
 * Transforms an AST to an NBT Tag.
 * @param ast The AST to transform.
 * @returns The NBT Tag.
 */
export const ASTtoNBT = (ast: TypeAST.AST): Tag<IntegratedValue> => {
  const operator = ASTtoOperator(ast);
  return ValueHelpers.serializeRaw(operator);
};

/**
 * Transforms an NBT Tag to an AST.
 * @param nbt The NBT Tag to transform.
 * @param typeName The type name of the value stored in the NBT Tag. Defaults to "integrateddynamics:operator".
 * @returns The AST.
 */
export const NBTtoAST = (
  nbt: Tag<IntegratedValue>,
  typeName: string = "integrateddynamics:operator"
): TypeAST.AST => {
  const operator = ValueHelpers.deserializeRaw(typeName, nbt);
  return OperatortoAST(operator);
};
