export function computeTargets(config: FactoryConfig) : Map<string, Target> {
  const scienceTargets = config.sciencePacks.map(name => getScienceTarget(name, config))
  const targets = scienceTargets.concat(config.extraItems)

  const rateUpdater = (existing: Target, value: Target) => existing.rate += value.rate
  const results = new Map<string, Target>()
  for (const target of targets) {
    setOrUpdate(results, target.name, target, rateUpdater)
  }

  return results
}

function getScienceTarget(name: string, config: FactoryConfig) : Target {
  const rate = config.labs
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