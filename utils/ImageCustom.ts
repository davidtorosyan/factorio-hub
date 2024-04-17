// @ts-expect-error
import image000 from '~/assets/img/icons/automation-science-pack.png?webp&w=64&h=64&position=left&saturation=0.5'

const result = new Map<string, string>()

result.set('generic-science', image000)

export function getCustomImages (): Map<string, string> {
  return result
}