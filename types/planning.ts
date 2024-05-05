type Ingredient = {
  name: string
  count: number
}

type Target = {
  name: string
  rate: number
}

type Manifest = {
  targets: Map<string, Target>
}

type BuilderChoice = {
  [key in RecipeCategory]: string
}

type ExtraItem = {
  name: string
  rate: number
}

type FactoryConfig = {
  labs: number
  sciencePacks: string[]
  speedEffect: number
  researchTime: number
  oilFieldEfficiency: number
  builders: BuilderChoice
  extraItems: ExtraItem[]
  ready: boolean
}

type FactoryPiece = {
  name: string
  rate: number
  builder: string
  count: number
}

type FactoryPlan = {
  pieces: FactoryPiece[]
  manifest: Manifest
}

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