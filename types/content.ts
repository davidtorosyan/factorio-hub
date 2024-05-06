

type RecipeCategory = 'assembly' | 'mining' | 'smelting' | 'oil-processing' | 'chemistry' | 'oil-mining' | 'launch'

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

type Builder = {
  name: string
  category: RecipeCategory
  speed: number
  moduleSlots: number
}

type BuilderMap = {
  [key: string]: Builder
}

type BuilderOptions = {
  [key in RecipeCategory]: string[]
}

type Science = {
  sciencePacks: string[]
  moduleSlots: number
  speedEffects: number[]
  researchTimes: number[]
}

type FactoryContent = {
  recipes: RecipeMap
  builders: BuilderMap
  builderOptions: BuilderOptions
  science: Science
}

type Images = {
  icons: Map<string, string>
  custom: Map<string, string>
}