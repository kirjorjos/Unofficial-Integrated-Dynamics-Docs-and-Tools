export const LAZY_FORCE: unique symbol = Symbol("lazyForce");

export function lazyValue<V extends IntegratedValue>(producer: () => V): V {
  let cachedValue: V | null = null;

  const proxy = new Proxy({} as V, {
    get(_target, prop) {
      if (prop === LAZY_FORCE) {
        return (): V => {
          if (cachedValue === null) {
            cachedValue = producer();
          }
          return cachedValue;
        };
      }

      // Force-evaluate on first property access
      if (cachedValue === null) {
        cachedValue = producer();
      }

      const raw: any = cachedValue;
      const propValue = raw[prop];

      // Special handling for Symbol.toPrimitive and valueOf
      if (typeof propValue === "function") {
        return propValue.bind(cachedValue);
      }

      return propValue;
    },

    has(_target, prop) {
      if (cachedValue === null) {
        cachedValue = producer();
      }
      const raw: any = cachedValue;
      return prop in raw;
    },

    ownKeys() {
      if (cachedValue === null) {
        cachedValue = producer();
      }
      const raw: any = cachedValue;
      return Reflect.ownKeys(raw);
    },

    getOwnPropertyDescriptor(_target, prop) {
      if (cachedValue === null) {
        cachedValue = producer();
      }
      const raw: any = cachedValue;
      return Object.getOwnPropertyDescriptor(raw, prop) ?? undefined;
    },
  });

  return proxy;
}

export function forceValue<V extends IntegratedValue>(val: V): V {
  const raw: any = val;
  const forceFn = raw[LAZY_FORCE];
  if (typeof forceFn === "function") {
    return forceFn();
  }
  return val;
}
