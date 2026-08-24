import { MachineAspectBase } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineAspectBase";

export class MACHINE_INTEGER_ENERGYSTORED extends MachineAspectBase {
  static displayName = "energyStored";
  static fullDisplayName = "Stored FE";
  static nicknames = [
    "energyStored",
    "energy_stored",
    "storedFE",
    "stored_fe",
    "storedEnergy",
    "stored_energy",
    "stored",
  ];
  static settings = {};
  static icon = "integer/fe/amount";
  static outputType = "Integer";
}
