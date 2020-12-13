import React, { memo, createElement } from 'react'
import { Fim } from '../../Fim'
import { RegisterFieldProps, Result } from '../../types'
import { handleFieldMemo } from '../../utils'
import { DefaultInput } from '../DefaultInput'

interface Props {
  name: string
  result: Result
}

export const FormField = memo((props: Props) => {
  const { result, name } = props
  const fieldState = result.getFieldState(name)
  const { value, component } = fieldState
  const fieldProps: RegisterFieldProps = { ...result, name, fieldState }

  if (component) {
    if (typeof component === 'string') {
      if (Fim.FieldStore[component]) {
        const Cmp: any = Fim.FieldStore[component]
        return <Cmp {...fieldProps} />
      }
      return <DefaultInput {...fieldProps} />
    } else {
      const Cmp: any = component
      return <Cmp {...fieldProps} />
    }
  }

  return <DefaultInput {...fieldProps} />
}, handleFieldMemo)
