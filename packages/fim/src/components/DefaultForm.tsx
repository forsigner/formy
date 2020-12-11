import * as React from 'react'
import { isNative } from '../utils'
import { Fim } from '../Fim'
import { useFormContext } from '../formContext'

export const DefaultForm: React.FC<any> = (props) => {
  const { children } = props
  const { FormComponent } = Fim
  const result = useFormContext()

  if (FormComponent) {
    return (
      <FormComponent result={result} {...props}>
        {props.children}
      </FormComponent>
    )
  }

  if (isNative) {
    return children
  }

  return React.createElement('form', props || {})
}
