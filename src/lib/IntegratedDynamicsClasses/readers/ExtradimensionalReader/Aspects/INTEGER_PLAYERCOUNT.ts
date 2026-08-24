import { ExtradimensionalAspectBase } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/ExtradimensionalAspectBase";

export class EXTRADIMENSIONAL_INTEGER_PLAYERCOUNT extends ExtradimensionalAspectBase {
  static displayName = "playerCount";
  static fullDisplayName = "Player Count";
  static nicknames = [
    "playerCount",
    "player_count",
    "playersOnline",
    "players_online",
    "onlinePlayers",
    "online_players",
  ];
  static settings = {};
  static icon = "integer/extradimensional/playercount";
  static outputType = "Integer";
  static tooltipInfo = "The amount of players in the server";
}
