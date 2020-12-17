import produce from 'immer'
import get from 'lodash.get'
import set from 'lodash.set'
import deepmerge from 'deepmerge'
import { getState, mutate } from 'stook'
import { checkValid, runValidators, touchAll, getValues } from './utils'
import { FormState, Config, PathMetadata } from './types'
import { validateAllFields } from './utils/validateAllFields'

export function createHandleSubmit(formName: string, config: Config) {
  return async function handleSubmit(e?: any) {
    if (e && e.preventDefault) e.preventDefault()
    let isValid: boolean = false
    const values = getValues(formName)
    const state = getState(formName) as FormState
    const [validatorErrors, fieldErros] = await Promise.all([
      runValidators({ ...state, values }),
      validateAllFields(formName),
    ])
    const errors = deepmerge(validatorErrors, fieldErros)

    touchAll(formName)

    // update  FormState
    const nextState = produce<FormState, FormState>(state, (draft) => {
      // draft.values = values
      isValid = checkValid(errors)
      draft.valid = isValid
      draft.submitCount += 1
      draft.submitting = true
      draft.dirty = true
    })

    if (isValid) {
      // const handledValues = handleValues(nextState.values, nextState.pathMetadata)

      // options?.onSubmit?.(handledValues)
      config?.onSubmit?.(values)
    } else {
      config?.onError?.(errors)
    }

    mutate(formName, nextState)
  }
}

export function handleValues<T>(values: T, pathMetadata: PathMetadata) {
  return produce(values, (draft) => {
    //handle values before submit
    for (const item of pathMetadata) {
      const { path } = item

      /** visible is false */
      if ((item.visible ?? true) === false) {
        if (!path.includes('.')) {
          delete (draft as any)[path]

          /** 处理 nested object */
        } else {
          const arr = path.split('.')
          const last = arr.pop() as string
          const obj = get(draft, arr.join('.'))
          delete obj[last]
        }
      }

      if (item.transform) {
        const value = get(draft, path)
        set(draft as any, path, item.transform(value))
      }
    }
  })
}
