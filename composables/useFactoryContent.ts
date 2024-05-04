export async function useFactoryContent (): Promise<Ref<FactoryContent>> {
  const contentJson = await queryContent('/data-raw').findOne()

  const recipes = getRecipes(contentJson)
  const builders = getBuilders(contentJson)
  const science = getScience(contentJson)

  const builderOptions = {} as BuilderOptions
  for (const builder of Object.values(builders)) {
    builderOptions[builder.category] = builderOptions[builder.category] || []
    builderOptions[builder.category].push(builder.name)
  }

  return ref({
    recipes,
    builders,
    builderOptions,
    science,
  })
}
