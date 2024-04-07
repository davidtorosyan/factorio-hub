type Ingredient = {
  name: string
  count: number
}

type RecipeCategory = 'assembly' | 'mining' | 'smelting' | 'oil-processing' | 'chemistry' | 'oil-mining'

type Recipe = {
  name: string,
  ingredients: Ingredient[]
  resultCount: number,
  seconds: number
  category: RecipeCategory | 'special'
  results: Ingredient[]
}

type RecipeMap = {
  [key: string]: Recipe
}

type Target = {
  name: string
  rate: number
}

type Manifest = {
  targets: Map<string, Target>
}