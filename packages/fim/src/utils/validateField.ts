import { fim } from '../fim'
import { FieldValidateOptions } from '../types'
import isPromise from 'is-promise'

export async function validateField(options: FieldValidateOptions): Promise<any> {
  let error: any = undefined
  const { rules = {}, validate, value } = options.fieldState

  /** 优先级比较高 */
  if (validate && typeof validate === 'function') {
    const result = validate(value, options.values)
    error = isPromise(result) ? await result : result
  }

  if (error) return error

  for (const rule in rules || {}) {
    if (!fim.rules[rule]) continue

    const result = fim.rules[rule](options, rules[rule])
    error = isPromise(result) ? await result : result

    if (error) break
  }

  return error
}
