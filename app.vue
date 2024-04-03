<script setup lang="ts">
import 'primevue/resources/themes/aura-light-amber/theme.css'
import 'primeflex/primeflex.css';

const criteria = computed(() => {
  return {
    science: science.value,
    builders: builders.value,
  }
})

const config: Ref<FactoryConfig> = ref({
  labs: 0,
  sciencePacks: [],
  speedEffect: 0,
  researchTime: 0,
  builders: {
    'chemistry': 'chemical-plant',
    'assembly': 'assembling-machine-2',
    'smelting': 'electric-furnace',
    'mining': 'electric-mining-drill',
    'oil-mining': 'pumpjack',
    'oil-processing': 'oil-refinery',
  },
  extraItems: [
    // {
    //   name: 'construction-robot',
    //   rate: 1,
    // }
  ],
})

const recipes = await useRecipes()
const needs = computed(() => {
  const results = []
  for (const pack of config.value.sciencePacks) {
    results.push({
      name: pack,
      rate: 1
    })
  }
  for (const item of config.value.extraItems) {
    results.push(item)
  }
  return results
})
const manifest = useManifest(needs, recipes)
const builders = await useBuilders()
const science = await useScience()

</script>

<template>
  <div>
    <h1>Factorio Planner</h1>

    <ConfigView
      v-model="config"
      :data="criteria"
    />

    <ManifestView :data="manifest" />
  </div>
</template>

<style>
  body {
    background-color: var(--surface-ground)
  }
</style>
