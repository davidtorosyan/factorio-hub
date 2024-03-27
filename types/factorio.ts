type Ingredient = {
  name: string,
  count: number,
}

type RecipeCategory = 'assembly' | 'mining' | 'smelting' | 'oil-processing' | 'chemistry'

type Recipe = {
  name: string,
  ingredients: Ingredient[]
  factors: Set<string>
  seconds: number
  category: RecipeCategory
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