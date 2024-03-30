type Builder = {
  name: string
  category: RecipeCategory
  speed: number
  moduleSlots: number
}

type BuilderMap = {
  [key: string]: Builder
}