export async function useRecipes (): Promise<Ref<RecipeMap>> {
  const contentJson = await queryContent('/data-raw').findOne()
  const result = ref({} as RecipeMap)

  const recipesJson = contentJson.recipe

  for (const recipeJson of Object.values(recipesJson) as any[]) {
    const nameJson = recipeJson.name
  
    if (typeof nameJson !== 'string') {
      continue
    }
    const name = nameJson
    const ingredients = convertIngredients(recipeJson)

    result.value[name] = {
      name,
      ingredients,
      factors: new Set()
    }
  }
  
  for (const name of Object.keys(result.value)) {
    setFactors(name, result.value)
  }

  return result
}

function setFactors(name: string, recipeMap: RecipeMap) : Set<string> {
  const recipe = recipeMap[name]
  if (!recipe) {
    return new Set()
  }
  const factors = recipe.factors
  if (factors.size > 0) {
    return factors
  }

  for (const ingredient of recipe.ingredients) {
    factors.add(ingredient.name)
    // const ingredientFactors = setFactors(ingredient.name, recipeMap)
    // ingredientFactors.forEach(factor => factors.add(factor))
  }

  return factors
}

function convertIngredients(recipeJson: any) : Ingredient[] {
  const ingredientsJson = recipeJson.ingredients
  const normalJson = recipeJson.normal
  const ingredients = []

  const ingredientListJson = ingredientsJson ?? normalJson.ingredients
  for (const ingredientJson of ingredientListJson) {
    const nameJson = ingredientJson[0]
    if (typeof nameJson !== 'string') {
      continue
    }
    const countJson = ingredientJson[1]

    const name = nameJson
    const count = countJson
    ingredients.push({
      name,
      count
    })
  }

  return ingredients
}