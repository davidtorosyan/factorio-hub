export async function useIcons (): Promise<Map<string, string>> {
  const prefix = "/assets/img/icons/"
  const postfix = ".png"

  const icons = await import.meta.glob('~/assets/img/icons/*.png', {
    query: '?webp&w=64&h=64&position=left',
    import: 'default',
  })

  const result = new Map<string, string>()

  for (const path in icons) {
    const key = path.substring(prefix.length, path.length - postfix.length)
    const image = await icons[path]() as string
    result.set(key, image)
  }

  return result
}