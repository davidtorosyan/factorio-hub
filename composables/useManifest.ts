export function useManifest (sciencePacks: Ref<string[]>, recipes: Ref<RecipeMap>): Ref<string[]> {
  const result = ref([] as string[])

  watchEffect(() => {
    result.value = computeManifest(toValue(sciencePacks), toValue(recipes))
  })

  return result
}

function computeManifest(sciencePacks: string[], recipes: RecipeMap) : string[] {
  const result = [] as string[]

  const queue = [] as string[]
  queue.push(...sciencePacks)
  
  while (queue.length > 0) {
    const item = queue.shift()
    if (typeof item !== 'string') {
      continue
    }

    const recipe = recipes[item]
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
}
