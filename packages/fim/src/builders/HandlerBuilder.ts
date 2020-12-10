import { FocusEvent } from 'react'
import produce from 'immer'
import get from 'lodash.get'
import set from 'lodash.set'
import isEqual from 'react-fast-compare'

import { FieldElement, FormState, Actions, PathMetadata } from '../types'
import { Validator } from '../Validator'
import { checkValid } from '../utils/checkValid'
import { touchAll } from '../utils/touchAll'
import { isTouched } from '../utils/isTouched'
import { Options } from '../types'
import { getState } from 'stook'

export class HandlerBuilder<T> {
  constructor(
    private key: string,
    private actions: Actions<T>,
    private setState: any,
    private validator: Validator<T>,
    private options: Options<T>,
  ) {}

  flatObject(obj: any, parentKey = '', result = {} as any) {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        this.flatObject(obj[key], key, result)
      } else {
        const cur = parentKey ? `${parentKey}.${key}` : key
        result[cur] = obj[key]
      }
    }
    return result
  }

  createSubmitHandler = () => {
    return async (e?: any) => {
      if (e && e.preventDefault) e.preventDefault()
      const errors = await this.validator.validateForm()
      const { setState } = this
      const state = getState(this.key) as FormState<T>

      let isValid: boolean = false

      // update state
      const nextState = produce<FormState<T>, FormState<T>>(state, (draft) => {
        draft.errors = errors
        isValid = checkValid(draft.errors)
        draft.valid = isValid
        draft.toucheds = touchAll(state.values)
        draft.submitCount += 1
        draft.submitting = true
        draft.dirty = true
      })

      if (isValid) {
        const handledValues = this.handleValues(nextState.values, nextState.pathMetadata)
        this.options?.onError?.(handledValues)
      } else {
        this.options?.onError?.(nextState.errors)
      }

      setState({ ...nextState })
    }
  }

  private handleValues<T>(values: T, pathMetadata: PathMetadata) {
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

  createBlurHandler = (name?: string) => {
    return async (e: FocusEvent<FieldElement>) => {
      let fieldName: string
      if (name) {
        fieldName = name
      } else {
        if (e.persist) e.persist()

        // hack for some custom onChange, eg: Antd Select
        const node = typeof e === 'object' ? e.target : ({} as any)
        const { name } = node
        fieldName = name
      }

      this.actions.validateField(fieldName)
    }
  }

  createChangeHandler = (optName?: string) => {
    const { setState } = this
    return async (e?: any) => {
      const state = getState(this.key) as FormState<T>
      let fieldName: string = ''
      let value: any

      // hack for some custom onChange, eg: Antd Select
      if (optName) fieldName = optName

      if (typeof e === 'object' && e.target) {
        if (e && e.persist) e.persist()
        const { value: nodeValue, name } = e.target
        if (name) fieldName = name
        // value = nodeValue || checked
        value = nodeValue
      } else {
        value = e
      }

      let newState: FormState<T>

      // setValues first，do not block ui
      newState = produce<FormState<T>, FormState<T>>(state, (draft) => {
        set(draft.values as any, fieldName, value)
      })

      setState({ ...newState })

      // validate only touched
      if (!isTouched(state.toucheds, fieldName)) return

      // setErrors
      const errors = await this.validator.validateForm()

      if (isEqual(errors, state.errors)) return

      const nextState = produce<FormState<T>, FormState<T>>(newState, (draft) => {
        // check from is valid
        draft.errors = errors
        draft.valid = checkValid(draft.errors)
      })
      setState({ ...nextState })
    }
  }
}
