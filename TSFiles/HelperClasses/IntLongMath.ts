import { JavaMath } from "./Math";

export namespace IntLongMath {
  export function add<T extends Integer | Long>(num1: T, num2: T): T {
    let temp = num1.getBits();
    type workingType = typeof temp;
    let a = [...temp] as workingType;
    let b = [...num2.getBits()] as workingType;

    const result = JavaMath.bitwiseAdd(a, b);

    const classConstructor = num1.constructor as { new (bits: workingType): T };
    return new classConstructor(result);
  }

  export function subtract<T extends Integer | Long>(num1: T, num2: T): T {
    let temp = num1.getBits();
    type workingType = typeof temp;
    const length = temp.length;
    let a = [...temp] as workingType;
    let b = [...num2.getBits()] as workingType;

    b = b.map((x: number) => x ^ 1) as workingType;
    b = JavaMath.bitwiseAdd(b, [
      ...Array(length - 1).fill(0),
      1,
    ] as workingType);

    const classConstructor = num1.constructor as { new (bits: workingType): T };
    return new classConstructor(JavaMath.bitwiseAdd(a, b));
  }

  // Booth's algorithm
  export function multiply<T extends Integer | Long>(num1: T, num2: T): T {
    let temp = num1.getBits();
    type workingType = typeof temp;
    const length = temp.length;
    let a = [...temp] as workingType;
    let b = [...num2.getBits()] as workingType;
    const sign = a[0] ^ b[0];

    if (a[0]) {
      a = a.map((x) => (x ^ 1) as TypeBit) as workingType;
      a = JavaMath.bitwiseAdd(a, [
        ...Array(length - 1).fill(0),
        1,
      ] as workingType);
    }
    if (b[0]) {
      b = b.map((x) => (x ^ 1) as TypeBit) as workingType;
      b = JavaMath.bitwiseAdd(b, [
        ...Array(length - 1).fill(0),
        1,
      ] as workingType);
    }

    let result = new Array(length * 2).fill(0) as Exclude<
      [...workingType, ...workingType],
      [...TypeInt32, ...TypeInt64]
    >;
    for (let i = length - 1; i >= 0; i--) {
      if (b[i]) {
        result = JavaMath.bitwiseAdd(
          result,
          JavaMath.leftShift(
            [...Array(length).fill(a[0]), ...a] as Exclude<
              [...workingType, ...workingType],
              [...TypeInt32, ...TypeInt64]
            >,
            length - 1 - i
          )
        );
      }
    }

    if (sign) {
      result = result.map((x) => (x ^ 1) as TypeBit) as Exclude<
        [...workingType, ...workingType],
        [...TypeInt32, ...TypeInt64]
      >;
      result = JavaMath.bitwiseAdd(result, [
        ...Array(length * 2 - 1).fill(0),
        1,
      ] as Exclude<
        [...workingType, ...workingType],
        [...TypeInt32, ...TypeInt64]
      >);
    }

    const classConstructor = num1.constructor as {
      new (
        bits: Exclude<
          [...workingType, ...workingType],
          [...TypeInt32, ...TypeInt64]
        >
      ): T;
    };
    return new classConstructor(result);
  }

  export function divide<T extends Integer | Long>(num1: T, num2: T): T {
    let temp = num1.getBits();
    type workingType = typeof temp;
    const length = temp.length;
    let a = [...temp] as workingType;
    let b = [...num2.getBits()] as workingType;
    const sign = a[0] ^ b[0];

    if (a[0]) {
      a = a.map((x) => (x ^ 1) as TypeBit) as workingType;
      a = JavaMath.bitwiseAdd(a, [
        ...Array(length - 1).fill(0),
        1,
      ] as workingType);
    }
    if (b[0]) {
      b = b.map((x) => (x ^ 1) as TypeBit) as workingType;
      b = JavaMath.bitwiseAdd(b, [
        ...Array(length - 1).fill(0),
        1,
      ] as workingType);
    }

    let quotient = new Array(length).fill(0) as workingType;
    let remainder = new Array(length).fill(0) as workingType;

    for (let i = 0; i < length; i++) {
      remainder = JavaMath.leftShift(remainder, 1);
      remainder[length - 1] = a[i] as TypeBit;

      let tempB = b.map((x) => x ^ 1) as workingType;
      tempB = JavaMath.bitwiseAdd(tempB, [
        ...Array(length - 1).fill(0),
        1,
      ] as workingType);
      let temp = JavaMath.bitwiseAdd(remainder, tempB);

      if (temp[0]) {
        quotient[i] = 0;
      } else {
        quotient[i] = 1;
        remainder = temp;
      }
    }

    if (sign) {
      quotient = quotient.map((x) => (x ^ 1) as TypeBit) as workingType;
      quotient = JavaMath.bitwiseAdd(quotient, [
        ...Array(length - 1).fill(0),
        1,
      ] as workingType);
    }

    const classConstructor = num1.constructor as { new (bits: workingType): T };
    return new classConstructor(quotient);
  }

  export function mod<T extends Integer | Long>(num1: T, num2: T): T {
    const quotient = divide(num1, num2);
    const product = multiply(num2, quotient);
    return subtract(num1, product);
  }

  export function binaryAnd<T extends Integer | Long>(num1: T, num2: T): T {
    let temp = num1.getBits();
    type workingType = typeof temp;
    const length = temp.length;
    let a = [...temp] as workingType;
    let b = [...num2.getBits()] as workingType;

    let result = new Array(length).fill(0) as workingType;
    for (let i = 0; i < length; i++) {
      result[i] = (a[i]! & b[i]!) as TypeBit;
    }
    const classConstructor = num1.constructor as { new (bits: workingType): T };
    return new classConstructor(result);
  }

  export function binaryOr<T extends Integer | Long>(num1: T, num2: T): T {
    let temp = num1.getBits();
    type workingType = typeof temp;
    const length = temp.length;
    let a = [...temp] as workingType;
    let b = [...num2.getBits()] as workingType;

    let result = new Array(length).fill(0) as workingType;
    for (let i = 0; i < length; i++) {
      result[i] = (a[i]! | b[i]!) as TypeBit;
    }
    const classConstructor = num1.constructor as { new (bits: workingType): T };
    return new classConstructor(result);
  }

  export function binaryXor<T extends Integer | Long>(num1: T, num2: T): T {
    let temp = num1.getBits();
    type workingType = typeof temp;
    const length = temp.length;
    let a = [...temp] as workingType;
    let b = [...num2.getBits()] as workingType;

    let result = new Array(length).fill(0) as workingType;
    for (let i = 0; i < length; i++) {
      result[i] = (a[i]! ^ b[i]!) as TypeBit;
    }
    const classConstructor = num1.constructor as { new (bits: workingType): T };
    return new classConstructor(result);
  }

  export function binaryComplement<T extends Integer | Long>(num: T): T {
    let temp = num.getBits();
    type workingType = typeof temp;
    const length = temp.length;
    let a = [...temp] as workingType;

    let result = new Array(length).fill(0) as workingType;
    for (let i = 0; i < length; i++) {
      result[i] = (a[i]! ^ 1) as TypeBit;
    }

    const classConstructor = num.constructor as { new (bits: workingType): T };
    return new classConstructor(result);
  }

  export function rightShift<T extends Integer | Long>(
    num: T,
    places: Integer
  ): T {
    const bits = num.getBits();
    type workingType = typeof bits;
    const sign = bits[0];
    let result = unsignedRightShift(bits, places);
    result[0] = sign;

    const classConstructor = num.constructor as { new (bits: workingType): T };
    return new classConstructor(result);
  }

  export function unsignedRightShift<T extends TypeInt32 | TypeInt64>(
    bits: T,
    places: Integer
  ): T {
    return [...bits, ...Array(places.toJSNumber()).fill(0)].slice(
      -bits.length
    ) as T;
  }

  export function lt<T extends Integer | Long>(num1: T, num2: T): boolean {
    const a = num1.getBits();
    const b = num2.getBits();
    if (a[0] !== b[0]) {
      if (a[0]) return true;
      return false;
    }
    for (let i = 1; i < a.length; i++) {
      if (a[i] !== b[i]) {
        if (a[i]) return false;
        return true;
      }
    }
    return false;
  }

  export function gt<T extends Integer | Long>(num1: T, num2: T): boolean {
    return lt(num2, num1);
  }

  export function gte<T extends Integer | Long>(num1: T, num2: T): boolean {
    return JavaMath.equals(num1, num2) || lt(num2, num1);
  }

  export function lte<T extends Integer | Long>(num1: T, num2: T): boolean {
    return JavaMath.equals(num1, num2) || lt(num1, num2);
  }
}
