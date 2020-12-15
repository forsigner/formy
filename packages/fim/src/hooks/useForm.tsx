import isEqual from 'react-fast-compare'
import produce from 'immer'
import get from 'lodash.get'
import { useStore, getState, mutate } from 'stook'
import { Actions, UseFormReturn, Options, FormStateTypes, Status } from '../types'
import { createHandleSubmit } from '../createHandleSubmit'
import { useFormName } from './useFormName'
import { checkValid } from '../utils'
import { runValidators } from '../utils/runValidators'
import { getValues } from '../utils/getValues'

/**
 * useForm hooks
 * @param options
 */
export function useForm<T = any>(options: Options<T>): UseFormReturn<T> {
  const formName = useFormName(options)
  const initialState = {
    values: {} as any,
    errors: {},
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
    submitted: false,
    validating: false,
    status: 'editable' as Status,
    pathMetadata: [],
    formName,
    validationSchema: options.validationSchema,
    options,
  }

  const [state, setState] = useStore<FormStateTypes>(formName, initialState)
  const handleSubmit = createHandleSubmit(formName, options)

  const actions: Actions<T> = {
    setFormState: setState,

    setFieldState: (name, nextStateOrSetState) => {
      mutate(`${formName}-${name}`, nextStateOrSetState)
    },

    setSubmitting: (submitting) => {
      const nextState = produce<FormStateTypes<T>, FormStateTypes<T>>(
        getState(formName),
        (draft) => {
          draft.submitting = submitting
        },
      )
      setState({ ...nextState })
    },
    resetForm() {
      setState(initialState)
      if (options.onReset) options.onReset()
    },
    submitForm: handleSubmit,

    validateForm: async () => {
      const errors = await runValidators(state)
      if (isEqual(errors, state.errors)) return errors

      const nextState = produce<FormStateTypes<T>, FormStateTypes<T>>(state, (draft) => {
        draft.errors = errors
        draft.valid = checkValid(draft.errors)
        // TODO:
        // draft.toucheds = touchAll(state.values)
      })
      setState(nextState)
      return errors
    },

    validateField: async (name): Promise<boolean> => {
      const state = getState(formName)
      const errors = await runValidators(state)
      const error = get(errors, name)
      if (isEqual(errors, state.errors)) {
        return !error
      }

      const nextState = produce<FormStateTypes<T>, FormStateTypes<T>>(state, (draft) => {
        draft.errors = errors
        draft.valid = checkValid(draft.errors)
        // TODO:
        // set(draft.toucheds, name, true)
      })
      setState(nextState)
      return !error
    },
  }

  const result: UseFormReturn<T> = {
    ...state,
    ...actions,
    handleSubmit,
    options: state.options,
    formName,
    getValues: () => {
      return getValues(formName)
    },
  }

  return result
}
