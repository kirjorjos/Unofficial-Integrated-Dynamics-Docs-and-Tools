import { EntityAspectBase } from "lib/IntegratedDynamicsClasses/readers/EntityReader/EntityAspectBase";

export class ENTITY_ENTITY extends EntityAspectBase {
  static displayName = "entity";
  static fullDisplayName = "Entity";
  static nicknames = [
    "entity",
    "targetEntity",
    "target_entity",
    "entityAt",
    "entity_at",
  ];
  static settings = { listindex: 0 };
  static icon = "entity/entity";
  static outputType = "Entity";
}
