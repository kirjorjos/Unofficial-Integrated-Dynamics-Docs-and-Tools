import { Integer } from "JavaNumberClasses/Integer";
import { iBoolean } from "./iBoolean";
import { Operator } from "IntegratedDynamicsClasses/operators/Operator";
import { iArrayEager } from "./iArrayEager";

export interface iArray<
  Source extends IntegratedValue,
  Result extends IntegratedValue = Source,
> extends IntegratedValue {
  valueOf(): Array<Source>;

  append(element: Source): iArray<Source, Result>;

  some(
    fn: (value: Source, index: number, array: Source[]) => unknown
  ): iBoolean;

  map<U extends IntegratedValue>(
    mapOp: Operator<Result, U>
  ): iArray<IntegratedValue, U>;

  filter(
    fn: (value: Source, index: number, array: Source[]) => unknown
  ): iArray<Source, Result>;

  size(): Integer;

  get(index: Integer): Result;

  getOrDefault(index: Integer, backup: Result): Result;

  includes(element: Source): iBoolean;

  concat(arr: iArray<Source, Result>): iArray<Source, Result>;

  slice(start: Integer, end?: Integer): iArrayEager<Result, Result>;

  equals(other: IntegratedValue): iBoolean;

  getSignatureNode(): TypeRawSignatureAST.RawSignatureDefiniteValue;
}
