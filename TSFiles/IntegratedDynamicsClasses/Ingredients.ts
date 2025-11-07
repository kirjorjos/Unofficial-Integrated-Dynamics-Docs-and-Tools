import { Fluid } from "./Fluid";
import { Item } from "./Item";
import { Long } from "../JavaNumberClasses/Long"

export class Ingredients {

    private items: Item[];
    private fluids: Fluid[];
    private energies: Long[];
    
    constructor(items = new Array<Item>(), fluids = new Array<Fluid>(), energies = new Array<Long>()) {
        this.items = items;
        this.fluids = fluids;
        this.energies = energies;
    }

    setItem(item: Item, index: Integer): Ingredients {
        let items = [...this.items];
        items[parseInt(index.toDecimal())] = item;
        return new Ingredients(items, this.fluids, this.energies)
    }

    setFluid(fluid: Fluid, index: Integer): Ingredients {
        let fluids = [...this.fluids];
        fluids[parseInt(index.toDecimal())] = fluid;
        return new Ingredients(this.items, fluids, this.energies)
    }

    setEnergy(energy: Long, index: Integer): Ingredients {
        let energies = [...this.energies];
        energies[parseInt(index.toDecimal())] = energy;
        return new Ingredients(this.items, this.fluids, energies)
    }

    appendItems(items: Item[]): Ingredients {
        return new Ingredients([...this.items, ...items], this.fluids, this.energies);
    }

    appendFluids(fluids: Fluid[]): Ingredients {
        return new Ingredients(this.items, [...this.fluids, ...fluids], this.energies);
    }

    appendEnergies(energies: Long[]): Ingredients {
        return new Ingredients(this.items, this.fluids, [...this.energies, ...energies]);
    }

    getItems(): Item[] {
        return this.items;
    }

    getFluids(): Fluid[] {
        return this.fluids;
    }

    getEnergies(): Long[] {
        return this.energies;
    }
}