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