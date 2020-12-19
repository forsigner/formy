import isEqual from 'react-fast-compare'
import get from 'lodash.get'
import { useStore, getState, mutate } from 'stook'
import { Actions, UseFormReturn, Config, FormState } from '../types'
import { createHandleSubmit } from '../createHandleSubmit'
import { useFormName } from './useFormName'
import { checkValid, getFormStateKey } from '../utils'
import { runValidators } from '../utils/runValidators'
import { getValues } from '../utils/getValues'

interface UseFormState<T> {
  formName: string
  initialValues?: T

  validationSchema?: any

  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched'

  context?: any

  config: Config<T>
}

/**
 * useForm hooks
 * @param config
 */
export function useForm<T = any>(config: Config<T>): UseFormReturn<T> {
  const formName = useFormName(config)
  const stateKey = getFormStateKey(formName)

  const [state] = useStore<UseFormState<T>>(formName, {
    formName,
    initialValues: config.initialValues,
    validationSchema: config.validationSchema,
    config: config,
  })

  const handleSubmit = createHandleSubmit(formName, config)

  const actions: Actions<T> = {
    // setFormState: setState,
    setFormState: () => {},

    setFieldState: (name, nextStateOrSetState) => {
      mutate(`${formName}-${name}`, nextStateOrSetState)
    },

    setSubmitting: (submitting) => {
      mutate(stateKey, (state: FormState) => {
        state.submitting = submitting
      })
    },
    resetForm() {
      // mutate(stateKey, (state: FormState) => {
      //   state.submitting = submitting
      // })
      // setState(initialState)
      if (config.onReset) config.onReset()
    },
    submitForm: handleSubmit,

    validateForm: async () => {
      let values = getValues(formName)
      const formState = getState(stateKey)
      const errors = await runValidators({ ...formState, formName, values })
      // if (isEqual(errors, state.errors)) return errors

      mutate(stateKey, (state: FormState) => {
        state.valid = checkValid(errors)
      })

      return errors
    },

    validateField: async (name): Promise<boolean> => {
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
    },
  }

  const result: UseFormReturn<T> = {
    ...state,
    ...actions,
    handleSubmit,
    config: state.config,
    formName,
    getValues: () => {
      return getValues(formName)
    },
  }

  return result
}
