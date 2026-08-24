import { EntityAspectBase } from "lib/IntegratedDynamicsClasses/readers/EntityReader/EntityAspectBase";

export class ENTITY_LIST_PLAYERS extends EntityAspectBase {
  static displayName = "players";
  static fullDisplayName = "Players";
  static nicknames = [
    "players",
    "playerList",
    "player_list",
    "entityPlayers",
    "entity_players",
  ];
  static settings = {};
  static icon = "list/entity/players";
  static outputType = "List";
  static tooltipInfo = "The players that are in this world";
}
