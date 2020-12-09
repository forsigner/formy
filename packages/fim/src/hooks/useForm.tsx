import 'reflect-metadata'
import { useRef, useCallback } from 'react'
import { useStore, Dispatch, Action } from 'stook'
import { FormState, EntityType, Handlers, Actions, Result, Config, FieldsScheme } from '../types'
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
 * @param config
 */

export function useForm<T = any>(scheme: FieldsScheme, config?: Config<T>): Result<any>
export function useForm<T = any>(Entity: EntityType<T>, config?: Config<T>): Result<T>
export function useForm<T>(...args: any[]): Result<T> {
  const entityOrScheme = args[0]
  const config: Config = args[1] || {}
  const instanceRef = useRef<T>(Array.isArray(entityOrScheme) ? null : new entityOrScheme())
  const instance = instanceRef.current
  const name = useFormName(entityOrScheme, config)
  const initialState = useInititalState(entityOrScheme, config, name)

  const fieldsMetadata = useFieldsMetadata(entityOrScheme)

  // eslint-disable-next-line
  const [state, set] = useStore(name, initialState)

  // TODO:
  const setState: Dispatch<Action<FormState<T>>> = (act: any) => {
    set(act)
  }

  const validator = new Validator(name, entityOrScheme, config)
  const actionBuilder = new ActionBuilder(name, setState, initialState, validator)

  const actions: Actions<T> = {
    setValues: actionBuilder.setValues,
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
      if (config.onReset) config.onReset()
    },
    submitForm: () => {}, // initial
    validateForm: actionBuilder.validateForm,
    validateField: actionBuilder.validateField,
  }

  const helpers = new HelperBuilder(name, actions)

  const handlerBuilder = new HandlerBuilder(name, actions, setState, validator, config)
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
    entity: entityOrScheme,
    schema: entityOrScheme,
    instance,
    fieldsMetadata,
  }

  forms.setResult(name, result)

  return result
}
