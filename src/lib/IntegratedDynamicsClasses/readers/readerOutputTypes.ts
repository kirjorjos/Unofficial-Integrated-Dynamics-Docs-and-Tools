/**
 * Mapping from aspects.json output_type names to canonical AST type names
 * and their position in the chronological LiteralKind enum.
 *
 * Order positions correspond to the chronological addition order from the
 * IntegratedDynamics git history (oldest = lowest ID).
 *
 * Boolean=0, Integer=2, String=6, Double=7, Block=8, Item=9,
 * Long=11, List=12, Entity=13, Fluid=14, Operator=20,
 * NBT=21, Ingredients=22, Recipe=23, Number=24, Named=25,
 * UniquelyNamed=26, Null=27, Variable=28, Curry=29
 */
export const OUTPUT_TYPE_TO_AST_TYPE = {
  boolean: { astType: "Boolean", positionId: 0 } as const,
  integer: { astType: "Integer", positionId: 2 } as const,
  string: { astType: "String", positionId: 6 } as const,
  double: { astType: "Double", positionId: 7 } as const,
  list: { astType: "List", positionId: 12 } as const,
  long: { astType: "Long", positionId: 11 } as const,
  fluidstack: { astType: "Fluid", positionId: 14 } as const,
  itemstack: { astType: "Item", positionId: 9 } as const,
  block: { astType: "Block", positionId: 8 } as const,
  nbt: { astType: "NBT", positionId: 21 } as const,
  entity: { astType: "Entity", positionId: 13 } as const,
  operator: { astType: "Operator", positionId: 20 } as const,
  any: { astType: "Any", positionId: -1 } as const, // generic placeholder, no fixed position
} as const;

export type OutputType = keyof typeof OUTPUT_TYPE_TO_AST_TYPE;
export type AstTypeName =
  (typeof OUTPUT_TYPE_TO_AST_TYPE)[OutputType]["astType"];
export type OutputTypeEntry = (typeof OUTPUT_TYPE_TO_AST_TYPE)[OutputType];
