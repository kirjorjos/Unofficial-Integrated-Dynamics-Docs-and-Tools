import { gameData } from "lib/IntegratedDynamicsClasses/registries/registry";
import {
  PART_TYPE_TO_ITEM_ID,
  ITEM_ID_TO_PART_TYPE,
  getPartItemId,
  getPartTypeForItemId,
  isPartItemId,
  derivePartItemId,
  getPartFamily,
  type PartItemId,
} from "lib/transformers/partItemIds";

const PARTS_TAG = "integrateddynamics:parts";

const partsTaggedItems = (): Array<[string, string]> => {
  const found: Array<[string, string]> = [];
  for (const [modId, items] of Object.entries(gameData.items)) {
    for (const [itemName, itemData] of Object.entries(items)) {
      const tags = (itemData as { tags?: readonly string[] }).tags;
      if (tags?.includes(PARTS_TAG)) found.push([modId, itemName]);
    }
  }
  return found;
};

const tableEntries = Object.entries(PART_TYPE_TO_ITEM_ID) as Array<
  [string, PartItemId]
>;

describe("TestPartItemIds", () => {
  it("testEveryTableEntryIsARegisteredPartItem", () => {
    const tagged = new Set(
      partsTaggedItems().map(([modId, itemName]) => `${modId}:${itemName}`)
    );
    for (const [partType, itemId] of tableEntries) {
      expect(tagged.has(itemId)).toBe(true);
      expect(partType).toBe(ITEM_ID_TO_PART_TYPE[itemId]);
    }
  });

  it("testTableCoversExactlyTheRegisteredParts", () => {
    const tagged = new Set(
      partsTaggedItems().map(([modId, itemName]) => `${modId}:${itemName}`)
    );
    const mapped = new Set<string>(tableEntries.map(([, itemId]) => itemId));

    const missing = [...tagged].filter((id) => !mapped.has(id));
    const extra = [...mapped].filter((id) => !tagged.has(id));

    expect(missing).toEqual([]);
    expect(extra).toEqual([]);
    expect(mapped.size).toBe(tagged.size);
  });

  it("testFollowsTheModNamingRule", () => {
    for (const [partType, itemId] of tableEntries) {
      expect(derivePartItemId(partType)).toBe(itemId);
      expect(itemId).toBe(partType.replace(":", ":part_"));
    }
  });

  it("testHasNoDuplicateFactories", () => {
    const itemIds = tableEntries.map(([, itemId]) => itemId);
    expect(new Set(itemIds).size).toBe(itemIds.length);
  });

  it("testMatchesTheModSources", () => {
    const byMod: Record<string, number> = {};
    for (const [partType] of tableEntries) {
      const modId = partType.slice(0, partType.indexOf(":"));
      byMod[modId] = (byMod[modId] ?? 0) + 1;
    }
    expect(byMod).toEqual({
      integrateddynamics: 21,
      integratedtunnels: 21,
      integratedcrafting: 2,
      integratedterminals: 2,
    });
    expect(tableEntries).toHaveLength(46);
  });
});

describe("TestPartItemIdLookups", () => {
  it("testLookupBothWays", () => {
    expect(getPartItemId("integrateddynamics:display_panel")).toBe(
      "integrateddynamics:part_display_panel"
    );
    expect(getPartItemId("integratedtunnels:exporter_item")).toBe(
      "integratedtunnels:part_exporter_item"
    );
    expect(getPartTypeForItemId("integrateddynamics:part_display_panel")).toBe(
      "integrateddynamics:display_panel"
    );
    expect(getPartTypeForItemId("integratedtunnels:part_exporter_item")).toBe(
      "integratedtunnels:exporter_item"
    );
  });

  it("testUnknownNamesAreUndefined", () => {
    expect(getPartItemId("integrateddynamics:not_a_part")).toBeUndefined();
    expect(getPartTypeForItemId("integrateddynamics:variable")).toBeUndefined();
    expect(getPartItemId("integrateddynamics:cable")).toBeUndefined();
  });

  it("testIsPartItemId", () => {
    expect(isPartItemId("integrateddynamics:part_display_panel")).toBe(true);
    expect(isPartItemId("integrateddynamics:variablestore")).toBe(false);
    expect(isPartItemId("minecraft:stone")).toBe(false);
  });

  it("testRoundTripsThroughTheInverse", () => {
    for (const [partType, itemId] of tableEntries) {
      expect(getPartItemId(partType)).toBe(itemId);
      expect(ITEM_ID_TO_PART_TYPE[itemId]).toBe(partType);
      expect(getPartTypeForItemId(itemId)).toBe(partType);
      expect(getPartTypeForItemId(getPartItemId(partType) as string)).toBe(
        partType
      );
    }
  });

  it("testDerivePartItemIdRejectsMalformedInput", () => {
    expect(derivePartItemId("integrateddynamics")).toBeUndefined();
    expect(derivePartItemId("")).toBeUndefined();
    expect(derivePartItemId(":name")).toBeUndefined();
    expect(derivePartItemId("modid:")).toBeUndefined();
  });
});

describe("TestPartFamily", () => {
  it("testFamilies", () => {
    expect(getPartFamily("integrateddynamics:block_reader")).toBe("reader");
    expect(getPartFamily("integrateddynamics:inventory_writer")).toBe("writer");
    expect(getPartFamily("integrateddynamics:display_panel")).toBe("panel");
    expect(getPartFamily("integrateddynamics:static_light_panel")).toBe(
      "panel"
    );
    expect(getPartFamily("integrateddynamics:connector_mono_directional")).toBe(
      "connector"
    );
    expect(getPartFamily("integratedtunnels:interface_item")).toBe("interface");
    expect(getPartFamily("integratedtunnels:interface_filter_item")).toBe(
      "interface"
    );
    expect(getPartFamily("integratedtunnels:exporter_world_item")).toBe(
      "exporter"
    );
    expect(getPartFamily("integratedtunnels:importer_world_block")).toBe(
      "importer"
    );
    expect(getPartFamily("integratedtunnels:player_simulator")).toBe("other");
    expect(getPartFamily("integratedterminals:terminal_storage")).toBe("other");
  });

  it("testEveryTableEntryGetsAFamily", () => {
    const counts: Record<string, number> = {};
    for (const [partType] of tableEntries) {
      const family = getPartFamily(partType);
      counts[family] = (counts[family] ?? 0) + 1;
    }
    expect(counts).toEqual({
      reader: 10,
      writer: 7,
      panel: 3,
      connector: 2,
      interface: 7,
      exporter: 7,
      importer: 7,
      other: 3,
    });
  });
});
