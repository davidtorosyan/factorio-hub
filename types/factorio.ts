type Ingredient = {
  name: string
  count: number
}

type RecipeCategory = 'assembly' | 'mining' | 'smelting' | 'oil-processing' | 'chemistry'

type Recipe = {
  name: string,
  ingredients: Ingredient[]
  resultCount: number,
  factors: Set<string>
  seconds: number
  category: RecipeCategory
}

type RecipeMap = {
  [key: string]: Recipe
}

type Need = {
  name: string
  rate: number
}

type Target = {
  name: string
  rate: number
  recipe: Recipe
}

type Manifest = {
  [key: string]: Target
}