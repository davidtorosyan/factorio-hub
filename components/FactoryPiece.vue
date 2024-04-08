
<script setup lang="ts">
defineProps<{
  data: FactoryPiece
}>()

</script>
<template>
  <Card class="piece">
    <template #title>
      {{ data.name }}
    </template>
    <template #content>
      <p>Name: {{ data.name }}</p>
      <p>Builder: {{ data.builder }}</p>
      <p>Count: {{ data.count }}</p>
      <p>Rate: {{ data.rate }}</p>
    </template>
  </Card>
</template>

<style scoped>
  .piece {
    background-color: var(--primary-400);
    width: 200px;
    height: 400px;
  }
</style>