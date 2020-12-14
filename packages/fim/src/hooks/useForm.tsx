import { useMemo } from 'react'
import { useStore } from 'stook'
import { Actions, UseFormReturn, Options } from '../types'
import { createHandleSubmit } from '../createHandleSubmit'
import { ActionBuilder } from '../builders/ActionBuilder'
import { useFormName } from './useFormName'
import { getInititalState } from '../utils/getInititalState'

/**
 * useForm hooks
 * @param options
 */
export function useForm<T = any>(options: Options<T>): UseFormReturn<T> {
  const formName = useFormName(options)
  const initialState = getInititalState(formName, options)
  const [state, setState] = useStore(formName, initialState)
  const actionBuilder = useMemo(() => new ActionBuilder(formName, setState, initialState), [])
  const handleSubmit = createHandleSubmit(formName, options)

  const actions: Actions<T> = {
    setFormState: setState,
    setSubmitting: actionBuilder.setSubmitting,
    resetForm() {
      actionBuilder.resetForm()
      if (options.onReset) options.onReset()
    },
    submitForm: handleSubmit,
    validateForm: actionBuilder.validateForm,
    validateField: actionBuilder.validateField,
  }

  const result: UseFormReturn<T> = {
    ...state,
    ...actions,
    handleSubmit,
    options: state.options,
    formName,
  }

  return result
}
