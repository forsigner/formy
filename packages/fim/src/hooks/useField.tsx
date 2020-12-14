import { useStore, getState } from 'stook'
import set from 'lodash.set'
import get from 'lodash.get'
import { useFormContext } from '../formContext'
import { FieldElement, FieldProps, FieldState, FormState } from '../types'
import { runValidators } from '../utils'
import { getValues } from '../utils/getValues'
import { FocusEvent } from 'react'

export function useField(name: string, props?: FieldProps) {
  const { formName = '' } = useFormContext()
  const initialState = getInitialFieldState(props)
  const [state, setFieldState] = useStore<FieldState>(`${formName}-${name}`, initialState)
  return {
    ...state,
    setFieldState,
    handleChange: async (e?: any) => {
      const formState = getState<FormState>(formName)

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

      const errors = await runValidators({ ...formState, values })

      setFieldState((s) => {
        s.value = value
        const error = get(errors, name) as any
        s.error = error
      })
    },
    handleBlur: async (e: FocusEvent<FieldElement>) => {
      if (e.persist) e.persist()
      // TODO: validate field
    },
  }
}

function getInitialFieldState(field?: FieldProps) {
  if (!field) return {} as FieldState
  const state: any = {
    name: field.name,
    value: field.value,
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
  return state as FieldState
}
