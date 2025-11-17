import { Ingredients } from "./Ingredients";

export class Recipe {
  private input: Ingredients;
  private output: Ingredients;

  constructor(input: Ingredients, output: Ingredients) {
    this.input = input;
    this.output = output;
  }

  public getInput(): Ingredients {
    return this.input;
  }
  public setInput(value: Ingredients): Recipe {
    return new Recipe(value, this.output);
  }

  public getOutput(): Ingredients {
    return this.output;
  }
  public setOutput(value: Ingredients): Recipe {
    return new Recipe(this.input, value);
  }
}
