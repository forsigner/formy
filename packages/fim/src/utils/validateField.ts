import isPromise from 'is-promise'
import { fim } from '../fim'
import { FieldValidateOptions } from '../types'

export async function validateField(options: FieldValidateOptions): Promise<any> {
  let error: any = undefined
  const { rules = {} } = options.fieldState

  for (const rule in rules) {
    if (!fim.rules[rule]) continue

    const { value } = options.fieldState
    const result = fim.rules[rule](value, rules[rule], options)

    error = isPromise(result) ? await result : result

    if (error) break
  }

  return error
}
