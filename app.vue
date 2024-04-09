<script setup lang="ts">
import 'primevue/resources/themes/aura-light-amber/theme.css'
import 'primeflex/primeflex.css';

const icons = await useIcons()
const content = await useFactoryContent()
const config = useFactoryConfig(content)
const plan = useFactoryPlan(content, config)

</script>

<template>
  <div>
    <h1>Factorio Planner</h1>
    <img
      :src="icons.get('automation-science-pack')"
      alt="automation-science-pack"
    >
    <img
      :src="icons.get('logistic-science-pack')"
      alt="logistic-science-pack"
    >

    <FactoryConfig
      v-model="config"
      :data="content"
    />

    <FactoryPlan :data="plan" />
  </div>
</template>

<style>
  body {
    background-color: var(--surface-ground)
  }
</style>
