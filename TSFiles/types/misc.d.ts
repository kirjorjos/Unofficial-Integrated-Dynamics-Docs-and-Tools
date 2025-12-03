import type { operatorRegistry } from "./operatorRegistry";
import type { Block as BlockType } from "IntegratedDynamicsClasses/Block";
import type { Item as ItemType } from "IntegratedDynamicsClasses/Item";
import type { Fluid as FluidType } from "IntegratedDynamicsClasses/Fluid";
import type { Entity as EntityType } from "IntegratedDynamicsClasses/Entity"
import type { iOperatorRegistry } from "IntegratedDynamicsClasses/operators/iOperatorRegistry";

declare global {
  type TypeTypeMap = {
    [typeID: number]: TypeRawSignatureAST.RawSignatureDefiniteValue;
  };
  type TypeLambda<P, R> = (...args: [P]) => R;
  type TypeNumericString = `${number}` | `-${number}`;
  type TypeOperatorKey = keyof iOperatorRegistry;
  type TypeOperatorInternalName =
  ReturnType<InstanceType<iOperatorRegistry[keyof iOperatorRegistry]>["getInternalName"]>
  type TypeDigitString = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
  type TypeBit = 0 | 1;
  type TypeInt4 = [TypeBit, TypeBit, TypeBit, TypeBit];
  type TypeInt8 = [...TypeInt4, ...TypeInt4];
  type TypeInt16 = [...TypeInt8, ...TypeInt8];
  type TypeInt32 = [...TypeInt16, ...TypeInt16];
  type TypeInt64 = [...TypeInt32, ...TypeInt32];
  type TypeInt128 = [...TypeInt64, ...TypeInt64];

  type Predicate = Operator & {
    fn: (...args: any[]) => boolean;
  };

  interface Block extends BlockType {}
  interface Item extends ItemType {}
  interface Fluid extends FluidType {}
  interface Entity extends EntityType {}
}
