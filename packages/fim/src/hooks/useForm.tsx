import { useCallback, useMemo } from 'react'
import { useStore } from 'stook'
import { Handlers, Actions, Result, Options, Schema } from '../types'
import { HandlerBuilder } from '../builders/HandlerBuilder'
import { ActionBuilder } from '../builders/ActionBuilder'
import { HelperBuilder } from '../builders/HelperBuilder'
import { forms } from '../forms'
import { useFormName } from './useFormName'
import { getInititalState } from '../utils/getInititalState'
import { memoize } from '../utils/memoize'

const getState = memoize(getInititalState)

/**
 * useForm hooks
 * @param options
 */
export function useForm<T = Schema>(options: Options<T>): Result<T> {
  const { schema } = options
  const formName = useFormName(options)
  const initialState = getState(formName, options)
  const [state, setState] = useStore(formName, initialState)
  const actionBuilder = useMemo(() => new ActionBuilder(formName, setState, initialState), [])

  const actions: Actions<T> = {
    setValues: actionBuilder.setValues,
    setLabels: actionBuilder.setLabels,
    setCompnents: actionBuilder.setComponents,
    setToucheds: actionBuilder.setToucheds,
    setDatas: actionBuilder.setDatas,
    setDisableds: actionBuilder.setDisableds,
    setDisplays: actionBuilder.setDisplays,
    setErrors: actionBuilder.setErrors,
    setVisibles: actionBuilder.setVisibles,
    setEnums: actionBuilder.setEnums,
    setFormState: setState,
    setSubmitting: actionBuilder.setSubmitting,
    resetForm() {
      actionBuilder.resetForm()
      if (options.onReset) options.onReset()
    },
    submitForm: () => {}, // initial
    validateForm: actionBuilder.validateForm,
    validateField: actionBuilder.validateField,
  }

  const helpers = new HelperBuilder(formName, actions)

  const handlerBuilder = new HandlerBuilder(formName, actions, setState, options)
  const submitHandler = handlerBuilder.createSubmitHandler()

  const handlers: Handlers = {
    handleBlur: useCallback(handlerBuilder.createBlurHandler(), []),
    handleChange: useCallback(handlerBuilder.createChangeHandler(), []),
    handleSubmit: submitHandler,
  }

  actions.submitForm = submitHandler

  const result: Result<T> = {
    ...state,
    ...handlers,
    ...actions,
    ...helpers,
    ...handlerBuilder,
    options: state.options,
    schema,
  }

  forms.setResult(formName, result)

  return result
}
