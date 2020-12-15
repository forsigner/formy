import React, { FC, createElement, memo } from 'react'
import { fim } from '../fim'
import { FieldProps } from '../types'
import { useField } from '../hooks/useField'

export const Field: FC<FieldProps> = memo((props) => {
  const fieldStore = useField(props.name, props)

  const { visible, component } = fieldStore
  if (!visible) return null

  let Cmp: any

  if (typeof component === 'string') {
    Cmp = fim.Fields[component] || component
  } else {
    Cmp = component
  }

  return createElement(Cmp || 'input', { name: props.name })
})
