import { NetworkAspectBase } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkAspectBase";

export class NETWORK_BOOLEAN_APPLICABLE extends NetworkAspectBase {
  static displayName = "isNetwork";
  static fullDisplayName = "Is Network";
  static nicknames = [
    "isNetwork",
    "is_network",
    "networkApplicable",
    "network_applicable",
  ];
  static settings = {};
  static icon = "boolean/network/applicable";
  static outputType = "Boolean";
  static tooltipInfo = "If the target has a network";
}
