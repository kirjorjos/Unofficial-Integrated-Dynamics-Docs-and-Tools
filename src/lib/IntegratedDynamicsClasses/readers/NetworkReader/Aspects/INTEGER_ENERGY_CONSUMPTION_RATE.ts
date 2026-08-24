import { NetworkAspectBase } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkAspectBase";

export class NETWORK_INTEGER_ENERGY_CONSUMPTION_RATE extends NetworkAspectBase {
  static displayName = "energyConsumptionRate";
  static fullDisplayName = "Energy Consumption Rate";
  static nicknames = [
    "energyConsumptionRate",
    "energy_consumption_rate",
    "consumptionRate",
    "consumption_rate",
  ];
  static settings = {};
  static icon = "integer/network/energy/consumptionrate";
  static outputType = "Integer";
}
