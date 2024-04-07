import { Graph, alg } from "@dagrejs/graphlib"
import TinyQueue from "tinyqueue";

export function topsort(items: string[], getDeps: (id: string) => string[]): string[] {
  const g = new Graph();

  const queue = new TinyQueue(items)
  const queued = new Set<string>(items)

  while (queue.length > 0) {
    const id = queue.pop()
    if (id === undefined) {
      continue
    }

    const deps = getDeps(id)
    for (const dep of deps) {
      g.setEdge(id, dep)

      if (!queued.has(dep)) {
        queue.push(dep)
        queued.add(dep)
      }
    }
  }


  return alg.topsort(g)
}