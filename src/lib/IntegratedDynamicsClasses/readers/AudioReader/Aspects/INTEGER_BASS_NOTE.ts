import { AudioAspectBase } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioAspectBase";

export class AUDIO_INTEGER_BASS_NOTE extends AudioAspectBase {
  static displayName = "bassNote";
  static fullDisplayName = "Bass Note";
  static nicknames = ["bassNote", "bass_note", "bass"];
  static icon = "integer/audio/instrument/bass";
  static tooltipInfo = "Reads a bass note, expected range [0, 24]";
}
