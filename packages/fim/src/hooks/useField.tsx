import { FocusEvent } from 'react'
import { useStore, getState, mutate, Storage } from 'stook'
import { produce } from 'immer'
import set from 'lodash.set'
import get from 'lodash.get'
import { useFormContext } from '../formContext'
import { FieldElement, FieldProps, FieldStateTypes, FormStateTypes } from '../types'
import { runValidators } from '../utils'
import { getValues } from '../utils/getValues'

export function useField(name: string, props?: FieldProps) {
  const { formName = '', initialValues } = useFormContext()
  const initialState = getInitialFieldState(initialValues, props)
  const key = `${formName}-${name}`
  const [state, setFieldState] = useStore<FieldStateTypes>(key, initialState)
  return {
    // TODO: why
    // ...state,
    ...getState(key),
    setFieldState,
    handleChange: async (e?: any) => {
      const formState = getState<FormStateTypes>(formName)

      let value: any
      if (e && typeof e === 'object' && e.target) {
        if (e && e.persist) e.persist()
        const { value: nodeValue } = e.target
        value = nodeValue
      } else {
        value = e
      }

      let values = getValues(formName)
      set(values, name, value)

      let errors: any = {}

      /** TODO: */
      if (state.touched) {
        errors = await runValidators({ ...formState, values })
      }

      const nextState = produce(state, (draft) => {
        const error = get(errors, name) as any
        if (error) draft.error = error
        draft.value = value
        draft.touched = true
      })

      /** field change callback, for Form linkage */
      state?.onFieldChange?.({
        fieldState: state,
        setFieldState(name, fn) {
          mutate(`${formName}-${name}`, fn)
        },
      })

      setFieldState(nextState)
    },
    handleBlur: async (e: FocusEvent<FieldElement>) => {
      if (e.persist) e.persist()
      // TODO: validate field
    },
  }
}

function getInitialFieldState(initialValues: any, field?: FieldProps) {
  if (!field) return {} as FieldStateTypes

  const isArrayKey = /\[\d+\]/.test(field.name)
  // console.log('field.name', field.name, Storage.stores)
  // console.log('isArrayKey:', isArrayKey)

  const initialValue = get(initialValues, field.name)
  const state: any = {
    name: field.name,
    value: initialValue || field.value,
    visible: field.visible ?? true,
    label: field.label ?? null,
    component: field.component,
    componentProps: field.componentProps ?? {},
    display: field.display ?? true,
    touched: field.touched ?? false,
    disabled: field.disabled ?? false,
    pendding: field.pendding ?? false,
    status: field.status ?? 'editable',
    enum: field.enum ?? [],
    data: field.data ?? null,
  }

  if (field.error) state.error = field.error
  if (field.warnings) state.warnings = field.warnings
  if (field.onFieldChange) state.onFieldChange = field.onFieldChange

  return state as FieldStateTypes
}
