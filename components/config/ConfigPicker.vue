
<script setup lang="ts">
defineProps<{
  name: string,
  options: string[],
  images: Images,
}>()

const model = defineModel<string>({ required: true })

</script>
<template>
  <InputGroup>
    <InputGroupAddon>{{ name }}</InputGroupAddon>
    <Dropdown
      v-model="model"
      :options="options"
    >
      <template #value="slotProps">
        <div class="flex align-items-center">
          <img
            :alt="slotProps.value"
            :src="images.icons.get(slotProps.value) ?? ''"
            width="32px"
          >
        </div>
      </template>
      <template #option="slotProps">
        <div class="flex align-items-center">
          <img
            :alt="slotProps.option"
            :src="images.icons.get(slotProps.option) ?? ''"
            width="32px"
          >
        </div>
      </template>
    </Dropdown>
  </InputGroup>
</template>
