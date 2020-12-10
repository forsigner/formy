import { Validator, Errors, isClassSchema } from 'fim'
import set from 'lodash.set'
import { validateOrReject, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'

export const fimClassValidator: Validator = async ({ values, schema }) => {
  if (!isClassSchema(schema)) return {}
  const classValues = plainToClass(schema as any, values)

  try {
    await validateOrReject(classValues)
    return {}
  } catch (errors) {
    return formatErrorsFromMeta(errors, {}, '')
  }
}

function getKey(parentKey: string, property: any) {
  if (!parentKey) return property

  const isNumber = /^[0-9]*$/.test(property)

  if (!isNumber) return `${parentKey}.${property}`

  return `${parentKey}[${property}]`
}

// TODO: 太复杂，需要优化
function formatErrorsFromMeta(
  validateMetaErrors: ValidationError[],
  errors: any = {},
  parentKey: string = '',
): Errors {
  if (!Array.isArray(validateMetaErrors)) {
    console.warn(validateMetaErrors)
    return {}
  }

  for (const error of validateMetaErrors) {
    let { property, value } = error

    if (error.children.length) {
      let key = parentKey
      if (Array.isArray(value)) {
        key += property
      } else {
        const isNumber = /^[0-9]*$/.test(property)

        if (key) {
          key += isNumber ? `[${property}]` : `${property}`
        } else {
          key = property
        }
      }

      formatErrorsFromMeta(error.children, errors, key)
    } else {
      if (!error.constraints) continue
      const errorValues = Object.values(error.constraints)
      const key = getKey(parentKey, property)
      set(errors, key, errorValues[0])
    }
  }
  return errors
}
