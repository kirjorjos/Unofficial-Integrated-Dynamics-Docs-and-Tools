/**
 * Transpiler: kirjorjos
 * Derived from https://github.com/CyclopsMC/CyclopsCore/ with minimal changes
 * Original Author: rubensworks
 */

import { INbtPathExpression } from "../INbtPathExpression";
import { ListTag } from "../MinecraftClasses/ListTag";
import { Tag } from "../MinecraftClasses/Tag";
import { NbtPathExpressionMatches } from "../NbtPathExpressionMatches";
import {
  HandleResult,
  INbtPathExpressionParseHandler,
} from "./INbtPathExpressionParseHandler";
import { NbtPathExpressionExecutionContext } from "./NBTPathExecutionContext";

/**
 * A handler that handles list slice expressions in the form of "[start:end:step]" such as "[2:3:2]".
 */
export class NbtPathExpressionParseHandlerListSlice
  implements INbtPathExpressionParseHandler
{
  REGEX_RANGE = new RegExp("^\\[([0-9]*):([0-9]*)(:([0-9]+))?\\]");

  handlePrefixOf(nbtPathExpression: string, pos: number): HandleResult {
    const region = nbtPathExpression.slice(pos);
    const match = region.match(this.REGEX_RANGE);
    if (!match) {
      return HandleResult.INVALID;
    }

    const startString = match[1] ?? "";
    const endString = match[2] ?? "";
    const stepString = match[4] ?? null;
    const start = startString !== "" ? parseInt(startString, 10) : 0;
    const end = endString !== "" ? parseInt(endString, 10) : -1;
    const step = stepString !== null ? parseInt(stepString, 10) : 1;
    if (step === 0) {
      return HandleResult.INVALID;
    }

    return new HandleResult(
      new NbtPathExpressionParseHandlerListSlice.Expression(start, end, step),
      3 +
        startString.length +
        endString.length +
        (stepString == null ? 0 : 1 + stepString.length)
    );
  }

  public static newStartEndStepStream(
    start: number,
    end: number,
    step: number
  ): Array<number> {
    end -= start - 1;
    let endScaled = end / step;
    let endMod = end % step > 0 ? 1 : 0;
    let countingArr = [];
    for (let i = 0; i < endScaled + endMod; i++) countingArr.push(i);
    return countingArr.map((i) => i * step + start);
  }

  static Expression: typeof Expression;
}

class Expression extends INbtPathExpression {
  private start: number;
  private end: number;
  private step: number;

  constructor(start: number, end: number, step: number) {
    super();
    this.start = start;
    this.end = end;
    this.step = step;
  }

  public getStart(): number {
    return this.start;
  }

  public getEnd(): number {
    return this.end;
  }

  public getStep(): number {
    return this.step;
  }

  public override matchContexts(
    executionContexts: Array<NbtPathExpressionExecutionContext>
  ): NbtPathExpressionMatches {
    return new NbtPathExpressionMatches(
      executionContexts
        .flatMap((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (nbt.getType() == Tag.TAG_LIST) {
            let tag = nbt as ListTag;
            let start = this.getStart();
            let actualEnd =
              this.getEnd() > -1
                ? Math.min(tag.size() - 1, this.getEnd())
                : tag.size() - 1;
            let step = this.getStep();
            return NbtPathExpressionParseHandlerListSlice.newStartEndStepStream(
              start,
              actualEnd,
              step
            ).map(
              (i) =>
                new NbtPathExpressionExecutionContext(
                  tag.get(i),
                  executionContext
                )
            );
          }
          return null;
        })
        .filter((e) => e != null)
    );
  }
}

NbtPathExpressionParseHandlerListSlice.Expression = Expression;
