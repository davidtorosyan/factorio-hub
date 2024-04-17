export async function useImages (): Promise<Images> {
  const icons = await getIcons()
  const custom = getCustomImages()

  return {
    icons,
    custom,
  }
}