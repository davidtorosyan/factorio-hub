<script setup lang="ts">
import 'primevue/resources/themes/aura-light-amber/theme.css'
import 'primeflex/primeflex.css';

// @ts-expect-error
import Image from '~/assets/img/icons/automation-science-pack.png?webp&w=64&h=64&position=left'

const content = await useFactoryContent()
const config = useFactoryConfig(content)
const plan = useFactoryPlan(content, config)

</script>

<template>
  <div>
    <h1>Factorio Planner</h1>
    <img
      :src="Image"
      alt="automation-science-pack"
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
