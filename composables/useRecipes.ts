import type { ParsedContent } from "@nuxt/content/types"

export async function useRecipes (): Promise<Ref<RecipeMap>> {
  const contentJson = await queryContent('/data-raw').findOne()
  const result = ref({} as RecipeMap)
  
  setRecipes(contentJson, result.value)
  setResources(contentJson, result.value)
  
  for (const name of Object.keys(result.value)) {
    setFactors(name, result.value)
  }

  return result
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

    // since we'll be multiplying times later, use 1 here as the unit value
    const seconds = 1

    recipeMap[name] = {
      name,
      ingredients: [],
      resultCount,
      category,
      seconds,
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
  
    if (typeof nameJson !== 'string') {
      continue
    }
    const name = nameJson
    const ingredients = convertIngredients(recipeJson)
    const resultCount = convertNumber(resultCountJson) ?? 1
    const category = convertCategory(categoryJson)
    const seconds = convertNumber(energyJson) ?? 1

    recipeMap[name] = {
      name,
      ingredients,
      resultCount,
      category,
      seconds,
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
