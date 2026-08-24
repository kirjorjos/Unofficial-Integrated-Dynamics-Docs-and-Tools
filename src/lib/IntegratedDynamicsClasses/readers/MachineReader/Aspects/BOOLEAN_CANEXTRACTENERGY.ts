import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_BOOLEAN_CANEXTRACTENERGY extends MachineAspectBase {
  static displayName = "canExtractEnergy";
  static fullDisplayName = "Can Extract FE";
  static nicknames = [
    "canExtractEnergy",
    "can_extract_energy",
    "canExtractFE",
    "can_extract_fe",
    "extractable",
    "extractable_energy",
  ];
  static settings = {};
  static icon = "boolean/fe/canextract";
  static outputType = "Boolean";
  static tooltipInfo =
    "If FE can really be extracted from the target, takes into account storage";
}
