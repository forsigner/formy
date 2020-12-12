import * as React from 'react'
import { isNative } from '../utils'
import { RegisterFieldProps } from '../types'

export const DefaultInput: React.FC<RegisterFieldProps> = ({
  name,
  fieldState,
  handleChange,
  handleBlur,
}) => {
  if (isNative) {
    return <>你忘记指定component</>
  }

  const h = React.createElement
  const input = h('input', {
    key: name,
    name,
    value: fieldState.value,
    onChange: handleChange,
    onBlur: handleBlur,
  })

  const label = h('label', null, [fieldState.label + ': ' || '', input])

  return h('div', null, label)
}
