import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_CANINSERTENERGY extends MachineAspectBase {
  static displayName = "canInsertEnergy";
  static fullDisplayName = "Can Insert FE";
  static nicknames = [
    "canInsertEnergy",
    "can_insert_energy",
    "canInsertFE",
    "can_insert_fe",
    "insertable",
    "insertable_energy",
  ];
  static settings = {};
  static icon = "boolean/fe/caninsert";
  static outputType = "Boolean";
}
