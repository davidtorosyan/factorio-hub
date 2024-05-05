export const defaultFactoryConfig: FactoryConfig = {
  labs: 1,
  sciencePacks: [],
  speedEffect: 1,
  researchTime: 5,
  oilFieldEfficiency: 1000,
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
  ready: false,
}

export const useFactoryConfigStore = defineStore('configStore', {
  state: () => defaultFactoryConfig,
  persist: {
    storage: persistedState.localStorage,
    afterRestore: (ctx) => {
      setTimeout(() => {
        ctx.store.ready = true
      }, 0)
    },
  },
})