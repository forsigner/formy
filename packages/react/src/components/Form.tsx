import React, { FC } from 'react'
import { Formy, FormApi } from '@formy/core'
import { isNative } from '../utils'
import { FormProps } from '../types'
import { FormProvider } from '../formContext'
import { useFormContext } from '../formContext'
import { useForm } from '../hooks/useForm'

interface FormContentProps {
  hook: FormApi
}

const FormBody: FC<any> = (props) => {
  const { children } = props
  const { Form: FormyForm } = Formy
  const result = useFormContext()

  if (FormyForm) return <FormyForm handleSubmit={result.handleSubmit} {...props} />
  if (isNative) return children

  return React.createElement('form', { onSubmit: result.handleSubmit, ...props })
}

const FormContent: FC<FormContentProps> = ({ hook, children }) => (
  <FormProvider value={hook}>
    <FormBody onSubmit={hook.handleSubmit}>{children}</FormBody>
  </FormProvider>
)

const FormInnerHooks: FC<FormProps> = ({ children, ...rest }) => {
  const hook = useForm(rest)
  return <FormContent hook={hook}>{children}</FormContent>
}

export function Form<T>(props: FormProps<T>) {
  const { hook, ...rest } = props

  if (hook) return <FormContent hook={hook} {...rest} />

  return <FormInnerHooks {...rest} />
}
