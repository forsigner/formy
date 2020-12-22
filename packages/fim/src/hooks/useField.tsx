import { FocusEvent, ChangeEvent, useEffect } from 'react'
import { useStore, getState, mutate } from 'stook'
import { produce } from 'immer'
import set from 'lodash.set'
import get from 'lodash.get'
import { FieldElement, FieldProps, FieldState, UseFieldReturn } from '../types'
import { last, runValidators, getValues, validateField } from '../utils'
import { useFormContext } from '../formContext'

export function useField(name: string, props?: FieldProps): UseFieldReturn {
  const formContext = useFormContext()
  const { formName, initialValues } = formContext
  const initialState = getInitialFieldState(formName, initialValues, props)
  const key = `${formName}-${name}`
  const args: any[] = []
  if (initialState) args.push(initialState)
  const [fieldState, setFieldState] = useStore<FieldState>(key, ...args)

  useEffect(() => {
    fieldState?.onFieldInit?.({
      ...fieldState,
      setField(name, fn) {
        // make it async
        setTimeout(() => {
          mutate(`${formName}-${name}`, fn)
        }, 0)
      },
    })
  }, [])

  const handleChange = async (e?: ChangeEvent<HTMLInputElement>) => {
    const fieldState: FieldState = getState(key)

    let value: any
    if (e && typeof e === 'object' && e.target) {
      if (e && e.persist) e.persist()
      const { value: nodeValue, type, checked } = e.target
      value = type === 'checkbox' ? checked : nodeValue
    } else {
      value = e
    }

    let values = getValues(formName)

    set(values, name, value)

    let errors: any = {}

    errors = await runValidators({ ...formContext, values })

    const fieldStateWithLatestValue = produce(fieldState, (draft) => {
      draft.value = value
    })

    const fieldError = await validateField({ fieldState: fieldStateWithLatestValue, values })

    const nextState = produce(fieldState, (draft) => {
      const error = get(errors, name) || fieldError
      if (error) {
        draft.error = error
      } else {
        delete draft.error
      }
      draft.value = value
      draft.touched = true
    })

    /** field change callback, for Dependent fields  */
    fieldState?.onFieldChange?.({
      ...fieldStateWithLatestValue,
      setField(name, fn) {
        // make it async
        setTimeout(() => {
          mutate(`${formName}-${name}`, fn)
        }, 0)
      },
    })

    setFieldState(nextState)
  }

  const handleBlur = async (e: FocusEvent<FieldElement>) => {
    if (e && e.persist) e.persist()

    const fieldState: FieldState = getState(key)
    const values = getValues(formName)

    await runValidators({ ...formContext, values })

    const fieldError = await validateField({ fieldState, values })

    setFieldState((s) => {
      s.touched = true
      if (fieldError) {
        s.error = fieldError
      } else {
        delete s.error
      }
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
    const arrayFieldState: any[] = getState(`${formName}-${arrayFieldKey}`) || []
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
    validate: field.validate,
    rules: field.rules ?? {},
  } as FieldState

  if (field.error) state.error = field.error
  if (field.warnings) state.warnings = field.warnings
  if (field.onFieldChange) state.onFieldChange = field.onFieldChange
  if (field.onFieldInit) state.onFieldInit = field.onFieldInit

  return state as FieldState
}
