import { ASTtoNBT, NBTtoAST } from "lib/transformers/NBT";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

/**
 * Transforms an AST to a JSON structure.
 * @param ast The AST to transform.
 * @returns The JSON structure.
 */
export const ASTtoJSON = (ast: TypeAST.AST): jsonData => {
  const nbt = ASTtoNBT(ast);
  return nbt.toJSON();
};

/**
 * Transforms a JSON structure to an AST.
 * @param json The JSON structure to transform.
 * @param typeName The type name of the value stored in the JSON. Defaults to "integrateddynamics:operator".
 * @returns The AST.
 */
export const JSONtoAST = (
  json: jsonData,
  typeName: string = "integrateddynamics:operator"
): TypeAST.AST => {
  const nbt = CompoundTag.wrap(json);
  return NBTtoAST(nbt, typeName);
};
