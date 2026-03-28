import type { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import type { Block as BlockType } from "lib/IntegratedDynamicsClasses/Block";
import type { Item as ItemType } from "lib/IntegratedDynamicsClasses/Item";
import type { Fluid as FluidType } from "lib/IntegratedDynamicsClasses/Fluid";
import type { Entity as EntityType } from "lib/IntegratedDynamicsClasses/Entity";
import type { iOperatorRegistry } from "lib/IntegratedDynamicsClasses/operators/iOperatorRegistry";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

declare global {
  type TypeTypeMap = {
    [typeID: number]: TypeRawSignatureAST.RawSignatureDefiniteValue;
  };
  type TypeLambda<P, R> = (arg: P) => R;
  type TypeNumericString = `${number}` | `-${number}`;

  interface Block extends BlockType, IntegratedValue {}
  interface Item extends ItemType, IntegratedValue {}
  interface Fluid extends FluidType, IntegratedValue {}
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
