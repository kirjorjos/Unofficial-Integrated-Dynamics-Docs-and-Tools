import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_DOUBLE_MAXTEMPERATURE extends MachineAspectBase {
  static displayName = "maxTemperature";
  static fullDisplayName = "Maximum Temperature";
  static nicknames = [
    "maxTemperature",
    "max_temperature",
    "maximumTemperature",
    "maximum_temperature",
  ];
  static settings = {};
  static icon = "double/temperature/maxtemperature";
  static outputType = "Double";
  static tooltipInfo =
    "The maximum temperature of the target in degrees Kelvin";
}
