import { Ingredients } from "./Ingredients";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "./typeWrappers/iBoolean";

export class Recipe implements IntegratedValue {
  private input: Ingredients;
  private output: Ingredients;
  private _signatureCache: ParsedSignature | null = null;

  constructor(input: Ingredients, output: Ingredients) {
    this.input = input;
    this.output = output;
  }

  getInput(): Ingredients {
    return this.input;
  }
  setInput(value: Ingredients): Recipe {
    return new Recipe(value, this.output);
  }

  getOutput(): Ingredients {
    return this.output;
  }
  setOutput(value: Ingredients): Recipe {
    return new Recipe(this.input, value);
  }

  equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof Recipe)) return new iBoolean(false);
    if (!this.input.equals(other.input)) return new iBoolean(false);
    if (!this.output.equals(other.output)) return new iBoolean(false);
    return new iBoolean(true);
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "Recipe" }, false);
    this._signatureCache = newSignature;
    return newSignature;
  }
}
