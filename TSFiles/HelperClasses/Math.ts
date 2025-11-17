export namespace JavaMath {
  const bitMap32 = [
    "1073741824",
    "536870912",
    "268435456",
    "134217728",
    "67108864",
    "33554432",
    "16777216",
    "8388608",
    "4194304",
    "2097152",
    "1048576",
    "524288",
    "262144",
    "131072",
    "65536",
    "32768",
    "16384",
    "8192",
    "4096",
    "2048",
    "1024",
    "512",
    "256",
    "128",
    "64",
    "32",
    "16",
    "8",
    "4",
    "2",
    "1",
  ];
  const bitMap64 = [
    "4611686018427387904",
    "2305843009213693952",
    "1152921504606846976",
    "576460752303423488",
    "288230376151711744",
    "144115188075855872",
    "72057594037927936",
    "36028797018963968",
    "18014398509481984",
    "9007199254740992",
    "4503599627370496",
    "2251799813685248",
    "1125899906842624",
    "562949953421312",
    "281474976710656",
    "140737488355328",
    "70368744177664",
    "35184372088832",
    "17592186044416",
    "8796093022208",
    "4398046511104",
    "2199023255552",
    "1099511627776",
    "549755813888",
    "274877906944",
    "137438953472",
    "68719476736",
    "34359738368",
    "17179869184",
    "8589934592",
    "4294967296",
    "2147483648",
    "1073741824",
    "536870912",
    "268435456",
    "134217728",
    "67108864",
    "33554432",
    "16777216",
    "8388608",
    "4194304",
    "2097152",
    "1048576",
    "524288",
    "262144",
    "131072",
    "65536",
    "32768",
    "16384",
    "8192",
    "4096",
    "2048",
    "1024",
    "512",
    "256",
    "128",
    "64",
    "32",
    "16",
    "8",
    "4",
    "2",
    "1",
  ];
  type methodList = [
    "add",
    "subtract",
    "multiply",
    "divide",
    "max",
    "min",
    "mod",
    "gt",
    "lt",
    "gte",
    "lte",
    "equals",
  ];

  function stringGt(a: TypeNumericString, b: TypeNumericString): boolean {
    const maxLength = Math.max(a.length, b.length);
    a = a.padStart(maxLength, "0") as TypeNumericString;
    b = b.padStart(maxLength, "0") as TypeNumericString;
    for (let i = 0; i < maxLength; i++) {
      if (parseInt(a[i]!) > parseInt(b[i]!)) return true;
      else if (a[i] === b[i]) continue;
      else return false;
    }
    return false; // a === b
  }

  function stringAdd(
    a: TypeNumericString,
    b: TypeNumericString
  ): TypeNumericString {
    const maxLength = Math.max(a.length, b.length);
    a = a.padStart(maxLength, "0") as TypeNumericString;
    b = b.padStart(maxLength, "0") as TypeNumericString;
    let arrA = a.split("").reverse();
    let arrB = b.split("").reverse();
    let result = [];
    let carry = 0;

    for (let i = 0; i < maxLength; i++) {
      let digit1 = parseInt(arrA[i]!);
      let digit2 = parseInt(arrB[i]!);

      let sum = digit1 + digit2 + carry;
      carry = Math.floor(sum / 10);
      result.push(`${sum % 10}`);
    }
    return result.reverse().join("") as TypeNumericString;
  }

  export function decimalToBinary(
    decimal: TypeNumericString,
    length: 32 | 64
  ): TypeInt32 | TypeInt64 {
    let bits = new Array(length).fill(0) as TypeInt32 | TypeInt64;
    let abs = decimal;
    if (decimal.startsWith("-")) abs = decimal.slice(1) as TypeNumericString;
    let runningTotal = "0" as TypeNumericString;
    for (const [index, value] of (length === 32
      ? bitMap32
      : bitMap64
    ).entries()) {
      let oldTotal = runningTotal;
      if (stringGt(value as TypeNumericString, abs)) {
        bits[index + 1] = 0;
      } else {
        runningTotal = stringAdd(runningTotal, value as TypeNumericString);
        if (!stringGt(runningTotal, abs)) {
          bits[index + 1] = 1;
        } else {
          bits[index + 1] = 0;
          runningTotal = oldTotal;
        }
      }
    }
    if (decimal.startsWith("-")) {
      for (let i = 0; i < bits.length; i++) {
        bits[i] = (bits[i]! ^ 1) as TypeBit;
      }
      bits = bitwiseAdd(
        bits,
        "1"
          .padStart(length, "0")
          .split("")
          .map((str) => parseInt(str) as TypeBit) as TypeInt32 | TypeInt64
      );
    }
    return bits;
  }

  export function bitwiseAdd<T extends TypeInt32 | TypeInt64 | TypeInt128>(
    a: T,
    b: T
  ): T {
    const result: TypeBit[] = new Array(a.length).fill(0);

    let carry = 0;
    for (let i = a.length - 1; i >= 0; i--) {
      const sum = (a[i] as TypeBit) + (b[i] as TypeBit) + carry;
      result[i] = (sum & 1) as TypeBit;
      carry = sum >> 1;
    }

    return result as T;
  }

  export function toDecimal(bits: TypeInt32 | TypeInt64): TypeNumericString {
    bits = [...bits]; // dereference bits
    const isMinValue = bits[0] && !bits.slice(1).includes(1);
    if (isMinValue)
      return (
        bits.length === 64 ? "-9223372036854775808" : "-2147483648"
      ) as TypeNumericString;
    if (bits[0]) {
      for (let i = 0; i < bits.length; i++) {
        bits[i] = (bits[i]! ^ 1) as TypeBit;
      }
      bits = bitwiseAdd(
        bits,
        "1"
          .padStart(bits.length, "0")
          .split("")
          .map((str) => parseInt(str) as TypeBit) as TypeInt32 | TypeInt64
      );
      return toDecimal(bits);
    } else {
      let runningTotal = "0" as TypeNumericString;
      let bitMap = bits.length === 32 ? bitMap32 : bitMap64;
      for (let i = 1; i < bits.length; i++) {
        runningTotal = bits[i]
          ? stringAdd(runningTotal, bitMap[i] as TypeNumericString)
          : runningTotal;
      }
      return runningTotal;
    }
  }

  export function leftShift<T extends TypeInt32 | TypeInt64 | TypeInt128>(
    a: T,
    num: number
  ): T {
    let result = new Array(a.length).fill(0) as T;

    for (let i = 0; i < a.length; i++) {
      result[i] = i + num < a.length ? a[i + num]! : 0;
    }

    return result;
  }

  async function dispatchMethod(
    num1: TypeNumber,
    num2: TypeNumber,
    method: methodList[number]
  ) {
    const higherOrderNum = num1.getOrder() < num2.getOrder() ? num2 : num1;
    switch (higherOrderNum.getType()) {
      case "Integer":
        num1 = await num1.toInteger();
        num2 = await num2.toInteger();
        return num1[method](num2);
      case "Long":
        num1 = await num1.toLong();
        num2 = await num2.toLong();
        return num1[method](num2);
      case "Double":
        num1 = await num1.toDouble();
        num2 = await num2.toDouble();
        return num1[method](num2);
    }
  }

  export async function add(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<TypeNumber> {
    return dispatchMethod(num1, num2, "add") as Promise<TypeNumber>;
  }

  export async function subtract(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<TypeNumber> {
    return dispatchMethod(num1, num2, "subtract") as Promise<TypeNumber>;
  }

  export async function multiply(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<TypeNumber> {
    return dispatchMethod(num1, num2, "multiply") as Promise<TypeNumber>;
  }

  export async function divide(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<TypeNumber> {
    return dispatchMethod(num1, num2, "divide") as Promise<TypeNumber>;
  }

  export async function max(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<TypeNumber> {
    return dispatchMethod(num1, num2, "max") as Promise<TypeNumber>;
  }

  export async function min(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<TypeNumber> {
    return dispatchMethod(num1, num2, "min") as Promise<TypeNumber>;
  }

  export async function mod(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<TypeNumber> {
    return dispatchMethod(num1, num2, "mod") as Promise<TypeNumber>;
  }

  export async function gt(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<boolean> {
    return dispatchMethod(num1, num2, "gt") as Promise<boolean>;
  }

  export async function lt(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<boolean> {
    return dispatchMethod(num1, num2, "lt") as Promise<boolean>;
  }

  export async function gte(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<boolean> {
    return dispatchMethod(num1, num2, "gte") as Promise<boolean>;
  }

  export async function lte(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<boolean> {
    return dispatchMethod(num1, num2, "lte") as Promise<boolean>;
  }

  export async function equals(
    num1: TypeNumber,
    num2: TypeNumber
  ): Promise<boolean> {
    return dispatchMethod(num1, num2, "equals") as Promise<boolean>;
  }
}
