export type AspectSettings = Record<string, number | boolean | string>;

export interface AspectStatic {
  displayName: string;
  fullDisplayName: string;
  nicknames: string[];
  settings: AspectSettings;
  icon: string;
  outputType: string;
  signature?: string[];
  inGameDisplayName?: string;
}

export abstract class AspectBase {}
