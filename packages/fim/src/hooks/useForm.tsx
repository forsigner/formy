import isEqual from 'react-fast-compare'
import get from 'lodash.get'
import { getState, mutate } from 'stook'
import { FormContext, Config, FormState } from '../types'
import { createHandleSubmit } from '../createHandleSubmit'
import { useFormName } from './useFormName'
import { checkValid, getFormStateKey } from '../utils'
import { runValidators } from '../utils/runValidators'
import { getValues } from '../utils/getValues'
import { useRef } from 'react'

/**
 * useForm hooks
 * @param config
 */
export function useForm<T = any>(config: Config<T>): FormContext<T> {
  const formName = useFormName(config)
  const stateKey = getFormStateKey(formName)

  const { current } = useRef<FormContext>({
    formName,
    initialValues: config.initialValues,
    validationSchema: config.validationSchema,
    config: config,
  } as FormContext)

  const handleSubmit = createHandleSubmit(current)

  // TODO
  current.setFieldState = () => {}

  current.setFieldState = (name, nextStateOrSetState) => {
    mutate(`${formName}-${name}`, nextStateOrSetState)
  }

  current.setSubmitting = (submitting) => {
    mutate(stateKey, (state: FormState) => {
      state.submitting = submitting
    })
  }
  current.resetForm = () => {
    // mutate(stateKey, (state: FormState) => {
    //   state.submitting = submitting
    // })
    // setState(initialState)
    if (config.onReset) config.onReset()
  }

  current.submitForm = handleSubmit
  current.handleSubmit = handleSubmit

  current.validateForm = async () => {
    let values = getValues(formName)
    const formState = getState(stateKey)
    const errors = await runValidators({ ...formState, ...current, values })
    // if (isEqual(errors, state.errors)) return errors

    mutate(stateKey, (state: FormState) => {
      state.valid = checkValid(errors)
    })

    return errors
  }

  current.validateField = async (name): Promise<boolean> => {
    const state = getState(formName)
    const errors = await runValidators(state)
    const error = get(errors, name)

    if (isEqual(errors, state.errors)) {
      return !error
    }

    mutate(stateKey, (state: FormState) => {
      state.valid = checkValid(errors)
    })
    return !error
  }

  current.getValues = () => {
    return getValues(formName)
  }

  return current
}
