
<script setup lang="ts">
defineProps<{
  data: Target
}>()

</script>
<template>
  <Card class="target">
    <template #title>
      {{ data.name }}
    </template>
    <template #content>
      <p>Name: {{ data.name }}</p>
      <p>Count: {{ data.count }}</p>
      <p>Category: {{ data.category }}</p>
    </template>
  </Card>
</template>

<style scoped>
  .target {
    background-color: var(--primary-400);
    width: 200px;
    height: 400px;
  }
</style>