
<script setup lang="ts">
defineProps<{
  data: FactoryPlan,
  images: Images,
}>()

</script>
<template>
  <Panel>
    <template #header>
      <ConfigBadge
        name="Factory"  
        :image="images.icons.get('transport-belt')"
      />
    </template>
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
  </Panel>
</template>

