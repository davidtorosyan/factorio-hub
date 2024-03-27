
<script setup lang="ts">
defineProps<{
  data: Manifest
}>()

</script>
<template>
  <div>
    <div
      v-for="target in data"
      :key="target.name"
    >
      <TargetView :data="target" />
    </div>
  </div>
</template>

