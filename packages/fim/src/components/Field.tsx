import React, { FC, memo } from 'react'
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
  return <FieldContent {...props} result={result} />
})
