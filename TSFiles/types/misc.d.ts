import type { operatorRegistry } from "TSFiles/IntegratedDynamicsClasses/registries/operatorRegistry";
import type { Block as BlockType } from "IntegratedDynamicsClasses/Block";
import type { Item as ItemType } from "IntegratedDynamicsClasses/Item";
import type { Fluid as FluidType } from "IntegratedDynamicsClasses/Fluid";
import type { Entity as EntityType } from "IntegratedDynamicsClasses/Entity";
import type { iOperatorRegistry } from "IntegratedDynamicsClasses/operators/iOperatorRegistry";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

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

  interface ErrorInfo {
    message: string;
    nodeA: ParsedSignature;
    nodeB: ParsedSignature;
    nodeC?: ParsedSignature;
  }

  type jsonData = string | number | boolean | null | jsonObject | jsonArray;
  type jsonObject = { [key: string]: jsonData };
  type jsonArray = jsonData[];
}
