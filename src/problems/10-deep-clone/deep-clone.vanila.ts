// bun test src/problems/10-deep-clone/test/deep-clone.test.ts
// TODO: Implement deepClone

type TCollection = Map<any, any> | Set<any> | Record<any, any> | Array<any>

const getType = (val: any) => {
  if (val == null) {
    return `${val}`
  }
  return (Object.getPrototypeOf(val)?.constructor?.name ?? 'object').toLowerCase()
}

const getTarget = (type: string) => {
  switch (type) {
    case 'array':
      return []
    case 'map':
      return new Map()
    case 'object':
      return {}
    case 'set':
      return new Set();
    default:
      throw Error('Unsupported type')
  }
}

const addToTarget = (target: TCollection, key: any, value: unknown): void => {
  if (target instanceof Map) {
    target.set(key, value)
  } else if (target instanceof Set) {
    target.add(value)
  } else if (Array.isArray(target)) {
    target[key as number] = value
  } else {
    target[key] = value
  }
}

const each = (target: TCollection, callback: (key: any, value: any) => void) => {
  if (target instanceof Map) {
    target.forEach((v, k) => callback(k, v))
  } else if (Array.isArray(target)) {
    target.forEach((v, k) => callback(k, v))
  } else if (target instanceof Set) {
    target.forEach((v) => callback(null, v))
  } else {
    Object.entries(target).forEach(([k, v]) => callback(k, v))
  }
}

export const deepClone = <T>(a: T, cache = new Map()): T => {
  const type = getType(a)

  switch (type) {
    case 'object':
    case 'array':
    case 'set':
    case 'map':
      const target = getTarget(type);
      if (cache.has(a)) {
        return cache.get(a);
      }
      cache.set(a, target);
      each(a as TCollection, (k, v) => addToTarget(target, k, deepClone(v, cache)))
      return target as T;
    case 'date':
      return new Date(a as Date) as T
  }
  return a
}
