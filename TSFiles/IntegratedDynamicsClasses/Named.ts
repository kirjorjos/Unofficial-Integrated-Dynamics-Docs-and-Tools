import { iString } from "./typeWrappers/iString";

export interface Named extends IntegratedValue {
  getName(): iString;
}
