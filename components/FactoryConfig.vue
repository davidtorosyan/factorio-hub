<script setup lang="ts">
defineProps<{
  data: FactoryContent
}>()

const model = defineModel<FactoryConfig>({ required: true })

</script>
<template>
  Select science: <SelectButton
    v-model="model.sciencePacks"
    :options="data.science.sciencePacks"
    multiple
    aria-labelledby="multiple"
  />
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

