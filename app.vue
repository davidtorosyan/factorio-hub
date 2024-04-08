<script setup lang="ts">
import 'primevue/resources/themes/aura-light-amber/theme.css'
import 'primeflex/primeflex.css';

const content = await useFactoryContent()
const config = useFactoryConfig()
const plan = useFactoryPlan(content, config)

</script>

<template>
  <div>
    <h1>Factorio Planner</h1>

    <ConfigView
      v-model="config"
      :data="content"
    />

    Plan: {{ plan }}
    <ManifestView :data="plan.manifest" />
  </div>
</template>

<style>
  body {
    background-color: var(--surface-ground)
  }
</style>
