export function useManifest (neededItems: Ref<Need[]>, recipes: Ref<RecipeMap>): Ref<Manifest> {
  const result = ref({} as Manifest)

  watchEffect(() => {
    result.value = computeManifest(toValue(neededItems), toValue(recipes))
  })

  return result
}

function computeManifest(neededItems: Need[], recipes: RecipeMap) : Manifest {
  const result = {} as Manifest

  const queue = [] as Need[]
  queue.push(...neededItems)
  
  while (queue.length > 0) {
    const item = queue.shift()
    if (item === undefined) {
      continue
    }

    const name = item.name
    if (name in result) {
      console.error(`Already processed ${name}`)
    }
    const target = result[name] ?? { name, count: 0 }
    target.count += item.count
    result[name] = target

    const recipe = recipes[name]
    if (!recipe) {
      console.error(`No recipe found for ${name}`)
      continue
    }

    for (const ingredient of recipe.ingredients) {
      queue.push({
        name: ingredient.name,
        count: ingredient.count,
      })
    }
  }

  return result
}
