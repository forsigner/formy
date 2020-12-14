import React from 'react'
import { isNative } from '../utils'
import { RegisterFieldProps } from '../types'
import { useField } from '../hooks/useField'

export const DefaultInput: React.FC<RegisterFieldProps> = ({ name }) => {
  const { value, label, handleChange, handleBlur } = useField(name)
  if (isNative) {
    return <>你忘记指定component</>
  }

  const h = React.createElement
  const input = h('input', {
    key: name,
    name,
    value,
    onChange: handleChange,
    onBlur: handleBlur,
  })

  const labelCmp = h('label', null, [label + ': ' || '', input])

  return h('div', null, labelCmp)
}
