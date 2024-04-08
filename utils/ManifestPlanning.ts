export function computeManifest(requestedTargets: Map<string, Target>, recipes: RecipeMap) : Manifest {
  const targets = new Map<string, Target>()
  
  const orderedNames = topsort(
    [...requestedTargets.keys()], 
    name => recipes[name]?.ingredients.map(a => a.name) ?? []
  );

  for (const name of orderedNames) {    
    const recipe = recipes[name]
    if (recipe === undefined) {
      console.error(`Recipe not found for ${name}`)
      continue
    }

    const target = {name, rate: 0}
    target.rate += requestedTargets.get(name)?.rate ?? 0
    targets.set(name, target)

    for (const ingredient of recipe.ingredients) {
      const requestedIngredient = requestedTargets.get(ingredient.name) ?? {name: ingredient.name, rate: 0}
      requestedIngredient.rate += ingredient.count * target.rate
      requestedTargets.set(ingredient.name, requestedIngredient)
    }
  }

  return {targets}
}