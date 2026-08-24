import { AudioAspectBase } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioAspectBase";

export class AUDIO_INTEGER_HARP_NOTE extends AudioAspectBase {
  static displayName = "harpNote";
  static fullDisplayName = "Harp Note";
  static nicknames = ["harpNote", "harp_note", "harp"];
  static icon = "integer/audio/instrument/harp";
}
