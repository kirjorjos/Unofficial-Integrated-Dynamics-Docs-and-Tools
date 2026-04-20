<script setup lang="ts"></script>

<template>
  <div class="display-panel-view-holder">
    <slot />
  </div>
</template>

<style scoped>
.display-panel-view-holder {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 14px;
}
</style>
