import {
  ReaderBase,
  type ReaderAspects,
} from "lib/IntegratedDynamicsClasses/readers/ReaderBase";
import { AUDIO_INTEGER_HARP_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_HARP_NOTE";
import { AUDIO_INTEGER_BASEDRUM_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_BASEDRUM_NOTE";
import { AUDIO_INTEGER_SNARE_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_SNARE_NOTE";
import { AUDIO_INTEGER_HAT_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_HAT_NOTE";
import { AUDIO_INTEGER_BASS_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_BASS_NOTE";
import { AUDIO_INTEGER_FLUTE_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_FLUTE_NOTE";
import { AUDIO_INTEGER_BELL_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_BELL_NOTE";
import { AUDIO_INTEGER_GUITAR_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_GUITAR_NOTE";
import { AUDIO_INTEGER_CHIME_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_CHIME_NOTE";
import { AUDIO_INTEGER_XYLOPHONE_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_XYLOPHONE_NOTE";
import { AUDIO_INTEGER_IRON_XYLOPHONE_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_IRON_XYLOPHONE_NOTE";
import { AUDIO_INTEGER_COW_BELL_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_COW_BELL_NOTE";
import { AUDIO_INTEGER_DIDGERIDOO_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_DIDGERIDOO_NOTE";
import { AUDIO_INTEGER_BIT_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_BIT_NOTE";
import { AUDIO_INTEGER_BANJO_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_BANJO_NOTE";
import { AUDIO_INTEGER_PLING_NOTE } from "lib/IntegratedDynamicsClasses/readers/AudioReader/Aspects/INTEGER_PLING_NOTE";

export class AudioReader extends ReaderBase {
  static typeName = "AudioReader";
  static shortName = "audio";
  static numericID = 19;

  static aspects: ReaderAspects = {
    INTEGER_HARP_NOTE: AUDIO_INTEGER_HARP_NOTE,
    INTEGER_BASEDRUM_NOTE: AUDIO_INTEGER_BASEDRUM_NOTE,
    INTEGER_SNARE_NOTE: AUDIO_INTEGER_SNARE_NOTE,
    INTEGER_HAT_NOTE: AUDIO_INTEGER_HAT_NOTE,
    INTEGER_BASS_NOTE: AUDIO_INTEGER_BASS_NOTE,
    INTEGER_FLUTE_NOTE: AUDIO_INTEGER_FLUTE_NOTE,
    INTEGER_BELL_NOTE: AUDIO_INTEGER_BELL_NOTE,
    INTEGER_GUITAR_NOTE: AUDIO_INTEGER_GUITAR_NOTE,
    INTEGER_CHIME_NOTE: AUDIO_INTEGER_CHIME_NOTE,
    INTEGER_XYLOPHONE_NOTE: AUDIO_INTEGER_XYLOPHONE_NOTE,
    INTEGER_IRON_XYLOPHONE_NOTE: AUDIO_INTEGER_IRON_XYLOPHONE_NOTE,
    INTEGER_COW_BELL_NOTE: AUDIO_INTEGER_COW_BELL_NOTE,
    INTEGER_DIDGERIDOO_NOTE: AUDIO_INTEGER_DIDGERIDOO_NOTE,
    INTEGER_BIT_NOTE: AUDIO_INTEGER_BIT_NOTE,
    INTEGER_BANJO_NOTE: AUDIO_INTEGER_BANJO_NOTE,
    INTEGER_PLING_NOTE: AUDIO_INTEGER_PLING_NOTE,
  };
}
