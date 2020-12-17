import { Storage } from 'stook'
import set from 'lodash.set'
import { FieldState } from '../types'

export function getErrors(formName: string): any {
  let errors: any = {}
  const { stores } = Storage
  for (const key in stores) {
    if (!key.startsWith(`${formName}-`)) continue
    const { state } = Storage.get<FieldState>(key)
    if (Array.isArray(state)) continue

    const { name, error } = state
    set(errors, name, error)
  }
  return errors
}
