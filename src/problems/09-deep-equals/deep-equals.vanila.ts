// bun test src/problems/09-deep-equals/test/deep-equals.test.ts

// TODO: Implement deepEquals

const getType = (value: any) => {
  if (value == null) {
    return `${value}`
  }
  return (Object.getPrototypeOf(value)?.constructor?.name ?? 'object').toLowerCase()
}

export const deepEquals = (a: any, b: any, cache = new Map()): boolean => {
  if (a === b || (cache.has(a) && cache.get(a) === b)) {
    return true
  }

  const [type1, type2] = [getType(a), getType(b)]

  if (type1 !== type2) {
    return false
  }

  if (typeof a !== 'object') {
    return a === b
  }

  const [keys1, keys2] = [Object.keys(a), Object.keys(b)]

  if (keys1.length !== keys2.length) {
    return false
  }

  cache.set(a, b)
  for (const key of keys1) {
    if (!Object.hasOwn(b, key) || !deepEquals(a[key], b[key], cache)) {
      return false
    }
  }

  return true
}
