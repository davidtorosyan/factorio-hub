
<script setup lang="ts">
defineProps<{
  data: FactoryPlan,
  images: Images,
}>()

</script>
<template>
  <span v-if="data.pieces.length > 0">
    Factory:
  </span>
  <div class="grid">
    <div
      v-for="piece in data.pieces"
      :key="piece.name"
      class="col-3"
    >
      <PlanPiece
        :data="piece"
        :img="images.icons.get(piece.name) ?? ''"
      />
    </div>
  </div>
</template>

