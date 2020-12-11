import React, { FC, memo, createElement } from 'react'
import { Fim } from '../../Fim'
import get from 'lodash.get'
import { FieldProps, RegisterFieldProps } from '../../types'
import { handleFieldMemo } from '../../utils'
import { DefaultInput } from '../DefaultInput'

export const EntityField: FC<FieldProps> = memo((props) => {
  const { field, result, name } = props
  const { handleBlur, handleChange, values } = result

  const fieldProps: RegisterFieldProps = {
    value: get(values, name),
    name,
    field,
    result,
    handleBlur,
    handleChange,
  }
  const { component } = field

  // TODO:
  if (component) {
    if (typeof component === 'string') {
      if (Fim.FieldStore[component]) {
        return Fim.FieldStore[component]
      }
      return createElement(component, { name, value: fieldProps.value, onChange: handleChange })
    } else {
      const Cmp: any = component
      return <Cmp {...fieldProps} />
    }
  }

  return <DefaultInput {...fieldProps}></DefaultInput>
}, handleFieldMemo)
