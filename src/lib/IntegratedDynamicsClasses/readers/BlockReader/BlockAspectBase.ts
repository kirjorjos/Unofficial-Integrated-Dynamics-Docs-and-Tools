import { AspectBase } from "lib/IntegratedDynamicsClasses/readers/AspectBase";

/**
 * Base class for all BlockReader aspects.
 *
 * Note: Static property declarations are intentionally omitted here to
 * avoid requiring `override` on every subclass when noImplicitOverride
 * is enabled (same pattern as ReaderBase/AspectBase).
 */
export abstract class BlockAspectBase extends AspectBase {}
