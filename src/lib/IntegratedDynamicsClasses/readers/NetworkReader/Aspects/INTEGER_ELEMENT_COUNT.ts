import { NetworkAspectBase } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkAspectBase";

export class NETWORK_INTEGER_ELEMENT_COUNT extends NetworkAspectBase {
  static displayName = "elements";
  static fullDisplayName = "Elements";
  static nicknames = [
    "elements",
    "elementCount",
    "element_count",
    "networkElements",
    "network_elements",
  ];
  static settings = {};
  static icon = "integer/network/elementcount";
  static outputType = "Integer";
  static tooltipInfo = "The amount of elements in the target network";
}
