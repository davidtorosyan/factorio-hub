<script setup lang="ts">
defineProps<{
  data: FactoryContent,
  images: Images,
}>()

const model = defineModel<FactoryConfig>({ required: true })

</script>
<template>
  <Panel>
    <template #header>
      <ConfigBadge
        name="Extras"  
        :image="images.icons.get('construction-robot')"
      />
    </template>

    <Button
      label="+"
      @click="model.extraItems.push({ name: undefined, rate: 1 })"
    />

    <div class="grid">
      <div
        v-for="(extraItem, i) in model.extraItems"
        :key="extraItem.name"
        class="col-fixed"
      >
        <ConfigExtra
          v-model="model.extraItems[i]"
          :data="data"
          :images="images"
          :remove="() => model.extraItems.splice(i, 1)"
        />
      </div>
    </div>
  </Panel>
</template>

<style scoped>
  .extras {
    display: flex;
    justify-content: space-between;
    align-items: left;
  }
</style>

