import { NetworkAspectBase } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkAspectBase";

export class NETWORK_INTEGER_ENERGY_BATTERY_COUNT extends NetworkAspectBase {
  static displayName = "energyBatteries";
  static fullDisplayName = "Energy Batteries";
  static nicknames = [
    "energyBatteries",
    "energy_batteries",
    "batteryCount",
    "battery_count",
  ];
  static settings = {};
  static icon = "integer/network/energy/batterycount";
  static outputType = "Integer";
}
