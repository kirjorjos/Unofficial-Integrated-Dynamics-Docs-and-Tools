OBJECT_BLOCK_PLACESOUND: {
    internalName: "integrateddynamics:block_placesound",
    nicknames: ["BlockPlacesound", "blockPlaceSound", "block_place_sound", "placeSound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "String",
      },
    },
    symbol: "place_sound",
    interactName: "blockPlaceSound",
    function: (block: Block): string => {
      return block.getPlaceSound();
    },
  },