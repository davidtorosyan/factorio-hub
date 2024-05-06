<script setup lang="ts">
defineProps<{
  data: FactoryContent,
  images: Images,
  remove: () => void,
}>()

const model = defineModel<ExtraItem>({ required: true })

</script>
<template>
  <InputGroup>
    <Dropdown
      v-model="model.name"
      class="drop"
      :options="Object.keys(data.recipes)"
    >
      <template #value="slotProps">
        <div class="flex align-items-center">
          <img
            class="icon"
            :alt="slotProps.value"
            :src="images.icons.get(slotProps.value) ?? ''"
            width="32px"
          >
        </div>
      </template>
      <template #option="slotProps">
        <div class="flex align-items-center">
          <img
            class="icon"
            :alt="slotProps.option"
            :src="images.icons.get(slotProps.option) ?? ''"
            width="32px"
          > 
          <div>{{ slotProps.option }}</div>
        </div>
      </template>
    </Dropdown>
    <InputNumber
      v-model="model.rate"
      suffix=" / sec"
      :min-fraction-digits="2"
      :max-fraction-digits="2"
      :min="0"
      :max="9999"
    />
    <Button
      label="X"
      @click="remove()"
    />
  </InputGroup>
</template>

<style scoped>
  .icon {
    margin-right: 10px;
  }
  .drop {
    width: 20px;
    height: 50px;
  }
</style>
