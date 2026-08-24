import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_DOUBLE_MINTEMPERATURE extends MachineAspectBase {
  static displayName = "minTemperature";
  static fullDisplayName = "Minimum Temperature";
  static nicknames = [
    "minTemperature",
    "min_temperature",
    "minimumTemperature",
    "minimum_temperature",
  ];
  static settings = {};
  static icon = "double/temperature/mintemperature";
  static outputType = "Double";
}
