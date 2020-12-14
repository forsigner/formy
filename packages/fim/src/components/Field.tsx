import React, { FC, memo } from 'react'
import { Storage } from 'stook'
import set from 'lodash.set'
import { fim } from '../fim'
import { handleFieldMemo } from '../utils/handleFieldMemo'
import { useFormContext } from '../formContext'
import { DefaultInput } from './DefaultInput'
import { Result, FieldProps } from '../types'

interface FieldContentProps extends FieldProps {
  result: Result
}

const FieldContent = memo((props: FieldContentProps) => {
  const { result, name } = props
  const fieldState = result.getFieldState(name)

  if (!fieldState) {
    throw new Error(`${name} field is not exist in schema, please check your schema`)
  }

  const { visible } = fieldState
  if (!visible) return null

  let Cmp: any

  if (!fieldState.component) {
    Cmp = DefaultInput
  } else if (typeof fieldState.component === 'string') {
    Cmp = fim.Fields[fieldState.component]
  } else {
    Cmp = fieldState.component
  }

  if (!Cmp) Cmp = DefaultInput

  return <Cmp {...result} {...props} fieldState={fieldState} />
}, handleFieldMemo)

export const Field: FC<FieldProps> = memo((props) => {
  const result = useFormContext()

  // TODo: too hack
  initFieldState(props)
  return <FieldContent {...props} result={result} />
})

function initFieldState(field: FieldProps) {
  const { name } = field
  const state = Storage.stores.TestForm.state
  const visible = field.visible ?? true
  const { transform } = field
  set(state.values, name, field.value)
  set(state.visibles, name, field.visible ?? true)
  set(state.labels, name, field.label ?? null)
  set(state.components, name, field.component)
  set(state.componentProps, name, field.componentProps ?? {})
  set(state.displays, name, field.display ?? true)
  set(state.toucheds, name, field.touched ?? false)
  set(state.disableds, name, field.disabled ?? false)
  set(state.penddings, name, field.pendding ?? false)
  set(state.statuses, name, field.status ?? 'editable')
  set(state.enums, name, field.enum ?? [])
  set(state.datas, name, field.data ?? null)
  set(state.fieldSchemas, name, field)
  field.error && set(state.errors, name, field.error)

  state.pathMetadata = [
    ...state.pathMetadata,
    {
      path: name,
      visible,
      transform,
    },
  ]
}
