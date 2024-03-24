<script setup>
import 'primevue/resources/themes/aura-light-green/theme.css'

const color = ref('')

</script>

<template>
  <div>
    <h1>Factorio Planner</h1>
    <ColorPicker
      v-model="color"
      inline
    />
    Color: {{ color }}
  </div>
</template>
