import produce from 'immer'
import get from 'lodash.get'
import set from 'lodash.set'
import { getState, mutate } from 'stook'
import { FormState, Options, PathMetadata } from './types'
import { checkValid } from './utils/checkValid'
import { runValidators } from './utils/runValidators'
import { getValues } from './utils/getValues'

export function createHandleSubmit(formName: string, options: Options) {
  return async function handleSubmit(e?: any) {
    if (e && e.preventDefault) e.preventDefault()
    let isValid: boolean = false
    const values = getValues(formName)
    const state = getState(formName) as FormState
    const errors = await runValidators({ ...state, values })

    // update state
    const nextState = produce<FormState, FormState>(state, (draft) => {
      draft.errors = errors
      draft.values = values
      isValid = checkValid(draft.errors)
      draft.valid = isValid
      draft.submitCount += 1
      draft.submitting = true
      draft.dirty = true
    })

    if (isValid) {
      // const handledValues = handleValues(nextState.values, nextState.pathMetadata)

      // options?.onSubmit?.(handledValues)
      options?.onSubmit?.(values)
    } else {
      options?.onError?.(nextState.errors)
    }

    mutate(formName, { ...nextState })
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
