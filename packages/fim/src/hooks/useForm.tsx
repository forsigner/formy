import 'reflect-metadata'
import { useRef, useCallback, useMemo } from 'react'
import { useStore } from 'stook'
import { Handlers, Actions, Result, Options } from '../types'
import { HandlerBuilder } from '../builders/HandlerBuilder'
import { ActionBuilder } from '../builders/ActionBuilder'
import { HelperBuilder } from '../builders/HelperBuilder'
import { forms } from '../forms'
import { useFormName } from './useFormName'
import { useFieldsMetadata } from './useFieldsMetadata'
import { useInititalState } from './useInititalState'

/**
 *
 * useForm hooks
 * @generic T Entity Type
 * @param scheme
 * @param options
 */

export function useForm<T = any>(options: Options<T>): Result<T> {
  const { schema } = options
  const instanceRef = useRef<T>(typeof schema === 'function' ? new schema() : null)
  const instance = instanceRef.current
  const formName = useFormName(options)
  const initialState = useInititalState(options, formName)
  const fieldsMetadata = useFieldsMetadata(schema)
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
    instance,
    fieldsMetadata,
  }

  forms.setResult(formName, result)

  return result
}
