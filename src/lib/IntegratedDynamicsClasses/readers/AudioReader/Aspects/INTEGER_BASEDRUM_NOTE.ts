import { AudioAspectBase } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioAspectBase";

export class AUDIO_INTEGER_BASEDRUM_NOTE extends AudioAspectBase {
  static displayName = "baseDrumNote";
  static fullDisplayName = "Base Drum Note";
  static nicknames = ["baseDrumNote", "base_drum_note", "baseDrum", "basedrum"];
  static icon = "integer/audio/instrument/basedrum";
  static tooltipInfo = "Reads a base drum note, expected range [0, 24]";
}
