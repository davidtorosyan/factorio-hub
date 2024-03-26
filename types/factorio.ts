type Ingredient = {
  name: string,
  count: number,
}

type Recipe = {
  name: string,
  ingredients: Ingredient[]
  factors: Set<string>
}

type RecipeMap = {
  [key: string]: Recipe
}

type Need = {
  name: string,
  count: number,
}

type Target = {
  name: string,
  count: number,
}

type Manifest = {
  [key: string]: Target
}