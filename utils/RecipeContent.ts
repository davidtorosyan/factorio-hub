import type { ParsedContent } from "@nuxt/content/types"

const hardcodedIngredients = [
  'petroleum-gas',
  'light-oil',
  'heavy-oil',
  'water',
]

export function getRecipes (contentJson: any): RecipeMap {
  const result = {} as RecipeMap
  
  setRecipes(contentJson, result)
  setResources(contentJson, result)
  setHardcoded(result)

  return result
}

function setHardcoded (recipeMap: RecipeMap) {
  for (const name of hardcodedIngredients) {
    recipeMap[name] = {
      name: name,
      ingredients: [],
      resultCount: 1,
      category: 'special',
      seconds: 1,
      results: [{ name: name, count: 1 }],
    }
  }
  recipeMap['space-science-pack'] = {
    name: 'space-science-pack',
    ingredients: [
      {
        name: 'rocket-launch',
        count: 1,
      },
      {
        name: 'satellite',
        count: 1,
      }
    ],
    resultCount: 1000,
    category: 'launch',
    seconds: 1,
    results: [{ name: 'space-science-pack', count: 1000 }],
  }
  recipeMap['rocket-launch'] = {
    name: 'rocket-launch',
    ingredients: [
      {
        name: 'rocket-part',
        count: 100,
      },
    ],
    resultCount: 1,
    category: 'special',
    seconds: 1,
    results: [{ name: 'rocket-launch', count: 1 }],
  }
  recipeMap['solid-fuel'] = {
    name: 'solid-fuel',
    ingredients: [
      {
        name: 'light-oil',
        count: 20,
      },
    ],
    resultCount: 1,
    category: 'special',
    seconds: 2,
    results: [{ name: 'solid-fuel', count: 1 }],
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
    const category = name === 'crude-oil' ? 'oil-mining' : 'mining'
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
    }
  }
}

function setRecipes (contentJson: ParsedContent, recipeMap: RecipeMap) {
  const recipesJson = contentJson.recipe

  for (const recipeJson of Object.values(recipesJson) as any[]) {
    const nameJson = recipeJson.name
    const ingredientsJson = recipeJson.ingredients ?? recipeJson.normal?.ingredients
    const resultCountJson = recipeJson.result_count
    const energyJson = recipeJson.energy_required ?? recipeJson.normal?.energy_required
    const categoryJson = recipeJson.category
    const resultsJson = recipeJson.results
  
    if (typeof nameJson !== 'string') {
      continue
    }
    const name = nameJson
    const ingredients = convertIngredientList(ingredientsJson)
    const resultCount = convertNumber(resultCountJson) ?? 1
    const category = convertCategory(categoryJson)
    const seconds = convertNumber(energyJson) ?? 0.5
    const results = convertResults(resultsJson) ?? [{ name, count: resultCount}]

    recipeMap[name] = {
      name,
      ingredients,
      resultCount,
      category,
      seconds,
      results,
    }
  }
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
