import React, { memo } from 'react'
import { fim } from '../../fim'
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
  const { component } = fieldState
  const fieldProps: RegisterFieldProps = { ...result, name, fieldState }

  if (component) {
    if (typeof component === 'string') {
      if (fim.Fields[component]) {
        const Cmp: any = fim.Fields[component]
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
