type Ingredient = {
  name: string
  count: number
}

type RecipeCategory = 'assembly' | 'mining' | 'smelting' | 'oil-processing' | 'chemistry' | 'oil-mining'

type Recipe = {
  name: string,
  ingredients: Ingredient[]
  resultCount: number,
  index: number | undefined
  seconds: number
  category: RecipeCategory | 'special'
  results: Ingredient[]
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