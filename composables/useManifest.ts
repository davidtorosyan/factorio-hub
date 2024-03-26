export function useManifest (sciencePacks: Ref<string[]>, recipes: Ref<RecipeMap>): Ref<Manifest> {
  const result = ref({} as Manifest)

  watchEffect(() => {
    result.value = computeManifest(toValue(sciencePacks), toValue(recipes))
  })

  return result
}

function computeManifest(sciencePacks: string[], recipes: RecipeMap) : Manifest {
  const result = {} as Manifest

  const queue = [] as string[]
  queue.push(...sciencePacks)
  
  while (queue.length > 0) {
    const item = queue.shift()
    if (typeof item !== 'string') {
      continue
    }

    const target = result[item] ?? { name: item, count: 0 }
    target.count++
    result[item] = target

    const recipe = recipes[item]
    if (!recipe) {
      console.error(`No recipe found for ${item}`)
      continue
    }

    for (const ingredient of recipe.ingredients) {
      queue.push(ingredient.name)
    }
  }

  return result
}
