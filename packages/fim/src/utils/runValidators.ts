import get from 'lodash.get'
// import isPromise from 'is-promise'
import { Errors, ValidatorOptions } from '../types'
import deepmerge from 'deepmerge'
import { Fim } from '../Fim'

export async function runValidators(options: ValidatorOptions): Promise<Errors> {
  const promises = Fim.Validators.map((validtor) => validtor(options))
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


//  async function runValidateFn(): Promise<Errors<T>> {
//   const { options: config } = this
//   const state = getState(this.formName) as FormState<T>
//   if (!config.validate) return {}

//   // function validate
//   let validateFnErrors = config.validate(state.values)

//   // sync validate
//   if (!isPromise(validateFnErrors)) {
//     return validateFnErrors
//   }

//   try {
//     return (await validateFnErrors) as any
//   } catch {
//     return {}
//   }
// }
