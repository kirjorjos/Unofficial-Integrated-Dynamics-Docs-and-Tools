import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_DOUBLE_DEFAULTTEMPERATURE extends MachineAspectBase {
  static displayName = "defaultTemperature";
  static fullDisplayName = "Default Temperature";
  static nicknames = ["defaultTemperature", "default_temperature"];
  static settings = {};
  static icon = "double/temperature/defaulttemperature";
  static outputType = "Double";
  static tooltipInfo =
    "The default temperature of the target in degrees Kelvin";
}
