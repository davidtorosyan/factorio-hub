type Ingredient = {
  name: string,
  count: number,
}

type Recipe = {
  name: string,
  ingredients: Ingredient[]
}

type RecipeMap = {
  [key: string]: Recipe
}

export default async function (): Promise<Ref<RecipeMap>> {
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
      ingredients
    }
  }

  return result
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