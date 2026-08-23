import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class EntityReader extends ReaderBase {
  static typeName = "EntityReader";
  static shortName = "entity";
  /** 9-bit compressed ID — position 16 in aspects.json reader order */
  static numericID = 16;

  static aspects: Record<
    string,
    {
      settings: Record<string, number | boolean | string>;
      icon: string;
      displayName: string;
    }
  > = {
    INTEGER_ITEMFRAMEROTATION: {
      settings: {},
      icon: "integer/entity/itemframerotation",
      displayName: "Item Frame Rotation",
    },
    LIST_ENTITIES: {
      settings: {},
      icon: "list/entity/entities",
      displayName: "Entities",
    },
    LIST_PLAYERS: {
      settings: {},
      icon: "list/entity/players",
      displayName: "Players",
    },
    ENTITY: {
      settings: { listindex: 0 },
      icon: "entity/entity",
      displayName: "Entity",
    },
    ITEMSTACK_ITEMFRAMECONTENTS: {
      settings: {},
      icon: "itemstack/entity/itemframecontents",
      displayName: "Item Frame",
    },
  };

  static aspectOutputType: Record<string, string> = {
    INTEGER_ITEMFRAMEROTATION: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    LIST_ENTITIES: OUTPUT_TYPE_TO_AST_TYPE["list"].astType,
    LIST_PLAYERS: OUTPUT_TYPE_TO_AST_TYPE["list"].astType,
    ENTITY: OUTPUT_TYPE_TO_AST_TYPE["entity"].astType,
    ITEMSTACK_ITEMFRAMECONTENTS: OUTPUT_TYPE_TO_AST_TYPE["itemstack"].astType,
  };
}
