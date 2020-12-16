import React, { FC } from 'react'
import { isNative } from '../utils'
import { fim } from '../fim'
import { useFormContext } from '../formContext'

export const DefaultForm: FC<any> = (props) => {
  const { children } = props
  const { Form } = fim
  const result = useFormContext()

  if (Form) return <Form handleSubmit={result.handleSubmit} {...props} />
  if (isNative) return children

  return React.createElement('form', {
    handleSubmit: result.handleSubmit,
    ...props,
  })
}
