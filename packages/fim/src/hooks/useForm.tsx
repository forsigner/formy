import isEqual from 'react-fast-compare'
import get from 'lodash.get'
import { getState, mutate } from 'stook'
import { FormContext, Config, FormState } from '../types'
import { createHandleSubmit } from '../createHandleSubmit'
import { useFormName } from './useFormName'
import { checkValid } from '../utils'
import { runValidators } from '../utils/runValidators'
import { getValues } from '../utils/getValues'
import { useEffect, useRef, useState } from 'react'

/**
 * useForm hooks
 * @param config
 */
export function useForm<T = any>(config: Config<T>): FormContext<T> {
  const formName = useFormName(config)

  const [state, setState] = useState<FormContext>({
    formName,
    values: config.values,
    validationSchema: config.validationSchema,
    config: config,
  } as FormContext)

  const mountedRef = useRef(false)

  useEffect(() => {
    // skip first render
    if (!mountedRef.current) return
    setState({ ...state, values: config.values })
  }, [config?.values])

  useEffect(() => {
    mountedRef.current = true
  }, [])

  const result = { ...state } as FormContext

  const handleSubmit = createHandleSubmit(result)

  result.setFieldState = (name, nextStateOrSetState) => {
    mutate(`${formName}-${name}`, nextStateOrSetState)
  }

  result.setFormState = (state) => {
    mutate(formName, state)
  }

  result.setSubmitting = (submitting) => {
    mutate(formName, (state: FormState) => {
      state.submitting = submitting
    })
  }

  result.resetForm = () => {
    // mutate(stateKey, (state: FormState) => {
    //   state.submitting = submitting
    // })
    // setState(initialState)
    if (config.onReset) config.onReset(result)
  }

  result.submitForm = handleSubmit
  result.handleSubmit = handleSubmit

  result.validateForm = async () => {
    let values = getValues(formName)
    const formState = getState(formName)
    const errors = await runValidators({ ...formState, ...result, values })
    // if (isEqual(errors, state.errors)) return errors

    mutate(formName, (state: FormState) => {
      state.valid = checkValid(errors)
    })

    return errors
  }

  result.validateField = async (name): Promise<boolean> => {
    const state = getState(formName)
    const errors = await runValidators(state)
    const error = get(errors, name)

    if (isEqual(errors, state.errors)) {
      return !error
    }

    mutate(formName, (state: FormState) => {
      state.valid = checkValid(errors)
    })
    return !error
  }

  result.getValues = () => {
    return getValues(formName)
  }

  return result
}
