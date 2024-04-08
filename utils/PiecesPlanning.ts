export function computeFactoryPieces(
  manifest: Manifest, 
  builderChoice: BuilderChoice, 
  recipes: RecipeMap, 
  builderMap: BuilderMap) : FactoryPiece[] {
    const pieces = [] as FactoryPiece[]

    for (const target of manifest.targets.values()) {
      const item = target.name
      const recipe = recipes[item]
      if (recipe === undefined) {
        console.error(`Recipe not found for ${item}`)
        continue
      }

      if (recipe.category === 'special') {
        continue
      }

      const builderName = builderChoice[recipe.category]
      const builder = builderMap[builderName]
      if (builder === undefined) {
        console.error(`Builder not found for ${item}`)
        continue
      }

      const craftingRate = recipe.resultCount * builder.speed / recipe.seconds
      const count = Math.ceil(target.rate / craftingRate)
      const rate = count * craftingRate

      pieces.push({
        name: item,
        rate,
        builder: builderName,
        count,
      })
    }

    return pieces
}


