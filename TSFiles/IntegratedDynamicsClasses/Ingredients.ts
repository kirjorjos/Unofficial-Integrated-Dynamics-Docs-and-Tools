import { Fluid } from "./Fluid";
import { Item } from "./Item";
import { Long } from "../JavaNumberClasses/Long";
import { iBoolean } from "./typeWrappers/iBoolean";
import { iArray } from "./typeWrappers/iArray";

export class Ingredients implements IntegratedValue {
  private items: iArray<Item>;
  private fluids: iArray<Fluid>;
  private energies: iArray<Long>;

  constructor(
    items = new iArray<Item>([]),
    fluids = new iArray<Fluid>([]),
    energies = new iArray<Long>([])
  ) {
    this.items = items;
    this.fluids = fluids;
    this.energies = energies;
  }

  setItem(item: Item, index: Integer): Ingredients {
    let items = [...this.items.valueOf()];
    items[parseInt(index.toDecimal())] = item;
    return new Ingredients(new iArray<Item>(items), this.fluids, this.energies);
  }

  setFluid(fluid: Fluid, index: Integer): Ingredients {
    let fluids = [...this.fluids.valueOf()];
    fluids[parseInt(index.toDecimal())] = fluid;
    return new Ingredients(
      this.items,
      new iArray<Fluid>(fluids),
      this.energies
    );
  }

  setEnergy(energy: Long, index: Integer): Ingredients {
    let energies = [...this.energies.valueOf()];
    energies[parseInt(index.toDecimal())] = energy;
    return new Ingredients(this.items, this.fluids, new iArray<Long>(energies));
  }

  appendItems(items: iArray<Item>): Ingredients {
    return new Ingredients(
      new iArray<Item>([...this.items.valueOf(), ...items.valueOf()]),
      this.fluids,
      this.energies
    );
  }

  appendFluids(fluids: iArray<Fluid>): Ingredients {
    return new Ingredients(
      this.items,
      new iArray<Fluid>([...this.fluids.valueOf(), ...fluids.valueOf()]),
      this.energies
    );
  }

  appendEnergies(energies: iArray<Long>): Ingredients {
    return new Ingredients(
      this.items,
      this.fluids,
      new iArray<Long>([...this.energies.valueOf(), ...energies.valueOf()])
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

  getSignatureNode(): TypeRawSignatureAST.RawSignatureNode {
    return {
      type: "Ingredients",
    };
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
}
