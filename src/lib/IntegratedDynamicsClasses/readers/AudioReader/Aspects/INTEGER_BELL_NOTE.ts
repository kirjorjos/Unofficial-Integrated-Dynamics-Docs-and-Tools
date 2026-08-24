import { AudioAspectBase } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioAspectBase";

export class AUDIO_INTEGER_BELL_NOTE extends AudioAspectBase {
  static displayName = "bellNote";
  static fullDisplayName = "Bell Note";
  static nicknames = ["bellNote", "bell_note", "bell"];
  static icon = "integer/audio/instrument/bell";
  static tooltipInfo = "Reads a bell note, expected range [0, 24]";
}
