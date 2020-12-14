import { Storage } from 'stook'
import set from 'lodash.set'

export function getValues(formName: string): any {
  let values: any = {}
  const { stores } = Storage
  for (const key in Storage.stores) {
    if (!key.startsWith(`${formName}-`)) continue
    const { name, value } = stores[key].state
    set(values, name, value)
  }
  return values
}
