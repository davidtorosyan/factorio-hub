type SolverOilInput = {
  petrolRate: number
  heavyOilRate: number
  lightOilRate: number
}

type SolverOilConfig = {
  advancedOilConfig: {
    crudeRate: number
    petrolRate: number
    lightOilRate: number
    heavyOilRate: number
  }
  heavyCrackingConfig: {
    heavyOilRate: number
    lightOilRate: number
  }
  lightCrackingConfig: {
    lightOilRate: number
    petrolRate: number
  }
}

type SolverOilOutput = {
  petrolRate: number
  heavyOilRate: number
  lightOilRate: number
  advancedOilCount: number
  heavyCrackingCount: number
  lightCrackingCount: number
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

  const heavyCrackingCount = 0
  const lightCrackingCount = 0

  const petrolRate = 0
  const lightOilRate = 0
  const heavyOilRate = 0

  return {
    petrolRate,
    heavyOilRate,
    lightOilRate,
    advancedOilCount,
    heavyCrackingCount,
    lightCrackingCount,
  }
}