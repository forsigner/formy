import { mutate } from 'stook'
import isPromise from 'is-promise'
import { Errors, FieldState, ValidatorOptions } from '../types'
import deepmerge from 'deepmerge'
import { fim } from '../fim'

export async function runValidators(options: ValidatorOptions): Promise<Errors> {
  const promises = fim.validators.map((validtor) => validtor(options))

  // run validate function
  promises.push(userValidator(options))

  const errorsArray = await Promise.all(promises)
  const errors = deepmerge.all(errorsArray)

  updateFieldError(options.formName, errors)

  return handleErrors(errors)
}

// TODO: handle nested
function updateFieldError(formName: string, errors: any) {
  for (const key in errors) {
    const stateKey = `${formName}-${key}`
    mutate(stateKey, (s: FieldState) => {
      s.error = errors[key]
    })
  }
}

function handleErrors(errors: any) {
  // const newErrors: any = {}
  // for (const key in errors) {
  //   if (get(options.visibles, key)) newErrors[key] = errors[key]
  // }
  // return newErrors
  return errors
}

async function userValidator(validatorOptions: ValidatorOptions): Promise<Errors> {
  const { config: options } = validatorOptions
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
