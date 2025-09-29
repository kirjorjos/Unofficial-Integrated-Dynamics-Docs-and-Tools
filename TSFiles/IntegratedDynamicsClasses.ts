import { TypeAny, TypeConcrete, TypeFunction, TypeGeneric, TypeLambda, TypeList, TypeNumber, TypeNumericString, TypeOperator, TypeTypeMap } from "./types"

export class IntegratedDynamicsClasses {

  static Number = class Number {
    
    private MAXIMUM_INTEGER = "2147483647" as const as TypeNumericString
    private MINIMUM_INTEGER = "-2147483648" as const as TypeNumericString
    private MAXIMUM_LONG = "9223372036854775807" as const as TypeNumericString
    private MINIMUM_LONG = "-9223372036854775808" as const as TypeNumericString
    private DATA_TYPE_HEIRACHY = ["Integer", "Long", "Double"] as const

    number: TypeNumericString
    dataType: "Integer" | "Long" | "Double"
    isNegative: boolean

    constructor(number: TypeNumericString, dataType: "Integer" | "Long" | "Double" = "Integer") {
      this.number = this.ensureSizeRestrictions(number, dataType);
      this.isNegative = number.startsWith("-") && /[1-9]/.test(number);
      this.number = this.ensureSizeRestrictions(IntegratedDynamicsClasses.Number.normalizeNumber((this.isNegative ? number.slice(1) as TypeNumericString : number), dataType), dataType);
      this.dataType = dataType;
    }

    private static normalizeNumber(number: TypeNumericString, dataType: "Integer" | "Long" | "Double"): TypeNumericString {
      let raw = number;
    
      if (raw.includes(".")) {
        let [whole, frac] = raw.split(".") as [string, string];
    
        whole = whole.replace(/^0+(?!$)/, "");
        frac = frac.replace(/0+$/, "");
    
        raw = frac.length > 0 ? `${whole}.${frac}` as TypeNumericString : whole as TypeNumericString;
      } else {
        raw = raw.replace(/^0+(?!$)/, "") as TypeNumericString;
      }

      if (dataType === "Double" && raw === "0") {
        raw = "0.0";
      }
    
      return raw as TypeNumericString;
    }    

    static lt(num1: TypeNumericString | TypeNumber, num2: TypeNumericString | TypeNumber): boolean {
      if (typeof num1 != "string") num1 = num1.number;
      if (typeof num2 != "string") num2 = num2.number;
      if (num2) {
        if (num1.startsWith("-") !== num2.startsWith("-")) return num1.startsWith("-");

        const [padded1, padded2] = IntegratedDynamicsClasses.Number.paddNumbers(num1, num2);

        for (let i = 0; i < padded1.length; i++) {
          const d1 = parseInt(padded1[i]);
          const d2 = parseInt(padded2[i]);
          if (d1 !== d2) return num1.startsWith("-") ? d1 > d2 : d1 < d2;
        }

        return false;
      }
      return false;
    }

    static gt(num1: TypeNumericString | TypeNumber, num2: TypeNumericString | TypeNumber): boolean {
      if (typeof num1 != "string") num1 = num1.number;
      if (typeof num2 != "string") num2 = num2.number;
      return IntegratedDynamicsClasses.Number.lt(num1, num2);
    }

    static lte(num1: TypeNumericString | TypeNumber, num2: TypeNumericString | TypeNumber): boolean {
      if (typeof num1 != "string") num1 = num1.number;
      if (typeof num2 != "string") num2 = num2.number;
      return !IntegratedDynamicsClasses.Number.gt(num1, num2);
    }

    static gte(num1: TypeNumericString | TypeNumber, num2: TypeNumericString | TypeNumber): boolean {
      if (typeof num1 != "string") num1 = num1.number;
      if (typeof num2 != "string") num2 = num2.number;
      return !IntegratedDynamicsClasses.Number.lt(num1, num2);
    }

    static max(num1: TypeNumericString, num2: TypeNumericString): TypeNumericString
    static max(num1: TypeNumber, num2: TypeNumber): TypeNumber
    static max(num1: TypeNumber | TypeNumericString, num2: TypeNumber | TypeNumericString): TypeNumericString | TypeNumber {
      if (num1 instanceof Number) num1 = num1.number;
      if (num2 instanceof Number) num2 = num2.number;
      return IntegratedDynamicsClasses.Number.gt(num1, num2) ? num1 : num2;
    }

    static min(num1: TypeNumericString, num2: TypeNumericString): TypeNumericString
    static min(num1: TypeNumber, num2: TypeNumber): TypeNumber
    static min(num1: TypeNumber | TypeNumericString, num2: TypeNumber | TypeNumericString): TypeNumericString | TypeNumber {
      if (num1 instanceof Number) num1 = num1.number;
      if (num2 instanceof Number) num2 = num2.number;
      return this.lt(num1, num2) ? num1 : num2;
    }

    private static paddNumbers(num1: TypeNumericString = "0", num2: TypeNumericString = "0"): [padded1: TypeNumericString, padded2: TypeNumericString] {
      if (num1.includes(".") || num2.includes(".")) { // atleast 1 is a double
        let num1Arr = num1.split(".") as [TypeNumericString, TypeNumericString?];
        let num2Arr = num2.split(".") as [TypeNumericString, TypeNumericString?];
        [num1Arr[0], num2Arr[0]] = this.paddNumbers(num1Arr[0], num2Arr[0]);
        const reversedArr: TypeNumericString[] = [num1Arr[1] ?? "", num2Arr[1] ?? ""].map(e => e.split('').reverse().join('') as TypeNumericString);
        [num1Arr[1], num2Arr[1]] = this.paddNumbers(...reversedArr).map(e => e.split('').reverse().join('') as TypeNumericString);
        return [num1Arr.join("."), num2Arr.join(".")] as [TypeNumericString, TypeNumericString]
      }
      else {
        let higherLength = Math.max(num1.length, num2.length);
        num1 = "0".repeat(higherLength-num1.length) + num1 as TypeNumericString;
        num2 = "0".repeat(higherLength-num2.length) + num2 as TypeNumericString;
        return [num1, num2];
      }
    }

    private ensureSizeRestrictions(num: TypeNumericString, dataType: "Integer" | "Long" | "Double"): TypeNumericString {
      switch(dataType) {
        case "Integer": num = IntegratedDynamicsClasses.Number.max(this.MINIMUM_INTEGER, IntegratedDynamicsClasses.Number.min(num, this.MAXIMUM_INTEGER))
        case "Long": num = IntegratedDynamicsClasses.Number.max(this.MINIMUM_LONG, IntegratedDynamicsClasses.Number.min(num, this.MAXIMUM_LONG))
      }
      return num;
    }

    add(num2: TypeNumber): TypeNumber {     
      let add = (num1: TypeNumericString, num2: TypeNumericString): TypeNumericString => {
        let result = [];
        let padded1Arr = num1.split('').reverse();
        let padded2Arr = num2.split('').reverse();
        let carry = 0;
        for (let i = 0; i < padded1Arr.length; i++) {
          let digit1 = parseInt(padded1Arr[i]);
          let digit2 = parseInt(padded2Arr[i]);
          let sum = (digit1 + digit2 + carry);
          result.push(sum % 10);
          carry = Math.floor(sum/10);
        }
        if (carry != 0) result.push(carry);
        return result.reverse().join("") as TypeNumericString;
      }

      let resultDataType = this.dataType;
      if (this.dataType != num2.dataType) {
        resultDataType = this.DATA_TYPE_HEIRACHY[Math.max(this.DATA_TYPE_HEIRACHY.indexOf(this.dataType), this.DATA_TYPE_HEIRACHY.indexOf(num2.dataType))] as "Integer" | "Long" | "Double";
      }

      if (this.isNegative && num2.isNegative) {
        return new Number("-" + add(this.number as TypeNumericString, num2.number as TypeNumericString) as TypeNumericString, resultDataType);
      } else if (this.isNegative) {
        return num2.subtract(this);
      } else if (num2.isNegative) {
        return this.subtract(new Number(num2.number, num2.dataType));
      }

      let [padded1, padded2] = IntegratedDynamicsClasses.Number.paddNumbers(this.number, num2.number)
      if (padded1.includes(".") || padded2.includes(".")) {
        let [padded1Half1, padded1Half2] = padded1.split(".") as [TypeNumericString, TypeNumericString];
        let [padded2Half1, padded2Half2] = padded2.split(".") as [TypeNumericString, TypeNumericString];
        [padded1Half2, padded2Half2] = [padded1Half2, padded2Half2].map(e => e.split("").reverse().join("")) as [TypeNumericString, TypeNumericString];
        let resultWhole = add(padded1Half1, padded2Half1);
        let resultFrac = add(padded1Half2, padded2Half2).split("").reverse().join("");
        if (resultFrac.length > padded1Half2.length) {  // decimal part overflowed to interger, eg. 0.4 + 0.7 => 1.1
          let whole = resultFrac[0] as TypeNumericString;
          resultFrac = resultFrac.slice(1);
          resultWhole = add(...IntegratedDynamicsClasses.Number.paddNumbers(whole, resultWhole));
        }
        return new IntegratedDynamicsClasses.Number(this.ensureSizeRestrictions(resultWhole + "." + resultFrac as TypeNumericString, resultDataType), resultDataType);
      } else {
        return new IntegratedDynamicsClasses.Number(this.ensureSizeRestrictions(add(padded1, padded2), resultDataType), resultDataType);
      }
    }

    subtract(num2: TypeNumber): TypeNumber {
      let subStrings = (num1: TypeNumericString, num2: TypeNumericString): TypeNumericString => {
        let result: number[] = [];
        let arr1 = num1.split('').reverse();
        let arr2 = num2.split('').reverse();
        let borrow = 0;
    
        for (let i = 0; i < arr1.length; i++) {
          let digit1 = parseInt(arr1[i]) - borrow;
          let digit2 = parseInt(arr2[i]);
          if (digit1 < digit2) {
            digit1 += 10;
            borrow = 1;
          } else {
            borrow = 0;
          }
          result.push(digit1 - digit2);
        }
    
        while (result.length > 1 && result[result.length - 1] === 0) {
          result.pop();
        }
    
        return result.reverse().join('') as TypeNumericString;
      };

      let resultDataType = this.dataType;
      if (this.dataType != num2.dataType) {
        resultDataType = this.DATA_TYPE_HEIRACHY[
          Math.max(
            this.DATA_TYPE_HEIRACHY.indexOf(this.dataType),
            this.DATA_TYPE_HEIRACHY.indexOf(num2.dataType)
          )
        ] as "Integer" | "Long" | "Double";
      }

      if (this.isNegative && num2.isNegative) {
        return num2.abs().subtract(this.abs());
      } else if (this.isNegative) {
        return new Number("-" + this.add(num2).number as TypeNumericString, resultDataType)
      } else if (num2.isNegative) {
        return this.add(num2.abs());
      }      
    
      let [padded1, padded2] = IntegratedDynamicsClasses.Number.paddNumbers(this.number, num2.number);
    
      if (padded1.includes('.') || padded2.includes('.')) {
        let [p1Whole, p1Frac] = padded1.split('.') as [TypeNumericString, TypeNumericString];
        let [p2Whole, p2Frac] = padded2.split('.') as [TypeNumericString, TypeNumericString];
    
        [p1Frac, p2Frac] = [p1Frac, p2Frac].map(e => e.split("").reverse().join("")) as [TypeNumericString, TypeNumericString];
    
        let resultFrac = subStrings(p1Frac, p2Frac).split("").reverse().join("");
        let resultWhole = subStrings(p1Whole, p2Whole);
    
        return new IntegratedDynamicsClasses.Number(
          this.ensureSizeRestrictions(resultWhole + "." + resultFrac as TypeNumericString, resultDataType),
          resultDataType
        );
      } else {
        return new IntegratedDynamicsClasses.Number(
          this.ensureSizeRestrictions(subStrings(padded1, padded2), resultDataType),
          resultDataType
        );
      }
    }

    multiply(num2: TypeNumber): TypeNumber {
      let resultDataType = this.dataType;
      if (this.dataType != num2.dataType) {
        resultDataType = this.DATA_TYPE_HEIRACHY[
          Math.max(
            this.DATA_TYPE_HEIRACHY.indexOf(this.dataType),
            this.DATA_TYPE_HEIRACHY.indexOf(num2.dataType)
          )
        ] as "Integer" | "Long" | "Double";
      }
    
      let n1 = this.number.replace(".", "");
      let n2 = num2.number.replace(".", "");
    
      let arr1 = n1.split('').reverse();
      let arr2 = n2.split('').reverse();
      let resultArr = Array(arr1.length + arr2.length).fill(0);
    
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          let prod = parseInt(arr1[i]) * parseInt(arr2[j]) + resultArr[i + j];
          resultArr[i + j] = prod % 10;
          resultArr[i + j + 1] += Math.floor(prod / 10);
        }
      }
    
      while (resultArr.length > 1 && resultArr[resultArr.length - 1] === 0) {
        resultArr.pop();
      }
    
      let result = resultArr.reverse().join('');
    
      let decimalPlaces =
        (this.number.split(".")[1]?.length || 0) + (num2.number.split(".")[1]?.length || 0);
      if (decimalPlaces > 0) {
        let whole = result.slice(0, -decimalPlaces) || "0";
        let frac = result.slice(-decimalPlaces).padStart(decimalPlaces, "0");
        result = whole + "." + frac;
      }

      if (this.isNegative !== num2.isNegative && result !== "0") {
        result = "-" + result;
      }
    
      return new IntegratedDynamicsClasses.Number(
        this.ensureSizeRestrictions(result as TypeNumericString, resultDataType),
        resultDataType
      );
    }
    
    divide(num2: TypeNumber): TypeNumber {
      if (num2.number === "0") {
          throw new Error("Division by zero");
      }
    
      let resultDataType = this.dataType;
      if (this.dataType != num2.dataType) {
        resultDataType = this.DATA_TYPE_HEIRACHY[
          Math.max(
            this.DATA_TYPE_HEIRACHY.indexOf(this.dataType),
            this.DATA_TYPE_HEIRACHY.indexOf(num2.dataType)
          )
        ] as "Integer" | "Long" | "Double";
      }
    
      if (resultDataType !== "Double") {
        let [padded1, padded2] = IntegratedDynamicsClasses.Number.paddNumbers(
          this.number.replace("-", "") as TypeNumericString,
          num2.number.replace("-", "") as TypeNumericString
        );
    
        let quotient = new IntegratedDynamicsClasses.Number("0", resultDataType);
        let remainder = new IntegratedDynamicsClasses.Number(padded1, resultDataType);
    
        while (IntegratedDynamicsClasses.Number.gte(this.abs(), num2.abs())) {
          remainder = remainder.subtract(num2.abs());
          quotient = quotient.add(new IntegratedDynamicsClasses.Number("1", resultDataType));
        }
    
        let isNegative = (this.number.startsWith("-")) !== (num2.number.startsWith("-"));
        let result = isNegative ? "-" + quotient.number : quotient.number;
    
        return new IntegratedDynamicsClasses.Number(
          this.ensureSizeRestrictions(result as TypeNumericString, resultDataType),
          resultDataType
        );
      }
    
      let dividend = this.number.replace(".", "");
      let divisor = num2.number.replace(".", "");
      let scale =
        (num2.number.split(".")[1]?.length || 0) - (this.number.split(".")[1]?.length || 0);
    
      let quotient = "";
      let remainder = dividend;
    
      for (let k = 0; k < dividend.length + 17; k++) {
        let q = 0;
        while (parseInt(remainder || "0") >= parseInt(divisor)) {
          remainder = (parseInt(remainder) - parseInt(divisor)).toString();
          q++;
        }
        quotient += q.toString();
        remainder += "0";
      }
    
      if (scale < 0) {
        let pos = quotient.length + scale;
        quotient = quotient.slice(0, pos) + "." + quotient.slice(pos);
      } else if (scale > 0) {
        quotient = "0." + "0".repeat(scale - 1) + quotient;
      }
    
      let [whole, frac = ""] = quotient.split(".");
      if (frac.length > 16) {
        let guardDigit = parseInt(frac[16]);
        let needsRound = guardDigit > 5 || (guardDigit === 5 && parseInt(frac[15]) % 2 !== 0);
    
        frac = frac.slice(0, 16);
    
        if (needsRound) {
          let rounded = (BigInt(frac) + 1n).toString().padStart(16, "0");
          if (rounded.length > 16) {
            whole = (BigInt(whole) + 1n).toString();
            frac = rounded.slice(1);
          } else {
            frac = rounded;
          }
        }
      }
    
      if (frac.length > 0) {
        frac = frac.replace(/0+$/, "");
      }
      let finalResult = frac.length > 0 ? `${whole}.${frac}` : whole;
    
      let isNegative = (this.number.startsWith("-")) !== (num2.number.startsWith("-"));
      if (isNegative && finalResult !== "0") {
        finalResult = "-" + finalResult;
      }
    
      return new IntegratedDynamicsClasses.Number(
        this.ensureSizeRestrictions(finalResult as TypeNumericString, "Double"),
        "Double"
      );
    }

    mod(num2: TypeNumber): TypeNumber {
      if (num2.number === "0") {
        throw new Error("Division by zero");
      }
    
      let resultDataType = this.dataType;
      if (this.dataType !== num2.dataType) {
        resultDataType = this.DATA_TYPE_HEIRACHY[
          Math.max(
            this.DATA_TYPE_HEIRACHY.indexOf(this.dataType),
            this.DATA_TYPE_HEIRACHY.indexOf(num2.dataType)
          )
        ] as "Integer" | "Long" | "Double";
      }
    
      let quotient = this.divide(num2);
    
      let truncQuotient: TypeNumber;
      if (resultDataType === "Double") {
        let qStr = quotient.number;
        if (qStr.includes(".")) {
          qStr = qStr.split(".")[0] as TypeNumericString;
        }
        truncQuotient = new IntegratedDynamicsClasses.Number(
          qStr as TypeNumericString,
          "Double"
        );
      } else {
        truncQuotient = quotient;
      }
    
      let product = num2.multiply(truncQuotient);
      let remainder = this.subtract(product);
    
      return new IntegratedDynamicsClasses.Number(
        this.ensureSizeRestrictions(
          remainder.number as TypeNumericString,
          resultDataType
        ),
        resultDataType
      );
    }       
    
    abs(): TypeNumber {
      return new IntegratedDynamicsClasses.Number(this.number.replace("-", "") as TypeNumericString, this.dataType);
    }

    sqrt(): TypeNumber {
      if (this.isNegative) {
        throw new Error("Square root of negative number");
      }
    
      if (this.number === "0" || this.number === "0.0") {
        return new IntegratedDynamicsClasses.Number("0.0" as TypeNumericString, "Double");
      }
    
      if (this.dataType !== "Double") {
        const n = BigInt(this.number);
        const root = this.integerSqrt(n);
        if (root * root === n) {
          return new IntegratedDynamicsClasses.Number(
            this.ensureSizeRestrictions(root.toString() as TypeNumericString, this.dataType),
            this.dataType
          );
        }
      }
    
      let [whole, frac = ""] = this.number.split(".");
      let digits = whole + frac;
      if (digits.length % 2 === 1) digits = "0" + digits;
      const pairs: string[] = [];
      for (let i = 0; i < digits.length; i += 2) {
        pairs.push(digits.slice(i, i + 2));
      }
    
      let root = "";
      let remainder = 0n;
    
      for (let i = 0; i < pairs.length + 17; i++) {
        remainder = remainder * 100n + BigInt(pairs[i] || "00");
        let divisor = BigInt(root === "" ? "0" : root) * 20n;
        let candidate = 0n;
    
        for (let d = 9n; d >= 0n; d--) {
          let test = (divisor + d) * d;
          if (test <= remainder) {
            candidate = d;
            remainder -= test;
            root += d.toString();
            break;
          }
        }
      }
    
      const decimalPos = Math.ceil((whole.length + frac.length) / 2);
    
      let result = root.slice(0, decimalPos) + "." + root.slice(decimalPos);
    
      let [rWhole, rFrac = ""] = result.split(".");
      if (rFrac.length > 16) {
        const guardDigit = parseInt(rFrac[16]);
        const needsRound = guardDigit > 5 || (guardDigit === 5 && parseInt(rFrac[15]) % 2 !== 0);
    
        rFrac = rFrac.slice(0, 16);
        if (needsRound) {
          let rounded = (BigInt(rFrac) + 1n).toString().padStart(16, "0");
          if (rounded.length > 16) {
            rWhole = (BigInt(rWhole) + 1n).toString();
            rFrac = rounded.slice(1);
          } else {
            rFrac = rounded;
          }
        }
      }
    
      rFrac = rFrac.replace(/0+$/, "");
      let finalResult = rFrac.length > 0 ? `${rWhole}.${rFrac}` : `${rWhole}.0`;
    
      return new IntegratedDynamicsClasses.Number(
        this.ensureSizeRestrictions(finalResult as TypeNumericString, "Double"),
        "Double"
      );
    }
    
    private integerSqrt(n: bigint): bigint {
      if (n < 2n) return n;
      let left = 1n, right = n, ans = 1n;
      while (left <= right) {
        const mid = (left + right) >> 1n;
        const sq = mid * mid;
        if (sq === n) return mid;
        if (sq < n) {
          ans = mid;
          left = mid + 1n;
        } else {
          right = mid - 1n;
        }
      }
      return ans;
    }    
  }

  static Item = class Item {
    itemName?: string;
    static defaultProps = {
      size: 1,
      maxSize: 64,
      stackable: true,
      damageable: false,
      damage: 0,
      maxDamage: 0,
      enchanted: false,
      enchantable: false,
      repairCost: 0,
      rarity: "",
      NBT: null,
      fluid: null,
      fluidCapacity: 0,
      uname: "",
      modName: "",
      fuelBurnTime: 0,
      fuel: false,
      tagNames: [],
      feContainer: false,
      feCapacity: 0,
      feStored: 0,
      inventory: null,
      tooltip: [],
      itemName: ""
    };
  
    constructor(newProps = {}, oldItem = {}) {
      Object.assign(this, Item.defaultProps, oldItem, newProps);
  
      for (const key of Object.keys(Item.defaultProps)) {
        const capKey = key.charAt(0).toUpperCase() + key.slice(1);
  
        if (!this.constructor.prototype[`get${capKey}`]) {
          this.constructor.prototype[`get${capKey}`] = function () {
            return this[key];
          };
        }
        if (!this.constructor.prototype[`set${capKey}`]) {
          this.constructor.prototype[`set${capKey}`] = function (value: any) {
            this[key] = value;
          };
        }
      }
    }

    getStrengthVsBlock(block: any) { // Any because typescript is a b***h and won't see the block type
      if (!(block instanceof IntegratedDynamicsClasses.Block)) throw new Error("block is not a Block");
      throw new Error("getStrengthVsBlock method not implemented");
    }

    canHarvestBlock(block: any) { // Any because typescript is a b***h and won't see the block type
      throw new Error("canHarvestBlock method not implemented");
    }

    equals(other: Item) {
      if (!(other instanceof Item)) return false;
      return JSON.stringify(this) === JSON.stringify(other);
    }

    toString() {
      return this.itemName;
    }
  }

  static Block = class Block {
    blockName?: string;
    static defaultProps = {
      NBT: null,
      fluid: null,
      fluidCapacity: 0,
      uname: "",
      modName: "",
      tagNames: [],
      feContainer: false,
      feCapacity: 0,
      feStored: 0,
      inventory: null,
      blockName: ""
    };
  
    constructor(newProps = {}, oldItem = {}) {
      Object.assign(this, Block.defaultProps, oldItem, newProps);
  
      for (const key of Object.keys(Block.defaultProps)) {
        const capKey = key.charAt(0).toUpperCase() + key.slice(1);
  
        if (!this.constructor.prototype[`get${capKey}`]) {
          this.constructor.prototype[`get${capKey}`] = function () {
            return this[key];
          };
        }
        if (!this.constructor.prototype[`set${capKey}`]) {
          this.constructor.prototype[`set${capKey}`] = function (value: any) {
            this[key] = value;
          };
        }
      }
    }

    getStrengthVsBlock(block: Block) {
      throw new Error("getStrengthVsBlock method not implemented");
    }

    canHarvestBlock(block: Block) {
      throw new Error("canHarvestBlock method not implemented");
    }

    equals(other: Block) {
      return JSON.stringify(this) === JSON.stringify(other);
    }

    toString() {
      return this.blockName;
    }
  }

  static Operator = class Operator extends Function {
    fn: (...args: any[]) => any;
    parsedSignature: InstanceType<typeof IntegratedDynamicsClasses.ParsedSignature>;
    typeMap: InstanceType<typeof IntegratedDynamicsClasses.TypeMap>;
    internalName: string;
    nicknames: string[];
    symbol: string;
    interactName: string;

    constructor({ internalName, nicknames, parsedSignature, rawSignature, symbol, interactName, function: fn }: { internalName: string; nicknames: string[]; symbol: string; interactName: string; function: TypeLambda<any, any> } & ({ rawSignature: TypeOperator; parsedSignature?: never } | { rawSignature?: never; parsedSignature: InstanceType<typeof IntegratedDynamicsClasses.ParsedSignature> })) {
      super("...args", "return this.__call__(...args)");
      this.fn = fn;
      this.typeMap = rawSignature ? new IntegratedDynamicsClasses.TypeMap(rawSignature) : new IntegratedDynamicsClasses.TypeMap(parsedSignature.getAST());
      this.parsedSignature = rawSignature ? new IntegratedDynamicsClasses.ParsedSignature(rawSignature) : parsedSignature;
      this.internalName = internalName;
      this.nicknames = nicknames;
      this.symbol = symbol;
      this.interactName = interactName;
    }


    __call__(...args: any[]) {
      if (args.length !== this.parsedSignature.args.length) {
        throw new Error(
          `Operator expected ${this.parsedSignature.args.length} args, got ${args.length}`
        );
      }
      return this.fn(...args);
    }

    apply(arg: any) {

      const parsedSignature = this.parsedSignature.apply(arg);
      const newFn = (...rest: any[]) => this.fn(arg, ...rest)
      return new Operator({
        internalName: this.internalName,
        nicknames: this.nicknames,
        parsedSignature: parsedSignature,
        symbol: this.symbol,
        interactName: this.interactName,
        function: newFn
      });
    }
  }

  static TypeMap = class TypeMap {

    aliases: Map<any, any>;
    constructor(ast?: TypeAny | TypeConcrete | TypeGeneric | TypeFunction | TypeOperator) {
      this.aliases = new Map();

      if (ast) {
        this.extractTypeIDs(ast);
      }
    }

    private extractTypeIDs(node: any) {
      if (!node || typeof node !== "object") return;
  
      if (node.kind === "Generic" && node.typeID) {
        this.aliases.set(node.typeID, "Any");
      }
  
      // Recurse through all child properties
      for (const value of Object.values(node)) {
        if (Array.isArray(value)) {
          value.forEach(v => this.extractTypeIDs(v));
        } else if (typeof value === "object" && value !== null) {
          this.extractTypeIDs(value);
        }
      }
    }
  
    find(typeID: string) {
      while (this.aliases.has(typeID)) {
        typeID = this.aliases.get(typeID);
      }
      return typeID;
    }
  
    unify<T extends TypeAny | TypeConcrete | TypeGeneric | TypeList | TypeFunction | TypeOperator>(a: T, b: typeof a) {
      if (!a || !b) return;
  
      const repA = this._getID(a);
      const repB = this._getID(b);
  
      if (repA && repB) {
        this.aliases.set(this.find(repA), this.find(repB));
        return;
      }
  
      if (a.kind === "Concrete" && b.kind === "Concrete") {
        if (a.name !== b.name) {
          throw new Error(`Concrete type mismatch: ${a.name} vs ${b.name}`);
        }

        const pa = (a.name === "List" ? (a as TypeList).params : []) ?? [];
        const pb = (b.name === "List" ? (b as TypeList).params : []) ?? [];
      
        const n = Math.min(pa.length, pb.length);
        for (let i = 0; i < n; i++) this.unify(pa[i], pb[i]);
        return;
      }
    }
  
    _getID(node: TypeAny | TypeGeneric | TypeConcrete | TypeList | TypeFunction | TypeOperator) {
      if (node.kind === "Any") return node.typeID;
      if (node.kind === "Generic") return node.name;
      return null;
    }
  
    rewrite(node: TypeAny | TypeConcrete | TypeFunction | TypeGeneric | TypeList): TypeAny | TypeConcrete | TypeFunction | TypeGeneric | TypeList {
      if (node.kind === "Any" && node.typeID) {
        return { ...node, typeID: this.find(node.typeID) };
      }
      if (node.kind === "Generic" && node.name) {
        return { ...node, name: this.find(node.name) };
      }
      if (node.kind === "Function") {
        return {
          kind: "Function",
          from: this.rewrite(node.from),
          to: this.rewrite(node.to)
        };
      }
      if (node.kind === "Concrete" && node.name === "List" && node.params) {
        return {
          kind: "Concrete",
          name: node.name,
          params: node.params.map(p => this.rewrite(p))
        } as TypeList;
      }
      return node;
    }

    resolve(node: TypeAny | TypeGeneric | TypeConcrete | TypeFunction | TypeList): typeof node {
      if (node.kind === "Any") {
        const alias = this.aliases.get(node.typeID);
        if (alias) {
          return this.resolve(alias as any);
        }
        return node;
      }

      if (node.kind === "Generic") {
        const resolvedTypeID = this.aliases.get(node.name);
        if (resolvedTypeID) {
          const resolved = this.aliases.get(resolvedTypeID);
          if (!resolved) throw new Error(`TypeMap inconsistency: alias ${resolvedTypeID} not found`);
          return this.resolve(resolved);
        }
        return node;
      }      

      if (node.kind === "Function") {
        return {
          kind: "Function",
          from: this.resolve(node.from),
          to: this.resolve(node.to)
        };
      }

      if (node.kind === "Concrete") {
        if (node.name === "List") {
          return {
            kind: "Concrete",
            name: "List",
            params: (node as TypeList).params.map((p) => this.resolve(p))
          } as TypeList;
        }
        return node as TypeConcrete;
      }

      throw new Error(`Unknown node kind in resolve: ${JSON.stringify(node)}`);
    }

  }

  static ParsedSignature = class ParsedSignature {
    ast: TypeOperator | TypeFunction;
    counter: number;
    typeMap: InstanceType<typeof IntegratedDynamicsClasses.TypeMap>;
    args: (string | TypeFunction | TypeConcrete | TypeGeneric | TypeAny | TypeList | TypeOperator)[];

    constructor(ast: TypeOperator | TypeList | TypeAny | TypeConcrete | TypeFunction | TypeGeneric, typeMap: InstanceType<typeof IntegratedDynamicsClasses.TypeMap> = new IntegratedDynamicsClasses.TypeMap()) {
      this.ast = this._normalize(ast) as TypeOperator | TypeFunction;
      this.counter = 1;
      this.typeMap = typeMap;
      this.args = this.toFlatSignature()
    };

    getAST() {
      return JSON.parse(JSON.stringify(this.ast));
    }

    _normalize(node: TypeOperator | TypeConcrete | TypeGeneric | TypeAny | TypeFunction | TypeList, argIndex = 1): TypeConcrete | TypeGeneric | TypeAny | TypeFunction | TypeList | TypeOperator {
      if (!node) return node;
  
      switch(node.kind) {
         case "Any": {
          return {
            ...node,
            typeID: `$type${this.counter++}`,
            argName: node.argName || `arg${argIndex}`
          };
        }
    
        case "Generic": {
          return {
            ...node,
            name: `$${this.counter++}`,
            argName: node.argName || `arg${argIndex}`
          };
        }
    
        case "Function": {
          return Object.assign({}, node, {
            kind: "Function",
            from: this._normalize(node.from, argIndex),
            to: this._normalize(node.to, argIndex + 1)
          });
        }
    
        case "Concrete": {
          if (node.name === "List") {
            return Object.assign({}, node, {
              kind: "Concrete",
              name: node.name,
              params: node.params.map((p, i) => this._normalize(p, argIndex + i))
            });
          }
          return node;
        }
      }
      return node.args[0];
    }

    renameArgs(mapping: TypeTypeMap) {
      const rename = (node: TypeList | TypeAny | TypeFunction | TypeGeneric | TypeConcrete | TypeOperator): TypeList | TypeAny | TypeFunction | TypeGeneric | TypeConcrete => {
        if (!node) return node;

        if (node.kind === "Operator") return rename(node.args[0]);

        if (node.kind === "Concrete" && node.name === "List") {
          const listNode = node as TypeList;
          const params = listNode.params.map(rename) as (TypeAny | TypeConcrete | TypeGeneric | TypeFunction | TypeList)[];
          return Object.assign({}, listNode, params) as TypeList;
        }

        if (node.kind === "Any" || node.kind === "Generic") {
          const key = node.kind === "Any" ? node.typeID : node.name;
          if (key && mapping[key]) {
            return { ...node, argName: mapping[key] } as TypeAny | TypeGeneric;
          } else return node;
        }

        if (node.kind === "Function") {
          return { ...node, from: rename(node.from), to: rename(node.to) } as TypeFunction;
        }

        return node;
      };
      return new ParsedSignature(rename(this.ast), this.typeMap);
    }
  
    clone() {
      return new ParsedSignature(JSON.parse(JSON.stringify(this.ast)), this.typeMap);
    }
  
    getArity() {
      if (this.ast.kind === "Function") {
        let count = 0;
        let current = this.ast as TypeFunction | TypeGeneric | TypeConcrete | TypeAny | TypeList;
        while (current.kind === "Function") {
          count++;
          current = current.to;
        }
        return count;
      }
      if ("args" in this.ast) {
        return this.ast.args.length;
      }
      return 0;
    }
    getInput(index = 0) {
      if (!("args" in this.ast)) {
        throw new Error(`Invalid signature: ${JSON.stringify(this.ast, null, 2)}`);
      }
      if (!this.ast.args || index < 0 || index >= this.ast.args.length) {
        throw new Error(`Invalid input index ${index} for signature: ${JSON.stringify(this.ast, null, 2)}`);
      }
  
      const funcNode = this.ast.args[0];
      let current = funcNode;
  
      for (let i = 0; i < index; i++) {
        if (current.to && current.to.kind === "Function") {
          current = current.to;
        } else {
          throw new Error(`No input at index ${index} in signature: ${JSON.stringify(this.ast, null, 2)}`);
        }
      }
  
      return this.typeMap.resolve(current.from);
    }

    getOutput() {
      if (this.ast.kind === "Function") {
        return this.ast.to;
      }
      return this.ast;
    }
  
    pipe(other: ParsedSignature) {
      if (!this.args || other.args) {
        throw new Error("Can only pipe operators, not values");
      }
      const out = this.getOutput();
      const input = other.getInput();
    
      this.typeMap.unify(out, input);
    
      const newAST = Object.assign({}, this.ast, {
        kind: "Operator",
        args: [
          {
            kind: "Function",
            from: (this.ast.kind === "Function") ? this.ast.from : this.ast.args[0].from,
            to: other.getOutput()
          }
        ]
      });
    
      return new ParsedSignature(newAST, this.typeMap);
    }
    
    apply(argType: TypeFunction | TypeAny | TypeConcrete | TypeGeneric | TypeList): InstanceType<typeof IntegratedDynamicsClasses.ParsedSignature> {
      if (this.ast.kind !== "Function") {
        throw new Error("Cannot apply non-function");
      }
    
      const expected = this.getInput(0);
      this.typeMap.unify(argType, expected);

      const newAst = this.typeMap.rewrite(this.ast.to);
      return new ParsedSignature(newAst, this.typeMap);
    }
  
    flip() {
      if (this.ast.kind !== "Function" || this.ast.to.kind !== "Function") {
        throw new Error("Flip needs 2 \"inputs\".");
      }
  
      const a = this.ast.from;
      const b = this.ast.to.from;
      const c = this.ast.to.to;
  
      const flipped = Object.assign({}, this.ast, {
        kind: "Function",
        from: b,
        to: {
          kind: "Function",
          from: a,
          to: c
        }
      });
  
      return new ParsedSignature(flipped, this.typeMap);
    }
  
    toFlatSignature() {
      const arr = [];
      let cur = this.ast as TypeFunction | TypeAny | TypeConcrete | TypeGeneric | TypeList;
      while (cur.kind === "Function") {
        arr.push(cur.from);
        cur = cur.to;
      }
      arr.push(cur);
      return arr;
    }
  }   
}