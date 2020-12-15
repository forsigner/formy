import React, { FC, memo, createElement } from 'react'
import { fim } from '../fim'
import { handleFieldMemo } from '../utils/handleFieldMemo'
import { FieldProps, FieldStore } from '../types'
import { useField } from '../hooks/useField'

interface FieldContentProps extends FieldProps {
  fieldStore: FieldStore
}

const FieldContent = memo((props: FieldContentProps) => {
  const { fieldStore } = props

  const { visible, component } = fieldStore
  if (!visible) return null

  let Cmp: any

  if (typeof component === 'string') {
    Cmp = fim.Fields[component] || component
  } else {
    Cmp = component
  }

  return createElement(Cmp || 'input', { name: props.name })
}, handleFieldMemo)

export const Field: FC<FieldProps> = memo((props) => {
  const fieldStore = useField(props.name, props)
  return <FieldContent {...props} fieldStore={fieldStore} />
})
