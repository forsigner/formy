import React, { createElement, Fragment, useEffect, useMemo, useState } from 'react'
import { fim } from '../fim'
import { useFormContext } from '../formContext'
import { FieldProps, FieldRenderProps } from '../types'

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

  const initialState = useMemo(
    () => ctx.formStore.extractInitialFieldState(ctx.initialValues, props),
    [],
  )

  useMemo(() => {
    ctx.formStore.addFieldState(name, initialState)
    ctx.formStore.addFieldInitialState(name, initialState)
  }, [])

  useEffect(() => {
    ctx.formStore.setFieldUpdater(name, forceUpdate)

    fieldState?.onFieldInit?.({
      ...fieldState,
      setFieldState: (name, fieldState) => {
        ctx.formStore.setFieldState(name, fieldState)
      },
    })
  }, [])

  const fieldState = ctx.getFieldState(name)
  const { component } = fieldState
  const handleBlur = ctx.formStore.createBlurHandler(name)
  const handleChange = ctx.formStore.createChangeHandler(name)

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
