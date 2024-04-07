
<script setup lang="ts">
defineProps<{
  data: Manifest
}>()

</script>
<template>
  <div class="grid">
    <div
      v-for="target in data.targets.values()"
      :key="target.name"
      class="col-3"
    >
      <TargetView :data="target" />
    </div>
  </div>
</template>

