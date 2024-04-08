export function useFactoryConfig (): Ref<FactoryConfig> {
  return ref({
    labs: 1,
    sciencePacks: [],
    speedEffect: 0,
    researchTime: 0,
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
  })
}
