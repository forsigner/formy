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
  const ctx = useFormContext()

  useMemo(() => {
    ctx.formStore.registerField(name, forceUpdate, props)
  }, [])

  useEffect(() => {
    ctx.formStore.onFieldInit(name)
  }, [])

  const { state, blur, change } = ctx.formStore.getField(name)
  const { component } = state

  const handleBlur = useMemo(() => blur, [])
  const handleChange = useCallback((e: ChangeEvent) => {
    return change(getValueFormEvent(e))
  }, [])

  const renderProps: FieldRenderProps = {
    ...state,
    setFieldState: (nextState) => {
      ctx.setFieldState(name, nextState)
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
