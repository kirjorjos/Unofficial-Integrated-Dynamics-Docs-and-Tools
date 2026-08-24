import { NetworkAspectBase } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkAspectBase";

export class NETWORK_ANY_VALUE extends NetworkAspectBase {
  static displayName = "value";
  static fullDisplayName = "Value";
  static nicknames = ["value", "networkValue", "network_value"];
  static settings = {};
  static icon = "any/network/value";
  static outputType = "Any";
  static tooltipInfo = "The value that is being exposed by the target";
}
