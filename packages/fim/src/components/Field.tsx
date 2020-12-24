import React, {
  ChangeEvent,
  createElement,
  FocusEvent,
  Fragment,
  useEffect,
  useMemo,
  useState,
} from 'react'
import get from 'lodash.get'
import { fim } from '../fim'
import { useFormContext } from '../formContext'
import { FieldElement, FieldProps, FieldRenderProps, FieldState } from '../types'
import { getValueFormEvent, last, validateField } from '../utils'
import { FormStore } from '../stores/FormStore'

function isComponent(cmp: any) {
  return typeof cmp === 'function'
}

function getComponent(component: any) {
  if (!component) return 'input'
  if (isComponent(component)) return component
  if (fim.Fields[component]) return fim.Fields[component]
  return component
}

export function Field<T>(props: FieldProps<T>) {
  const { name } = props
  // exclude boolean props
  let { showLabel, touched, display, visible, pendding, ...rest } = props
  const [, forceUpdate] = useState({})
  const ctx = useFormContext()

  const initialState = useMemo(() => getFieldState(ctx.initialValues, props, ctx.formStore), [])

  useMemo(() => {
    ctx.formStore.addFieldState(name, initialState)
    ctx.formStore.addFieldInitialState(name, initialState)
  }, [])

  useEffect(() => {
    ctx.formStore.setFieldUpdater(name, forceUpdate)

    fieldState?.onFieldInit?.({
      ...fieldState,
      setFieldState(name, fieldState) {
        ctx.formStore.setFieldState(name, fieldState)
      },
    })
  }, [])

  const fieldState = ctx.getFieldState(name)
  const { component } = fieldState

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = getValueFormEvent(e)

    ctx.setFieldState(name, { value }) // sync value

    const values = ctx.getValues()
    const fieldState = ctx.getFieldState(name)
    const fieldError = await validateField({ fieldState, values })
    const prevError = fieldState.error
    const error = fieldError || undefined

    if (prevError !== error) ctx.setFieldState(name, { error })

    /** field change callback, for Dependent fields  */
    fieldState?.onValueChange?.({
      ...fieldState,
      setFieldState(name, fieldState) {
        // make it async
        setTimeout(() => {
          ctx.formStore.setFieldState(name, fieldState)
        }, 0)
      },
    })
  }

  const handleBlur = async (e: FocusEvent<FieldElement>) => {
    if (e && e.preventDefault) e.preventDefault()
    const error = await ctx.validateField(name)
    if (error) ctx.setFieldState(name, { touched: true, error })
  }

  const renderProps: FieldRenderProps = {
    ...fieldState,
    setFieldState: (fieldState) => {
      ctx.setFieldState(name, fieldState)
    },
    register: {
      value: fieldState.value,
      onChange: handleChange,
      onBlur: handleBlur,
    },
    handleChange,
    handleBlur,
  }

  if (!fieldState.visible) return null

  if (typeof props?.children === 'function') {
    return <Fragment>{props.children(renderProps)}</Fragment>
  }

  let fieldProps: any = { ...rest }
  const Cmp = getComponent(component)

  if (isComponent(Cmp)) {
    fieldProps = { ...fieldProps, ...fieldState, ...renderProps }
  } else {
    fieldProps = {
      ...fieldProps,
      value: fieldState.value,
      onChange: renderProps.handleChange,
      onBlur: renderProps.handleBlur,
    }
  }

  return createElement(Cmp, fieldProps)
}

function getFieldState(values: any, field: FieldProps, formStore: FormStore) {
  const { name } = field
  const arrayKeyRegex = /\[\d+\]\.[a-z_$]+$/i

  // is child of ArrayField
  const isArrayKey = arrayKeyRegex.test(name)

  function getValue() {
    const initialValue = get(values, name)
    if (!isArrayKey) return initialValue ?? field?.value

    const arrayFieldKey = name.replace(arrayKeyRegex, '')

    const arrayFieldState: any[] = formStore.fieldArrayStores[arrayFieldKey]

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
    // validate: field.validate,
    rules: field.rules ?? {},
  } as FieldState

  if (field.error) state.error = field.error
  if (field.warnings) state.warnings = field.warnings
  if (field.onValueChange) state.onValueChange = field.onValueChange
  if (field.onFieldInit) state.onFieldInit = field.onFieldInit
  if (field.transform) state.transform = field.transform

  return state as FieldState
}
