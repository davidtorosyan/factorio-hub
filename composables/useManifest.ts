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

  const queue = new TinyQueue([] as Need[], getRecipeComparator(recipes));
  neededItems.forEach(item => queue.push(item))
  
  while (queue.length > 0) {
    const item = queue.pop()
    if (item === undefined) {
      continue
    }

    const name = item.name
    if (name in result) {
      console.error(`Already processed ${name}`)
      continue
    }
    
    let category: RecipeCategory
    let seconds: number

    const recipe = recipes[name]
    if (recipe) {
      category = recipe.category
      seconds = recipe.seconds
    } else {
      category = 'mining'
      seconds = 0.5
    }

    const count = item.rate / seconds

    result[name] = {
      name,
      count,
      category
    }

    for (const ingredient of recipe.ingredients) {
      queue.push({
        name: ingredient.name,
        rate: ingredient.count,
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
