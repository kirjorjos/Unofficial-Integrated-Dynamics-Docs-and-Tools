import { AudioAspectBase } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioAspectBase";

export class AUDIO_INTEGER_BIT_NOTE extends AudioAspectBase {
  static displayName = "bitNote";
  static fullDisplayName = "Bit Note";
  static nicknames = ["bitNote", "bit_note", "bit"];
  static icon = "integer/audio/instrument/bit";
  static tooltipInfo = "Reads a bit note, expected range [0, 24]";
}
