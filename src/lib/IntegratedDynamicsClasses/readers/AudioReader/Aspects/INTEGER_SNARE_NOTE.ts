import { AudioAspectBase } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioAspectBase";

export class AUDIO_INTEGER_SNARE_NOTE extends AudioAspectBase {
  static displayName = "snareNote";
  static fullDisplayName = "Snare Note";
  static nicknames = ["snareNote", "snare_note", "snare"];
  static icon = "integer/audio/instrument/snare";
}
