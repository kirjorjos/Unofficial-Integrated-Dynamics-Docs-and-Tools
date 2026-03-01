import { Fluid } from "./Fluid";
import { Item } from "./Item";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Long } from "../JavaNumberClasses/Long";
import { iBoolean } from "./typeWrappers/iBoolean";
import { iArrayEager } from "./typeWrappers/iArrayEager";
import { iArray } from "./typeWrappers/iArray";
import { Named } from "./Named";
import { iString } from "./typeWrappers/iString";
import { Integer } from "../JavaNumberClasses/Integer";
import { Properties } from "./Properties";

export class Ingredients implements IntegratedValue, Named {
  private items: iArray<Item>;
  private fluids: iArray<Fluid>;
  private energies: iArray<Long>;
  private _signatureCache: any;

  constructor(
    items = new iArrayEager<Item>([]) as iArray<Item>,
    fluids = new iArrayEager<Fluid>([]) as iArray<Fluid>,
    energies = new iArrayEager<Long>([]) as iArray<Long>
  ) {
    this.items = items;
    this.fluids = fluids;
    this.energies = energies;
  }

  setItem(item: Item, index: Integer): Ingredients {
    let items = [...this.items.valueOf()];
    let idx = index.toJSNumber();
    for (let i = items.length; i < idx; i++) {
      items[i] = new Item(new Properties({}));
    }
    items[idx] = item;
    return new Ingredients(
      new iArrayEager<Item>(items),
      this.fluids,
      this.energies
    );
  }

  setFluid(fluid: Fluid, index: Integer): Ingredients {
    let fluids = [...this.fluids.valueOf()];
    let idx = index.toJSNumber();
    for (let i = fluids.length; i < idx; i++) {
      fluids[i] = new Fluid(new Properties({}));
    }
    fluids[idx] = fluid;
    return new Ingredients(
      this.items,
      new iArrayEager<Fluid>(fluids),
      this.energies
    );
  }

  setEnergy(energy: Long, index: Integer): Ingredients {
    let energies = [...this.energies.valueOf()];
    let idx = index.toJSNumber();
    for (let i = energies.length; i < idx; i++) {
      energies[i] = Long.ZERO;
    }
    energies[idx] = energy;
    return new Ingredients(
      this.items,
      this.fluids,
      new iArrayEager<Long>(energies)
    );
  }

  withItems(items: iArray<Item>): Ingredients {
    return new Ingredients(items, this.fluids, this.energies);
  }

  withFluids(fluids: iArray<Fluid>): Ingredients {
    return new Ingredients(this.items, fluids, this.energies);
  }

  withEnergies(energies: iArray<Long>): Ingredients {
    return new Ingredients(this.items, this.fluids, energies);
  }

  appendItems(items: iArray<Item>): Ingredients {
    return new Ingredients(
      new iArrayEager<Item>([...this.items.valueOf(), ...items.valueOf()]),
      this.fluids,
      this.energies
    );
  }

  appendFluids(fluids: iArray<Fluid>): Ingredients {
    return new Ingredients(
      this.items,
      new iArrayEager<Fluid>([...this.fluids.valueOf(), ...fluids.valueOf()]),
      this.energies
    );
  }

  appendEnergies(energies: iArray<Long>): Ingredients {
    return new Ingredients(
      this.items,
      this.fluids,
      new iArrayEager<Long>([...this.energies.valueOf(), ...energies.valueOf()])
    );
  }

  getItems(): iArray<Item> {
    return this.items;
  }

  getFluids(): iArray<Fluid> {
    return this.fluids;
  }

  getEnergies(): iArray<Long> {
    return this.energies;
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "Ingredients" }, false);
    this._signatureCache = newSignature;
    return newSignature;
  }

  equals(other: IntegratedValue) {
    if (!(other instanceof Ingredients)) return new iBoolean(false);
    else {
      if (!this.getItems().equals(other.getItems())) return new iBoolean(false);
      if (!this.getFluids().equals(other.getFluids()))
        return new iBoolean(false);
      if (!this.getEnergies().equals(other.getEnergies()))
        return new iBoolean(false);
    }
    return new iBoolean(true);
  }

  getName() {
    return new iString(
      [
        ...this.fluids.valueOf().map((e) => e.getName()),
        ...this.energies.valueOf().map((e) => e.getName()),
        ...this.items.valueOf().map((e) => e.getName()),
      ].join(", ")
    );
  }
}
