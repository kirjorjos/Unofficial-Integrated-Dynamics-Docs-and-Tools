import type {
  AspectSettings,
  AspectStatic,
} from "lib/IntegratedDynamicsClasses/readers/AspectBase";

export type { AspectSettings };

export type ReaderAspects = Record<string, AspectStatic>;

/**
 * Base class for all reader pseudo-operators.
 *
 * Provides shared static utilities (e.g. getAspectBitWidth) and serves
 * as a type anchor for the reader registry.
 *
 * Subclasses define their own static metadata properties (typeName,
 * shortName, numericID, aspects) and inherit getAspectBitWidth() and
 * getOutputTypeForAspect().
 *
 * Note: Static property declarations are intentionally omitted here
 * to avoid requiring `override` on every subclass when
 * noImplicitOverride is enabled.
 */
export abstract class ReaderBase {
  /**
   * Returns the minimum bit width needed to encode the aspect enum
   * for this reader. Derived from the number of defined aspects.
   */
  static getAspectBitWidth(): number {
    // `this` in a static method resolves to the concrete subclass at runtime,
    // which always has `aspects` defined.
    const self = this as unknown as { aspects: ReaderAspects };
    const count = Object.keys(self.aspects).length;
    return count <= 1 ? 1 : Math.ceil(Math.log2(count));
  }

  /**
   * Returns the AST type name the given aspect produces (e.g. "Integer").
   * Looks up the aspect class and reads its outputType static.
   */
  static getOutputTypeForAspect(aspectName: string): string | undefined {
    // `this` in a static method resolves to the concrete subclass at runtime,
    // which always has `aspects` defined.
    const self = this as unknown as { aspects: ReaderAspects };
    return self.aspects[aspectName]?.outputType;
  }
}

/**
 * Interface for the static side of a reader class.
 * Used by the reader registry to type-check reader entries.
 */
export interface ReaderStatic {
  typeName: string;
  shortName: string;
  numericID: number;
  aspects: ReaderAspects;
  getAspectBitWidth(): number;
  getOutputTypeForAspect(aspectName: string): string | undefined;
}
