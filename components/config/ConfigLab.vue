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

    <div class="lab">
      <InputNumber
        v-model="model.labs"
        show-buttons
        :min="1"
        :max="9999"
      />

      <InputGroup>
        <InputGroupAddon>Speed</InputGroupAddon>
        <Dropdown
          v-model="model.speedEffect"
          :options="data.science.speedEffects"
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>Research time</InputGroupAddon>
        <Dropdown
          v-model="model.researchTime"
          :options="data.science.researchTimes"
        />
      </InputGroup>
    </div>
  </Panel>
</template>

<style scoped>
  .lab {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

