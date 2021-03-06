import { createPair } from '../../ast/Pair.js'
import { YAMLMap } from '../../ast/YAMLMap.js'
import { resolveMap } from '../../resolve/resolveMap.js'

function createMap(schema, obj, ctx) {
  const map = new YAMLMap(schema)
  if (obj instanceof Map) {
    for (const [key, value] of obj) map.items.push(createPair(key, value, ctx))
  } else if (obj && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      const value = obj[key]
      if (value !== undefined) map.items.push(createPair(key, value, ctx))
    }
  }
  if (typeof schema.sortMapEntries === 'function') {
    map.items.sort(schema.sortMapEntries)
  }
  return map
}

export const map = {
  createNode: createMap,
  default: true,
  nodeClass: YAMLMap,
  tag: 'tag:yaml.org,2002:map',
  resolve: resolveMap
}
