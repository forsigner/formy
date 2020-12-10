import React, { FC } from 'react'
import { FormProps } from '../../types'
import { useForm } from '../../hooks/useForm'
import { FormBaseHooks } from './FormBaseHooks'

export const FormBaseEntity: FC<FormProps> = (props) => {
  const { schema } = props
  const use = useForm(props as any)
  return <FormBaseHooks use={use} schema={schema}></FormBaseHooks>
}
