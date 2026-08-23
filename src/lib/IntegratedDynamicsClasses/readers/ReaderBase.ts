import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";

export type AspectSettings = Record<string, number | boolean | string>;

export type AspectDefinition = {
  settings: AspectSettings;
  icon?: string;
  displayName?: string;
};

export type ReaderAspects = Record<string, AspectDefinition>;

/**
 * Base class for all reader pseudo-operators.
 *
 * Provides shared static utilities (e.g. getAspectBitWidth) and serves
 * as a type anchor for the reader registry.
 *
 * Subclasses define their own static metadata properties (typeName,
 * shortName, numericID, aspects, aspectOutputType) and inherit
 * getAspectBitWidth() and getOutputTypeForAspect().
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
   * Returns the output type entry for an aspect name.
   * Looks up the aspect's output_type from aspects.json and resolves it
   * to a canonical AST type name and position ID.
   */
  static getOutputTypeForAspect(
    aspectName: string
  ):
    | (typeof OUTPUT_TYPE_TO_AST_TYPE)[keyof typeof OUTPUT_TYPE_TO_AST_TYPE]
    | undefined {
    // `this` in a static method resolves to the concrete subclass at runtime,
    // which always has aspectOutputType defined.
    const self = this as unknown as {
      aspectOutputType: Record<string, string>;
    };
    const astTypeName = self.aspectOutputType[aspectName];
    if (!astTypeName) return undefined;
    return Object.values(OUTPUT_TYPE_TO_AST_TYPE).find(
      (entry) => entry.astType === astTypeName
    );
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
  aspectOutputType: Record<string, string>;
  getAspectBitWidth(): number;
  getOutputTypeForAspect(
    aspectName: string
  ):
    | (typeof OUTPUT_TYPE_TO_AST_TYPE)[keyof typeof OUTPUT_TYPE_TO_AST_TYPE]
    | undefined;
}
