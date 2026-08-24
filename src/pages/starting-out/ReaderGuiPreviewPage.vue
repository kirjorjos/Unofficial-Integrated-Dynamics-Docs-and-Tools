<script setup lang="ts">
import ReaderGuiView from "../../components/ReaderGuiView.vue";
import { AudioReader } from "lib/IntegratedDynamicsClasses/readers/AudioReader/AudioReader";
import { BlockReader } from "lib/IntegratedDynamicsClasses/readers/BlockReader/BlockReader";
import { EntityReader } from "lib/IntegratedDynamicsClasses/readers/EntityReader/EntityReader";
import { ExtradimensionalReader } from "lib/IntegratedDynamicsClasses/readers/ExtradimensionalReader/ExtradimensionalReader";
import { FluidReader } from "lib/IntegratedDynamicsClasses/readers/FluidReader/FluidReader";
import { InventoryReader } from "lib/IntegratedDynamicsClasses/readers/InventoryReader/InventoryReader";
import { MachineReader } from "lib/IntegratedDynamicsClasses/readers/MachineReader/MachineReader";
import { NetworkReader } from "lib/IntegratedDynamicsClasses/readers/NetworkReader/NetworkReader";
import { RedstoneReader } from "lib/IntegratedDynamicsClasses/readers/RedstoneReader/RedstoneReader";
import { WorldReader } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldReader";

const readers = [
  RedstoneReader,
  InventoryReader,
  WorldReader,
  FluidReader,
  NetworkReader,
  BlockReader,
  EntityReader,
  ExtradimensionalReader,
  MachineReader,
  AudioReader,
];

const exampleValues: Record<string, Record<string, string>> = {
  NetworkReader: {
    BOOLEAN_APPLICABLE: "false",
    INTEGER_ELEMENT_COUNT: "0",
    INTEGER_ENERGY_BATTERY_COUNT: "0",
    INTEGER_ENERGY_STORED: "0",
    INTEGER_ENERGY_MAX: "0",
    INTEGER_ENERGY_CONSUMPTION_RATE: "0",
    ANY_VALUE: "0",
    OPERATOR_GETVARIABLEBYID: "0",
  },
};

const lastAspect = (reader: (typeof readers)[number]): string => {
  const keys = Object.keys(reader.aspects);
  return (keys[keys.length - 1] ?? keys[0])!;
};
</script>

<template>
  <article class="doc-page reader-gui-preview-page">
    <h2>Reader GUI preview (dev)</h2>
    <p>
      Each reader rendered twice: <strong>unfiltered</strong> (no search query,
      all aspects visible) and <strong>focused</strong> on the first aspect
      (search bar filled, single row shown).
    </p>

    <div class="reader-gui-preview-list">
      <section
        v-for="reader in readers"
        :key="reader.typeName"
        class="reader-gui-preview-entry"
      >
        <h3>{{ reader.typeName }}</h3>
        <div class="reader-gui-preview-shots">
          <div
            class="reader-gui-shot"
            :data-shot="`${reader.shortName}-unfiltered`"
          >
            <ReaderGuiView
              :reader="reader"
              :values="exampleValues[reader.typeName]"
            />
          </div>
          <div
            class="reader-gui-shot"
            :data-shot="`${reader.shortName}-focused`"
          >
            <ReaderGuiView
              :reader="reader"
              :focused-aspect="Object.keys(reader.aspects)[0]"
              :values="exampleValues[reader.typeName]"
            />
          </div>
          <div class="reader-gui-shot" :data-shot="`${reader.shortName}-last`">
            <ReaderGuiView
              :reader="reader"
              :focused-aspect="lastAspect(reader)"
              :values="exampleValues[reader.typeName]"
            />
          </div>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>
.reader-gui-preview-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.reader-gui-preview-entry h3 {
  margin: 0 0 0.5rem;
}

.reader-gui-preview-shots {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.reader-gui-shot {
  display: inline-flex;
  align-items: flex-start;
  background: #2b2b2b;
  padding: 8px 8px 8px 48px;
  box-shadow: 0 14px 30px rgba(24, 48, 58, 0.18);
}
</style>
