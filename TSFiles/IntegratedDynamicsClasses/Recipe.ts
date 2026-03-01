import { Ingredients } from "./Ingredients";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "./typeWrappers/iBoolean";
import { iString } from "./typeWrappers/iString";
import { Named } from "./Named";
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "./NBTFunctions/MinecraftClasses/Tag";

export class Recipe implements IntegratedValue, Named {
  private input: Ingredients;
  private output: Ingredients;
  private _signatureCache: ParsedSignature | null = null;

  constructor(input: Ingredients, output: Ingredients) {
    this.input = input;
    this.output = output;
  }

  serializeNBT(): CompoundTag {
    return new CompoundTag({
      input: this.input.serializeNBT(),
      output: this.output.serializeNBT(),
    });
  }

  static deserializeNBT(tag: Tag<IntegratedValue>): Recipe {
    if (!(tag instanceof CompoundTag)) {
      return new Recipe(new Ingredients(), new Ingredients());
    }
    const compound = tag as CompoundTag;
    const inputNode = compound.get(new iString("input"));
    const outputNode = compound.get(new iString("output"));
    return new Recipe(
      Ingredients.deserializeNBT(inputNode),
      Ingredients.deserializeNBT(outputNode)
    );
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

  getName() {
    return new iString(`${this.output.getName()} <- ${this.input.getName()}`);
  }
}
