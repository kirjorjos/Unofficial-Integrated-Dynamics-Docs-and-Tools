import { StructuralParseError } from "lib/transformers/parseErrors";

export const DEFAULT_DELAY_INTERVAL = 1;
export const DEFAULT_DELAY_CAPACITY = 5;
export const MAX_DELAY_CAPACITY = 1024;

export interface DelayArgs {
  interval?: number;
  capacity?: number;
  freezeAt?: number;
}

const delayArgumentMessage = (index: number): string => {
  if (index === 1) {
    return "Delay's tick interval must be a positive non-zero integer";
  }
  if (index === 2) {
    return `Delay's capacity must be a whole number from 1 to ${MAX_DELAY_CAPACITY}`;
  }
  return "Delay's freeze tick must be a positive integer";
};

const isValidDelayArgument = (index: number, value: number): boolean => {
  if (!Number.isInteger(value)) return false;
  if (index === 1) return value >= 1;
  if (index === 2) return value >= 1 && value <= MAX_DELAY_CAPACITY;
  return value >= 0;
};

export const checkDelayArgument = (index: number, value: number): number => {
  if (!isValidDelayArgument(index, value)) {
    throw new StructuralParseError(delayArgumentMessage(index));
  }
  return value;
};

export const parseDelayArgument = (index: number, text: string): number => {
  if (!/^-?\d+$/.test(text)) {
    throw new StructuralParseError(delayArgumentMessage(index));
  }
  return checkDelayArgument(index, Number(text));
};

export const delayArgsFromPositional = (args: number[]): DelayArgs => {
  const [interval, capacity, freezeAt] = args;
  return {
    ...(interval !== undefined && interval !== DEFAULT_DELAY_INTERVAL
      ? { interval }
      : {}),
    ...(capacity !== undefined && capacity !== DEFAULT_DELAY_CAPACITY
      ? { capacity }
      : {}),
    ...(freezeAt !== undefined ? { freezeAt } : {}),
  };
};

export const delayToText = (node: {
  interval?: number;
  capacity?: number;
  freezeAt?: number;
}): string => {
  const interval = node.interval ?? DEFAULT_DELAY_INTERVAL;
  const capacity = node.capacity ?? DEFAULT_DELAY_CAPACITY;
  const hasFreeze = node.freezeAt !== undefined;
  let text = "";
  if (
    interval !== DEFAULT_DELAY_INTERVAL ||
    capacity !== DEFAULT_DELAY_CAPACITY ||
    hasFreeze
  ) {
    text += `, ${interval}`;
  }
  if (capacity !== DEFAULT_DELAY_CAPACITY || hasFreeze) {
    text += `, ${capacity}`;
  }
  if (hasFreeze) {
    text += `, ${node.freezeAt}`;
  }
  return text;
};
