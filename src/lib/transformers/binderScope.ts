export class BinderScope {
  readonly frames: readonly (readonly string[])[];

  constructor(frames: readonly (readonly string[])[] = []) {
    this.frames = frames;
  }

  push(names: readonly string[]): BinderScope {
    return new BinderScope([...this.frames, names]);
  }

  has(name: string): boolean {
    return this.lookup(name) !== undefined;
  }

  lookup(name: string): { index: number; binderDepth: number } | undefined {
    for (let i = this.frames.length - 1; i >= 0; i--) {
      const index = this.frames[i]!.indexOf(name);
      if (index !== -1) {
        return { index, binderDepth: this.frames.length - 1 - i };
      }
    }
    return undefined;
  }

  get size(): number {
    return this.frames.length;
  }

  get names(): string[] {
    return this.frames.flat();
  }
}
