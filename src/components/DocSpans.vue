<script setup lang="ts">
import type { DocSpan } from "lib/transformers/inputDocs";
import BreakableText from "./BreakableText.vue";

defineProps<{ spans: DocSpan[] }>();
</script>

<template>
  <template v-for="(span, index) in spans" :key="index">
    <code v-if="span.code" class="input-docs-code"
      ><BreakableText :text="span.text"
    /></code>
    <span v-else-if="span.emphasis" :class="`input-doc-span-${span.emphasis}`"
      ><BreakableText :text="span.text"
    /></span>
    <BreakableText v-else :text="span.text" />
  </template>
</template>
