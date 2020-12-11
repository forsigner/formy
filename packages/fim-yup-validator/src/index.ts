import { ObjectSchema } from 'yup'
import { Validator, Errors } from 'fim'
import set from 'lodash.set'
import get from 'lodash.get'

export const fimYupValidator: Validator = async ({ values, validationSchema }) => {
  const schema = validationSchema as ObjectSchema<any>

  try {
    await schema?.validate(values, { abortEarly: false })
  } catch (error) {
    return parseErrors(error)
  }
  return {}
}

function parseErrors<T>(error: any): Errors<T> {
  let errors: Errors<T> = {}
  if (!error?.inner) return errors

  if (error.inner.length === 0) return set(errors, error.path, error.message)

  for (let err of error.inner) {
    if (get(errors, err.path)) continue
    errors = set(errors, err.path, err.message)
  }

  return errors
}
