OBJECT_ITEMFRAME_CONTENTS: {
    internalName: "integrateddynamics:entity_itemframecontents",
    nicknames: [
      "ItemframeContents",
      "itemframe_contents",
      "itemframeContents",
      "item_frame_contents",
      "itemFrameContents",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "itemframe_contents",
    interactName: "entityItemFrameContents",
    function: (entity: Entity): Item => {
      if (entity.isItemFrame()) {
        return entity.getItemFrameContents();
      } else {
        throw new Error("Entity is not an item frame.");
      }
    },
  },