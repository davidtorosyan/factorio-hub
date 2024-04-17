<script setup lang="ts">
defineProps<{
  data: FactoryContent,
  images: Images,
}>()

const model = defineModel<FactoryConfig>({ required: true })

</script>
<template>
  Select science: <SelectButton
    v-model="model.sciencePacks"
    :options="data.science.sciencePacks"
    multiple
    aria-labelledby="multiple"
  >
    <template #option="slotProps">
      <img
        class="p-button-label"
        :src="images.icons.get(slotProps.option) ?? ''"
        :alt="slotProps.option"
      >
    </template>
  </SelectButton>
  Select labs: <InputNumber
    v-model="model.labs"
    show-buttons
  />
  Speed: <Dropdown
    v-model="model.speedEffect"
    :options="data.science.speedEffects"
  />
  Research time: <Dropdown
    v-model="model.researchTime"
    :options="data.science.researchTimes"
  />
</template>

<style scoped>
.p-selectbutton button.p-highlight {
    background-color: rgba(255, 0, 0, 0.5) !important;
}

.p-selectbutton button.p-highlight img {
    opacity: 1 !important;
}

</style>