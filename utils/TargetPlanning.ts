export function computeTargets(config: FactoryConfig) : Map<string, Target> {
  const scienceTargets = config.sciencePacks.map(name => getScienceTarget(name, config))
  const extraItems = config.extraItems.map(resolveExtraItem).filter(item => item !== undefined) as Target[]
  const targets = scienceTargets.concat(extraItems)

  const rateUpdater = (existing: Target, value: Target) => existing.rate += value.rate
  const results = new Map<string, Target>()
  for (const target of targets) {
    setOrUpdate(results, target.name, target, rateUpdater)
  }

  return results
}

function resolveExtraItem(item: ExtraItem) : Target | undefined {
  if (item.name === undefined || item.rate === undefined || item.rate === 0) {
    return undefined
  }
  return {name: item.name, rate: item.rate}
}

function getScienceTarget(name: string, config: FactoryConfig) : Target {
  const rate = config.labs * config.speedEffect / config.researchTime
  return {name, rate}
}

function setOrUpdate<K, V>(map: Map<K, V>, key: K, value: V, updater: (existing: V, value: V) => void) {
  const existing = map.get(key)
  if (existing === undefined) {
    map.set(key, value)
  } else {
    updater(existing, value)
  }
}