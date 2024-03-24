<script setup lang="ts">
import 'primevue/resources/themes/aura-light-green/theme.css'

const sciencePackOptions = ref([
  { name: 'Red', value: 'automation-science-pack' },
  { name: 'Green', value: 'logistic-science-pack' },
])
const sciencePacks = ref([])

const recipes = useRecipes()

const manifest = computed(() => {
  const queue = []
  queue.push(...sciencePacks.value)

  const result = []

  // while (queue.length > 0) {
  //   const item = queue.shift()

  //   const recipe = recipes[item]
  //   if (!recipe) {
  //     console.error(`No recipe found for ${item}`)
  //     result.push(recipe)
  //     continue
  //   }

  //   for (const ingredient of recipe.ingredients) {
  //     queue.push(ingredient.name)
  //   }
  // }

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
    foo: {{ foo }}
  </div>
</template>
