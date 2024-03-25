<script setup lang="ts">
import 'primevue/resources/themes/aura-light-green/theme.css'

const sciencePackOptions = ref([
  { name: 'Red', value: 'automation-science-pack' },
  { name: 'Green', value: 'logistic-science-pack' },
])
const sciencePacks = ref([])

const recipes = await useRecipes()

const manifest = computed(() => {
  const queue = [] as string[]
  queue.push(...sciencePacks.value)

  const result = [] as string[]

  while (queue.length > 0) {
    const item = queue.shift()
    if (typeof item !== 'string') {
      continue
    }

    const recipe = recipes.value[item]
    if (!recipe) {
      console.error(`No recipe found for ${item}`)
      result.push(item)
      continue
    }

    for (const ingredient of recipe.ingredients) {
      queue.push(ingredient.name)
    }
  }

  return result
})

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
    <!-- recipes: {{ recipes }} -->
  </div>
</template>
