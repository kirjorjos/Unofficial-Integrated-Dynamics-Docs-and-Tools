import { Operator } from "IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "JavaNumberClasses/Integer";
import { iArray } from "./iArray";
import { iArrayEager } from "./iArrayEager";

export class iArrayLazy<
  Source extends IntegratedValue,
  Result extends IntegratedValue = Source,
> implements iArray<Source, Result>
{
  private mapOp: Operator<Source, Result>;
  private initial: Source;
  private generatorOp: Operator<Source, Source>;
  private arr: Source[];

  constructor(
    initial: Source,
    generatorOp: Operator<Source, Source>,
    mapOp: Operator<Source, Result>
  ) {
    this.initial = initial;
    this.generatorOp = generatorOp;
    this.mapOp = mapOp;
    this.arr = [initial];
  }

  append(_element: Source): iArrayLazy<Source, Result> {
    return new iArrayLazy<Source, Result>(
      this.initial,
      this.generatorOp,
      this.mapOp
    );
  }

  some(
    _fn: (value: Source, index: number, array: Source[]) => unknown
  ): iBoolean {
    throw new Error("Some not supported on infinite list");
  }

  map<U extends IntegratedValue>(
    mapOp: Operator<Result, U>
  ): iArray<Source, U> {
    const returnValue = new iArrayLazy<Source, U>(
      this.initial,
      this.generatorOp,
      this.mapOp.pipe<U>(mapOp)
    );
    returnValue.arr = [...this.arr];
    return returnValue;
  }

  filter(
    _fn: (value: Source, index: number, array: Source[]) => unknown
  ): iArrayLazy<Source, Result> {
    throw new Error("Filter not supported on infinite list");
  }

  size(): Integer {
    return new Integer(2147483647); // Integer.MAX_VALUE
  }

  private trueSize(): Integer {
    return new Integer(this.arr.length);
  }

  getOrDefault(index: Integer, _backup: Result): Result {
    return this.get(index);
  }

  get(index: Integer): Result {
    if (this.trueSize().lte(index)) {
      this.get(index.subtract(new Integer(1)));
    }
    const i = parseInt(index.toDecimal().valueOf());
    if (this.arr.length == i)
      this.arr[i] = this.generatorOp.apply(this.arr[i - 1] as Source);
    let baseValue = this.arr[i] as Source;
    return this.mapOp.apply(baseValue);
  }

  includes(_element: Source): iBoolean {
    throw new Error("Includes not supported on an Infinite List");
  }

  concat(_arr: iArray<Source, Result>): iArray<Source, Result> {
    return new iArrayEager<Source, Result>([]);
  }

  slice(start: Integer, end: Integer): iArrayEager<Result, Result> {
    let newArrRaw = [];
    for (let i = start; i.lt(end); i = i.add(new Integer(1))) {
      newArrRaw.push(this.get(i));
    }
    return new iArrayEager<Result, Result>(newArrRaw);
  }

  equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof iArrayLazy)) return new iBoolean(false);
    if (!other.initial.equals(this.initial)) return new iBoolean(false);
    if (!other.generatorOp.equals(this.generatorOp)) return new iBoolean(false);
    if (!other.mapOp.equals(this.mapOp)) return new iBoolean(false);
    return new iBoolean(true);
  }

  getSignatureNode(): TypeRawSignatureAST.RawSignatureDefiniteValue {
    return {
      type: "List",
      listType: this.mapOp
        .apply(this.initial)
        .getSignatureNode() as TypeRawSignatureAST.RawSignatureDefiniteValue,
    };
  }

  valueOf(): Source[] {
    throw new Error("Value of not supported for Infinite List");
  }
}
