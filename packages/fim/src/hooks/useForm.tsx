import 'reflect-metadata'
import { useRef, useCallback } from 'react'
import { useStore, Dispatch, Action } from 'stook'
import { FormState, Handlers, Actions, Result, Options } from '../types'
import { HandlerBuilder } from '../builders/HandlerBuilder'
import { ActionBuilder } from '../builders/ActionBuilder'
import { HelperBuilder } from '../builders/HelperBuilder'
import { Validator } from '../Validator'
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
  const instanceRef = useRef<T>(Array.isArray(schema) ? null : new schema())
  const instance = instanceRef.current
  const name = useFormName(options)
  const initialState = useInititalState(schema, options, name)

  const fieldsMetadata = useFieldsMetadata(schema)

  // eslint-disable-next-line
  const [state, set] = useStore(name, initialState)

  // TODO:
  const setState: Dispatch<Action<FormState<T>>> = (act: any) => {
    set(act)
  }

  const validator = new Validator(name, schema, options)
  const actionBuilder = new ActionBuilder(name, setState, initialState, validator)

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

  const helpers = new HelperBuilder(name, actions)

  const handlerBuilder = new HandlerBuilder(name, actions, setState, validator, options)
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
    schema,
    instance,
    fieldsMetadata,
  }

  forms.setResult(name, result)

  return result
}
