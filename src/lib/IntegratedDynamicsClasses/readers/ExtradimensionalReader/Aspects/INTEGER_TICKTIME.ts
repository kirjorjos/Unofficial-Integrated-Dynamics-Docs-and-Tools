import { ExtradimensionalAspectBase } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/ExtradimensionalAspectBase";

export class EXTRADIMENSIONAL_INTEGER_TICKTIME extends ExtradimensionalAspectBase {
  static displayName = "tickTime";
  static fullDisplayName = "Tick time";
  static nicknames = ["tickTime", "tick_time", "tick"];
  static settings = {};
  static icon = "integer/extradimensional/ticktime";
  static outputType = "Integer";
  static tooltipInfo = "The average tick time in nanoseconds for the server";
}
