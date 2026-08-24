export type AspectSettings = Record<string, number | boolean | string>;

export interface AspectStatic {
  displayName: string;
  fullDisplayName: string;
  nicknames: string[];
  settings: AspectSettings;
  icon: string;
  outputType: string;
}

export abstract class AspectBase {}
