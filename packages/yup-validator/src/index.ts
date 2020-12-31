import { ObjectSchema } from 'yup'
import { FormyPlugin, Errors } from '@formy/core'
import { getIn, setIn } from '@formy/utils'

export const FormyYupValidator: FormyPlugin = {
  validator: async ({ values, validationSchema }) => {
    const schema = validationSchema as ObjectSchema<any>

    try {
      await schema?.validate(values, { abortEarly: false })
    } catch (error) {
      return parseErrors(values, error)
    }
    return {}
  },
}

function parseErrors<T>(values: any, error: any): Errors<T> {
  let errors: Errors<T> = {}
  if (!error?.inner) return errors

  if (error.inner.length === 0) return setIn(errors, error.path, error.message)

  for (let err of error.inner) {
    if (getIn(errors, err.path)) continue
    if (!getIn(values, err.path)) continue
    errors = setIn(errors, err.path, err.message)
  }

  return errors
}
