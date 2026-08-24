import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_DOUBLE_TEMPERATURE extends MachineAspectBase {
  static displayName = "temperature";
  static fullDisplayName = "Temperature";
  static nicknames = [
    "temperature",
    "machineTemperature",
    "machine_temperature",
  ];
  static settings = {};
  static icon = "double/temperature/temperature";
  static outputType = "Double";
  static tooltipInfo =
    "The current temperature of the target in degrees Kelvin";
}
