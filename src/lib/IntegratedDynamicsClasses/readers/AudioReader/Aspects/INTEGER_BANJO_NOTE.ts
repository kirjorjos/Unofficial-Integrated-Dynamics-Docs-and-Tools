import { AudioAspectBase } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioAspectBase";

export class AUDIO_INTEGER_BANJO_NOTE extends AudioAspectBase {
  static displayName = "banjoNote";
  static fullDisplayName = "Banjo Note";
  static nicknames = ["banjoNote", "banjo_note", "banjo"];
  static icon = "integer/audio/instrument/banjo";
}
