import React, { FC } from 'react'
import { FormProps, UseFormReturn } from '../types'
import { FormProvider } from '../formContext'
import { DefaultForm } from './DefaultForm'
import { useForm } from '../hooks/useForm'

interface FormContentProps {
  use: UseFormReturn
}

const FormContent: FC<FormContentProps> = ({ use, children }) => (
  <FormProvider value={use}>
    <DefaultForm onSubmit={use.handleSubmit}>{children}</DefaultForm>
  </FormProvider>
)

const FormInnerHooks: FC<FormProps> = ({ children, ...rest }) => {
  const use = useForm(rest)
  return <FormContent use={use}>{children}</FormContent>
}

export function Form<T>(props: FormProps<T>) {
  const { use, ...rest } = props

  if (use) return <FormContent use={use} {...rest} />

  return <FormInnerHooks {...rest} />
}
