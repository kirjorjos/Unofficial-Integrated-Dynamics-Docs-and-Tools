import { Operator } from "IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

declare global {
  type TypeOperatorKey = keyof iOperatorRegistry;
  type TypeOperatorInternalName = ReturnType<
    InstanceType<iOperatorRegistry[keyof iOperatorRegistry]>["getInternalName"]
  >;

  type Predicate<T extends IntegratedValue> = Operator<T, iBoolean>;

  interface IntegratedValue {
    getSignatureNode(): TypeRawSignatureAST.RawSignatureNode;
    equals(other: IntegratedValue): iBoolean;
  }
}
