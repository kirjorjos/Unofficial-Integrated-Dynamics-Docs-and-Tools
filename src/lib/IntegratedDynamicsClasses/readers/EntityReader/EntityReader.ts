import {
  ReaderBase,
  type ReaderAspects,
} from "lib/IntegratedDynamicsClasses/readers/ReaderBase";
import { ENTITY_INTEGER_ITEMFRAMEROTATION } from "lib/IntegratedDynamicsClasses/readers/EntityReader/Aspects/INTEGER_ITEMFRAMEROTATION";
import { ENTITY_LIST_ENTITIES } from "lib/IntegratedDynamicsClasses/readers/EntityReader/Aspects/LIST_ENTITIES";
import { ENTITY_LIST_PLAYERS } from "lib/IntegratedDynamicsClasses/readers/EntityReader/Aspects/LIST_PLAYERS";
import { ENTITY_ENTITY } from "lib/IntegratedDynamicsClasses/readers/EntityReader/Aspects/ENTITY";
import { ENTITY_ITEMSTACK_ITEMFRAMECONTENTS } from "lib/IntegratedDynamicsClasses/readers/EntityReader/Aspects/ITEMSTACK_ITEMFRAMECONTENTS";

export class EntityReader extends ReaderBase {
  static typeName = "EntityReader";
  static shortName = "entity";
  static numericID = 16;

  static aspects: ReaderAspects = {
    INTEGER_ITEMFRAMEROTATION: ENTITY_INTEGER_ITEMFRAMEROTATION,
    LIST_ENTITIES: ENTITY_LIST_ENTITIES,
    LIST_PLAYERS: ENTITY_LIST_PLAYERS,
    ENTITY: ENTITY_ENTITY,
    ITEMSTACK_ITEMFRAMECONTENTS: ENTITY_ITEMSTACK_ITEMFRAMECONTENTS,
  };
}
