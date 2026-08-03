import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class EntityReader extends ReaderBase {
  static typeName = "EntityReader";
  static shortName = "entity";
  /** 9-bit compressed ID — position 16 in aspects.json reader order */
  static numericID = 16;

  static aspects: Record<
    string,
    { settings: Record<string, number | boolean | string> }
  > = {
    INTEGER_ITEMFRAMEROTATION: { settings: {} },
    LIST_ENTITIES: { settings: {} },
    LIST_PLAYERS: { settings: {} },
    ENTITY: { settings: { listindex: 0 } },
    ITEMSTACK_ITEMFRAMECONTENTS: { settings: {} },
  };

  static aspectOutputType: Record<string, string> = {
    INTEGER_ITEMFRAMEROTATION: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    LIST_ENTITIES: OUTPUT_TYPE_TO_AST_TYPE["list"].astType,
    LIST_PLAYERS: OUTPUT_TYPE_TO_AST_TYPE["list"].astType,
    ENTITY: OUTPUT_TYPE_TO_AST_TYPE["entity"].astType,
    ITEMSTACK_ITEMFRAMECONTENTS: OUTPUT_TYPE_TO_AST_TYPE["itemstack"].astType,
  };
}
