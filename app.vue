<script setup lang="ts">
import 'primevue/resources/themes/aura-light-amber/theme.css'
import 'primeflex/primeflex.css';

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
      rate: 1
    }
  })
})
const manifest = useManifest(needs, recipes)
</script>

<template>
  <div>
    <h1>Factorio Planner</h1>

    Select science: <SelectButton
      v-model="sciencePacks"
      :options="sciencePackOptions"
      option-label="name"
      option-value="value"
      multiple
      aria-labelledby="multiple"
    />
    <ManifestView :data="manifest" />
  </div>
</template>

<style>
  body {
    background-color: var(--surface-ground)
  }
</style>
