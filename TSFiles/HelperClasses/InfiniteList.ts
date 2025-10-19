export class InfiniteList<T> extends Array<T> {
  transforms: Array<TypeLambda<any, any>> = [];

  constructor(
    public initial: T,
    public func: TypeLambda<T, T>
  ) {
    super();
    super.push(initial);

    return new Proxy(this, {
      get: (target, prop, receiver) => {
        if (typeof prop === "string" && !isNaN(Number(prop))) {
          const index = Number(prop);
          return InfiniteList.lazyAt(target, index, func, receiver.transforms);
        }

        if (prop === Symbol.iterator) {
          return function* () {
            let index = 0;
            while (true) {
              yield InfiniteList.lazyAt(
                target,
                index++,
                func,
                receiver.transforms
              );
            }
          };
        }

        if (prop === "map") {
          return (fn: TypeLambda<any, any>) => {
            const newList = new InfiniteList(initial, func);
            for (let i = 0; i < target.length; i++) {
              (newList as any)[i] = target[i];
            }
            newList.transforms = [...receiver.transforms, fn];
            return newList;
          };
        }

        if (prop === "slice") {
          return (start?: number, end?: number) => {
            const s = start ?? 0;
            const e = end ?? target.length;
            const result: any[] = [];
            for (let i = s; i < e; i++) {
              result.push(
                InfiniteList.lazyAt(target, i, func, receiver.transforms)
              );
            }
            return result;
          };
        }

        const value = Reflect.get(target, prop, receiver);
        return typeof value === "function" ? value.bind(target) : value;
      },
    }) as unknown as InfiniteList<T>;
  }

  private static lazyAt<T>(
    target: T[],
    index: number,
    func: TypeLambda<T, T>,
    transforms: Array<TypeLambda<any, any>>
  ): T {
    if (index < 0) throw new RangeError("Index must be >= 0");

    while (target.length <= index) {
      const prev = target[target.length - 1];
      target.push(func(prev as T));
    }

    let value = target[index];
    for (const f of transforms) {
      value = f(value);
    }
    return value as T;
  }

  take(n: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < n; i++) {
      result.push((this as any)[i]);
    }
    return result;
  }
}
