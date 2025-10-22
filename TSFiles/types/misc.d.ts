import type { operatorRegistry } from "./operatorRegistry";

declare global {
  type TypeTypeMap = {
    [typeID: number]: TypeRawSignatureAST.RawSignatureDefiniteValue;
  };
  type TypeLambda<P, R> = (...args: [P]) => R;
  type TypeNumericString = `${number}` | `-${number}`;
  type TypeOperatorKey = keyof (typeof operatorRegistry)["baseOperators"];
  type TypeOperatorNicknames =
    (typeof operatorRegistry)["baseOperators"][TypeOperatorKey]["nicknames"][number];
  type TypeOperatorInternalName =
    (typeof operatorRegistry)["baseOperators"][TypeOperatorKey]["internalName"] & string;
  type TypeDigitString = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  type TypeBit = 0 | 1;
  type TypeInt4 = [TypeBit, TypeBit, TypeBit, TypeBit];
  type TypeInt8 = [...TypeInt4, ...TypeInt4];
  type TypeInt16 = [...TypeInt8, ...TypeInt8];
  type TypeInt32 = [...TypeInt16, ...TypeInt16];
  type TypeInt64 = [...TypeInt32, ...TypeInt32];

  interface TypeOperatorRegistry {
    baseOperators: {
      [k: string]: Operator;
    };
    typeSerializers: {
      [k: string]: { valueType: string; nbtType: string };
    };
  }

  type IntegratedValue = (TypeRawSignatureAST.RawSignatureNode & { value?: IntegratedValue }) | Operator | boolean | string

  type Predicate = Operator & {
    fn: (...args: any[]) => boolean;
  };
}