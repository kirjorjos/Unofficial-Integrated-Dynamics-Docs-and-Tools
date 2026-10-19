import type { ItemKeys } from "lib/IntegratedDynamicsClasses/registries/itemRegistry";

export const PART_TYPE_TO_ITEM_ID = {
  "integrateddynamics:audio_reader": "integrateddynamics:part_audio_reader",
  "integrateddynamics:block_reader": "integrateddynamics:part_block_reader",
  "integrateddynamics:entity_reader": "integrateddynamics:part_entity_reader",
  "integrateddynamics:extradimensional_reader":
    "integrateddynamics:part_extradimensional_reader",
  "integrateddynamics:fluid_reader": "integrateddynamics:part_fluid_reader",
  "integrateddynamics:inventory_reader":
    "integrateddynamics:part_inventory_reader",
  "integrateddynamics:machine_reader": "integrateddynamics:part_machine_reader",
  "integrateddynamics:network_reader": "integrateddynamics:part_network_reader",
  "integrateddynamics:redstone_reader":
    "integrateddynamics:part_redstone_reader",
  "integrateddynamics:world_reader": "integrateddynamics:part_world_reader",
  "integrateddynamics:audio_writer": "integrateddynamics:part_audio_writer",
  "integrateddynamics:effect_writer": "integrateddynamics:part_effect_writer",
  "integrateddynamics:entity_writer": "integrateddynamics:part_entity_writer",
  "integrateddynamics:machine_writer": "integrateddynamics:part_machine_writer",
  "integrateddynamics:inventory_writer":
    "integrateddynamics:part_inventory_writer",
  "integrateddynamics:redstone_writer":
    "integrateddynamics:part_redstone_writer",
  "integrateddynamics:static_light_panel":
    "integrateddynamics:part_static_light_panel",
  "integrateddynamics:dynamic_light_panel":
    "integrateddynamics:part_dynamic_light_panel",
  "integrateddynamics:display_panel": "integrateddynamics:part_display_panel",
  "integrateddynamics:connector_mono_directional":
    "integrateddynamics:part_connector_mono_directional",
  "integrateddynamics:connector_omni_directional":
    "integrateddynamics:part_connector_omni_directional",
  "integratedtunnels:interface_energy":
    "integratedtunnels:part_interface_energy",
  "integratedtunnels:interface_filter_energy":
    "integratedtunnels:part_interface_filter_energy",
  "integratedtunnels:interface_item": "integratedtunnels:part_interface_item",
  "integratedtunnels:interface_filter_item":
    "integratedtunnels:part_interface_filter_item",
  "integratedtunnels:interface_fluid": "integratedtunnels:part_interface_fluid",
  "integratedtunnels:interface_filter_fluid":
    "integratedtunnels:part_interface_filter_fluid",
  "integratedtunnels:importer_energy": "integratedtunnels:part_importer_energy",
  "integratedtunnels:importer_world_energy":
    "integratedtunnels:part_importer_world_energy",
  "integratedtunnels:importer_item": "integratedtunnels:part_importer_item",
  "integratedtunnels:importer_world_item":
    "integratedtunnels:part_importer_world_item",
  "integratedtunnels:importer_fluid": "integratedtunnels:part_importer_fluid",
  "integratedtunnels:importer_world_fluid":
    "integratedtunnels:part_importer_world_fluid",
  "integratedtunnels:importer_world_block":
    "integratedtunnels:part_importer_world_block",
  "integratedtunnels:exporter_energy": "integratedtunnels:part_exporter_energy",
  "integratedtunnels:exporter_world_energy":
    "integratedtunnels:part_exporter_world_energy",
  "integratedtunnels:exporter_item": "integratedtunnels:part_exporter_item",
  "integratedtunnels:exporter_world_item":
    "integratedtunnels:part_exporter_world_item",
  "integratedtunnels:exporter_fluid": "integratedtunnels:part_exporter_fluid",
  "integratedtunnels:exporter_world_fluid":
    "integratedtunnels:part_exporter_world_fluid",
  "integratedtunnels:exporter_world_block":
    "integratedtunnels:part_exporter_world_block",
  "integratedtunnels:player_simulator":
    "integratedtunnels:part_player_simulator",
  "integratedcrafting:interface_crafting":
    "integratedcrafting:part_interface_crafting",
  "integratedcrafting:crafting_writer":
    "integratedcrafting:part_crafting_writer",
  "integratedterminals:terminal_storage":
    "integratedterminals:part_terminal_storage",
  "integratedterminals:terminal_crafting_job":
    "integratedterminals:part_terminal_crafting_job",
} as const satisfies Record<string, ItemKeys>;

export type PartTypeKey = keyof typeof PART_TYPE_TO_ITEM_ID;
export type PartItemId = (typeof PART_TYPE_TO_ITEM_ID)[PartTypeKey];

export const ITEM_ID_TO_PART_TYPE = Object.fromEntries(
  Object.entries(PART_TYPE_TO_ITEM_ID).map(([partType, itemId]) => [
    itemId,
    partType,
  ])
) as Record<PartItemId, PartTypeKey>;

export const getPartItemId = (partType: string): PartItemId | undefined =>
  (PART_TYPE_TO_ITEM_ID as Record<string, PartItemId>)[partType];

export const getPartTypeForItemId = (itemId: string): PartTypeKey | undefined =>
  ITEM_ID_TO_PART_TYPE[itemId as PartItemId];

/** Whether an item id is one of the Integrated Dynamics part items. */
export const isPartItemId = (itemId: string): itemId is PartItemId =>
  itemId in ITEM_ID_TO_PART_TYPE;

export const derivePartItemId = (partType: string): string | undefined => {
  const separator = partType.indexOf(":");
  if (separator <= 0 || separator === partType.length - 1) return undefined;
  const namespace = partType.slice(0, separator);
  const name = partType.slice(separator + 1);
  return `${namespace}:part_${name}`;
};

export type PartFamily =
  | "reader"
  | "writer"
  | "panel"
  | "connector"
  | "interface"
  | "exporter"
  | "importer"
  | "other";

export const getPartFamily = (partType: string): PartFamily => {
  const separator = partType.indexOf(":");
  const name = separator === -1 ? partType : partType.slice(separator + 1);
  if (name.endsWith("_reader")) return "reader";
  if (name.endsWith("_writer")) return "writer";
  if (name.endsWith("_panel")) return "panel";
  if (name.startsWith("connector_")) return "connector";
  if (name.startsWith("interface")) return "interface";
  if (name.startsWith("exporter")) return "exporter";
  if (name.startsWith("importer")) return "importer";
  return "other";
};
