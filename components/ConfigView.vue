<script setup lang="ts">
defineProps<{
  data: FactoryCriteria
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
</template>

