import { Storage, mutate } from 'stook'
import { FieldState } from '../types'

/**
 * make field touched
 * @param formName
 */
export function touchAll(formName: string) {
  const { stores } = Storage
  for (const key in stores) {
    if (!key.startsWith(`${formName}-`)) continue
    const { state } = Storage.get<FieldState>(key)
    if (Array.isArray(state)) continue

    mutate(key, (state: FieldState) => {
      state.touched = true
    })
  }
}
