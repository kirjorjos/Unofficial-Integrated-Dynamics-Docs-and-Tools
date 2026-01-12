import { CompoundTag } from "./NBTFunctions/MinecraftClasses/CompoundTag";

export class Properties {
  data: Record<string, any>;

  constructor(data: Record<string, any>) {
    this.data = data;
  }

  has(key: string): boolean {
    return key in this.data;
  }

  set(key: string, value: any) {
    this.data[key] = value;
  }

  setAll(newData: Properties) {
    for (const [k, v] of newData.getItterator()) {
      this.data[k] = v;
    }
  }

  getItterator(): [string, any][] {
    return Object.entries(this.data);
  }

  get(key: string) {
    return this.data[key];
  }

  toCompoundTag(): CompoundTag {
    let result = {} as Record<string, any>;
    for (const [k, v] of Object.entries(this.data)) {
      result[k] = v;
    }
    return new CompoundTag(result);
  }
}
