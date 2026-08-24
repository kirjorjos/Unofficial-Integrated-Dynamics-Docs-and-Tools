import { AudioAspectBase } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioAspectBase";

export class AUDIO_INTEGER_GUITAR_NOTE extends AudioAspectBase {
  static displayName = "guitarNote";
  static fullDisplayName = "Guitar Note";
  static nicknames = ["guitarNote", "guitar_note", "guitar"];
  static icon = "integer/audio/instrument/guitar";
  static tooltipInfo = "Reads a guitar note, expected range [0, 24]";
}
