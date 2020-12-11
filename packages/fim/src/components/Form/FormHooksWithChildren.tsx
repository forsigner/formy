import React, { FC } from 'react'
import { FormProps } from '../../types'
import { FormProvider } from '../../formContext'
import { DefaultForm } from '../DefaultForm'

export const FormHooksWithChildren: FC<FormProps> = ({ use, children }) => {
  if (!use) return null

  return (
    <FormProvider value={use}>
      <DefaultForm onSubmit={use.handleSubmit}>{children}</DefaultForm>
    </FormProvider>
  )
}
