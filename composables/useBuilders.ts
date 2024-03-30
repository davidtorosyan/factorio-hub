import type { ParsedContent } from "@nuxt/content/types"

export async function useBuilders (): Promise<Ref<BuilderMap>> {
  const contentJson = await queryContent('/data-raw').findOne()
  const result = ref({} as BuilderMap)
  
  setAssemblingMachines(contentJson, result.value)
  setFurnaces(contentJson, result.value)
  setMiningDrills(contentJson, result.value)

  return result
}

function setAssemblingMachines (contentJson: ParsedContent, builderMap: BuilderMap) {
  const machinesJson = contentJson['assembling-machine']

  for (const machineJson of Object.values(machinesJson) as any[]) {
    const nameJson = machineJson.name
    const speedJson = machineJson.crafting_speed
    const craftingCategoriesJson = machineJson.crafting_categories
    const moduleSlotsJson = machineJson.module_specification?.module_slots

    if (typeof nameJson !== 'string') {
      continue
    }

    const craftingCategories = craftingCategoriesJson as string[]

    const name = nameJson
    const category = getAssemblyCategory(craftingCategories)
    const speed = convertNumber(speedJson) ?? 1
    const moduleSlots = convertNumber(moduleSlotsJson) ?? 0

    if (category === undefined) {
      continue
    }
    
    builderMap[name] = {
      name,
      category,
      speed,
      moduleSlots,
    }
  }
}

function setFurnaces (contentJson: ParsedContent, builderMap: BuilderMap) {
  const furnacesJson = contentJson['furnace']

  for (const furnaceJson of Object.values(furnacesJson) as any[]) {
    const nameJson = furnaceJson.name
    const speedJson = furnaceJson.crafting_speed
    const moduleSlotsJson = furnaceJson.module_specification?.module_slots

    if (typeof nameJson !== 'string') {
      continue
    }

    const name = nameJson
    const category = 'smelting'
    const speed = convertNumber(speedJson) ?? 1
    const moduleSlots = convertNumber(moduleSlotsJson) ?? 0

    builderMap[name] = {
      name,
      category,
      speed,
      moduleSlots,
    }
  }
}

function setMiningDrills (contentJson: ParsedContent, builderMap: BuilderMap) {
  const drillsJson = contentJson['mining-drill']

  for (const drillJson of Object.values(drillsJson) as any[]) {
    const nameJson = drillJson.name
    const speedJson = drillJson.mining_speed
    const moduleSlotsJson = drillJson.module_specification?.module_slots

    if (typeof nameJson !== 'string') {
      continue
    }

    const name = nameJson
    const category = getMiningCategory(name)
    const speed = convertNumber(speedJson) ?? 1
    const moduleSlots = convertNumber(moduleSlotsJson) ?? 0

    builderMap[name] = {
      name,
      category,
      speed,
      moduleSlots,
    }
  }
}

function getAssemblyCategory (craftingCategories: string[]): RecipeCategory | undefined {
  if (craftingCategories.length === 1) {
    const category = craftingCategories[0] as RecipeCategory
    const basicCategories: RecipeCategory[] = ['oil-processing', 'chemistry']
    if (basicCategories.includes(category)) {
      return category
    }
  }
  if (craftingCategories.includes('crafting')) {
    return 'assembly'
  }

  return undefined
}

function getMiningCategory (name: string): RecipeCategory {
  if (name === 'pumpjack') {
    return 'oil-mining'
  }

  return 'mining'
}