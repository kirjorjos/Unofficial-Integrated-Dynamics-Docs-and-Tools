export type AspectSettings = Record<string, number | boolean | string>;

export interface AspectSettingsInfo {
  displayName: string;
  description?: string;
}

export interface AspectStatic {
  displayName: string;
  fullDisplayName: string;
  nicknames: string[];
  settings: AspectSettings;
  icon: string;
  outputType: string;
  signature?: string[];
  inGameDisplayName?: string;
  tooltipInfo?: string;
  settingsInfo?: Record<string, AspectSettingsInfo>;
}

export abstract class AspectBase {}
