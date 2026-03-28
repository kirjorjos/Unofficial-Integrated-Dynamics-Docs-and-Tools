import { Integer } from "lib/JavaNumberClasses/Integer";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { ByteArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteArrayTag";
import { IntArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { NullTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag";
import { ValueHelpers } from "lib/IntegratedDynamicsClasses/ValueHelpers";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

/**
 * A proxy for a list of values.
 * This is used for lazy lists.
 */
export interface IValueTypeListProxy<
  Source extends IntegratedValue,
  Result extends IntegratedValue = Source,
> extends iArray<Source, Result> {
  isInfinite(): boolean;
}

export abstract class ValueTypeListProxyBase<
  Source extends IntegratedValue,
  Result extends IntegratedValue = Source,
> implements IValueTypeListProxy<Source, Result>
{
  protected _signatureCache: ParsedSignature | null = null;
  private readonly proxyName: string;

  constructor(proxyName: string) {
    this.proxyName = proxyName;
  }

  abstract valueOf(): Array<Source>;
  abstract append(element: Source): iArray<Source, Result>;
  abstract some(
    fn: (value: Source, index: number, array: Source[]) => unknown
  ): iBoolean;
  abstract every(
    fn: (value: Source, index: number, array: Source[]) => unknown
  ): iBoolean;
  abstract map<U extends IntegratedValue>(
    mapOp: Operator<Result, U>
  ): iArray<any, U>;
  abstract filter(
    fn: (value: Source, index: number, array: Source[]) => unknown
  ): iArray<Source, Result>;
  abstract size(): Integer;
  abstract get(index: Integer): Result;
  abstract getOrDefault(index: Integer, backup: Result): Result;
  abstract includes(element: Source): iBoolean;
  abstract concat(arr: iArray<Source, Result>): iArray<Source, Result>;
  abstract slice(start: Integer, end?: Integer): iArrayEager<Result, Result>;
  abstract equals(other: IntegratedValue): iBoolean;
  abstract getSignatureNode(): ParsedSignature;

  isInfinite(): boolean {
    return false;
  }

  getProxyName(): string {
    return this.proxyName;
  }
}

export class ValueTypeListProxyMaterialized<
  T extends IntegratedValue,
> extends ValueTypeListProxyBase<T, T> {
  private readonly list: T[];

  constructor(list: T[]) {
    super("integrateddynamics:materialized");
    this.list = list;
  }

  override valueOf(): T[] {
    return this.list;
  }

  override append(element: T): iArray<T, T> {
    return new ValueTypeListProxyAppend(this, element);
  }

  override some(
    fn: (value: T, index: number, array: T[]) => unknown
  ): iBoolean {
    return new iBoolean(this.list.some(fn));
  }

  override every(
    fn: (value: T, index: number, array: T[]) => unknown
  ): iBoolean {
    return new iBoolean(this.list.every(fn));
  }

  override map<U extends IntegratedValue>(
    mapOp: Operator<T, U>
  ): iArray<any, U> {
    return new iArrayEager(this.list.map((e) => mapOp.apply(e)));
  }

  override filter(
    fn: (value: T, index: number, array: T[]) => unknown
  ): iArray<T, T> {
    return new iArrayEager(this.list.filter(fn));
  }

  override size(): Integer {
    return new Integer(this.list.length);
  }

  override get(index: Integer): T {
    const val = this.list[index.toJSNumber()];
    if (val === undefined) throw new Error("Index out of bounds");
    return val;
  }

  override getOrDefault(index: Integer, backup: T): T {
    const i = index.toJSNumber();
    if (i < 0 || i >= this.list.length) return backup;
    return this.list[i]!;
  }

  override includes(element: T): iBoolean {
    return new iBoolean(this.list.some((e) => e.equals(element).valueOf()));
  }

  override concat(arr: iArray<T, T>): iArray<T, T> {
    return new ValueTypeListProxyConcat(this, arr);
  }

  override slice(start: Integer, end?: Integer): iArrayEager<T, T> {
    return new iArrayEager(
      this.list.slice(start.toJSNumber(), end?.toJSNumber())
    );
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof ValueTypeListProxyMaterialized))
      return new iBoolean(false);
    if (this.list.length !== other.list.length) return new iBoolean(false);
    return new iBoolean(
      this.list.every((e, i) => e.equals(other.list[i]!).valueOf())
    );
  }

  override getSignatureNode(): ParsedSignature {
    if (this._signatureCache) return this._signatureCache;
    const listTypeAst: TypeRawSignatureAST.RawSignatureNode =
      this.list.length > 0
        ? this.list[0]!.getSignatureNode().getAst()
        : { type: "Any", typeID: ParsedSignature.getNewTypeID() };
    this._signatureCache = new ParsedSignature(
      { type: "List", listType: listTypeAst },
      false
    );
    return this._signatureCache;
  }
}

export class ValueTypeListProxyAppend<
  T extends IntegratedValue,
> extends ValueTypeListProxyBase<T, T> {
  public readonly list: iArray<T, T>;
  public readonly value: T;

  constructor(list: iArray<T, T>, value: T) {
    super("integrateddynamics:append");
    this.list = list;
    this.value = value;
  }

  override valueOf(): T[] {
    return [...this.list.valueOf(), this.value];
  }

  override append(element: T): iArray<T, T> {
    return new ValueTypeListProxyAppend(this, element);
  }

  override some(
    fn: (value: T, index: number, array: T[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().some(fn));
  }

  override every(
    fn: (value: T, index: number, array: T[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().every(fn));
  }

  override map<U extends IntegratedValue>(
    mapOp: Operator<T, U>
  ): iArray<any, U> {
    return new iArrayEager(this.valueOf().map((e) => mapOp.apply(e)));
  }

  override filter(
    fn: (value: T, index: number, array: T[]) => unknown
  ): iArray<T, T> {
    return new iArrayEager(this.valueOf().filter(fn));
  }

  override size(): Integer {
    return this.list.size().add(Integer.ONE);
  }

  override get(index: Integer): T {
    const listLength = this.list.size().toJSNumber();
    const i = index.toJSNumber();
    if (i < listLength) {
      return this.list.get(index);
    } else if (i === listLength) {
      return this.value;
    }
    throw new Error("Index out of bounds");
  }

  override getOrDefault(index: Integer, backup: T): T {
    try {
      return this.get(index);
    } catch (e) {
      return backup;
    }
  }

  override includes(element: T): iBoolean {
    return new iBoolean(
      this.list.includes(element).valueOf() ||
        this.value.equals(element).valueOf()
    );
  }

  override concat(arr: iArray<T, T>): iArray<T, T> {
    return new ValueTypeListProxyConcat(this, arr);
  }

  override slice(start: Integer, end?: Integer): iArrayEager<T, T> {
    return new iArrayEager(
      this.valueOf().slice(start.toJSNumber(), end?.toJSNumber())
    );
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof ValueTypeListProxyAppend))
      return new iBoolean(false);
    return new iBoolean(
      this.list.equals(other.list).valueOf() &&
        this.value.equals(other.value).valueOf()
    );
  }

  override getSignatureNode(): ParsedSignature {
    return this.list.getSignatureNode();
  }
}

export class ValueTypeListProxyConcat<
  T extends IntegratedValue,
> extends ValueTypeListProxyBase<T, T> {
  public readonly lists: iArray<T, T>[];

  constructor(...lists: iArray<T, T>[]) {
    super("integrateddynamics:concat");
    this.lists = lists;
  }

  override valueOf(): T[] {
    return this.lists.flatMap((l) => l.valueOf());
  }

  override append(element: T): iArray<T, T> {
    return new ValueTypeListProxyAppend(this, element);
  }

  override some(
    fn: (value: T, index: number, array: T[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().some(fn));
  }

  override every(
    fn: (value: T, index: number, array: T[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().every(fn));
  }

  override map<U extends IntegratedValue>(
    mapOp: Operator<T, U>
  ): iArray<any, U> {
    return new iArrayEager(this.valueOf().map((e) => mapOp.apply(e)));
  }

  override filter(
    fn: (value: T, index: number, array: T[]) => unknown
  ): iArray<T, T> {
    return new iArrayEager(this.valueOf().filter(fn));
  }

  override size(): Integer {
    return this.lists.reduce((acc, l) => acc.add(l.size()), Integer.ZERO);
  }

  override get(index: Integer): T {
    let i = index.toJSNumber();
    for (const list of this.lists) {
      const currentLength = list.size().toJSNumber();
      if (i < currentLength) {
        return list.get(new Integer(i));
      }
      i -= currentLength;
    }
    throw new Error("Index out of bounds");
  }

  override getOrDefault(index: Integer, backup: T): T {
    try {
      return this.get(index);
    } catch (e) {
      return backup;
    }
  }

  override includes(element: T): iBoolean {
    return new iBoolean(this.lists.some((l) => l.includes(element).valueOf()));
  }

  override concat(arr: iArray<T, T>): iArray<T, T> {
    return new ValueTypeListProxyConcat(...this.lists, arr);
  }

  override slice(start: Integer, end?: Integer): iArrayEager<T, T> {
    return new iArrayEager(
      this.valueOf().slice(start.toJSNumber(), end?.toJSNumber())
    );
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof ValueTypeListProxyConcat))
      return new iBoolean(false);
    if (this.lists.length !== other.lists.length) return new iBoolean(false);
    return new iBoolean(
      this.lists.every((l, i) => l.equals(other.lists[i]!).valueOf())
    );
  }

  override getSignatureNode(): ParsedSignature {
    const sig = this.lists[0]?.getSignatureNode();
    if (!sig) throw new Error("Concat proxy has no lists");
    return sig;
  }
}

export class ValueTypeListProxyLazyBuilt<
  T extends IntegratedValue,
> extends ValueTypeListProxyBase<T, T> {
  public readonly initial: T;
  public readonly operator: Operator<T, T>;
  private cache: Map<number, T> = new Map();

  constructor(initial: T, operator: Operator<T, T>) {
    super("integrateddynamics:lazybuilt");
    this.initial = initial;
    this.operator = operator;
    this.cache.set(0, initial);
  }

  override isInfinite(): boolean {
    return true;
  }

  override valueOf(): T[] {
    throw new Error("Cannot materialize infinite list");
  }

  override append(element: T): iArray<T, T> {
    return new ValueTypeListProxyAppend(this, element);
  }

  override some(
    _fn: (value: T, index: number, array: T[]) => unknown
  ): iBoolean {
    throw new Error("Cannot call some on infinite list");
  }

  override every(
    _fn: (value: T, index: number, array: T[]) => unknown
  ): iBoolean {
    throw new Error("Cannot call every on infinite list");
  }

  override map<U extends IntegratedValue>(
    _mapOp: Operator<T, U>
  ): iArray<any, U> {
    throw new Error("Not implemented");
  }

  override filter(
    _fn: (value: T, index: number, array: T[]) => unknown
  ): iArray<T, T> {
    throw new Error("Cannot filter infinite list");
  }

  override size(): Integer {
    return Integer.MAX_INT;
  }

  override get(index: Integer): T {
    const i = index.toJSNumber();
    if (this.cache.has(i)) return this.cache.get(i)!;

    const prev = this.get(index.subtract(Integer.ONE));
    const result = this.operator.apply(prev);
    this.cache.set(i, result);
    return result;
  }

  override getOrDefault(index: Integer, _backup: T): T {
    return this.get(index);
  }

  override includes(_element: T): iBoolean {
    throw new Error("Cannot call includes on infinite list");
  }

  override concat(arr: iArray<T, T>): iArray<T, T> {
    return new ValueTypeListProxyConcat(this, arr);
  }

  override slice(start: Integer, end?: Integer): iArrayEager<T, T> {
    const res: T[] = [];
    const actualEnd = end ? end.toJSNumber() : start.toJSNumber() + 100;
    for (let i = start.toJSNumber(); i < actualEnd; i++) {
      res.push(this.get(new Integer(i)));
    }
    return new iArrayEager(res);
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof ValueTypeListProxyLazyBuilt))
      return new iBoolean(false);
    return new iBoolean(
      this.initial.equals(other.initial).valueOf() &&
        this.operator.equals(other.operator).valueOf()
    );
  }

  override getSignatureNode(): ParsedSignature {
    if (this._signatureCache) return this._signatureCache;
    this._signatureCache = new ParsedSignature(
      { type: "List", listType: this.initial.getSignatureNode().getAst() },
      false
    );
    return this._signatureCache;
  }
}

export class ValueTypeListProxyNbtKeys extends ValueTypeListProxyBase<
  iString,
  iString
> {
  public readonly tag: CompoundTag | null;

  constructor(tag: CompoundTag | null) {
    super("integrateddynamics:nbt.keys");
    this.tag = tag;
  }

  override valueOf(): iString[] {
    return this.tag
      ? Object.keys(this.tag.valueOf()).map((k) => new iString(k))
      : [];
  }

  override append(element: iString): iArray<iString, iString> {
    return new ValueTypeListProxyAppend(this, element);
  }

  override some(
    fn: (value: iString, index: number, array: iString[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().some(fn));
  }

  override every(
    fn: (value: iString, index: number, array: iString[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().every(fn));
  }

  override map<U extends IntegratedValue>(
    mapOp: Operator<iString, U>
  ): iArray<any, U> {
    return new iArrayEager(this.valueOf().map((e) => mapOp.apply(e)));
  }

  override filter(
    fn: (value: iString, index: number, array: iString[]) => unknown
  ): iArray<iString, iString> {
    return new iArrayEager(this.valueOf().filter(fn));
  }

  override size(): Integer {
    return new Integer(this.valueOf().length);
  }

  override get(index: Integer): iString {
    const val = this.valueOf()[index.toJSNumber()];
    if (val === undefined) throw new Error("Index out of bounds");
    return val;
  }

  override getOrDefault(index: Integer, backup: iString): iString {
    const i = index.toJSNumber();
    const vals = this.valueOf();
    if (i < 0 || i >= vals.length) return backup;
    return vals[i]!;
  }

  override includes(element: iString): iBoolean {
    return new iBoolean(
      this.valueOf().some((e) => e.equals(element).valueOf())
    );
  }

  override concat(arr: iArray<iString, iString>): iArray<iString, iString> {
    return new ValueTypeListProxyConcat(this, arr);
  }

  override slice(start: Integer, end?: Integer): iArrayEager<iString, iString> {
    return new iArrayEager(
      this.valueOf().slice(start.toJSNumber(), end?.toJSNumber())
    );
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof ValueTypeListProxyNbtKeys))
      return new iBoolean(false);
    if (!this.tag && !other.tag) return new iBoolean(true);
    if (!this.tag || !other.tag) return new iBoolean(false);
    return this.tag.equals(other.tag);
  }

  override getSignatureNode(): ParsedSignature {
    if (this._signatureCache) return this._signatureCache;
    this._signatureCache = new ParsedSignature(
      { type: "List", listType: { type: "String" } },
      false
    );
    return this._signatureCache;
  }
}

export class ValueTypeListProxyNbtValueListByte extends ValueTypeListProxyBase<
  Integer,
  Integer
> {
  public readonly key: string;
  public readonly tag: CompoundTag | null;

  constructor(key: string, tag: CompoundTag | null) {
    super("integrateddynamics:nbt.list_value_byte");
    this.key = key;
    this.tag = tag;
  }

  private getByteArray(): Integer[] {
    if (!this.tag) return [];
    const t = this.tag.get(new iString(this.key));
    if (t instanceof ByteArrayTag) {
      return t
        .valueOf()
        .valueOf()
        .map((v: Integer) => v);
    }
    return [];
  }

  override valueOf(): Integer[] {
    return this.getByteArray();
  }

  override append(element: Integer): iArray<Integer, Integer> {
    return new ValueTypeListProxyAppend(this, element);
  }

  override some(
    fn: (value: Integer, index: number, array: Integer[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().some(fn));
  }

  override every(
    fn: (value: Integer, index: number, array: Integer[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().every(fn));
  }

  override map<U extends IntegratedValue>(
    mapOp: Operator<Integer, U>
  ): iArray<any, U> {
    return new iArrayEager(this.valueOf().map((e) => mapOp.apply(e)));
  }

  override filter(
    fn: (value: Integer, index: number, array: Integer[]) => unknown
  ): iArray<Integer, Integer> {
    return new iArrayEager(this.valueOf().filter(fn));
  }

  override size(): Integer {
    return new Integer(this.getByteArray().length);
  }

  override get(index: Integer): Integer {
    const val = this.getByteArray()[index.toJSNumber()];
    if (val === undefined) throw new Error("Index out of bounds");
    return val;
  }

  override getOrDefault(index: Integer, backup: Integer): Integer {
    const arr = this.getByteArray();
    const i = index.toJSNumber();
    if (i < 0 || i >= arr.length) return backup;
    return arr[i]!;
  }

  override includes(element: Integer): iBoolean {
    return new iBoolean(
      this.getByteArray().some((b) => b.equals(element).valueOf())
    );
  }

  override concat(arr: iArray<Integer, Integer>): iArray<Integer, Integer> {
    return new ValueTypeListProxyConcat(this, arr);
  }

  override slice(start: Integer, end?: Integer): iArrayEager<Integer, Integer> {
    return new iArrayEager(
      this.valueOf().slice(start.toJSNumber(), end?.toJSNumber())
    );
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof ValueTypeListProxyNbtValueListByte))
      return new iBoolean(false);
    if (this.key !== other.key) return new iBoolean(false);
    if (!this.tag && !other.tag) return new iBoolean(true);
    if (!this.tag || !other.tag) return new iBoolean(false);
    return this.tag.equals(other.tag);
  }

  override getSignatureNode(): ParsedSignature {
    if (this._signatureCache) return this._signatureCache;
    this._signatureCache = new ParsedSignature(
      { type: "List", listType: { type: "Integer" } },
      false
    );
    return this._signatureCache;
  }
}

export class ValueTypeListProxyNbtValueListInt extends ValueTypeListProxyBase<
  Integer,
  Integer
> {
  public readonly key: string;
  public readonly tag: CompoundTag | null;

  constructor(key: string, tag: CompoundTag | null) {
    super("integrateddynamics:nbt.list_value_int");
    this.key = key;
    this.tag = tag;
  }

  private getIntArray(): Integer[] {
    if (!this.tag) return [];
    const t = this.tag.get(new iString(this.key));
    if (t instanceof IntArrayTag) {
      return t
        .valueOf()
        .valueOf()
        .map((v: Integer) => v);
    }
    return [];
  }

  override valueOf(): Integer[] {
    return this.getIntArray();
  }

  override append(element: Integer): iArray<Integer, Integer> {
    return new ValueTypeListProxyAppend(this, element);
  }

  override some(
    fn: (value: Integer, index: number, array: Integer[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().some(fn));
  }

  override every(
    fn: (value: Integer, index: number, array: Integer[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().every(fn));
  }

  override map<U extends IntegratedValue>(
    mapOp: Operator<Integer, U>
  ): iArray<any, U> {
    return new iArrayEager(this.valueOf().map((e) => mapOp.apply(e)));
  }

  override filter(
    fn: (value: Integer, index: number, array: Integer[]) => unknown
  ): iArray<Integer, Integer> {
    return new iArrayEager(this.valueOf().filter(fn));
  }

  override size(): Integer {
    return new Integer(this.getIntArray().length);
  }

  override get(index: Integer): Integer {
    const val = this.getIntArray()[index.toJSNumber()];
    if (val === undefined) throw new Error("Index out of bounds");
    return val;
  }

  override getOrDefault(index: Integer, backup: Integer): Integer {
    const arr = this.getIntArray();
    const i = index.toJSNumber();
    if (i < 0 || i >= arr.length) return backup;
    return arr[i]!;
  }

  override includes(element: Integer): iBoolean {
    return new iBoolean(
      this.getIntArray().some((i) => i.equals(element).valueOf())
    );
  }

  override concat(arr: iArray<Integer, Integer>): iArray<Integer, Integer> {
    return new ValueTypeListProxyConcat(this, arr);
  }

  override slice(start: Integer, end?: Integer): iArrayEager<Integer, Integer> {
    return new iArrayEager(
      this.valueOf().slice(start.toJSNumber(), end?.toJSNumber())
    );
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof ValueTypeListProxyNbtValueListInt))
      return new iBoolean(false);
    if (this.key !== other.key) return new iBoolean(false);
    if (!this.tag && !other.tag) return new iBoolean(true);
    if (!this.tag || !other.tag) return new iBoolean(false);
    return this.tag.equals(other.tag);
  }

  override getSignatureNode(): ParsedSignature {
    if (this._signatureCache) return this._signatureCache;
    this._signatureCache = new ParsedSignature(
      { type: "List", listType: { type: "Integer" } },
      false
    );
    return this._signatureCache;
  }
}

export class ValueTypeListProxyNbtValueListTag extends ValueTypeListProxyBase<
  Tag<any>,
  Tag<any>
> {
  public readonly key: string;
  public readonly tag: CompoundTag | null;

  constructor(key: string, tag: CompoundTag | null) {
    super("integrateddynamics:nbt.list_value_tag");
    this.key = key;
    this.tag = tag;
  }

  private getListTag(): Tag<any>[] {
    if (!this.tag) return [];
    const t = this.tag.get(new iString(this.key));
    if (t instanceof ListTag) {
      return t
        .valueOf()
        .valueOf()
        .map((v: Tag<any>) => v);
    }
    return [];
  }

  override valueOf(): Tag<any>[] {
    return this.getListTag();
  }

  override append(element: Tag<any>): iArray<Tag<any>, Tag<any>> {
    return new ValueTypeListProxyAppend(this, element);
  }

  override some(
    fn: (value: Tag<any>, index: number, array: Tag<any>[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().some(fn));
  }

  override every(
    fn: (value: Tag<any>, index: number, array: Tag<any>[]) => unknown
  ): iBoolean {
    return new iBoolean(this.valueOf().every(fn));
  }

  override map<U extends IntegratedValue>(
    mapOp: Operator<Tag<any>, U>
  ): iArray<any, U> {
    return new iArrayEager(this.valueOf().map((e) => mapOp.apply(e)));
  }

  override filter(
    fn: (value: Tag<any>, index: number, array: Tag<any>[]) => unknown
  ): iArray<Tag<any>, Tag<any>> {
    return new iArrayEager(this.valueOf().filter(fn));
  }

  override size(): Integer {
    return new Integer(this.getListTag().length);
  }

  override get(index: Integer): Tag<any> {
    const val = this.getListTag()[index.toJSNumber()];
    if (val === undefined) throw new Error("Index out of bounds");
    return val;
  }

  override getOrDefault(index: Integer, backup: Tag<any>): Tag<any> {
    const arr = this.getListTag();
    const i = index.toJSNumber();
    if (i < 0 || i >= arr.length) return backup;
    return arr[i]!;
  }

  override includes(element: Tag<any>): iBoolean {
    return new iBoolean(
      this.valueOf().some((e) => e.equals(element).valueOf())
    );
  }

  override concat(arr: iArray<Tag<any>, Tag<any>>): iArray<Tag<any>, Tag<any>> {
    return new ValueTypeListProxyConcat(this, arr);
  }

  override slice(
    start: Integer,
    end?: Integer
  ): iArrayEager<Tag<any>, Tag<any>> {
    return new iArrayEager(
      this.valueOf().slice(start.toJSNumber(), end?.toJSNumber())
    );
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof ValueTypeListProxyNbtValueListTag))
      return new iBoolean(false);
    if (this.key !== other.key) return new iBoolean(false);
    if (!this.tag && !other.tag) return new iBoolean(true);
    if (!this.tag || !other.tag) return new iBoolean(false);
    return this.tag.equals(other.tag);
  }

  override getSignatureNode(): ParsedSignature {
    if (this._signatureCache) return this._signatureCache;
    this._signatureCache = new ParsedSignature(
      {
        type: "List",
        listType: { type: "Any", typeID: ParsedSignature.getNewTypeID() },
      },
      false
    );
    return this._signatureCache;
  }
}

export class ValueTypeListProxyOperatorMapped<
  I extends IntegratedValue,
  O extends IntegratedValue,
> extends ValueTypeListProxyBase<I, O> {
  public readonly operator: Operator<I, O>;
  public readonly listProxy: iArray<I, I>;

  constructor(operator: Operator<I, O>, listProxy: iArray<I, I>) {
    super("integrateddynamics:mapped");
    this.operator = operator;
    this.listProxy = listProxy;
  }

  override valueOf(): I[] {
    return this.listProxy.valueOf();
  }

  override append(_element: I): iArray<I, O> {
    throw new Error("Append not supported on Mapped proxy");
  }

  override some(
    fn: (value: I, index: number, array: I[]) => unknown
  ): iBoolean {
    return new iBoolean(this.listProxy.valueOf().some(fn));
  }

  override every(
    fn: (value: I, index: number, array: I[]) => unknown
  ): iBoolean {
    return new iBoolean(this.listProxy.valueOf().every(fn));
  }

  override map<U extends IntegratedValue>(
    mapOp: Operator<O, U>
  ): iArray<any, U> {
    return new iArrayEager(
      this.listProxy.valueOf().map((e) => mapOp.apply(this.operator.apply(e)))
    );
  }

  override filter(
    fn: (value: I, index: number, array: I[]) => unknown
  ): iArray<I, O> {
    return new iArrayEager(
      this.listProxy.valueOf().filter(fn)
    ) as unknown as iArray<I, O>;
  }

  override size(): Integer {
    return this.listProxy.size();
  }

  override get(index: Integer): O {
    return this.operator.apply(this.listProxy.get(index));
  }

  override getOrDefault(index: Integer, backup: O): O {
    try {
      return this.get(index);
    } catch (e) {
      return backup;
    }
  }

  override includes(element: I): iBoolean {
    return new iBoolean(
      this.listProxy.valueOf().some((e) => e.equals(element).valueOf())
    );
  }

  override concat(_arr: iArray<I, O>): iArray<I, O> {
    throw new Error("Concat not supported on Mapped proxy");
  }

  override slice(start: Integer, end?: Integer): iArrayEager<O, O> {
    const vals = this.listProxy
      .valueOf()
      .slice(start.toJSNumber(), end?.toJSNumber());
    return new iArrayEager(vals.map((v) => this.operator.apply(v)));
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof ValueTypeListProxyOperatorMapped))
      return new iBoolean(false);
    return new iBoolean(
      this.operator.equals(other.operator).valueOf() &&
        this.listProxy.equals(other.listProxy).valueOf()
    );
  }

  override getSignatureNode(): ParsedSignature {
    if (this._signatureCache) return this._signatureCache;
    this._signatureCache = new ParsedSignature(
      {
        type: "List",
        listType: { type: "Any", typeID: ParsedSignature.getNewTypeID() },
      },
      false
    );
    return this._signatureCache;
  }
}

export interface IValueTypeListProxyFactory<
  P extends IValueTypeListProxy<any, any>,
> {
  getName(): string;
  serialize(proxy: P): Tag<any>;
  deserialize(serialized: Tag<any>): P;
}

export class ValueTypeListProxyFactories {
  public static readonly REGISTRY: Map<
    string,
    IValueTypeListProxyFactory<any>
  > = new Map();

  public static load() {
    this.REGISTRY.set("integrateddynamics:materialized", {
      getName: () => "integrateddynamics:materialized",
      serialize: (proxy: ValueTypeListProxyMaterialized<any>) => {
        const values = proxy.valueOf();
        const valueType =
          values.length > 0
            ? ValueHelpers.getTypeName(values[0])
            : "integrateddynamics:any";
        return new CompoundTag({
          valueType: new StringTag(new iString(valueType)),
          values: new ListTag(
            new iArrayEager(values.map((v) => ValueHelpers.serializeRaw(v)))
          ),
        });
      },
      deserialize: (serialized: Tag<any>) => {
        if (!(serialized instanceof CompoundTag)) {
          return new ValueTypeListProxyMaterialized([]);
        }
        const compound = serialized as CompoundTag;
        const valueTypeNode = compound.get(new iString("valueType"));
        const valueTypeName =
          valueTypeNode instanceof StringTag
            ? valueTypeNode.valueOf().valueOf()
            : "integrateddynamics:any";
        const listNode = compound.get(new iString("values"));
        if (!(listNode instanceof ListTag)) {
          return new ValueTypeListProxyMaterialized([]);
        }
        const list = listNode
          .valueOf()
          .valueOf()
          .map((t) => ValueHelpers.deserializeRaw(valueTypeName, t));
        return new ValueTypeListProxyMaterialized(list);
      },
    });

    this.REGISTRY.set("integrateddynamics:append", {
      getName: () => "integrateddynamics:append",
      serialize: (proxy: ValueTypeListProxyAppend<any>) => {
        return new CompoundTag({
          valueType: new StringTag(
            new iString(ValueHelpers.getTypeName(proxy.value))
          ),
          value: ValueHelpers.serializeRaw(proxy.value),
          sublist: ValueTypeListProxyFactories.serialize(proxy.list as any),
        });
      },
      deserialize: (serialized: Tag<any>) => {
        if (!(serialized instanceof CompoundTag)) {
          return new ValueTypeListProxyAppend(
            new ValueTypeListProxyMaterialized([]),
            new iBoolean(false)
          );
        }
        const compound = serialized as CompoundTag;
        const valueTypeNode = compound.get(new iString("valueType"));
        const valueTypeName =
          valueTypeNode instanceof StringTag
            ? valueTypeNode.valueOf().valueOf()
            : "integrateddynamics:any";
        const valueNode = compound.get(new iString("value"));
        const sublistNode = compound.get(new iString("sublist"));
        return new ValueTypeListProxyAppend(
          ValueTypeListProxyFactories.deserialize(sublistNode),
          ValueHelpers.deserializeRaw(valueTypeName, valueNode)
        );
      },
    });

    this.REGISTRY.set("integrateddynamics:concat", {
      getName: () => "integrateddynamics:concat",
      serialize: (proxy: ValueTypeListProxyConcat<any>) => {
        return new ListTag(
          new iArrayEager(
            proxy.lists.map((l: any) =>
              ValueTypeListProxyFactories.serialize(l)
            )
          )
        );
      },
      deserialize: (serialized: Tag<any>) => {
        if (!(serialized instanceof ListTag)) {
          return new ValueTypeListProxyConcat();
        }
        const listTag = serialized as ListTag;
        const lists = listTag
          .valueOf()
          .valueOf()
          .map((t) => ValueTypeListProxyFactories.deserialize(t));
        return new ValueTypeListProxyConcat(...lists);
      },
    });

    this.REGISTRY.set("integrateddynamics:lazybuilt", {
      getName: () => "integrateddynamics:lazybuilt",
      serialize: (proxy: ValueTypeListProxyLazyBuilt<any>) => {
        return new CompoundTag({
          valueType: new StringTag(
            new iString(ValueHelpers.getTypeName(proxy.initial))
          ),
          initial: ValueHelpers.serializeRaw(proxy.initial),
          operator: (proxy.operator as any).serializeNBT(),
        });
      },
      deserialize: (serialized: Tag<any>) => {
        if (!(serialized instanceof CompoundTag)) {
          throw new Error("Cannot deserialize lazybuilt: not a CompoundTag");
        }
        const compound = serialized as CompoundTag;
        const valueTypeNode = compound.get(new iString("valueType"));
        const valueTypeName =
          valueTypeNode instanceof StringTag
            ? valueTypeNode.valueOf().valueOf()
            : "integrateddynamics:any";
        const initialNode = compound.get(new iString("initial"));
        const operatorNode = compound.get(new iString("operator"));
        return new ValueTypeListProxyLazyBuilt(
          ValueHelpers.deserializeRaw(valueTypeName, initialNode),
          BaseOperator.deserializeNBT(operatorNode)
        );
      },
    });

    this.REGISTRY.set("integrateddynamics:nbt.keys", {
      getName: () => "integrateddynamics:nbt.keys",
      serialize: (proxy: ValueTypeListProxyNbtKeys) => {
        return proxy.tag || new NullTag();
      },
      deserialize: (serialized: Tag<any>) => {
        return new ValueTypeListProxyNbtKeys(
          serialized instanceof CompoundTag ? serialized : null
        );
      },
    });

    this.REGISTRY.set("integrateddynamics:nbt.list_value_byte", {
      getName: () => "integrateddynamics:nbt.list_value_byte",
      serialize: (proxy: ValueTypeListProxyNbtValueListByte) => {
        return new CompoundTag({
          key: new StringTag(new iString(proxy.key)),
          tag: proxy.tag || new NullTag(),
        });
      },
      deserialize: (serialized: CompoundTag) => {
        const keyNode = serialized.get(new iString("key"));
        const key =
          keyNode instanceof StringTag ? keyNode.valueOf().valueOf() : "";
        const tag = serialized.get(new iString("tag"));
        return new ValueTypeListProxyNbtValueListByte(
          key,
          tag instanceof CompoundTag ? tag : null
        );
      },
    });

    this.REGISTRY.set("integrateddynamics:nbt.list_value_int", {
      getName: () => "integrateddynamics:nbt.list_value_int",
      serialize: (proxy: ValueTypeListProxyNbtValueListInt) => {
        return new CompoundTag({
          key: new StringTag(new iString(proxy.key)),
          tag: proxy.tag || new NullTag(),
        });
      },
      deserialize: (serialized: CompoundTag) => {
        const keyNode = serialized.get(new iString("key"));
        const key =
          keyNode instanceof StringTag ? keyNode.valueOf().valueOf() : "";
        const tag = serialized.get(new iString("tag"));
        return new ValueTypeListProxyNbtValueListInt(
          key,
          tag instanceof CompoundTag ? tag : null
        );
      },
    });

    this.REGISTRY.set("integrateddynamics:nbt.list_value_tag", {
      getName: () => "integrateddynamics:nbt.list_value_tag",
      serialize: (proxy: ValueTypeListProxyNbtValueListTag) => {
        return new CompoundTag({
          key: new StringTag(new iString(proxy.key)),
          tag: proxy.tag || new NullTag(),
        });
      },
      deserialize: (serialized: CompoundTag) => {
        const keyNode = serialized.get(new iString("key"));
        const key =
          keyNode instanceof StringTag ? keyNode.valueOf().valueOf() : "";
        const tag = serialized.get(new iString("tag"));
        return new ValueTypeListProxyNbtValueListTag(
          key,
          tag instanceof CompoundTag ? tag : null
        );
      },
    });

    this.REGISTRY.set("integrateddynamics:mapped", {
      getName: () => "integrateddynamics:mapped",
      serialize: (proxy: ValueTypeListProxyOperatorMapped<any, any>) => {
        return new CompoundTag({
          operator: (proxy.operator as any).serializeNBT(),
          sublist: ValueTypeListProxyFactories.serialize(
            proxy.listProxy as any
          ),
        });
      },
      deserialize: (serialized: Tag<any>) => {
        if (!(serialized instanceof CompoundTag)) {
          throw new Error("Cannot deserialize mapped: not a CompoundTag");
        }
        const compound = serialized as CompoundTag;
        const operatorNode = compound.get(new iString("operator"));
        const sublistNode = compound.get(new iString("sublist"));
        return new ValueTypeListProxyOperatorMapped(
          BaseOperator.deserializeNBT(operatorNode),
          ValueTypeListProxyFactories.deserialize(sublistNode)
        );
      },
    });
  }

  public static serialize(proxy: IValueTypeListProxy<any, any>): Tag<any> {
    const name = proxy.getProxyName();
    const factory = this.REGISTRY.get(name);
    if (!factory) {
      throw new Error(
        `No serialization factory exists for the list proxy type name '${name}'.`
      );
    }
    const serialized = factory.serialize(proxy);
    return new CompoundTag({
      proxyName: new StringTag(new iString(name)),
      serialized: serialized,
    });
  }

  public static deserialize(value: Tag<any>): IValueTypeListProxy<any, any> {
    if (!(value instanceof CompoundTag)) {
      throw new Error("Could not deserialize list proxy: not a CompoundTag");
    }
    const nameNode = value.get(new iString("proxyName"));
    if (!(nameNode instanceof StringTag))
      throw new Error("proxyName missing or not a string");
    const name = nameNode.valueOf().valueOf();

    const actualValue = value.get(new iString("serialized"));
    const factory = this.REGISTRY.get(name);
    if (!factory) {
      throw new Error(
        `No deserialization factory exists for the list proxy type name '${name}'.`
      );
    }
    return factory.deserialize(actualValue);
  }
}
