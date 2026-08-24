import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_ISTEMPERATURE extends MachineAspectBase {
  static displayName = "hasTemperature";
  static fullDisplayName = "Has Temperature";
  static nicknames = [
    "hasTemperature",
    "has_temperature",
    "isTemperature",
    "is_temperature",
  ];
  static settings = {};
  static icon = "boolean/temperature/istemperature";
  static outputType = "Boolean";
  static tooltipInfo = "If the target has a certain temperature";
}
