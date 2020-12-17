import { mutate, Storage } from 'stook'
import set from 'lodash.set'
import { FieldState } from '../types'
import { validateField } from './validateField'
import { getValues } from '../utils/getValues'

export async function validateAllFields(formName: string): Promise<any> {
  let errors: any = {}
  const { stores } = Storage
  const values = getValues(formName)
  for (const key in stores) {
    if (!key.startsWith(`${formName}-`)) continue
    const { state } = Storage.get<FieldState>(key)
    if (Array.isArray(state)) continue
    const error = await validateField({ fieldState: state, values })

    if (error) set(errors, state.name, error)

    mutate(key, (s: FieldState) => {
      s.error = error
    })
  }

  return errors
}
