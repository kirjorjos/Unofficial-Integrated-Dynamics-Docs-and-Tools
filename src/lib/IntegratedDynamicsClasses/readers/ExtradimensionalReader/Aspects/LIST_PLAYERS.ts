import { ExtradimensionalAspectBase } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/ExtradimensionalAspectBase";

export class EXTRADIMENSIONAL_LIST_PLAYERS extends ExtradimensionalAspectBase {
  static displayName = "players";
  static fullDisplayName = "Players";
  static nicknames = [
    "players",
    "playerList",
    "player_list",
    "onlinePlayers",
    "online_players",
  ];
  static settings = {};
  static icon = "list/extradimensional/players";
  static outputType = "List";
}
