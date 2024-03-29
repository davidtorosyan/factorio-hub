import TinyQueue, { type Comparator } from "tinyqueue"

export function useManifest (neededItems: Ref<Need[]>, recipes: Ref<RecipeMap>): Ref<Manifest> {
  const result = ref({} as Manifest)

  watchEffect(() => {
    result.value = computeManifest(toValue(neededItems), toValue(recipes))
  })

  return result
}

function computeManifest(neededItems: Need[], recipes: RecipeMap) : Manifest {
  const result = {} as Manifest

  const queue = new HashQueue<Need>(a => a.name, (a, b) => a.rate += b.rate, [], getRecipeComparator(recipes));
  neededItems.forEach(item => queue.pushOrUpdate(item))
  
  while (queue.length > 0) {
    const needed = queue.pop()
    if (needed === undefined) {
      continue
    }

    const name = needed.name
    if (name in result) {
      console.error(`Already processed ${name}`)
      continue
    }
    
    const recipe = recipes[name]
    if (recipe === undefined) {
      console.error(`Recipe not found for ${name}`)
      continue
    }

    const category = recipe.category
    const ingredients = recipe.ingredients
    const rate = needed.rate

    result[name] = {
      name,
      rate,
      category
    }

    for (const ingredient of ingredients) {
      queue.pushOrUpdate({
        name: ingredient.name,
        rate: ingredient.count * rate,
      })
    }
  }

  return result
}

function getRecipeComparator(recipes: RecipeMap): Comparator<Need> {
  return (a, b) => {
    const recipeA = recipes[a.name]
    const recipeB = recipes[b.name]
    if (recipeA === undefined || recipeB === undefined) {
      return 0
    }
    if (recipeA.factors.has(recipeB.name)) {
      return -1
    }
    if (recipeB.factors.has(recipeA.name)) {
      return 1
    }
    return recipeA.name.localeCompare(recipeB.name)
  }
}
