
<script setup lang="ts">
defineProps<{
  name: string,
  image?: string,
}>()

</script>
<template>
  <div class="flex align-items-center gap-2">
    <Avatar
      :image="image ?? ''"
      size="normal"
      shape="circle"
    />
    <span class="font-bold">{{ name }}</span>
    <slot />
  </div>
</template>