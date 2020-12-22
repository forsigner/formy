import React, { FC, createElement, Fragment } from 'react'
import { fim } from '../fim'
import { FieldProps } from '../types'
import { useField } from '../hooks/useField'

function isComponent(cmp: any) {
  return typeof cmp === 'function'
}

function getComponent(component: any) {
  if (!component) return 'input'
  if (isComponent(component)) return component
  if (fim.Fields[component]) return fim.Fields[component]
  return component
}

export const Field: FC<FieldProps> = (props) => {
  // exclude boolean props
  let { showLabel, touched, display, visible, pendding, ...rest } = props
  const fieldStore = useField(props.name, props)
  const { component } = fieldStore

  if (!fieldStore.visible) return null

  if (typeof props?.children === 'function') {
    return <Fragment>{props.children(fieldStore)}</Fragment>
  }

  let fieldProps = { ...rest }
  const Cmp = getComponent(component)

  if (isComponent(Cmp)) {
    fieldProps = { ...fieldProps, ...fieldStore }
  } else {
    fieldProps = {
      ...fieldProps,
      onChange: fieldStore.handleChange,
      onBlur: fieldStore.handleBlur,
    }
  }

  return createElement(Cmp, fieldProps)
}
