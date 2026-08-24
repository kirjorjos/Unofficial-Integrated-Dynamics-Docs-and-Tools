import { AudioAspectBase } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioAspectBase";

export class AUDIO_INTEGER_HAT_NOTE extends AudioAspectBase {
  static displayName = "hatNote";
  static fullDisplayName = "Hat Note";
  static nicknames = ["hatNote", "hat_note", "hat"];
  static icon = "integer/audio/instrument/hat";
}
