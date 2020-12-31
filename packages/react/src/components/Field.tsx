import React, {
  ChangeEvent,
  createElement,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Formy } from '@formy/core'
import { useFormContext } from '../formContext'
import { FieldProps, FieldRenderProps } from '../types'
import { getValueFormEvent } from '../utils'

function isComponent(cmp: any) {
  return typeof cmp === 'function'
}

function getComponent(component: any) {
  if (!component) return 'input'
  if (isComponent(component)) return component
  if (Formy.Fields[component]) return Formy.Fields[component]
  return component
}

export function Field<T>(props: FieldProps<T>) {
  const { name } = props
  // exclude boolean props
  let { showLabel, touched, display, visible, pendding, ...rest } = props
  const [, forceUpdate] = useState({})
  const { formStore } = useFormContext()

  useMemo(() => {
    formStore.registerField(name, forceUpdate, props)
  }, [])

  useEffect(() => {
    formStore.onFieldInit(name)
  }, [])

  const state = formStore.getFieldState(name)

  const { component } = state

  const handleBlur = useCallback(() => formStore.blur(name), [])
  const handleChange = useCallback((e: ChangeEvent) => {
    return formStore.change(name, getValueFormEvent(e))
  }, [])

  const renderProps: FieldRenderProps = {
    ...state,
    setFieldState: (nextState) => {
      formStore.setFieldState(name, nextState)
    },
    register: {
      value: state.value,
      onChange: handleChange,
      onBlur: handleBlur,
    },
    handleChange,
    handleBlur,
  }

  if (!state.visible) return null

  if (typeof props?.children === 'function') {
    return <Fragment>{props.children(renderProps)}</Fragment>
  }

  let fieldProps: any = { ...rest }
  const Cmp = getComponent(component)

  if (isComponent(Cmp)) {
    fieldProps = { ...fieldProps, ...state, ...renderProps }
  } else {
    fieldProps = {
      ...fieldProps,
      value: state.value,
      onChange: renderProps.handleChange,
      onBlur: renderProps.handleBlur,
    }
  }

  return createElement(Cmp, fieldProps)
}
