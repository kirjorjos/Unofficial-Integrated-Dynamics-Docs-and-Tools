import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_CANWORK extends MachineAspectBase {
  static displayName = "canWork";
  static fullDisplayName = "Can Work";
  static nicknames = ["canWork", "can_work", "workable"];
  static settings = {};
  static icon = "boolean/machine/canwork";
  static outputType = "Boolean";
  static tooltipInfo =
    "If the target would be able to start working in its current state";
}
