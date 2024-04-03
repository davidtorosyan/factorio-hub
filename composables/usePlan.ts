export function usePlan (
  manifest: Ref<Manifest>, 
  builderChoice: Ref<BuilderChoice>, 
  recipes: Ref<RecipeMap>, 
  builderMap: Ref<BuilderMap>
): Ref<FactoryPlan> {

  const result = ref({} as FactoryPlan)

  watchEffect(() => {
    result.value = computePlan(
      toValue(manifest), 
      toValue(builderChoice), 
      toValue(recipes), 
      toValue(builderMap),
    )
  })

  return result
}

function computePlan(
  manifest: Manifest, 
  builderChoice: BuilderChoice, 
  recipes: RecipeMap, 
  builderMap: BuilderMap) : FactoryPlan {
    const pieces = [] as FactoryPiece[]

    for (const item of Object.keys(manifest)) {
      const need = manifest[item]
      const recipeName = need.recipe.name
      const recipe = recipes[recipeName]
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

      const rate = need.rate
      const count = Math.ceil(rate / recipe.resultCount * recipe.seconds * builder.speed)

      pieces.push({
        name: item,
        rate,
        recipe: recipeName,
        builder: builderName,
        count,
      })
    }

    return {pieces}
}


