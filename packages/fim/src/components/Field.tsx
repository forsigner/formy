import { FC, createElement } from 'react'
import { fim } from '../fim'
import { FieldProps } from '../types'
import { useField } from '../hooks/useField'

export const Field: FC<FieldProps> = (props) => {
  const fieldStore = useField(props.name, props)

  const { visible, component } = fieldStore
  if (!visible) return null

  let Cmp: any

  if (typeof component === 'string') {
    Cmp = fim.Fields[component] || component
  } else {
    Cmp = component
  }

  return createElement(Cmp || 'input', { ...props, ...fieldStore })
}
