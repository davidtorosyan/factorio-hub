type Builder = {
  name: string
  category: RecipeCategory
  speed: number
  moduleSlots: number
}

type BuilderMap = {
  [key: string]: Builder
}

type Science = {
  sciencePacks: string[]
  moduleSlots: number
  speedEffects: number[]
  researchTimes: number[]
}

type FactoryCriteria = {
  science: Science
  builders: BuilderMap
}

type BuilderChoice = {
  [key in RecipeCategory]: string
}

type ExtraItem = {
  name: string
  rate: number
}

type FactoryConfig = {
  labs: number
  sciencePacks: string[]
  speedEffect: number
  researchTime: number
  builders: BuilderChoice
  extraItems: ExtraItem[]
}

type FactoryPiece = {
  name: string
  rate: number
  recipe: string
  builder: string
  count: number
}

type FactoryPlan = {
  pieces: FactoryPiece[]
}