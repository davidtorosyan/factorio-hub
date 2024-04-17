<script setup lang="ts">
import 'primevue/resources/themes/aura-light-amber/theme.css'
import 'primeflex/primeflex.css';

const images = await useImages()
const content = await useFactoryContent()
const config = useFactoryConfig(content)
const plan = useFactoryPlan(content, config)

</script>

<template>
  <div>
    <h1>Factorio Planner</h1>

    <FactoryConfig
      v-model="config"
      :data="content"
      :images="images"
    />

    <FactoryPlan
      :data="plan"
      :images="images"
    />
  </div>
</template>

<style>
  body {
    background-color: var(--surface-ground)
  }
</style>
