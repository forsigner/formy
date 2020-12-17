import React, { FC } from 'react'
import { fim } from '../fim'
import { isNative } from '../utils'
import { FormProps, UseFormReturn } from '../types'
import { FormProvider } from '../formContext'
import { FormNameProvider } from '../formNameContext'
import { useFormContext } from '../formContext'
import { useForm } from '../hooks/useForm'

interface FormContentProps {
  use: UseFormReturn
}

const FormBody: FC<any> = (props) => {
  const { children } = props
  const { Form: FimForm } = fim
  const result = useFormContext()

  if (FimForm) return <FimForm handleSubmit={result.handleSubmit} {...props} />
  if (isNative) return children

  return React.createElement('form', { onSubmit: result.handleSubmit, ...props })
}

const FormContent: FC<FormContentProps> = ({ use, children }) => (
  <FormProvider value={use}>
    <FormNameProvider value={use.formName}>
      <FormBody onSubmit={use.handleSubmit}>{children}</FormBody>
    </FormNameProvider>
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
