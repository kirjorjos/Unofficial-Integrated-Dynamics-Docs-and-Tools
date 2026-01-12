import { iString } from "./typeWrappers/iString";

export interface UniquelyNamed extends IntegratedValue {
  getUniqueName(): iString;
}
