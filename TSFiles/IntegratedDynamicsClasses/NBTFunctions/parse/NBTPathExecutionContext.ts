/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { Tag } from "../MinecraftClasses/Tag";

/**
 * A context that is passed during the NBT path execution.
 */
export class NbtPathExpressionExecutionContext {
  private currentTag: Tag<IntegratedValue>;
  private parentContext?: NbtPathExpressionExecutionContext;

  constructor(
    currentTag: Tag<IntegratedValue>,
    parentContext?: NbtPathExpressionExecutionContext
  ) {
    this.currentTag = currentTag;
    this.parentContext = parentContext;
  }

  getCurrentTag(): Tag<IntegratedValue> {
    return this.currentTag;
  }

  getParentContext(): NbtPathExpressionExecutionContext | undefined {
    return this.parentContext;
  }

  getRootContext(): NbtPathExpressionExecutionContext {
    const parent = this.getParentContext();
    return parent ? parent.getRootContext() : this;
  }

  equals(obj: NbtPathExpressionExecutionContext): boolean {
    if (!(obj instanceof NbtPathExpressionExecutionContext)) {
      return false;
    }
    let that = obj as NbtPathExpressionExecutionContext;
    return this.getCurrentTag().equals(that.getCurrentTag());
  }
}
