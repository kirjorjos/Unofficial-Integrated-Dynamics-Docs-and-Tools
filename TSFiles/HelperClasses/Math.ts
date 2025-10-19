export namespace JavaMath {

  function divmod2(
    decimal: TypeNumericString
  ): [TypeNumericString, number] {
    let quotient = "";
    let carry = 0;
    for (let i = 0; i < decimal.length; i++) {
      const digit = carry * 10 + parseInt((decimal[i] as TypeDigitString), 10);
      const q = Math.floor(digit / 2);
      carry = digit % 2;
      if (!(quotient === "" && q === 0)) quotient += q.toString();
    }
    return [quotient === "" ? "0" : (quotient as TypeNumericString), carry];
  }

  export function decimalToBinary(decimal: TypeNumericString): string {
    let n = decimal;
    let bits = "";
    while (n !== "0") {
      const [q, r] = divmod2(n);
      bits = r.toString() + bits;
      n = q;
    }
    return bits === "" ? "0" : bits;
  }

  export function twosComplement(bits: TypeBit[]): TypeInt64 | TypeInt32 {
    let flipped = bits.map((b) => (b === 0 ? 1 : 0)) as TypeBit[];
    let carry = 1;
    for (let i = flipped.length - 1; i >= 0; i--) {
      if (flipped[i] === 1 && carry === 1) {
        flipped[i] = 0;
        carry = 1;
      } else {
        flipped[i] = ((flipped[i] as TypeBit) + carry) as TypeBit;
        carry = 0;
      }
    }
    return flipped as TypeInt64 | TypeInt32;
  }

  export function bitsToSignedDecimal(bits: TypeBit[]): TypeNumericString {
    const sign = bits[0];
    let absBits: TypeBit[];

    if (sign === 0) {
      absBits = bits;
    } else {
      absBits = twosComplementToPositive(bits);
    }

    // Convert binary (absBits) → decimal string
    let decimal = "0" as TypeNumericString;
    for (let i = 0; i < absBits.length; i++) {
      decimal = mul2Add(decimal, (absBits[i] as TypeBit));
    }

    return sign === 1 && decimal !== "0"
      ? (("-" + decimal) as TypeNumericString)
      : decimal;
  }

  function mul2Add(
    decimal: TypeNumericString,
    bit: 0 | 1
  ): TypeNumericString {
    let carry = bit;
    let result = "";
    for (let i = decimal.length - 1; i >= 0; i--) {
      const d = decimal.charCodeAt(i) - 48;
      const prod = d * 2 + carry;
      result = (String.fromCharCode(48 + (prod % 10)) +
        result) as TypeNumericString;
      carry = Math.floor(prod / 10) as TypeBit;
    }
    if (carry > 0) result = (carry.toString() + result) as TypeNumericString;
    return result as TypeNumericString;
  }

  function twosComplementToPositive(bits: TypeBit[]): TypeBit[] {
    const inverted = bits.map((b) => (b === 0 ? 1 : 0)) as TypeBit[];
    let carry = 1;
    for (let i = inverted.length - 1; i >= 0; i--) {
      const sum = (inverted[i] as TypeBit) + carry;
      inverted[i] = (sum & 1) as TypeBit;
      carry = sum >> 1;
    }
    return inverted;
  }

  export async function add(num1: TypeNumber, num2: TypeNumber): Promise<TypeNumber> {
    const higherOrderNum =
      num1.getOrder() < num2.getOrder() ? num2 : num1;
    switch(higherOrderNum.getType()) {
      case "Integer":
        num1 = await num1.toInteger();
        num2 = await num2.toInteger();
        return num1.add(num2);
      case "Long":
        num1 = await num1.toLong();
        num2 = await num2.toLong();
        return num1.add(num2);
      case "Double":
        num1 = await num1.toDouble();
        num2 = await num2.toDouble();
        return num1.add(num2);
    }
  }

  export async function subtract(num1: TypeNumber, num2: TypeNumber): Promise<TypeNumber> {
    const higherOrderNum =
      num1.getOrder() < num2.getOrder() ? num2 : num1;
    switch(higherOrderNum.getType()) {
      case "Integer":
        num1 = await num1.toInteger();
        num2 = await num2.toInteger();
        return num1.subtract(num2);
      case "Long":
        num1 = await num1.toLong();
        num2 = await num2.toLong();
        return num1.subtract(num2);
      case "Double":
        num1 = await num1.toDouble();
        num2 = await num2.toDouble();
        return num1.subtract(num2);
    }
  }
}
