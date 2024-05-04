
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
      <InputGroup>
        <InputGroupAddon>Assembly</InputGroupAddon>
        <Dropdown
          v-model="model.builders.assembly"
          :options="data.builderOptions.assembly"
        />
      </InputGroup>
    </div>
  </Panel>
</template>

<style scoped>
  .builders {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

