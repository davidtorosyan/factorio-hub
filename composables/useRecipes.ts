import type { ParsedContent } from "@nuxt/content/types"

const hardcodedIngredients = [
  'petroleum-gas',
  'light-oil',
  'heavy-oil',
  'solid-fuel',
  'water',
]

export async function useRecipes (): Promise<Ref<RecipeMap>> {
  const contentJson = await queryContent('/data-raw').findOne()
  const result = ref({} as RecipeMap)
  
  setRecipes(contentJson, result.value)
  setResources(contentJson, result.value)
  setHardcoded(result.value)
  
  const counter = {index: 0}
  for (const name of Object.keys(result.value)) {
    setIndex(name, result.value, counter)
  }

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
      index: undefined,
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
    category: 'special',
    seconds: 1,
    results: [{ name: 'space-science-pack', count: 1000 }],
    index: undefined,
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
    index: undefined,
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
      index: undefined,
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
      index: undefined,
    }
  }
}

function setIndex(name: string, recipeMap: RecipeMap, counter: {index: number}) : number | undefined {
  const recipe = recipeMap[name]
  if (!recipe) {
    return undefined
  }
  if (recipe.index !== undefined) {
    return recipe.index
  }
  
  let index = 0
  for (const ingredient of recipe.ingredients) {
    index += setIndex(ingredient.name, recipeMap, counter) ?? 0
  }
  index += counter.index
  counter.index += 1
  
  recipe.index = index
  return index
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
