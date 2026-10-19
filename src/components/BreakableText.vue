<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ text: string }>();

const PUNCTUATION = /([,:;{}\[\]()\/<=>])/g;

const segments = computed(() => props.text.split(PUNCTUATION));
</script>

<template>
  <template v-for="(segment, index) in segments" :key="index"
    ><wbr v-if="index > 0" />{{ segment }}</template
  >
</template>
