<script setup>
import 'primevue/resources/themes/aura-light-green/theme.css'

const sciencePackOptions = ref([
  { name: 'Red', value: 'automation-science-pack' },
  { name: 'Green', value: 'logistic-science-pack' },
])
const sciencePacks = ref([])

</script>

<template>
  <div>
    <h1>Factorio Planner</h1>
    <SelectButton
      v-model="sciencePacks"
      :options="sciencePackOptions"
      option-label="name"
      option-value="value"
      multiple
      aria-labelledby="multiple"
    />
    Selected: {{ sciencePacks }}
  </div>
</template>
