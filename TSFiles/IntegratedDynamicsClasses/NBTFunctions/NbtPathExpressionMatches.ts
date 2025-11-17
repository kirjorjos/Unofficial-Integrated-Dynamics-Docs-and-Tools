/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { Tag } from "./MinecraftClasses/Tag";
import { NbtPathExpressionExecutionContext } from "./parse/NBTPathExecutionContext";

/**
 * A data object representing the result of executing
 * an NBT path expression against an NBT tag.
 */
export class NbtPathExpressionMatches {
  EMPTY = NbtPathExpressionMatches.forAll();

  private matches: Array<NbtPathExpressionExecutionContext>;

  constructor(matches: Array<NbtPathExpressionExecutionContext>) {
    this.matches = matches;
  }

  getContexts(): Array<NbtPathExpressionExecutionContext> {
    return this.matches;
  }

  getMatches(): Array<Tag<IntegratedValue>> {
    return this.getContexts().map((e) => e.getCurrentTag());
  }

  static forAll(
    ...nbts: NbtPathExpressionExecutionContext[]
  ): NbtPathExpressionMatches {
    return new NbtPathExpressionMatches(nbts);
  }
}
