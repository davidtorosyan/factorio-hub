export async function useImages (): Promise<Images> {
  const icons = await getIcons()

  return {
    icons
  }
}