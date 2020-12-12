import React, { FC, memo, createElement } from 'react'
import { Fim } from '../../Fim'
import { FieldProps, RegisterFieldProps } from '../../types'
import { handleFieldMemo } from '../../utils'
import { DefaultInput } from '../DefaultInput'

export const FormField: FC<FieldProps> = memo((props) => {
  const { field, result, name } = props
  const fieldState = result.getFieldState(name)
  const { value } = fieldState
  const fieldProps: RegisterFieldProps = { ...result, name, fieldState }
  const { component } = field

  if (component) {
    if (typeof component === 'string') {
      if (Fim.FieldStore[component]) {
        const Cmp: any = Fim.FieldStore[component]
        return <Cmp {...fieldProps} />
      }
      return createElement(component, { name, value, onChange: fieldProps.handleChange })
    } else {
      const Cmp: any = component
      return <Cmp {...fieldProps} />
    }
  }

  return <DefaultInput {...fieldProps}></DefaultInput>
}, handleFieldMemo)
