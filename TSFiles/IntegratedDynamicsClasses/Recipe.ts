import { Ingredients } from "./Ingredients";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "./typeWrappers/iBoolean";
import { iString } from "./typeWrappers/iString";
import { Named } from "./Named";
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "./NBTFunctions/MinecraftClasses/Tag";
import { iArrayEager } from "./typeWrappers/iArrayEager";
import { Integer } from "JavaNumberClasses/Integer";
import { IntArrayTag } from "./NBTFunctions/MinecraftClasses/IntArrayTag";

export class Recipe implements IntegratedValue, Named {
  private input: Ingredients;
  private output: Ingredients;
  private inputReuseable: {
    items: number[];
    fluids: number[];
    energies: number[];
  };
  private _signatureCache: ParsedSignature | null = null;

  constructor(
    input: Ingredients,
    output: Ingredients,
    inputReuseable: {
      items: number[];
      fluids: number[];
      energies: number[];
    } = { items: [], fluids: [], energies: [] }
  ) {
    this.input = input;
    this.output = output;
    this.inputReuseable = inputReuseable;
  }

  serializeNBT(): CompoundTag {
    return new CompoundTag({
      input: this.input.serializeNBT(),
      output: this.output.serializeNBT(),
      inputReuseable: new CompoundTag({
        items: new iArrayEager(
          this.inputReuseable.items.map((v) => new Integer(v))
        ),
        fluids: new iArrayEager(
          this.inputReuseable.fluids.map((v) => new Integer(v))
        ),
        energies: new iArrayEager(
          this.inputReuseable.energies.map((v) => new Integer(v))
        ),
      }),
    });
  }

  static deserializeNBT(tag: Tag<IntegratedValue>): Recipe {
    if (!(tag instanceof CompoundTag)) {
      return new Recipe(new Ingredients(), new Ingredients());
    }
    const compound = tag as CompoundTag;
    const inputNode = compound.get(new iString("input"));
    const outputNode = compound.get(new iString("output"));
    const reuseableNode = compound.get(new iString("inputReuseable"));

    let inputReuseable: {
      items: number[];
      fluids: number[];
      energies: number[];
    } = {
      items: [],
      fluids: [],
      energies: [],
    };

    if (reuseableNode instanceof CompoundTag) {
      const items = reuseableNode.get(new iString("items")) as IntArrayTag;
      const fluids = reuseableNode.get(new iString("fluids")) as IntArrayTag;
      const energies = reuseableNode.get(
        new iString("energies")
      ) as IntArrayTag;

      inputReuseable = {
        items:
          items instanceof IntArrayTag
            ? (items.valueOf().valueOf() as Integer[]).map((v) =>
                v.toJSNumber()
              )
            : [],
        fluids:
          fluids instanceof IntArrayTag
            ? (fluids.valueOf().valueOf() as Integer[]).map((v) =>
                v.toJSNumber()
              )
            : [],
        energies:
          energies instanceof IntArrayTag
            ? (energies.valueOf().valueOf() as Integer[]).map((v) =>
                v.toJSNumber()
              )
            : [],
      };
    }

    return new Recipe(
      Ingredients.deserializeNBT(inputNode),
      Ingredients.deserializeNBT(outputNode),
      inputReuseable
    );
  }

  getInput(): Ingredients {
    return this.input;
  }
  setInput(value: Ingredients): Recipe {
    return new Recipe(value, this.output, this.inputReuseable);
  }

  getOutput(): Ingredients {
    return this.output;
  }
  setOutput(value: Ingredients): Recipe {
    return new Recipe(this.input, value, this.inputReuseable);
  }

  getInputReuseable() {
    return this.inputReuseable;
  }

  equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof Recipe)) return new iBoolean(false);
    if (!this.input.equals(other.input)) return new iBoolean(false);
    if (!this.output.equals(other.output)) return new iBoolean(false);
    if (
      JSON.stringify(this.inputReuseable) !==
      JSON.stringify(other.inputReuseable)
    )
      return new iBoolean(false);
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
