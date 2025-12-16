import { Operator } from "IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

declare global {
  type TypeOperatorKey = keyof iOperatorRegistry;
  type TypeOperatorInternalName = ReturnType<
    InstanceType<iOperatorRegistry[keyof iOperatorRegistry]>["getInternalName"]
  >;

  type Predicate = Operator<IntegratedValue, iBoolean> & {
    fn: (...args: any[]) => boolean;
  };

  interface IntegratedValue {
    getSignatureNode(): TypeRawSignatureAST.RawSignatureNode;
    equals(other: IntegratedValue): iBoolean;
  }
}
