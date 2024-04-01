
import type { ParsedContent } from "@nuxt/content/types"

export async function useScience (): Promise<Ref<Science>> {
  const contentJson = await queryContent('/data-raw').findOne()
  
  const sciencePacks = getSciencePacks(contentJson)
  const moduleSlots = getModuleSlots(contentJson)

  const speedUpgrades = getSpeedUpgrades(contentJson)
  const speedEffects = convertToSpeedEffects(speedUpgrades)

  const researchTimes = getResearchTimes(contentJson)

  return ref({
    sciencePacks,
    moduleSlots,
    speedEffects,
    researchTimes,
  })
}

function convertToSpeedEffects (speedUpgrades: number[]): number[] {
  const results = []
  let total = 1
  for (const speedUpgrade of speedUpgrades) {
    total += speedUpgrade
    results.push(total)
  }
  return results
}

function getSciencePacks (contentJson: ParsedContent): string[] {
  return contentJson.lab.lab.inputs
}

function getModuleSlots (contentJson: ParsedContent): number {
  const moduleSlotsJson = contentJson.lab.lab.module_specification.module_slots
  return convertNumber(moduleSlotsJson) ?? 0
}

function getSpeedUpgrades (contentJson: ParsedContent): number[] {
  const technologiesJson = contentJson.technology
  const results = []
  for (const technologyJson of Object.values(technologiesJson) as any[]) {
    const effectsJson = technologyJson.effects
    if (effectsJson === undefined || effectsJson.length !== 1) {
      continue
    }
    const effect = effectsJson[0]
    if (effect.type !== 'laboratory-speed') {
      continue
    }
    const modifierJson = effect.modifier
    const modifier = convertNumber(modifierJson) ?? 0
    results.push(modifier)
  }
  return results
}

function getResearchTimes (contentJson: ParsedContent): number[] {
  const technologiesJson = contentJson.technology
  const results = new Set<number>()
  for (const technologyJson of Object.values(technologiesJson) as any[]) {
    const timeJson = technologyJson.unit.time
    const time = convertNumber(timeJson) ?? 0
    results.add(time)
  }
  return [...results].sort((a, b) => a - b);
}