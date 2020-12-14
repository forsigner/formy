import React, { FC, memo } from 'react'
import { fim } from '../fim'
import { handleFieldMemo } from '../utils/handleFieldMemo'
import { DefaultInput } from './DefaultInput'
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

  if (!component) {
    Cmp = DefaultInput
  } else if (typeof component === 'string') {
    Cmp = fim.Fields[component]
  } else {
    Cmp = component
  }

  if (!Cmp) Cmp = DefaultInput

  return <Cmp {...props} fieldStore={fieldStore} />
}, handleFieldMemo)

export const Field: FC<FieldProps> = memo((props) => {
  const fieldStore = useField(props.name, props)
  return <FieldContent {...props} fieldStore={fieldStore} />
})
