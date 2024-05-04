export function useFactoryPlan (
  factoryContent: Ref<FactoryContent>,
  factoryConfig: FactoryConfig,
  ): Ref<FactoryPlan> {
  const result = ref({} as FactoryPlan)

  watchEffect(() => {
    const content = toValue(factoryContent)
    const config = toValue(factoryConfig)

    const targets = computeTargets(config)
    const manifest = computeManifest(targets, content.recipes)
    const pieces = computeFactoryPieces(
      manifest, 
      config.builders, 
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