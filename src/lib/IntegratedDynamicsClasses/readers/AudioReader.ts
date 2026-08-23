import { OUTPUT_TYPE_TO_AST_TYPE } from "lib/IntegratedDynamicsClasses/readers/readerOutputTypes";
import { ReaderBase } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";

export class AudioReader extends ReaderBase {
  static typeName = "AudioReader";
  static shortName = "audio";
  /** 9-bit compressed ID — position 19 in aspects.json reader order */
  static numericID = 19;

  static aspects: Record<
    string,
    {
      settings: Record<string, number | boolean | string>;
      icon: string;
      displayName: string;
    }
  > = {
    INTEGER_HARP_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/harp",
      displayName: "Harp Note",
    },
    INTEGER_BASEDRUM_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/basedrum",
      displayName: "Base Drum Note",
    },
    INTEGER_SNARE_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/snare",
      displayName: "Snare Note",
    },
    INTEGER_HAT_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/hat",
      displayName: "Hat Note",
    },
    INTEGER_BASS_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/bass",
      displayName: "Bass Note",
    },
    INTEGER_FLUTE_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/flute",
      displayName: "Flute Note",
    },
    INTEGER_BELL_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/bell",
      displayName: "Bell Note",
    },
    INTEGER_GUITAR_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/guitar",
      displayName: "Guitar Note",
    },
    INTEGER_CHIME_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/chime",
      displayName: "Chime Note",
    },
    INTEGER_XYLOPHONE_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/xylophone",
      displayName: "Xylophone Note",
    },
    INTEGER_IRON_XYLOPHONE_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/iron_xylophone",
      displayName: "Iron Xylophone Note",
    },
    INTEGER_COW_BELL_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/cow_bell",
      displayName: "Cow Bell Note",
    },
    INTEGER_DIDGERIDOO_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/didgeridoo",
      displayName: "Didgeridoo Note",
    },
    INTEGER_BIT_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/bit",
      displayName: "Bit Note",
    },
    INTEGER_BANJO_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/banjo",
      displayName: "Banjo Note",
    },
    INTEGER_PLING_NOTE: {
      settings: { range: 64 },
      icon: "integer/audio/instrument/pling",
      displayName: "Pling Note",
    },
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
