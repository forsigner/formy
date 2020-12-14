import * as React from 'react'
import { isNative } from '../utils'
import { fim } from '../fim'
import { useFormContext } from '../formContext'

export const DefaultForm: React.FC<any> = (props) => {
  const { children } = props
  const { Form } = fim
  const result = useFormContext()

  if (Form) {
    return <Form {...result}>{props.children}</Form>
  }

  if (isNative) {
    return children
  }

  return React.createElement('form', { ...props, ...result })
}
