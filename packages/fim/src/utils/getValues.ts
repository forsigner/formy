import { Storage } from 'stook'
import set from 'lodash.set'

export function getValues(formName: string): any {
  let values: any = {}
  const { stores } = Storage
  for (const key in stores) {
    if (!key.startsWith(`${formName}-`)) continue
    const { state } = stores[key]
    if (Array.isArray(state)) continue

    const { name, value } = state
    set(values, name, value)
  }
  return values
}
