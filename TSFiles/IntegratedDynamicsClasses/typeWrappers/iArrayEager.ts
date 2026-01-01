import { iArrayLazy } from "IntegratedDynamicsClasses/typeWrappers/iArrayLazy";
import { iBoolean } from "./iBoolean";
import { Integer } from "JavaNumberClasses/Integer";
import { Operator } from "IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "./iArray";

export class iArrayEager<
  Source extends IntegratedValue,
  Result extends IntegratedValue = Source,
> implements iArray<Source, Result>
{
  protected arr: Array<Source>;

  constructor(arr: Array<Source>) {
    this.arr = arr;
  }

  valueOf(): Array<Source> {
    console.warn("Calling this is probally a bug, ensure you're sure");
    return this.arr;
  }

  append(element: Source): iArray<Source, Result> {
    let returnValue = [...this.arr];
    returnValue.push(element);
    return new iArrayEager<Source, Result>(returnValue);
  }

  some(
    fn: (value: Source, index: number, array: Source[]) => unknown
  ): iBoolean {
    return new iBoolean(this.arr.some(fn));
  }

  map<U extends IntegratedValue>(
    mapOp: Operator<Result, U>
  ): iArray<IntegratedValue, U> {
    return new iArrayEager<U, U>(
      this.arr.map((e: Source) => mapOp.apply(e as unknown as Result) as U)
    );
  }

  filter(
    fn: (value: Source, index: number, array: Source[]) => unknown
  ): iArray<Source, Result> {
    return new iArrayEager<Source, Result>(this.arr.filter(fn));
  }

  size(): Integer {
    return new Integer(this.arr.length);
  }

  getOrDefault(index: Integer, backup: Result): Result {
    if (this.size().lte(index)) return backup;
    return this.get(index);
  }

  get(index: Integer): Result {
    if (this.size().lte(index))
      throw new Error(`Index out of bounds: ${index.toDecimal()}`);
    const i = parseInt(index.toDecimal().valueOf());
    return this.arr[i] as unknown as Result;
  }

  includes(element: Source) {
    return this.some((e) => e.equals(element));
  }

  concat(arr: iArray<Source, Result>): iArray<Source, Result> {
    if (this instanceof iArrayLazy || arr instanceof iArrayLazy)
      return new iArrayEager<Source, Result>([]);
    return new iArrayEager<Source, Result>([...this.arr, ...arr.valueOf()]);
  }

  slice(startInt: Integer, endInt?: Integer): iArrayEager<Result, Result> {
    const start = parseInt(startInt.toDecimal());
    const end = endInt ? parseInt(endInt!.toDecimal()) : undefined;
    return new iArrayEager(this.arr.slice(start, end) as unknown as Result[]);
  }

  getSignatureNode(): TypeRawSignatureAST.RawSignatureDefiniteValue {
    return { type: "Boolean" };
  }

  equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof iArrayEager)) return new iBoolean(false);
    const otherArr = other.valueOf();
    if (this.arr.length !== otherArr.length) return new iBoolean(false);
    return new iBoolean(this.arr.every((e, i) => e.equals(otherArr[i])));
  }
}
