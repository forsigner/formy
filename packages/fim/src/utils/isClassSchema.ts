export function isClassSchema(schema: any): boolean {
  if (typeof schema === 'function') return true
  if (typeof schema === 'object') return false
  throw new Error('invalid schema')
}
