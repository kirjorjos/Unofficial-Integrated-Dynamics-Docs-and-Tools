import { Operator } from "IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { operatorRegistry } from "IntegratedDynamicsClasses/operators/operatorRegistry";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

declare global {
  type TypeOperatorKey = Exclude<keyof typeof operatorRegistry, "find">;
  type TypeOperatorValue = (typeof operatorRegistry)[TypeOperatorKey];
  type TypeOperatorInternalName = TypeOperatorValue["internalName"];

  type Predicate<T extends IntegratedValue> = Operator<T, iBoolean>;

  interface IntegratedValue {
    getSignatureNode(): ParsedSignature;
    equals(other: IntegratedValue): iBoolean;
  }
}
