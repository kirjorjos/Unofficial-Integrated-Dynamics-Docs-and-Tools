import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_ISWORKING extends MachineAspectBase {
  static displayName = "isWorking";
  static fullDisplayName = "Is Working";
  static nicknames = ["isWorking", "is_working", "working", "active"];
  static settings = {};
  static icon = "boolean/machine/isworking";
  static outputType = "Boolean";
  static tooltipInfo = "If the target is currently working";
}
