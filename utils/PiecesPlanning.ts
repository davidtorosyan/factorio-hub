export function computeFactoryPieces(
  manifest: Manifest, 
  builderChoice: BuilderChoice, 
  recipes: RecipeMap, 
  builderMap: BuilderMap,
  oilFieldEfficiency: number) : FactoryPiece[] {
    const pieces = [] as FactoryPiece[]

    const solverOilOutput = computeOil(manifest, recipes)

    const crudeRate = manifest.targets.get('crude-oil')?.rate ?? 0 + solverOilOutput.crudeRate
    if (crudeRate != 0) {
      manifest.targets.set('crude-oil', {name: 'crude-oil', rate: crudeRate})
    }
    
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

      const modifier = item == 'crude-oil' ? (oilFieldEfficiency / 10) : 1
      const craftingRate = recipe.resultCount * builder.speed * modifier / recipe.seconds
      const count = Math.ceil(target.rate / craftingRate)
      const rate = count * craftingRate

      pieces.push({
        name: item,
        rate,
        builder: builderName,
        count,
        result: undefined,
      })
    }

    addOilPieces(pieces, solverOilOutput, builderChoice)

    return pieces
}

function addOilPieces(pieces: FactoryPiece[], solverOilOutput: SolverOilOutput, builderChoice: BuilderChoice) {

  const oilPieces: FactoryPiece[] = [
    {
      name: 'advanced-oil-processing',
      rate: solverOilOutput.heavyOilRate,
      builder: builderChoice['oil-processing'],
      count: solverOilOutput.advancedOilCount,
      result: 'heavy-oil',
    },
    {
      name: 'heavy-oil-cracking',
      rate: solverOilOutput.lightOilRate,
      builder: builderChoice['chemistry'],
      count: solverOilOutput.heavyCrackingCount,
      result: 'light-oil',
    },
    {
      name: 'light-oil-cracking',
      rate: solverOilOutput.petrolRate,
      builder: builderChoice['chemistry'],
      count: solverOilOutput.lightCrackingCount,
      result: 'petroleum-gas',
    },
  ]

  pieces.push(...oilPieces)
}