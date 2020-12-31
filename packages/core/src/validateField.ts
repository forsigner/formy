import isPromise from 'is-promise'
import { Formy } from './Formy'
import { FieldValidateOptions } from './types'

export async function validateField(options: FieldValidateOptions): Promise<any> {
  let error: any = undefined
  const { rules = {} } = options.fieldState

  for (const rule in rules) {
    if (!Formy.rules[rule]) continue

    const { value } = options.fieldState
    const result = Formy.rules[rule](value, rules[rule], options)

    error = isPromise(result) ? await result : result

    if (error) break
  }

  return error
}
