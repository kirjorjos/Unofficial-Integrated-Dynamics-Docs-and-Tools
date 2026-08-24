<script setup lang="ts">
import { computed, ref, watch } from "vue";
import DisplayPanelView from "../../components/DisplayPanelView.vue";
import DisplayPanelViewHolder from "../../components/DisplayPanelViewHolder.vue";
import ReaderGuiView from "../../components/ReaderGuiView.vue";
import { getTypeColor } from "pages-lib/visualTransformer";
import { getCompactValueTextForAst } from "pages-lib/visualTransformerLogic";
import type { ReaderClass } from "lib/IntegratedDynamicsClasses/readers/readerRegistry";
import { resolveReaderSimulatedValue } from "lib/IntegratedDynamicsClasses/readers/readerSimulatedValueResolver";
import {
  getAspectSettingsEntries,
  getReaderAspect,
  getReaderAspectDefaultValue,
  getReaderAspectKey,
  getReaderClassByName,
  isSimulatedValueParseError,
  parseSimulatedValueText,
} from "lib/IntegratedDynamicsClasses/readers/readerRegistry";

const props = defineProps<{
  readerKey: string;
  aspectKey: string;
}>();

const READER_TITLES: Record<string, string> = {
  redstone: "Redstone Reader",
  inventory: "Inventory Reader",
  world: "World Reader",
  fluid: "Fluid Reader",
  network: "Network Reader",
  block: "Block Reader",
  entity: "Entity Reader",
  extradimensional: "Extra-Dimensional Reader",
  machine: "Machine Reader",
  audio: "Audio Reader",
};

const SETTING_INDENT = "\u00A0\u00A0";

const readerClass = computed<ReaderClass | undefined>(() =>
  getReaderClassByName(props.readerKey)
);

const resolvedAspectKey = computed(() => {
  if (!readerClass.value) return undefined;
  return getReaderAspectKey(readerClass.value, props.aspectKey);
});

const aspect = computed(() => {
  if (!readerClass.value || !resolvedAspectKey.value) return undefined;
  return getReaderAspect(readerClass.value, resolvedAspectKey.value);
});

const outputType = computed(() => aspect.value?.outputType ?? "Any");

const typeColor = computed(() => getTypeColor(outputType.value));

const isOperatorAspect = computed(
  () => !!aspect.value?.signature && aspect.value.signature.length > 0
);

const operatorSignature = computed(() =>
  isOperatorAspect.value ? aspect.value!.signature!.join(" -> ") : ""
);

const defaultText = computed(() =>
  readerClass.value && resolvedAspectKey.value
    ? getReaderAspectDefaultValue(readerClass.value, resolvedAspectKey.value)
    : ""
);

const valueText = ref("");

watch(
  [readerClass, resolvedAspectKey],
  () => {
    valueText.value = defaultText.value;
  },
  { immediate: true }
);

const parseResult = computed(() => parseSimulatedValueText(valueText.value));

const typeError = computed<string | undefined>(() => {
  if (isOperatorAspect.value || !readerClass.value || !resolvedAspectKey.value)
    return undefined;
  const parse = parseResult.value;
  if (isSimulatedValueParseError(parse)) return parse.message;
  if (!parse.ast) return undefined;
  const resolved = resolveReaderSimulatedValue(
    readerClass.value,
    resolvedAspectKey.value,
    parse.ast
  );
  return resolved.ok ? undefined : resolved.error;
});

const resolvedValueAst = computed<TypeAST.AST | undefined>(() => {
  if (isOperatorAspect.value || !readerClass.value || !resolvedAspectKey.value)
    return undefined;
  const parse = parseResult.value;
  if (!parse.ok || !parse.ast) return undefined;
  const resolved = resolveReaderSimulatedValue(
    readerClass.value,
    resolvedAspectKey.value,
    parse.ast
  );
  return resolved.ok ? resolved.value : undefined;
});

const effectiveText = computed(() => {
  if (resolvedValueAst.value) {
    return getCompactValueTextForAst(resolvedValueAst.value);
  }
  return valueText.value.trim() || defaultText.value;
});

const readerValues = computed<Record<string, string> | undefined>(() => {
  if (isOperatorAspect.value || !resolvedAspectKey.value) return undefined;
  return { [resolvedAspectKey.value]: effectiveText.value };
});

const readerTitle = computed(() => {
  if (!readerClass.value) return "";
  return (
    READER_TITLES[readerClass.value.shortName] ??
    `${readerClass.value.shortName} Reader`
  );
});

const settingsEntries = computed(() =>
  aspect.value ? getAspectSettingsEntries(aspect.value) : []
);

const hasSettings = computed(() => settingsEntries.value.length > 0);
</script>

<template>
  <article class="doc-page reader-aspect-doc-page">
    <h2>{{ aspect?.fullDisplayName ?? aspectKey }}</h2>
    <p v-if="readerClass" class="reader-aspect-subtitle">
      {{ readerTitle }} · {{ aspect?.displayName ?? aspectKey }}
    </p>

    <!-- Info box -->
    <section class="reader-aspect-info-box">
      <div class="reader-aspect-info-top">
        <div class="reader-aspect-info-line">
          <span class="reader-aspect-info-label">Display name</span>
          <span>{{ aspect?.fullDisplayName ?? aspectKey }}</span>
        </div>
        <div class="reader-aspect-info-line">
          <span class="reader-aspect-info-label">Output type</span>
          <span :style="{ color: typeColor }">{{ outputType }}</span>
        </div>
        <div class="reader-aspect-info-line">
          <span class="reader-aspect-info-label">Default value</span>
          <span>{{ defaultText || "—" }}</span>
        </div>
        <p v-if="aspect?.tooltipInfo" class="reader-aspect-description">
          {{ aspect.tooltipInfo }}
        </p>
      </div>

      <div v-if="hasSettings" class="reader-aspect-settings-box">
        <h3>Settings</h3>
        <div
          v-for="entry in settingsEntries"
          :key="entry.key"
          class="reader-aspect-setting"
        >
          <div class="reader-aspect-setting-name">{{ entry.displayName }}</div>
          <div class="reader-aspect-setting-value">
            {{ SETTING_INDENT }}{{ entry.value }}
          </div>
          <div
            v-if="entry.description"
            class="reader-aspect-setting-description"
          >
            {{ SETTING_INDENT }}{{ entry.description }}
          </div>
        </div>
      </div>
    </section>

    <!-- Input box -->
    <section class="reader-aspect-input-box">
      <template v-if="isOperatorAspect">
        <div class="reader-aspect-input-type">Signature</div>
        <div class="reader-aspect-operator-signature">
          {{ operatorSignature }}
        </div>
        <div class="reader-aspect-operator-blob">
          {{ aspect?.fullDisplayName }} does not support an overridden
          simulatedValue.
        </div>
      </template>
      <template v-else>
        <div class="reader-aspect-input-type" :style="{ color: typeColor }">
          {{ outputType }}
        </div>
        <input
          v-model="valueText"
          class="reader-aspect-value-input"
          type="text"
          :aria-label="`Simulated ${outputType} value`"
          :placeholder="defaultText"
        />
      </template>
    </section>

    <!-- Reader view -->
    <section class="reader-aspect-reader-view">
      <ReaderGuiView
        v-if="readerClass && resolvedAspectKey"
        :reader="readerClass"
        :focused-aspect="resolvedAspectKey"
        :values="readerValues"
        :type-error="typeError"
      />
    </section>

    <!-- Display panel holder -->
    <section class="reader-aspect-display-panel">
      <DisplayPanelViewHolder>
        <DisplayPanelView
          :text="effectiveText"
          :type-name="outputType"
          :type-error="typeError"
        />
      </DisplayPanelViewHolder>
    </section>
  </article>
</template>

<style scoped>
.reader-aspect-doc-page {
  max-width: 1240px;
}

.reader-aspect-subtitle {
  margin-bottom: 1.5rem;
  color: #4a6974;
}

.reader-aspect-info-box {
  display: grid;
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  border: 1px solid #abd0d9;
  border-radius: 0.65rem;
  background: linear-gradient(180deg, #eef9fb 0%, #dcedf2 100%);
}

.reader-aspect-info-top {
  display: grid;
  gap: 0.35rem;
}

.reader-aspect-info-line {
  display: flex;
  gap: 0.5rem;
}

.reader-aspect-info-label {
  font-weight: 600;
  color: #2b505d;
  min-width: 8.5rem;
}

.reader-aspect-description {
  margin: 0.35rem 0 0;
  color: #153946;
  overflow-wrap: anywhere;
}

.reader-aspect-settings-box {
  margin-top: 0.35rem;
  padding-top: 0.6rem;
  border-top: 1px solid #abd0d9;
}

.reader-aspect-settings-box h3 {
  margin: 0 0 0.4rem;
  font-size: 0.95rem;
  color: #224855;
}

.reader-aspect-setting {
  display: grid;
  gap: 0.1rem;
  margin-top: 0.4rem;
}

.reader-aspect-setting-name {
  font-weight: 600;
  color: #2b505d;
}

.reader-aspect-setting-value,
.reader-aspect-setting-description {
  color: #153946;
}

.reader-aspect-input-box {
  display: grid;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.reader-aspect-input-type {
  font-weight: 600;
  color: #224855;
}

.reader-aspect-value-input {
  font: inherit;
  padding: 0.5rem 0.65rem;
  border: 1px solid #9cc9d3;
  border-radius: 0.5rem;
  background: rgba(248, 253, 254, 0.82);
  color: #18303a;
  width: 100%;
  max-width: 24rem;
}

.reader-aspect-value-input::placeholder {
  color: #8aa7b0;
}

.reader-aspect-operator-signature {
  font-family:
    "JetBrains Mono", "IBM Plex Mono", "Fira Code", ui-monospace,
    SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", monospace;
  color: #18303a;
}

.reader-aspect-operator-blob {
  padding: 0.5rem 0.65rem;
  border: 1px solid #e0c0a0;
  border-radius: 0.5rem;
  background: rgba(255, 243, 230, 0.8);
  color: #7a4a1e;
  font-size: 0.95rem;
  max-width: 24rem;
}

.reader-aspect-reader-view {
  margin-top: 1.5rem;
  display: inline-flex;
  background: #2b2b2b;
  padding: 8px 8px 8px 48px;
  box-shadow: 0 14px 30px rgba(24, 48, 58, 0.18);
}

.reader-aspect-display-panel {
  margin-top: 1.5rem;
}
</style>
