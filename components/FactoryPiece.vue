
<script setup lang="ts">
defineProps<{
  data: FactoryPiece,
  img: string,
}>()

function formatNumber(num: number) {
  return num.toFixed(2)
}

</script>
<template>
  <Card class="piece">
    <template #title>
      {{ data.name }}
    </template>
    <template #content>
      <img
        :src="img"
        :alt="data.name"
      >
      <p>Name: {{ data.name }}</p>
      <p>Builder: {{ data.builder }}</p>
      <p>Count: {{ data.count }}</p>
      <p>Rate: {{ formatNumber(data.rate) }}</p>
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