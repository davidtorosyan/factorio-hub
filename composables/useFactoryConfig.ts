export function useFactoryConfig (factoryContent: Ref<FactoryContent>): Ref<FactoryConfig> {
  const result = ref({} as FactoryConfig)

  watchEffect(() => {
    const content = toValue(factoryContent)

    result.value ={
      labs: 1,
      sciencePacks: [],
      speedEffect: content.science.speedEffects[0] ?? 0,
      researchTime: content.science.researchTimes[0] ?? 0,
      builders: {
        'chemistry': 'chemical-plant',
        'assembly': 'assembling-machine-2',
        'smelting': 'electric-furnace',
        'mining': 'electric-mining-drill',
        'oil-mining': 'pumpjack',
        'oil-processing': 'oil-refinery',
      },
      extraItems: [
        // {
        //   name: 'construction-robot',
        //   rate: 1,
        // }
      ],
    }
  })

  return result
}
