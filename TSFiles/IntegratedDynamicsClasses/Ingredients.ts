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
import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "./NBTFunctions/MinecraftClasses/ListTag";
import { Tag } from "./NBTFunctions/MinecraftClasses/Tag";
import { LongTag } from "./NBTFunctions/MinecraftClasses/LongTag";

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

  serializeNBT(): CompoundTag {
    let result = new CompoundTag();

    if (this.items.size().gt(Integer.ZERO)) {
      const itemTags = this.items.valueOf().map((item) => item.serializeNBT());
      result = result.set(
        "minecraft:itemstack",
        new ListTag(new iArrayEager(itemTags))
      );
    }

    if (this.fluids.size().gt(Integer.ZERO)) {
      const fluidTags = this.fluids
        .valueOf()
        .map((fluid) => fluid.serializeNBT());
      result = result.set(
        "minecraft:fluidstack",
        new ListTag(new iArrayEager(fluidTags))
      );
    }

    if (this.energies.size().gt(Integer.ZERO)) {
      const energyTags = this.energies
        .valueOf()
        .map((energy) => new LongTag(energy));
      result = result.set(
        "minecraft:energy",
        new ListTag(new iArrayEager(energyTags))
      );
    }

    return result;
  }

  static deserializeNBT(tag: Tag<IntegratedValue>): Ingredients {
    if (!(tag instanceof CompoundTag)) {
      return new Ingredients();
    }
    const compound = tag as CompoundTag;
    let items = new iArrayEager<Item>([]);
    let fluids = new iArrayEager<Fluid>([]);
    let energies = new iArrayEager<Long>([]);

    const itemStacksNode = compound.get(new iString("minecraft:itemstack"));
    if (itemStacksNode instanceof ListTag) {
      items = new iArrayEager(
        itemStacksNode
          .valueOf()
          .valueOf()
          .map((t) => Item.deserializeNBT(t))
      );
    }

    const fluidStacksNode = compound.get(new iString("minecraft:fluidstack"));
    if (fluidStacksNode instanceof ListTag) {
      fluids = new iArrayEager(
        fluidStacksNode
          .valueOf()
          .valueOf()
          .map((t) => Fluid.deserializeNBT(t))
      );
    }

    const energiesNode = compound.get(new iString("minecraft:energy"));
    if (energiesNode instanceof ListTag) {
      energies = new iArrayEager(
        energiesNode
          .valueOf()
          .valueOf()
          .map((t) => (t as LongTag).valueOf())
      );
    }

    return new Ingredients(items, fluids, energies);
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
