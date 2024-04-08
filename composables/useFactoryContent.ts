export async function useFactoryContent (): Promise<Ref<FactoryContent>> {
  const contentJson = await queryContent('/data-raw').findOne()

  const recipes = getRecipes(contentJson)
  const builders = getBuilders(contentJson)
  const science = getScience(contentJson)

  return ref({
    recipes,
    builders,
    science,
  })
}
