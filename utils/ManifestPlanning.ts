export function computeManifest(requestedTargets: Target[], recipes: RecipeMap) : Manifest {
  const targets = new Map<string, Target>()
  
  const orderedNames = topsort(
    requestedTargets.map(a => a.name), 
    name => recipes[name]?.ingredients.map(a => a.name) ?? []
  );

  const requested = new Map(requestedTargets.map(item => [item.name, item]));

  for (const name of orderedNames) {    
    const recipe = recipes[name]
    if (recipe === undefined) {
      console.error(`Recipe not found for ${name}`)
      continue
    }

    const target = {name, rate: 0}
    target.rate += requested.get(name)?.rate ?? 0
    targets.set(name, target)

    for (const ingredient of recipe.ingredients) {
      const requestedIngredient = requested.get(ingredient.name) ?? {name: ingredient.name, rate: 0}
      requestedIngredient.rate += ingredient.count * target.rate
      requested.set(ingredient.name, requestedIngredient)
    }
  }

  return {targets}
}