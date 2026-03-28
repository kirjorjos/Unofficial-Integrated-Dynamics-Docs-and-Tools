import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export interface UniquelyNamed extends IntegratedValue {
  getUniqueName(): iString;
}
