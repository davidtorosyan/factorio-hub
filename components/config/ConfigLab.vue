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
        name="Labs"  
        :image="images.icons.get('lab')"
      />
    </template>

    Count: <InputNumber
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
  </Panel>
</template>