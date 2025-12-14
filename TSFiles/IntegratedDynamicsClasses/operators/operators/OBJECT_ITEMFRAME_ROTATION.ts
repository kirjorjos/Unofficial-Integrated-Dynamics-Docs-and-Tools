OBJECT_ITEMFRAME_ROTATION: {
    internalName: "integrateddynamics:entity_itemframerotation",
    nicknames: [
      "ItemframeRotation",
      "itemframe_rotation",
      "itemframeRotation",
      "item_frame_rotation",
      "itemFrameRotation",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "itemframe_rotation",
    interactName: "entityItemFrameRotation",
    function: (entity: Entity): Integer => {
      if (entity.isItemFrame()) {
        return entity.getItemFrameRotation();
      } else {
        throw new Error("Entity is not an item frame.");
      }
    },
  },