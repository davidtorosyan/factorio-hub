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

  const queue = new HashQueue(a => a.name, (a, b) => a.rate += b.rate, [] as Need[], getRecipeComparator(recipes));
  neededItems.forEach(item => queue.pushOrUpdate(item))
  
  while (queue.length > 0) {
    const needed = queue.pop()
    if (needed === undefined) {
      continue
    }
    console.log('Processing', needed.name)

    const name = needed.name
    if (name in result) {
      console.error(`Already processed ${name}`)
      continue
    }
    
    let category: RecipeCategory
    let ingredients: Ingredient[]

    const recipe = recipes[name]
    if (recipe) {
      category = recipe.category
      ingredients = recipe.ingredients
    } else {
      category = 'mining'
      ingredients = []
    }

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
