import React, { FC, memo } from 'react'
import { Fim } from '../Fim'
import { handleFieldMemo } from '../utils/handleFieldMemo'
import { useFormContext } from '../formContext'
import { DefaultInput } from './DefaultInput'
import { Result, FieldProps } from '../../fim/types'

interface FieldContentProps extends FieldProps {
  result: Result
}

const FieldContent = memo((props: FieldContentProps) => {
  const { result, name } = props
  const fieldState = result.getFieldState(name)

  if (!fieldState) {
    throw new Error(`${name} field is not exist in schema, please check your schema`)
  }

  const { value, visible } = fieldState
  if (!visible) return null

  let Cmp: any

  if (!fieldState.component) {
    Cmp = DefaultInput
  } else if (typeof fieldState.component === 'string') {
    Cmp = Fim.FieldStore[fieldState.component]
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
