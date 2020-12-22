import { FocusEvent, ChangeEvent, useEffect, useRef, useMemo } from 'react'
import { useStore, getState, mutate } from 'stook'
import get from 'lodash.get'
import { FieldElement, FieldProps, FieldState, UseFieldReturn } from '../types'
import { last, runValidators, getValues, validateField } from '../utils'
import { useFormContext } from '../formContext'

export function useField(name: string, props?: FieldProps): UseFieldReturn {
  const formContext = useFormContext()
  const { formName, values } = formContext

  const initialState = useMemo(() => getInitialFieldState(formName, values, props), [values])

  const key = `${formName}-${name}`
  const args: any[] = []
  if (initialState) args.push(initialState)
  const [fieldState, setFieldState] = useStore<FieldState>(key, ...args)

  const mountedRef = useRef(false)

  useEffect(() => {
    // skip first render
    if (!mountedRef.current) return
    initialState && setFieldState(initialState)
  }, [initialState])

  useEffect(() => {
    mountedRef.current = true
  }, [])

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
    let value: any
    if (e && typeof e === 'object' && e.target) {
      if (e && e.persist) e.persist()
      const { value: nodeValue, type, checked } = e.target
      value = type === 'checkbox' ? checked : nodeValue
    } else {
      value = e
    }

    setFieldState((s) => {
      s.value = value
    })

    const fieldState: FieldState = getState(key)
    const values = getValues(formName)
    const errors = await runValidators({ ...formContext, values })
    const fieldError = await validateField({ fieldState, values })
    const prevError = fieldState.error
    const error = get(errors, name) || fieldError

    if (prevError !== error) {
      setFieldState((state) => {
        if (error) {
          state.error = error
        } else {
          delete state.error
        }
      })
    }

    /** field change callback, for Dependent fields  */
    fieldState?.onFieldChange?.({
      ...fieldState,
      setField(name, fn) {
        // make it async
        setTimeout(() => {
          mutate(`${formName}-${name}`, fn)
        }, 0)
      },
    })
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

function getInitialFieldState(formName: string, values: any, field?: FieldProps) {
  if (!field) return null
  const { name } = field
  const arrayKeyRegex = /\[\d+\]\.[a-z_$]+$/i

  // is child of ArrayField
  const isArrayKey = arrayKeyRegex.test(name)

  function getValue() {
    const initialValue = get(values, name)
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
  if (field.transform) state.transform = field.transform

  return state as FieldState
}
