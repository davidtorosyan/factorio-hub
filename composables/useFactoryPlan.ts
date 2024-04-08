export function useFactoryPlan (
  factoryContent: Ref<FactoryContent>,
  factoryConfig: Ref<FactoryConfig>,
  ): Ref<FactoryPlan> {
  const result = ref({} as FactoryPlan)

  watchEffect(() => {
    const content = toValue(factoryContent)
    const config = toValue(factoryConfig)

    const targets = config.sciencePacks.map(pack => ({
      name: pack,
      rate: 1
    })).concat(config.extraItems)

    const manifest = computeManifest(toValue(targets), content.recipes)
    const pieces = computeFactoryPieces(
      manifest, 
      toValue(factoryConfig).builders, 
      content.recipes, 
      content.builders
    )

    result.value = {
      pieces,
      manifest,
    }
  })

  return result
}