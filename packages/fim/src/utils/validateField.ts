import { fim } from '../fim'
import { FieldValidateOptions } from '../types'
import isPromise from 'is-promise'

export async function validateField(options: FieldValidateOptions): Promise<any> {
  let error: any = null
  const { rules = {} } = options.fieldState
  for (const rule in rules || {}) {
    if (!fim.rules[rule]) continue

    const result = fim.rules[rule](options, rules[rule])
    error = isPromise(result) ? await result : result

    if (error) break
  }
  return error
}
