
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
        name="Builders"  
        :image="images.icons.get('assembling-machine-2')"
      />
    </template>

    <div class="builders">
      <div>
        <ConfigPicker
          v-model="model.builders.assembly"
          name="Assembly"
          :options="data.builderOptions.assembly"
          :images="images"
        />
        <ConfigPicker
          v-model="model.builders.mining"
          name="Mining"
          :options="data.builderOptions.mining"
          :images="images"
        />
        <ConfigPicker
          v-model="model.builders.smelting"
          name="Smelting"
          :options="data.builderOptions.smelting"
          :images="images"
        />
      </div>
      <div>
        <ConfigPicker
          v-model="model.builders.chemistry"
          name="Chemistry"
          :options="data.builderOptions.chemistry"
          :images="images"
        />
        <ConfigPicker
          v-model="model.builders['oil-mining']"
          name="Oil mining"
          :options="data.builderOptions['oil-mining']"
          :images="images"
        />
        <ConfigPicker
          v-model="model.builders['oil-processing']"
          name="Oil processing"
          :options="data.builderOptions['oil-processing']"
          :images="images"
        />
      </div>
      <div>
        <InputGroup>
          <InputGroupAddon>Oil Field Efficiency</InputGroupAddon>
          <InputNumber
            v-model="model.oilFieldEfficiency"
            suffix="%"
            :use-grouping="false"
            :min="1"
            :max="9999"
            :step="100"
          />
        </InputGroup>
      </div>
    </div>
  </Panel>
</template>

<style scoped>
  .builders > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

