<script setup lang="ts">
import 'primevue/resources/themes/aura-light-green/theme.css'

const sciencePackOptions = ref([
  { name: 'Red', value: 'automation-science-pack' },
  { name: 'Green', value: 'logistic-science-pack' },
])
const sciencePacks = ref([])
const recipes = await useRecipes()
const needs = computed(() => {
  return sciencePacks.value.map((pack) => {
    return {
      name: pack,
      count: 1
    }
  })
})
const manifest = useManifest(needs, recipes)
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
    <!-- JSON: {{ recipes }} -->
    <!-- {{ recipes[sciencePacks[0]]?.ingredients }} -->
    Manifest: {{ manifest }} 
    Recipes: {{ recipes }}
  </div>
</template>
