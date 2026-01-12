import { Ingredients } from "./Ingredients";
import { iBoolean } from "./typeWrappers/iBoolean";

export class Recipe implements IntegratedValue {
  private input: Ingredients;
  private output: Ingredients;

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

  getSignatureNode(): TypeRawSignatureAST.RawSignatureNode {
    return {
      type: "Recipe",
    };
  }
}
