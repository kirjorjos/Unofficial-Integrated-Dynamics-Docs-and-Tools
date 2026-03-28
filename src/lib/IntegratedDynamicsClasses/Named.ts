import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export interface Named extends IntegratedValue {
  getName(): iString;
}
