export function useManifest (neededItems: Ref<Target[]>, recipes: Ref<RecipeMap>): Ref<Manifest> {
  const result = ref({} as Manifest)

  watchEffect(() => {
    result.value = computeManifest(toValue(neededItems), toValue(recipes))
  })

  return result
}

function computeManifest(neededItems: Target[], recipes: RecipeMap) : Manifest {
  const targets = new Map<string, Target>()
  const result = {targets}
  

  const orderedNames = topsort(
    neededItems.map(a => a.name), 
    name => recipes[name]?.ingredients.map(a => a.name) ?? []
  );

  const requested = new Map(neededItems.map(item => [item.name, item]));

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

  return result
}