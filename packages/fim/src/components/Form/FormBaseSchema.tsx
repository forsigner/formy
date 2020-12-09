import React, { FC } from 'react'
import { FormProps } from '../../types'
import { useForm } from '../../hooks/useForm'
import { FormBaseHooks } from './FormBaseHooks'

export const FormBaseEntity: FC<FormProps> = (props) => {
  const { schema, ...rest } = props
  const use = useForm(schema as any, rest)
  return <FormBaseHooks use={use} schema={schema}></FormBaseHooks>
}
