export const memoize = (fn: any) => {
  let cache: any = {}
  return (...args: any[]) => {
    // let key = JSON.stringify(args[0])
    let key = JSON.stringify(args[0])
    if (key in cache) return cache[key]
    let result = fn(...args)
    cache[key] = result
    return result
  }
}
