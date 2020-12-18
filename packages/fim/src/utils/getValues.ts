import { Storage } from 'stook'
import set from 'lodash.set'
import { FieldState } from '../types'

export function getValues(formName: string): any {
  let values: any = {}
  const { stores } = Storage
  for (const key in stores) {
    if (!key.startsWith(`${formName}-`)) continue // skip by formName
    const { state } = Storage.get<FieldState>(key)
    if (Array.isArray(state)) continue // skip FieldArray state
    if (!state.visible) continue // skip invisible field

    const { name, value } = state
    set(values, name, value)
  }
  return values
}
