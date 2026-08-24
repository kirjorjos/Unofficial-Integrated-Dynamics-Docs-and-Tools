import { ExtradimensionalAspectBase } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/ExtradimensionalAspectBase";

export class EXTRADIMENSIONAL_INTEGER_RANDOM extends ExtradimensionalAspectBase {
  static displayName = "random";
  static fullDisplayName = "Random";
  static nicknames = [
    "random",
    "randomValue",
    "random_value",
    "randomInt",
    "random_int",
  ];
  static settings = {};
  static icon = "integer/extradimensional/random";
  static outputType = "Integer";
  static tooltipInfo = "A random integer value";
}
