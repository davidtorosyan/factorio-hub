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
  crudeRate: number
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