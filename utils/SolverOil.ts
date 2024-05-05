export function computeOil(manifest: Manifest, recipes: RecipeMap): SolverOilOutput {
  const config = buildConfig(recipes)
  const input = buildInput(manifest)
  return solveOil(input, config)
}

function findCount(ingredients: Ingredient[], name: string): number {
  return ingredients.find(i => i.name === name)?.count ?? 0
}

function findTarget(manifest: Manifest, name: string): number {
  return manifest.targets.get(name)?.rate ?? 0
}

function buildInput(manifest: Manifest): SolverOilInput {
  return {
    petrolRate: findTarget(manifest, 'petroleum-gas'),
    heavyOilRate: findTarget(manifest, 'heavy-oil'),
    lightOilRate: findTarget(manifest, 'light-oil'),
  }
}

function buildConfig(recipes: RecipeMap): SolverOilConfig {
  const advancedOilRecipe = recipes['advanced-oil-processing']
  const heavyCrackingRecipe = recipes['heavy-oil-cracking']
  const lightCrackingRecipe = recipes['light-oil-cracking']

  return {
    advancedOilConfig: {
      crudeRate: findCount(advancedOilRecipe.ingredients, 'crude-oil'),
      petrolRate: findCount(advancedOilRecipe.results, 'petroleum-gas'),
      lightOilRate: findCount(advancedOilRecipe.results, 'light-oil'),
      heavyOilRate: findCount(advancedOilRecipe.results, 'heavy-oil'),
    },
    heavyCrackingConfig: {
      heavyOilRate: findCount(heavyCrackingRecipe.ingredients, 'heavy-oil'),
      lightOilRate: findCount(heavyCrackingRecipe.results, 'light-oil'),
    },
    lightCrackingConfig: {
      lightOilRate: findCount(lightCrackingRecipe.ingredients, 'light-oil'),
      petrolRate: findCount(lightCrackingRecipe.results, 'petroleum-gas'),
    },
  }
}

function solveOil(input: SolverOilInput, config: SolverOilConfig): SolverOilOutput {
  const yieldLight = 
    config.heavyCrackingConfig.lightOilRate / 
    config.heavyCrackingConfig.heavyOilRate
  const yieldPetrol = 
    config.lightCrackingConfig.petrolRate / 
    config.lightCrackingConfig.lightOilRate

  const advancedOilCount = 
    (
      input.lightOilRate + 
      (yieldLight * input.heavyOilRate) + 
      (yieldPetrol * input.petrolRate)
    ) /
    (
      config.advancedOilConfig.lightOilRate + 
      (yieldLight * config.advancedOilConfig.heavyOilRate) + 
      (yieldPetrol * config.advancedOilConfig.petrolRate)
    )

  const heavyCrackingCount = 
  (
    advancedOilCount * config.advancedOilConfig.heavyOilRate - 
    input.heavyOilRate
  ) / 
  config.heavyCrackingConfig.heavyOilRate
  

  const lightCrackingCount = (
    input.petrolRate - 
    advancedOilCount * config.advancedOilConfig.petrolRate
  ) /
  config.lightCrackingConfig.petrolRate

  const crudeRate = advancedOilCount * config.advancedOilConfig.crudeRate

  const petrolRate = 
    advancedOilCount * config.advancedOilConfig.petrolRate +
    lightCrackingCount * config.lightCrackingConfig.petrolRate

  const lightOilRate = 
    advancedOilCount * config.advancedOilConfig.lightOilRate +
    heavyCrackingCount * config.heavyCrackingConfig.lightOilRate -
    lightCrackingCount * config.lightCrackingConfig.lightOilRate

  const heavyOilRate = 
      advancedOilCount * config.advancedOilConfig.heavyOilRate -
      heavyCrackingCount * config.heavyCrackingConfig.heavyOilRate

  return {
    crudeRate,
    petrolRate,
    heavyOilRate,
    lightOilRate,
    advancedOilCount,
    heavyCrackingCount,
    lightCrackingCount,
  }
}