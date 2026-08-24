import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_LIST_PLAYERS extends WorldAspectBase {
  static displayName = "players";
  static fullDisplayName = "Players";
  static nicknames = [
    "players",
    "playerList",
    "player_list",
    "worldPlayers",
    "world_players",
  ];
  static settings = {};
  static icon = "list/world/players";
  static outputType = "List";
  static tooltipInfo = "The players that are in this world";
}
