import { RedstoneAspectBase } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/RedstoneAspectBase";

export class REDSTONE_INTEGER_COMPARATOR extends RedstoneAspectBase {
  static displayName = "comparator";
  static fullDisplayName = "Comparator";
  static nicknames = [
    "comparator",
    "redstoneComparator",
    "redstone_comparator",
  ];
  static settings = {};
  static icon = "integer/redstone/comparator";
  static outputType = "Integer";
}
