export function isFieldSchema(item: any): boolean {
  return Reflect.has(item, 'value')
}
