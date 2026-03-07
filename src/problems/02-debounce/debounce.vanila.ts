// bun test src/problems/02-debounce/test/debounce.test.ts

// TODO: Implement debounce

export function debounce<F extends (this: any, ...args: any[]) => void>(
  fn: F,
  delay: number,
): (...args: Parameters<F>) => void {
  let timerId: ReturnType<typeof setTimeout> | null = null
  return function debounced(this: any, ...args: Parameters<F>): void {
    timerId && clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
