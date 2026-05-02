import type { LogicProgrammerRenderPatternKey } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export type LogicProgrammerRenderPattern = {
  width: number;
  height: number;
  slotPositions: { left: number; top: number }[];
  symbolPosition: { left: number; top: number } | null;
};

export const LOGIC_PROGRAMMER_RENDER_PATTERNS: Record<
  LogicProgrammerRenderPatternKey,
  LogicProgrammerRenderPattern
> = {
  NONE: { width: 100, height: 22, slotPositions: [], symbolPosition: null },
  NONE_CANVAS_WIDE: {
    width: 158,
    height: 89,
    slotPositions: [],
    symbolPosition: null,
  },
  NONE_CANVAS: {
    width: 136,
    height: 89,
    slotPositions: [],
    symbolPosition: null,
  },
  GENERAL_CHOICE: {
    width: 100,
    height: 22,
    slotPositions: [
      { left: 6, top: 2 },
      { left: 60, top: 2 },
      { left: 80, top: 2 },
    ],
    symbolPosition: { left: 40, top: 2 },
  },
  SINGLE_SLOT: {
    width: 22,
    height: 22,
    slotPositions: [{ left: 2, top: 2 }],
    symbolPosition: null,
  },
  RECIPE: {
    width: 136,
    height: 89,
    slotPositions: [
      { left: 2, top: 2 },
      { left: 20, top: 2 },
      { left: 38, top: 2 },
      { left: 2, top: 20 },
      { left: 20, top: 20 },
      { left: 38, top: 20 },
      { left: 2, top: 38 },
      { left: 20, top: 38 },
      { left: 38, top: 38 },
      { left: 2, top: 58 },
      { left: 100, top: 2 },
      { left: 100, top: 20 },
      { left: 100, top: 38 },
      { left: 82, top: 58 },
    ],
    symbolPosition: null,
  },
  INFIX: {
    width: 100,
    height: 22,
    slotPositions: [
      { left: 2, top: 2 },
      { left: 80, top: 2 },
    ],
    symbolPosition: { left: 50, top: 2 },
  },
  INFIX_LONG: {
    width: 120,
    height: 22,
    slotPositions: [
      { left: 2, top: 2 },
      { left: 100, top: 2 },
    ],
    symbolPosition: { left: 59, top: 2 },
  },
  INFIX_VERYLONG: {
    width: 140,
    height: 22,
    slotPositions: [
      { left: 2, top: 2 },
      { left: 120, top: 2 },
    ],
    symbolPosition: { left: 69, top: 2 },
  },
  PREFIX_1: {
    width: 40,
    height: 22,
    slotPositions: [{ left: 20, top: 2 }],
    symbolPosition: { left: 10, top: 2 },
  },
  PREFIX_1_LONG: {
    width: 100,
    height: 22,
    slotPositions: [{ left: 80, top: 2 }],
    symbolPosition: { left: 40, top: 2 },
  },
  INFIX_2: {
    width: 120,
    height: 22,
    slotPositions: [
      { left: 2, top: 2 },
      { left: 80, top: 2 },
      { left: 100, top: 2 },
    ],
    symbolPosition: { left: 50, top: 2 },
  },
  INFIX_2_LONG: {
    width: 140,
    height: 22,
    slotPositions: [
      { left: 2, top: 2 },
      { left: 100, top: 2 },
      { left: 120, top: 2 },
    ],
    symbolPosition: { left: 60, top: 2 },
  },
  INFIX_2_VERYLONG: {
    width: 160,
    height: 22,
    slotPositions: [
      { left: 2, top: 2 },
      { left: 130, top: 2 },
      { left: 140, top: 2 },
    ],
    symbolPosition: { left: 70, top: 2 },
  },
  INFIX_2_LATE: {
    width: 120,
    height: 22,
    slotPositions: [
      { left: 2, top: 2 },
      { left: 22, top: 2 },
      { left: 100, top: 2 },
    ],
    symbolPosition: { left: 70, top: 2 },
  },
  PREFIX_2: {
    width: 80,
    height: 22,
    slotPositions: [
      { left: 40, top: 2 },
      { left: 60, top: 2 },
    ],
    symbolPosition: { left: 20, top: 2 },
  },
  PREFIX_2_LONG: {
    width: 120,
    height: 22,
    slotPositions: [
      { left: 80, top: 2 },
      { left: 100, top: 2 },
    ],
    symbolPosition: { left: 40, top: 2 },
  },
  INFIX_3: {
    width: 140,
    height: 22,
    slotPositions: [
      { left: 2, top: 2 },
      { left: 80, top: 2 },
      { left: 100, top: 2 },
      { left: 120, top: 2 },
    ],
    symbolPosition: { left: 45, top: 2 },
  },
  PREFIX_3: {
    width: 120,
    height: 22,
    slotPositions: [
      { left: 60, top: 2 },
      { left: 80, top: 2 },
      { left: 100, top: 2 },
    ],
    symbolPosition: { left: 30, top: 2 },
  },
  PREFIX_3_LONG: {
    width: 140,
    height: 22,
    slotPositions: [
      { left: 80, top: 2 },
      { left: 100, top: 2 },
      { left: 120, top: 2 },
    ],
    symbolPosition: { left: 40, top: 2 },
  },
  SUFFIX_1: {
    width: 40,
    height: 22,
    slotPositions: [{ left: 6, top: 2 }],
    symbolPosition: { left: 31, top: 2 },
  },
  SUFFIX_1_LONG: {
    width: 120,
    height: 22,
    slotPositions: [{ left: 2, top: 2 }],
    symbolPosition: { left: 70, top: 2 },
  },
};
