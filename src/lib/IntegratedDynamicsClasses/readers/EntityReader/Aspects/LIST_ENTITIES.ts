import { EntityAspectBase } from "lib/IntegratedDynamicsClasses/readers/EntityReader/EntityAspectBase";

export class ENTITY_LIST_ENTITIES extends EntityAspectBase {
  static displayName = "entities";
  static fullDisplayName = "Entities";
  static nicknames = [
    "entities",
    "entityList",
    "entity_list",
    "listEntities",
    "list_entities",
  ];
  static settings = {};
  static icon = "list/entity/entities";
  static outputType = "List";
}
