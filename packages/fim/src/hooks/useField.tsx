import { FocusEvent } from 'react'
import { useStore, getState, mutate } from 'stook'
import { produce } from 'immer'
import set from 'lodash.set'
import get from 'lodash.get'
import { useFormNameContext } from '../formNameContext'
import { FieldElement, FieldProps, FieldState, FieldStore, FormState } from '../types'
import { last, runValidators, getValues } from '../utils'

export function useField(name: string, props?: FieldProps): FieldStore {
  const formName = useFormNameContext()
  const initialState = getInitialFieldState(formName, props)
  const key = `${formName}-${name}`
  const args: any[] = []
  if (initialState) args.push(initialState)
  const [, setFieldState] = useStore<FieldState>(key, ...args)

  const handleChange = async (e?: any) => {
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
  }

  const handleBlur = async (e: FocusEvent<FieldElement>) => {
    if (e && e.persist) e.persist()

    const formState = getState<FormState>(formName)
    const values = getValues(formName)

    await runValidators({ ...formState, values })
    setFieldState((s) => {
      s.touched = true
    })
  }

  return {
    // TODO: hack for FieldArray
    // ...state,
    ...(getState(key) as FieldState),
    setFieldState,
    register: {
      value: getState(key).value,
      checked: getState(key).value, // TODO:
      onChange: handleChange,
      onBlur: handleBlur,
    },
    handleChange,
    handleBlur,
  }
}

function getInitialFieldState(formName: string, field?: FieldProps) {
  if (!field) return null
  const { name } = field
  const { initialValues } = getState<FormState>(formName)
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

  const state = {
    name,
    value: getValue(),
    visible: field.visible ?? true,
    label: field.label ?? null,
    showLabel: field.showLabel ?? true,
    required: field.required ?? false,
    description: field.description,
    focused: field.focused ?? false,
    component: field.component,
    componentProps: field.componentProps ?? {},
    display: field.display ?? true,
    touched: field.touched ?? false,
    disabled: field.disabled ?? false,
    pendding: field.pendding ?? false,
    status: field.status ?? 'editable',
    options: field.options ?? [],
    data: field.data ?? null,
  } as FieldState

  if (field.error) state.error = field.error
  if (field.warnings) state.warnings = field.warnings
  if (field.onFieldChange) state.onFieldChange = field.onFieldChange

  return state as FieldState
}
