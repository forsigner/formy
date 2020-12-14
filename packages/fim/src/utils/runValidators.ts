import get from 'lodash.get'
import isPromise from 'is-promise'
import { Errors, ValidatorOptions } from '../types'
import deepmerge from 'deepmerge'
import { fim } from '../fim'

export async function runValidators(options: ValidatorOptions): Promise<Errors> {
  const promises = fim.validators.map((validtor) => validtor(options))

  // run validate function
  promises.push(userValidator(options))

  const errorsArray = await Promise.all(promises)

  const errors = deepmerge.all(errorsArray)
  return filterInvisible(errors, options)
}
function filterInvisible(errors: any, options: ValidatorOptions) {
  const newErrors: any = {}
  for (const key in errors) {
    if (get(options.visibles, key)) newErrors[key] = errors[key]
  }
  return newErrors
}

async function userValidator(validatorOptions: ValidatorOptions): Promise<Errors> {
  const { options } = validatorOptions
  if (!options?.validate) return {}

  // function validate
  let validateFnErrors = options?.validate?.(validatorOptions)

  // sync validate
  if (!isPromise(validateFnErrors)) return validateFnErrors

  try {
    return (await validateFnErrors) as any
  } catch {
    return {}
  }
}
