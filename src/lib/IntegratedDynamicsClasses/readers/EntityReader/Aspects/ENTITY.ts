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
  static settingsInfo = {
    listindex: { displayName: "List Element" },
  };
  static icon = "entity/entity";
  static outputType = "Entity";
  static tooltipInfo = "The selected entity in the target space";
}
