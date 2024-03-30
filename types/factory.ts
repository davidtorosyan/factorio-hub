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