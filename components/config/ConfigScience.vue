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
        name="Science"  
        :image="images.custom.get('generic-science')"
      />
    </template>

    <SelectButton
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
  </Panel>
</template>