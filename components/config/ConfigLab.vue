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
      <InputGroup>
        <InputGroupAddon>Count</InputGroupAddon>
        <InputNumber
          v-model="model.labs"
          show-buttons
        />
      </InputGroup>

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

  .lab .p-inputgroup:not(:first-child) {
    margin-left: 20px; 
  }
</style>