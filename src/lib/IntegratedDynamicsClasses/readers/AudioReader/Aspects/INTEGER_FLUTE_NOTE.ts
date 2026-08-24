import { AudioAspectBase } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioAspectBase";

export class AUDIO_INTEGER_FLUTE_NOTE extends AudioAspectBase {
  static displayName = "fluteNote";
  static fullDisplayName = "Flute Note";
  static nicknames = ["fluteNote", "flute_note", "flute"];
  static icon = "integer/audio/instrument/flute";
  static tooltipInfo = "Reads a flute note, expected range [0, 24]";
}
