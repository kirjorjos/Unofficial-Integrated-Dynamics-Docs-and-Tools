export const INFO_LINE_PREFIX = "§5§o";

export const isInfoLine = (line: string): boolean =>
  line.startsWith(INFO_LINE_PREFIX);

export const toInfoLines = (value: string): string[] =>
  value ? value.split(/\\n/g).map((part) => `${INFO_LINE_PREFIX}${part}`) : [];

export type TooltipWidthInput = {
  widestLinePx: number;
  widestWordPx: number;
};

const nonNegative = (value: number): number =>
  Number.isFinite(value) && value > 0 ? value : 0;

export const computeTooltipWidth = ({
  widestLinePx,
  widestWordPx,
}: TooltipWidthInput): number =>
  Math.max(nonNegative(widestLinePx), nonNegative(widestWordPx));
