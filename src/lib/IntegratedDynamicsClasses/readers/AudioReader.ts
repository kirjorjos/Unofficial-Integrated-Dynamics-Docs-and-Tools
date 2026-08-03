import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class AudioReader extends ReaderBase {
  static typeName = "AudioReader";
  static shortName = "audio";
  /** 9-bit compressed ID — position 19 in aspects.json reader order */
  static numericID = 19;

  static aspects: Record<
    string,
    { settings: Record<string, number | boolean | string> }
  > = {
    INTEGER_HARP_NOTE: { settings: { range: 64 } },
    INTEGER_BASEDRUM_NOTE: { settings: { range: 64 } },
    INTEGER_SNARE_NOTE: { settings: { range: 64 } },
    INTEGER_HAT_NOTE: { settings: { range: 64 } },
    INTEGER_BASS_NOTE: { settings: { range: 64 } },
    INTEGER_FLUTE_NOTE: { settings: { range: 64 } },
    INTEGER_BELL_NOTE: { settings: { range: 64 } },
    INTEGER_GUITAR_NOTE: { settings: { range: 64 } },
    INTEGER_CHIME_NOTE: { settings: { range: 64 } },
    INTEGER_XYLOPHONE_NOTE: { settings: { range: 64 } },
    INTEGER_IRON_XYLOPHONE_NOTE: { settings: { range: 64 } },
    INTEGER_COW_BELL_NOTE: { settings: { range: 64 } },
    INTEGER_DIDGERIDOO_NOTE: { settings: { range: 64 } },
    INTEGER_BIT_NOTE: { settings: { range: 64 } },
    INTEGER_BANJO_NOTE: { settings: { range: 64 } },
    INTEGER_PLING_NOTE: { settings: { range: 64 } },
  };

  static aspectOutputType: Record<string, string> = {
    INTEGER_HARP_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_BASEDRUM_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_SNARE_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_HAT_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_BASS_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_FLUTE_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_BELL_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_GUITAR_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_CHIME_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_XYLOPHONE_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_IRON_XYLOPHONE_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_COW_BELL_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_DIDGERIDOO_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_BIT_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_BANJO_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
    INTEGER_PLING_NOTE: OUTPUT_TYPE_TO_AST_TYPE["integer"].astType,
  };
}
