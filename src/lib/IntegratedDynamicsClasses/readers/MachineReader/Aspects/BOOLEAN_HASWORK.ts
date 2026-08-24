import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_HASWORK extends MachineAspectBase {
  static displayName = "hasWork";
  static fullDisplayName = "Has Work";
  static nicknames = ["hasWork", "has_work", "workAvailable", "work_available"];
  static settings = {};
  static icon = "boolean/machine/haswork";
  static outputType = "Boolean";
  static tooltipInfo = "If the target has work to process";
}
