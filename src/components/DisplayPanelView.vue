<script setup lang="ts">
import { computed } from "vue";
import DisplayPanel from "./DisplayPanel.vue";
import { getTypeColor } from "pages-lib/visualTransformer";

const props = defineProps<{
  text: string;
  typeName?: string;
}>();

const textColor = computed(() => {
  if (props.typeName) {
    return getTypeColor(props.typeName);
  }
  return "#00ff00";
});
</script>

<template>
  <DisplayPanel :text="props.text" :text-color="textColor" />
</template>
