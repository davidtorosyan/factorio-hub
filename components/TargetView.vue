
<script setup lang="ts">
defineProps<{
  data: Target
}>()

</script>
<template>
  <Card>
    <template #title>
      {{ data.name }}
    </template>
    <template #content>
      <p>Name: {{ data.name }}</p>
      <p>Count: {{ data.count }}</p>
    </template>
  </Card>
</template>
