import type { operatorRegistry } from "./operatorRegistry";
import type { Block as BlockType } from "IntegratedDynamicsClasses/Block";
import type { Item as ItemType } from "IntegratedDynamicsClasses/Item";
import type { Fluid as FluidType } from "IntegratedDynamicsClasses/Fluid";
import type { Entity as EntityType } from "IntegratedDynamicsClasses/Entity";
import type { iOperatorRegistry } from "IntegratedDynamicsClasses/operators/iOperatorRegistry";

declare global {
  type TypeTypeMap = {
    [typeID: number]: TypeRawSignatureAST.RawSignatureDefiniteValue;
  };
  type TypeLambda<P, R> = (arg: P) => R;
  type TypeNumericString = `${number}` | `-${number}`;

  interface Block extends BlockType {}
  interface Item extends ItemType {}
  interface Fluid extends FluidType {}
  interface Entity extends EntityType {}
}
