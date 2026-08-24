import { NetworkAspectBase } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkAspectBase";

export class NETWORK_OPERATOR_GETVARIABLEBYID extends NetworkAspectBase {
  static displayName = "variableValueById";
  static fullDisplayName = "Variable Value By ID";
  static nicknames = [
    "variableValueById",
    "variable_value_by_id",
    "getVariableById",
    "get_variable_by_id",
    "variableById",
    "variable_by_id",
  ];
  static settings = {};
  static icon = "operator/network/variablebyid";
  static outputType = "Operator";
  static signature = ["Integer", "Any"];
  static inGameDisplayName =
    "Virtual operator.integrateddynamics.virtual.variablebyid";
}
