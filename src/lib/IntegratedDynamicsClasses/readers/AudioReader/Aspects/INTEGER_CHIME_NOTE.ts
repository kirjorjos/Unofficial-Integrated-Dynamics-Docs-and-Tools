import { AudioAspectBase } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioAspectBase";

export class AUDIO_INTEGER_CHIME_NOTE extends AudioAspectBase {
  static displayName = "chimeNote";
  static fullDisplayName = "Chime Note";
  static nicknames = ["chimeNote", "chime_note", "chime"];
  static icon = "integer/audio/instrument/chime";
}
