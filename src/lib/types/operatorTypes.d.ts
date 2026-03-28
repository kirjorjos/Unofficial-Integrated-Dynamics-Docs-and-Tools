import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

declare global {
  type TypeOperatorKey = Exclude<
    keyof typeof operatorRegistry,
    "find" | "operatorByNickname"
  >;
  type TypeOperatorValue = (typeof operatorRegistry)[TypeOperatorKey];
  type TypeOperatorInternalName = TypeOperatorValue["internalName"];

  type Predicate<T extends IntegratedValue> = Operator<T, iBoolean>;

  interface IntegratedValue {
    getSignatureNode(): ParsedSignature;
    equals(other: IntegratedValue): iBoolean;
  }
}
