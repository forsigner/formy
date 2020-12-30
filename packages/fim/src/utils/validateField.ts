import isPromise from 'is-promise'
import { Fim } from '../Fim'
import { FieldValidateOptions } from '../types'

export async function validateField(options: FieldValidateOptions): Promise<any> {
  let error: any = undefined
  const { rules = {} } = options.fieldState

  for (const rule in rules) {
    if (!Fim.rules[rule]) continue

    const { value } = options.fieldState
    const result = Fim.rules[rule](value, rules[rule], options)

    error = isPromise(result) ? await result : result

    if (error) break
  }

  return error
}
