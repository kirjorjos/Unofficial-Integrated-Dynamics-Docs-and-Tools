import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_ISWORKER extends MachineAspectBase {
  static displayName = "isWorker";
  static fullDisplayName = "Is Worker";
  static nicknames = ["isWorker", "is_worker", "worker"];
  static settings = {};
  static icon = "boolean/machine/isworker";
  static outputType = "Boolean";
  static tooltipInfo = "If the target is a worker machine";
}
