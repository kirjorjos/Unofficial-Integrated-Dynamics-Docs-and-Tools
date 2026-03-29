<script setup lang="ts">
import { computed } from "vue";
import { operatorRegistry } from "lib";

const props = defineProps<{
  operatorKey: string;
}>();

const operatorClass = computed(() => {
  return operatorRegistry[
    props.operatorKey as keyof typeof operatorRegistry
  ] as unknown as {
    internalName: string;
    numericID: number;
    nicknames: string[];
    symbol: string;
    interactName: string;
  };
});
</script>

<template>
  <article class="doc-page">
    <h2>{{ operatorKey }}</h2>

    <dl class="operator-meta">
      <div>
        <dt>Internal name</dt>
        <dd>{{ operatorClass.internalName }}</dd>
      </div>

      <div>
        <dt>Numeric ID</dt>
        <dd>{{ operatorClass.numericID }}</dd>
      </div>

      <div>
        <dt>Symbol</dt>
        <dd>{{ operatorClass.symbol }}</dd>
      </div>

      <div>
        <dt>Interact name</dt>
        <dd>{{ operatorClass.interactName }}</dd>
      </div>

      <div>
        <dt>Nicknames</dt>
        <dd v-if="operatorClass.nicknames.length">
          {{ operatorClass.nicknames.join(", ") }}
        </dd>
        <dd v-else>None</dd>
      </div>
    </dl>
  </article>
</template>
