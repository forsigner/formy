import { FocusEvent } from 'react'
import { useStore, getState, mutate } from 'stook'
import { produce } from 'immer'
import set from 'lodash.set'
import get from 'lodash.get'
import { useFormContext } from '../formContext'
import { FieldElement, FieldProps, FieldState, FormState } from '../types'
import { last, runValidators, getValues } from '../utils'

export function useField(name: string, props?: FieldProps) {
  const { formName = '', initialValues } = useFormContext()
  const initialState = getInitialFieldState(formName, initialValues, props)
  const key = `${formName}-${name}`
  const args: any[] = []
  if (initialState) args.push(initialState)
  const [, setFieldState] = useStore<FieldState>(key, ...args)

  return {
    // TODO: hack for FieldArray
    // ...state,
    ...getState(key),
    setFieldState,
    handleChange: async (e?: any) => {
      const state: FieldState = getState(key)
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

      let errors: any = {}

      errors = await runValidators({ ...formState, values })

      const nextState = produce(state, (draft) => {
        const error = get(errors, name) as any
        if (error) {
          draft.error = error
        } else {
          delete draft.error
        }
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

      const formState = getState<FormState>(formName)
      const values = getValues(formName)

      await runValidators({ ...formState, values })
      setFieldState((s) => {
        s.touched = true
      })
    },
  }
}

function getInitialFieldState(formName: string, initialValues: any, field?: FieldProps) {
  if (!field) return null
  const { name } = field
  const arrayKeyRegex = /\[\d+\]\.[a-z_$]+$/i

  // is child of ArrayField
  const isArrayKey = arrayKeyRegex.test(name)

  function getValue() {
    const initialValue = get(initialValues, name)
    if (!isArrayKey) return initialValue ?? field?.value

    const arrayFieldKey = name.replace(arrayKeyRegex, '')
    const arrayFieldState: any[] = getState(`${formName}-${arrayFieldKey}`)
    const find = arrayFieldState.find((item) => name.includes(`[${item.id}]`))
    const prop = last(name.split('.'))
    return find?.item[prop]
  }

  const state: any = {
    name,
    value: getValue(),
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

  return state as FieldState
}
