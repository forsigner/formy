import React, { FC, memo } from 'react'
import { Fim } from '../../Fim'
import get from 'lodash.get'
import { FieldProps, RegisterFieldProps } from '../../types'
import { handleFieldMemo } from '../../utils'
import { DefaultInput } from '../DefaultInput'

export const EntityField: FC<FieldProps> = memo((props) => {
  const { field, result } = props
  const { handleBlur, handleChange, values } = result

  const fieldProps: RegisterFieldProps = {
    value: get(values, field.name),
    name: field.name,
    field,
    result,
    handleBlur,
    handleChange,
  }

  if (field.component) {
    const Cmp =
      typeof field.component === 'string' ? Fim.FieldStore[field.component] : field.component

    return <Cmp {...fieldProps} />
  }

  return <DefaultInput {...fieldProps}></DefaultInput>
}, handleFieldMemo)
