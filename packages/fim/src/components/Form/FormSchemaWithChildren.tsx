import React, { FC } from 'react'
import { FormProps } from '../../types'
import { useForm } from '../../hooks/useForm'
import { FormHooksWithChildren } from './FormHooksWithChildren'

export const FormEntityWithChildren: FC<FormProps> = ({ schema, children }) => {
  const use = useForm(schema as any)
  return <FormHooksWithChildren use={use}>{children}</FormHooksWithChildren>
}
