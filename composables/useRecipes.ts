import type { ParsedContent } from "@nuxt/content/types"

export async function useRecipes (): Promise<Ref<RecipeMap>> {
  const contentJson = await queryContent('/data-raw').findOne()
  const result = ref({} as RecipeMap)
  
  setRecipes(contentJson, result.value)
  setResources(contentJson, result.value)
  setHardcoded(result.value)
  
  for (const name of Object.keys(result.value)) {
    setFactors(name, result.value)
  }

  return result
}

function setHardcoded (recipeMap: RecipeMap) {
  recipeMap['water'] = {
    name: 'water',
    ingredients: [],
    resultCount: 1,
    category: 'mining',
    seconds: 1,
    results: [{ name: 'water', count: 1 }],
    factors: new Set(),
  }
}

function setResources (contentJson: ParsedContent, recipeMap: RecipeMap) {
  const resourcesJson = contentJson.resource

  for (const resourceJson of Object.values(resourcesJson) as any[]) {
    const nameJson = resourceJson.name
    if (typeof nameJson !== 'string') {
      continue
    }

    const name = nameJson
    const category = 'mining'
    const resultCount = 1
    const results = [{ name, count: 1 }]

    // since we'll be multiplying times later, use 1 here as the unit value
    const seconds = 1

    recipeMap[name] = {
      name,
      ingredients: [],
      resultCount,
      category,
      seconds,
      results,
      factors: new Set(),
    }
  }
}

function setRecipes (contentJson: ParsedContent, recipeMap: RecipeMap) {
  const recipesJson = contentJson.recipe

  for (const recipeJson of Object.values(recipesJson) as any[]) {
    const nameJson = recipeJson.name
    const resultCountJson = recipeJson.result_count
    const energyJson = recipeJson.energy_required
    const categoryJson = recipeJson.category
    const resultsJson = recipeJson.results
  
    if (typeof nameJson !== 'string') {
      continue
    }
    const name = nameJson
    const ingredients = convertIngredients(recipeJson)
    const resultCount = convertNumber(resultCountJson) ?? 1
    const category = convertCategory(categoryJson)
    const seconds = convertNumber(energyJson) ?? 1
    const results = convertResults(resultsJson) ?? [{ name, count: resultCount}]

    recipeMap[name] = {
      name,
      ingredients,
      resultCount,
      category,
      seconds,
      results,
      factors: new Set(),
    }
  }
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
    const ingredientFactors = setFactors(ingredient.name, recipeMap)
    ingredientFactors.forEach(factor => factors.add(factor))
  }

  return factors
}

function convertIngredients(recipeJson: any) : Ingredient[] {
  return convertIngredientList(recipeJson.ingredients ?? recipeJson.normal.ingredients)
}

function convertResults(resultsJson: any) : Ingredient[] | undefined {
  if (resultsJson === undefined) {
    return undefined
  }
  return convertIngredientList(resultsJson)
}

function convertIngredientList(ingredientListJson: any) : Ingredient[] {
  const ingredients = []

  for (const ingredientJson of ingredientListJson) {
    const nameJson = ingredientJson.name ?? ingredientJson[0]
    if (typeof nameJson !== 'string') {
      continue
    }
    const countJson = ingredientJson.amount ?? ingredientJson[1]

    const name = nameJson
    const count = countJson
    ingredients.push({
      name,
      count
    })
  }

  return ingredients
}

function convertCategory(categoryJson: any): RecipeCategory {
  switch (categoryJson) {
    case undefined:
      return 'assembly'
    case 'smelting':
    case 'oil-processing':
    case 'chemistry':
      return categoryJson
    default:
      return 'assembly'
  }
}
